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

import { createSchema } from "@/validationSchemas/purchaseOrderReceiveSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IPurchaseOrder } from "@/typings/purchaseOrder";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  createPOReceiveApi,
  getAllPurchaseOrdersNoPaginateApi,
  getNextNumberPOReceiveApi,
  updatePOReceiveApi,
} from "@/api/purchaseOrder";
import { RefreshCcwIcon } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { IProduct } from "@/typings/product";
import { getAllProductsNoPaginateApi } from "@/api/product";
import { formatMoney } from "@/lib/helpers";
import { Textarea } from "../ui/textarea";
import { IPurchaseOrderReceived } from "@/typings/purchaseOrderReceived";
import { format } from "date-fns";

type Props = {
  purchaseOrderReceive?: IPurchaseOrderReceived | null;
};

const initialItem = {
  code: "",
  name: "",
  orderedQuantity: "",
  receivedQuantity: "",
  requestAmount: "",
  amount: "0",
};

export default function PurchaseOrderReceivesForm({
  purchaseOrderReceive,
}: Props) {
  const router = useRouter();
  const [loadingNextNumber, setLoadingNextNumber] = useState(false);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[] | []>(
    purchaseOrderReceive ? [purchaseOrderReceive?.purchaseOrder] : []
  );
  const form = useForm<any>({
    resolver: yupResolver(createSchema),
    values: purchaseOrderReceive
      ? {
          ...purchaseOrderReceive,
          remark: purchaseOrderReceive?.remark,
          supplier:
            purchaseOrderReceive?.purchaseOrder?.supplier.code +
            " | " +
            purchaseOrderReceive?.purchaseOrder?.supplier.name,
          requiredDate: format(
            purchaseOrderReceive?.purchaseOrder?.requiredDate,
            "Y-MM-dd"
          ),
          orderedDate: format(
            purchaseOrderReceive?.purchaseOrder?.orderDate,
            "Y-MM-dd"
          ),
          items: purchaseOrderReceive?.items?.map((row) => {
            const poItem = purchaseOrderReceive?.purchaseOrder?.items?.find(
              (itemRow) => itemRow?.code == row?.code
            );

            let total = 0;

            if (poItem) {
              const subTotal =
                parseFloat(poItem.rate) * parseFloat(row.receivedQuantity);
              const discount = (subTotal * parseFloat(poItem?.discount)) / 100;
              total = subTotal - discount;
            }

            return {
              ...row,
              ...poItem,
              requestAmount: String(total),
              receivableQuantity:
                Number(poItem?.receivableQuantity) +
                Number(row?.receivedQuantity),
            };
          }),
        }
      : { items: [] },
  });

  useEffect(() => {
    async function fetchProducts() {
      setProductsLoading(true);
      const { data } = await getAllProductsNoPaginateApi({});
      setProducts(data?.data);
      setProductsLoading(false);
    }
    fetchProducts();
    async function fetchData() {
      setLoading(true);
      const { data } = await getAllPurchaseOrdersNoPaginateApi({ type: "por" });
      setPurchaseOrders(data?.data);
      setLoading(false);
    }
    if (!purchaseOrderReceive) {
      fetchNextNumber();
      fetchData();
    }
  }, []);

  async function fetchNextNumber() {
    setLoadingNextNumber(true);
    const { data } = await getNextNumberPOReceiveApi();
    form.setValue("code", data?.nextNumber);
    setLoadingNextNumber(false);
  }

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    if (purchaseOrderReceive) {
      const { data } = await updatePOReceiveApi({
        _id: purchaseOrderReceive?._id,
        ...values,
      });
      toast.success("Purchase Order Receive Updated");
      router.push(`/purchaseOrderReceives/view/${purchaseOrderReceive?.code}`);
      return;
    }
    const { data } = await createPOReceiveApi({ ...values });
    toast.success("Purchase Order Receive Created");
    router.push(`/purchaseOrderReceives/view/${values?.code}`);
    return;
  }

  const items = form.watch("items");
  const values = useWatch({ control: form.control });

  const mainSubTotal = useMemo(
    () =>
      values?.items?.reduce((acc: string, curr: any) => {
        return (
          acc + parseFloat(curr?.receivedQuantity || 0) * parseFloat(curr?.rate)
        );
      }, 0),
    [values]
  );
  const mainDiscount = useMemo(
    () =>
      values?.items?.reduce((acc: string, curr: any) => {
        const subTotal =
          parseFloat(curr?.receivedQuantity || 0) * parseFloat(curr?.rate);

        return acc + (subTotal * parseFloat(curr?.discount)) / 100;
      }, 0),
    [values]
  );

  const mainTotal = useMemo(
    () => mainSubTotal - mainDiscount,
    [mainSubTotal, mainDiscount]
  );

  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-6">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Purchases Order Details
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
                    <FormLabel>Purchases Received#*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Purchases Received#"
                          {...field}
                          disabled={purchaseOrderReceive ? true : false}
                        />
                        <Button
                          disabled={
                            loading || purchaseOrderReceive ? true : false
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
                          isDisabled={purchaseOrderReceive ? true : false}
                          placeholder="Select Purchases Order"
                          value={purchaseOrders?.find(
                            (row) => row?.code == field.value
                          )}
                          name={field.name}
                          onChange={(value) => {
                            field.onChange(value?.code);
                            if (value) {
                              form.setValue(
                                "orderedDate",
                                format(value?.orderDate, "Y-MM-dd")
                              );
                              form.setValue(
                                "requiredDate",
                                format(value?.requiredDate, "Y-MM-dd")
                              );
                              form.setValue(
                                "supplier",
                                value?.supplier?.code +
                                  " | " +
                                  value?.supplier?.name
                              );
                              if (!purchaseOrderReceive) {
                                form.setValue("items", value?.items);
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
                name="orderedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Order Date" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="requiredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Required Date" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="receivedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Received Date*</FormLabel>
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
                        Ordered
                      </th>
                      <th
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Received
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
                        align="left"
                        scope="col"
                        className="px-3 py-3 font-light"
                      >
                        Req Amount
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
                        const total =
                          parseFloat(item?.rate) * parseFloat(item?.quantity);
                        const discountAmount = item?.discount
                          ? (total * parseFloat(item?.discount)) / 100
                          : 0;
                        const subTotal = total - discountAmount || 0;
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
                                name={`items[${index}].quantity`}
                                render={({ field }) => (
                                  <FormItem className="relative pb-5">
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder=""
                                        {...field}
                                        disabled={true}
                                      />
                                    </FormControl>
                                    <div className="absolute bottom-0">
                                      <div className="text-left text-xs  text-slate-400">
                                        Receivable Quantity :{" "}
                                        {item?.receivableQuantity}
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
                                name={`items[${index}].receivedQuantity`}
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
                                    <FormMessage className="whitespace-nowrap" />
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
                              <div className="mb-5 cursor-no-drop rounded-md border h-9 w-full opacity-55 flex items-center px-3 py-1">
                                {formatMoney(String(subTotal))}
                              </div>
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
                    <div className="border rounded-md text-sm">
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
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-5 items-center mt-5">
              <Link href={"/purchaseOrderReceives"}>
                <Button
                  type="button"
                  size={"lg"}
                  variant={"outline"}
                  className="w-[10rem]"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                disabled={items?.length == 0}
                size={"lg"}
                className="w-[10rem]"
              >
                {purchaseOrderReceive ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
