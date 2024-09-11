import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  createUserSchema,
  updateUserSchema,
} from "@/validationSchemas/userSchemas";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUser } from "./typings";
import { IRole } from "@/typings/role";
import { MainSelect } from "@/components/ui/main-select";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createUserApi, updateUserApi } from "@/api/user";
import { AxiosResponse } from "axios";
import { errorHandler } from "@/lib/helpers";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  selectedData: IUser | null;
  roleList: IRole[] | [];
  onSuccess: () => void;
};

const formInitialData = {
  isActive: true,
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  permissions: [],
  role: "",
};

export default function CreateUserModel({
  open,
  onOpenChange,
  selectedData,
  roleList,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<
    Yup.InferType<typeof createUserSchema | typeof updateUserSchema>
  >({
    resolver: yupResolver(selectedData ? updateUserSchema : createUserSchema),
    values: selectedData ? { ...selectedData } : formInitialData,
  });

  async function onSubmit(
    values: Yup.InferType<typeof updateUserSchema | typeof updateUserSchema>
  ) {
    setLoading(true);

    if (selectedData) {
      try {
        const response: AxiosResponse = await updateUserApi(values);
        setLoading(false);
        toast.success("User Updated");
        onSuccess();
      } catch (error) {
        setLoading(false);
        errorHandler({
          error,
          setError: (property, options) => form.setError(property, options),
        });
      }
      return;
    }
    try {
      const response: AxiosResponse = await createUserApi(values);
      setLoading(false);
      toast.success("User Created");
      onSuccess();
    } catch (error) {
      setLoading(false);
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
            {selectedData ? "Update User" : "Create User"}
          </DialogTitle>
          {!selectedData && (
            <DialogDescription>
              Easily onboard new team members by filling out their details.
              Assign roles and set permissions to get them started quickly.
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={loading}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel>Active</FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                disabled={loading}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                disabled={loading}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              disabled={loading}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!selectedData && (
              <FormField
                control={form.control}
                disabled={loading}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              disabled={loading}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <MainSelect
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      {roleList?.map((row) => {
                        return (
                          <SelectItem key={row._id} value={row.name}>
                            {row?.name}
                          </SelectItem>
                        );
                      })}
                    </MainSelect>
                  </FormControl>
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
