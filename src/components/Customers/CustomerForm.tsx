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

import { createSchema } from "@/validationSchemas/customerSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCustomerApi, updateCustomerApi } from "@/api/customer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MainSelect } from "../ui/main-select";
import { SelectItem } from "../ui/select";
import { customerStatus, salutaions } from "@/lib/constants";

type Props = {
  customer?: ICustomer | null;
};

export default function CustomerForm({ customer }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const customerForm = useForm<any>({
    resolver: yupResolver(createSchema),
    values: {
      ...customer,
    },
  });

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    if (customer) {
      const { data } = await updateCustomerApi({
        _id: customer?._id,
        ...values,
      });
      toast.success("Customer Updated");
      router.push("/customers");
      return;
    }
    const { data } = await createCustomerApi({ ...values });
    toast.success("Customer Created");
    router.push("/customers");
    return;
  }

  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-3">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Customer Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...customerForm}>
          <form onSubmit={customerForm.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                disabled={loading}
                control={customerForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={customerForm.control}
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
                control={customerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={customerForm.control}
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
                control={customerForm.control}
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
                control={customerForm.control}
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
                control={customerForm.control}
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
                control={customerForm.control}
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

              <FormField
                disabled={loading}
                control={customerForm.control}
                name="openingBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Balance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Opening Balance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={loading}
                control={customerForm.control}
                name="creditPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Limit (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Credit Limit (days)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={customerForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <MainSelect
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        {customerStatus?.map((row) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              key={row}
                              value={row}
                            >
                              {row}
                            </SelectItem>
                          );
                        })}
                      </MainSelect>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      *** only active status can create invoices ***
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end items-center mt-5">
              <Button size={"lg"} className="w-[10rem]">
                {customer ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
