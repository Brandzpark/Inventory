"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, useWatch } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Select from "react-select";

import { createSchema } from "@/validationSchemas/purchaseOrderReturnSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IPurchaseOrder } from "@/typings/purchaseOrder";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  createPOReceiveApi,
  createPOReturnApi,
  getAllPurchaseOrdersNoPaginateApi,
  getNextNumberPOReceiveApi,
  getNextNumberPOReturnApi,
  updatePOReceiveApi,
  updatePOReturnApi,
} from "@/api/purchaseOrder";
import { RefreshCcwIcon } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { IProduct } from "@/typings/product";
import { getAllProductsNoPaginateApi } from "@/api/product";
import { formatMoney } from "@/lib/helpers";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import { IPurchaseOrderReturn } from "@/typings/purchaseOrderReturn";

type Props = {
  purchaseOrderReturn?: IPurchaseOrderReturn | null;
};

export default function PurchaseOrderReturnsForm({
  purchaseOrderReturn,
}: Props) {
  const router = useRouter();
  const [loadingNextNumber, setLoadingNextNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[] | []>(
    purchaseOrderReturn ? [purchaseOrderReturn?.purchaseOrder] : []
  );

  const form = useForm<any>({
    resolver: yupResolver(createSchema),
    values: purchaseOrderReturn
      ? {
          ...purchaseOrderReturn,
        }
      : { items: [] },
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await getAllPurchaseOrdersNoPaginateApi({ type: "por" });
      setPurchaseOrders(data?.data);
      setLoading(false);
    }
    if (!purchaseOrderReturn) {
      fetchNextNumber();
      fetchData();
    }
  }, []);

  async function fetchNextNumber() {
    setLoadingNextNumber(true);
    const { data } = await getNextNumberPOReturnApi();
    form.setValue("code", data?.nextNumber);
    setLoadingNextNumber(false);
  }

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    if (purchaseOrderReturn) {
      const { data } = await updatePOReturnApi({
        _id: purchaseOrderReturn?._id,
        ...values,
      });
      toast.success("Stock Return Updated");
      router.push(`/purchaseOrderReturns/view/${purchaseOrderReturn?.code}`);
      return;
    }
    const { data } = await createPOReturnApi({ ...values });
    toast.success("Stock Return Created");
    router.push(`/purchaseOrderReturns/view/${values?.code}`);
    return;
  }

  const items = form.watch("items");
  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-6">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Stock Return Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                disabled={loading}
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PSR#*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="PSR#"
                          {...field}
                          disabled={purchaseOrderReturn ? true : false}
                        />
                        <Button
                          disabled={
                            loading || purchaseOrderReturn ? true : false
                          }
                          onClick={() => fetchNextNumber()}
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          className="absolute right-0 top-0"
                        >
                          <RefreshCcwIcon
                            className={cn(
                              "w-4",
                              loadingNextNumber && "animate-spin"
                            )}
                          />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Return Date*</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        calendarProps={{ disabled: { before: new Date() } }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="purchaseOrderCode"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Purchases Order#*</FormLabel>
                      <FormControl>
                        <Select
                          isDisabled={purchaseOrderReturn ? true : false}
                          placeholder="Select Purchases Order"
                          value={purchaseOrders?.find(
                            (row) => row?.code == field.value
                          )}
                          name={field.name}
                          onChange={(value) => {
                            field.onChange(value?.code);
                            if (value) {
                              form.setValue(
                                "supplier",
                                value?.supplier?.code +
                                  " | " +
                                  value?.supplier?.name
                              );
                              if (!purchaseOrderReturn) {
                                const mappedItems = value?.items?.map((row) => {
                                  return {
                                    ...row,
                                    quantity: "",
                                    remark: "",
                                  };
                                });
                                form.setValue("items", mappedItems);
                              }
                            }
                          }}
                          getOptionValue={(row) => row?._id}
                          getOptionLabel={(row) => `${row?.code}`}
                          options={purchaseOrders}
                          className="text-sm "
                          classNames={{
                            control: (state) =>
                              cn(
                                state.isDisabled && "!bg-white !cursor-no-drop"
                              ),
                            option: (state) =>
                              cn(state.isSelected && "!bg-black"),
                          }}
                          classNamePrefix="select"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Supplier ID" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
              Item Table
            </CardTitle>
            <div>
              <div className="mt-7 border rounded-md relative overflow-x-auto">
                <table className="table-auto w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Item
                      </th>
                      <th
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Remark
                      </th>
                      <th
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Qty
                      </th>
                      <th
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Rate
                      </th>
                      <th
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Discount
                      </th>
                      <th
                        align="right"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  {items?.length == 0 ? (
                    <tbody className="bg-slate-100">
                      <tr>
                        <td colSpan={7} className="text-center px-3 py-4">
                          Select Purchase Order
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {items?.map((row: any, index: number) => {
                        const item = row;
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td
                              align="left"
                              className="px-3 py-4 min-w-[20rem] w-[20rem] max-w-[20rem]"
                            >
                              <FormField
                                control={form.control}
                                name={`items[${index}].code`}
                                render={({ field }) => (
                                  <FormItem className="relative pb-5">
                                    <FormControl>
                                      <div className="cursor-no-drop rounded-md h-9 w-full border opacity-55 flex items-center px-3 py-1">
                                        {item?.code} | {item?.name}
                                      </div>
                                    </FormControl>
                                    <FormMessage className="absolute bottom-0" />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td
                              align="right"
                              className="px-3 py-4 min-w-[8rem]"
                            >
                              <FormField
                                control={form.control}
                                name={`items[${index}].remark`}
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
                            <td
                              align="right"
                              className="px-3 py-4 min-w-[8rem]"
                            >
                              <FormField
                                control={form.control}
                                name={`items[${index}].quantity`}
                                render={({ field }) => (
                                  <FormItem className="relative pb-5">
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder=""
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e.target.value);
                                          const value = e.target.value;
                                          const subTotal =
                                            item?.rate * Number(value);
                                          const discountAmount =
                                            (subTotal * item?.discount) / 100;
                                          const total =
                                            subTotal - discountAmount;
                                          form.setValue(
                                            `items[${index}].requestAmount`,
                                            total
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <div className="absolute bottom-0">
                                      <div className="text-left text-xs  text-slate-400">
                                        Returnable Quantity :{" "}
                                        {item?.returnableQuantity}
                                      </div>
                                      <FormMessage />
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td
                              align="right"
                              className="px-3 py-4 min-w-[8rem]"
                            >
                              <FormField
                                control={form.control}
                                name={`items[${index}].rate`}
                                render={({ field }) => (
                                  <FormItem className="relative pb-5">
                                    <FormControl>
                                      <div className="cursor-no-drop rounded-md h-9 w-full border opacity-55 flex items-center px-3 py-1">
                                        {item?.rate}
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td
                              align="right"
                              className="px-3 py-4 min-w-[8rem]"
                            >
                              <FormField
                                control={form.control}
                                name={`items[${index}].discount`}
                                render={({ field }) => (
                                  <FormItem className="relative pb-5">
                                    <FormControl>
                                      <div className="cursor-no-drop rounded-md h-9 w-full border opacity-55 flex items-center px-3 py-1">
                                        {item?.discount}%
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td
                              align="right"
                              className="px-3 py-4 min-w-[8rem]"
                            >
                              <FormField
                                control={form.control}
                                name={`items[${index}].requestAmount`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <div className="relative pb-5">
                                        <Input
                                          dir="rtl"
                                          type="number"
                                          placeholder=""
                                          {...field}
                                          disabled={true}
                                        />
                                        <FormMessage className="absolute top-[70%] whitespace-nowrap" />
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
                {items?.length > 0 && (
                  <div className="border-t grid grid-cols-2 items-start gap-5 p-6">
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="remark"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                rows={5}
                                placeholder="Remark"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    {/* <div className="border rounded-md text-sm">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b">
                            <td className="px-6 py-3 font-light">Subtotal</td>
                            <td align="right" className="px-6 py-3 font-light">
                              {formatMoney(String(mainSubTotal))}
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-6 py-3 font-light">Discount</td>
                            <td align="right" className="px-6 py-3 font-light">
                              {formatMoney(String(mainDiscount))}
                            </td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="px-6 py-3">Total</td>
                            <td align="right" className="px-6 py-3">
                              {formatMoney(String(mainTotal))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
