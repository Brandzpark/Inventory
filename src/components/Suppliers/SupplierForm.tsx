"use client";
import { ICustomer } from "@/typings/customer";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createSchema } from "@/validationSchemas/supplierSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateCustomerApi } from "@/api/customer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MainSelect } from "../ui/main-select";
import { SelectItem } from "../ui/select";
import { ISuppplier } from "@/typings/supplier";
import { createSupplierApi, updateSupplierApi } from "@/api/suppliers";

import { salutaions } from "@/lib/constants";

type Props = {
  supplier?: ISuppplier | null;
};

export default function SupplierForm({ supplier }: Props) {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const supplerForm = useForm<any>({
    resolver: yupResolver(createSchema),
    values: {
      ...supplier,
    },
  });

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    if (supplier) {
      const { data } = await updateSupplierApi({
        _id: supplier?._id,
        ...values,
      });
      console.log(data);
      toast.success("Supplier Updated");
      router.push("/suppliers");
      return;
    }
    const { data } = await createSupplierApi({ ...values });
    toast.success("Supplier Created");
    router.push("/suppliers");
    return;
  }

  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-3">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Suppler Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...supplerForm}>
          <form onSubmit={supplerForm.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="Supplier ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="salutation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <MainSelect
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        {salutaions?.map((row) => {
                          return (
                            <SelectItem key={row} value={row}>
                              {row}
                            </SelectItem>
                          );
                        })}
                      </MainSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Supplier Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="nic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC *</FormLabel>
                    <FormControl>
                      <Input placeholder="NIC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tel No</FormLabel>
                    <FormControl>
                      <Input placeholder="Tel No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={supplerForm.control}
                name="taxNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Tax Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end items-center mt-5">
              <Button size={"lg"} className="w-[10rem]">
                {supplier ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
