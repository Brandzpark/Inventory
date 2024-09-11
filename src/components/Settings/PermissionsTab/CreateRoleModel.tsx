import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IPermissions, IRole } from "@/typings/role";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { createRoleSchema } from "@/validationSchemas/roleSchemas";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/lib/helpers";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { createRoleApi, updateRoleApi } from "@/api/role";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  selectedData: IRole | null;
  onSuccess: () => void;
  permissions: IPermissions[] | [];
};

const formInitialData = {
  name: "",
  permissions: [],
};

export default function CreateRoleModel({
  open,
  onOpenChange,
  selectedData,
  onSuccess,
  permissions,
}: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<Yup.InferType<typeof createRoleSchema>>({
    resolver: yupResolver(createRoleSchema),
    values: selectedData ? { ...selectedData } : formInitialData,
  });

  const permissionsState = form.watch("permissions");

  async function onSubmit(values: Yup.InferType<typeof createRoleSchema>) {
    setLoading(true);
    if (selectedData) {
      try {
        const response: AxiosResponse = await updateRoleApi(values);
        setLoading(false);
        toast.success("Role Updated");
        onSuccess();
      } catch (error) {
        errorHandler({
          error,
          setError: (property, options) => form.setError(property, options),
        });
      }
      return;
    }
    try {
      const response: AxiosResponse = await createRoleApi(values);
      setLoading(false);
      toast.success("Role Created");
      onSuccess();
    } catch (error) {
      errorHandler({
        error,
        setError: (property, options) => form.setError(property, options),
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedData ? "Update Role" : "Create Role"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={loading}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              {permissions?.map((row) => {
                return (
                  <div key={row?.group} className="space-y-3">
                    <div className="text-sm">{row?.group}</div>
                    <div className="space-y-2">
                      {row?.permissions?.map((permission) => {
                        return (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={
                                permissionsState &&
                                permissionsState?.find(
                                  (permissionState) =>
                                    permissionState == permission.key
                                )
                                  ? true
                                  : false || false
                              }
                              onCheckedChange={(value) => {
                                const tempPermissionState = [
                                  ...permissionsState,
                                ];
                                if (Boolean(value)) {
                                  tempPermissionState.push(permission.key);
                                  form.setValue(
                                    "permissions",
                                    tempPermissionState
                                  );
                                  return;
                                }
                                const findIndex = tempPermissionState.findIndex(
                                  (permissionState) =>
                                    permissionState == permission.key
                                );
                                tempPermissionState.splice(findIndex, 1);
                                form.setValue(
                                  "permissions",
                                  tempPermissionState
                                );
                              }}
                              id={permission.key}
                            />
                            <Label htmlFor={permission?.key}>
                              {permission.value}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <FormField
              control={form.control}
              disabled={loading}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button onClick={onOpenChange} type="button" variant={"outline"}>
                Cancel
              </Button>
              <Button>{selectedData ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
