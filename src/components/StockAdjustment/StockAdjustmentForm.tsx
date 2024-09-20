"use client";
import { ICustomer } from "@/typings/customer";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createSchema } from "@/validationSchemas/stockAdjustmentSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCustomerApi } from "@/api/customer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MainSelect } from "../ui/main-select";
import { SelectItem } from "../ui/select";
import { stockAdjustmentReasons, stockAdjustmentTypes } from "@/lib/constants";
import { IProduct } from "@/typings/product";
import Select from "react-select";
import {
  createStockAdjustmentApi,
  getAllProductsNoPaginateApi,
} from "@/api/product";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import { DatePicker } from "../ui/date-picker";

type Props = {};

const initalItem = {
  code: "",
  availableQuantity: "",
  quantity: "",
};

export default function StockAdjustmentForm({}: Props) {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setProductsLoading(true);
      const { data } = await getAllProductsNoPaginateApi({});
      setProducts(data?.data);
      setProductsLoading(false);
    }
    fetchProducts();
  }, []);

  const form = useForm<any>({
    resolver: yupResolver(createSchema),
    values: {
      items: [initalItem],
    },
  });

  const items = form.watch("items");

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    const { data } = await createStockAdjustmentApi({ ...values });
    toast.success("Stock Adjustment Created");
    router.push("/inventory/stockAdjustments");
  }

  // function onItemValueChange(index: number, newItem: typeof initalItem) {
  //   const tempArray = [...items];
  //   tempArray.splice(index, 1, newItem);
  //   setItems(tempArray);
  // }

  function onItemValueChange(name: string, value: string) {
    form.setValue(name, value);
  }

  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-3">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Quantity Adjustment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                disabled={loading}
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason *</FormLabel>
                    <FormControl>
                      <MainSelect
                        placeholder="Reason"
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        {stockAdjustmentReasons?.map((row) => {
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
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type *</FormLabel>
                    <FormControl>
                      <MainSelect
                        placeholder="Type"
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        {stockAdjustmentTypes?.map((row) => {
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
                  </FormItem>
                )}
              />
            </div>
            <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
              Item Table
            </CardTitle>
            <div className="mt-7 border rounded-md w-fit">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th
                      align="left"
                      scope="col"
                      className="px-6 py-3 font-light"
                    >
                      Item
                    </th>
                    <th
                      align="left"
                      scope="col"
                      className="px-6 py-3 font-light"
                    >
                      Available Quantity
                    </th>
                    <th
                      align="left"
                      scope="col"
                      className="px-6 py-3 font-light"
                    >
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((row: typeof initalItem, index: number) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                          align="left"
                          className="px-6 py-4 min-w-[30rem] w-[30rem] max-w-[30rem]"
                        >
                          <FormField
                            disabled={loading}
                            control={form.control}
                            name={`items[${index}].code`}
                            render={({ field }) => (
                              <FormItem className="relative pb-5">
                                <FormControl>
                                  <Select
                                    placeholder="Select Item"
                                    isLoading={productsLoading}
                                    classNames={{
                                      option: (state) =>
                                        cn(state.isSelected && "!bg-black"),
                                    }}
                                    defaultValue={products?.find(
                                      (product) => product?.code == field.value
                                    )}
                                    onChange={(value) => {
                                      const availableQuantity =
                                        value?.warehouseQuantity?.reduce(
                                          (acc, curr) => {
                                            return (
                                              acc + parseFloat(curr?.quantity)
                                            );
                                          },
                                          0
                                        );
                                      field.onChange(value?.code);
                                      form.setValue(
                                        `items[${index}].availableQuantity`,
                                        availableQuantity
                                      );
                                    }}
                                    options={products}
                                    getOptionValue={(row) => row?._id}
                                    getOptionLabel={(row) =>
                                      `(${row?.code}) ${row?.name}`
                                    }
                                  />
                                </FormControl>
                                <FormMessage className="absolute bottom-0" />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td align="right" className="px-6 py-4 w-[15rem]">
                          <FormField
                            disabled={true}
                            control={form.control}
                            name={`items[${index}].availableQuantity`}
                            render={({ field }) => (
                              <FormItem className="relative pb-5">
                                <FormControl>
                                  <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td align="right" className="px-6 py-4 w-[20rem]">
                          <FormField
                            disabled={loading}
                            control={form.control}
                            name={`items[${index}].quantity`}
                            render={({ field }) => (
                              <FormItem className="relative pb-5">
                                <FormControl>
                                  <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage className="absolute bottom-0" />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => remove(index)}
                            disabled={index == 0}
                            type="button"
                            size={"icon"}
                            variant={"destructive"}
                            className="mb-5 mx-5"
                          >
                            <TrashIcon className="w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={4} align="left" className="px-6 py-2">
                      <Button
                        type="button"
                        onClick={() => append(initalItem)}
                        variant={"ghost"}
                      >
                        Add Line Item
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center mt-5">
              <Button size={"lg"} className="w-[10rem]">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
