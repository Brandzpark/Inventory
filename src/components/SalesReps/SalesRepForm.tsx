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

import { createSchema } from "@/validationSchemas/salesRepSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MainSelect } from "../ui/main-select";
import { SelectItem } from "../ui/select";
import { createSalesRepApi, updateSalesRepApi } from "@/api/salesReps";
import { salutaions } from "@/lib/constants";
import { ISalesRep } from "@/typings/salesReps";
import { MultiSelect } from "../ui/multi-select";

type Props = {
  salesRep?: ISalesRep | null;
  customers: ICustomer[] | [];
};

export default function SalesRepForm({ salesRep, customers }: Props) {
  
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const salesRepForm = useForm<Yup.InferType<typeof createSchema>>({
    resolver: yupResolver(createSchema),
    values: {
      ...salesRep,
    },
  });

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    if (salesRep) {
      const { data } = await updateSalesRepApi({
        _id: salesRep?._id,
        ...values,
      });
      console.log(data);
      toast.success("Sales Rep Updated");
      router.push("/salesReps");
      return;
    }
    const { data } = await createSalesRepApi({ ...values });
    toast.success("Sales Rep Created");
    router.push("/salesReps");
    return;
  }

  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-3">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Rep Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...salesRepForm}>
          <form onSubmit={salesRepForm.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                disabled={loading}
                control={salesRepForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rep ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="Supplier ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={salesRepForm.control}
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
                control={salesRepForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rep Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Rep Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={salesRepForm.control}
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
                control={salesRepForm.control}
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
                control={salesRepForm.control}
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
                control={salesRepForm.control}
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
            </div>
            <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
              Customer Assign
            </CardTitle>
            <div>
              <FormField
                disabled={loading}
                control={salesRepForm.control}
                name="customers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={customers}
                        onValueChange={() => {}}
                        defaultValue={field.value}
                        placeholder="Select Customers"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end items-center mt-5">
              <Button size={"lg"} className="w-[10rem]">
                {salesRep ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
