"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
} from "@/components/ui/form";

import Select from "react-select";


import { createSchema } from "@/validationSchemas/purchaseOrderSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCustomerApi, updateCustomerApi } from "@/api/customer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IPurchaseOrder } from '@/typings/purchaseOrder';
import Link from "next/link";
import { ISupplier } from "@/typings/supplier";
import { getAllSuppliersNoPaginateApi } from "@/api/suppliers";
import { cn } from "@/lib/utils";
import { createPurchaseOrderApi, getNextNumberPurchaseOrderApi, updatePurchaseOrderApi } from "@/api/purchaseOrder";
import { RefreshCcwIcon, XIcon } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { IProduct } from "@/typings/product";
import { getAllProductsNoPaginateApi } from "@/api/product";
import { formatMoney } from "@/lib/helpers";
import { Textarea } from "../ui/textarea";

type Props = {
    purchaseOrder?: IPurchaseOrder | null;
}

const initialItem = {
    code: "",
    name: "",
    remark: "",
    quantity: "",
    rate: "",
    discount: "0",
    total: "",
}

export default function PurchaseOrderForm({ purchaseOrder }: Props) {
    const router = useRouter();
    const [loadingNextNumber, setLoadingNextNumber] = useState(false)
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState<ISupplier[] | []>([])

    const [products, setProducts] = useState<IProduct[] | []>([]);
    const [productsLoading, setProductsLoading] = useState(false);

    const form = useForm<any>({
        resolver: yupResolver(createSchema),
        values: purchaseOrder ?
            { ...purchaseOrder, address: purchaseOrder?.supplier?.address } :
            { items: [initialItem] },
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
            const { data } = await getAllSuppliersNoPaginateApi({});
            setSuppliers(data?.data);
            setLoading(false);
        }
        if (!purchaseOrder) {
            fetchNextNumber()
        }
        fetchData();
        fetchProducts()
    }, []);

    async function fetchNextNumber() {
        setLoadingNextNumber(true);
        const { data } = await getNextNumberPurchaseOrderApi();
        form.setValue("code", data?.nextNumber)
        setLoadingNextNumber(false);
    }

    async function onSubmit(values: Yup.InferType<typeof createSchema>) {
        if (purchaseOrder) {
            const { data } = await updatePurchaseOrderApi({
                _id: purchaseOrder?._id,
                ...values,
            });
            toast.success("Purchase Order Updated");
            router.push(`/purchaseOrders/view/${purchaseOrder?.code}`);
            return;
        }
        const { data } = await createPurchaseOrderApi({ ...values });
        toast.success("Purchase Order Created");
        router.push(`/purchaseOrders/view/${values?.code}`);
        return;
    }

    const items = form.watch("items");
    const { append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const values = useWatch({ control: form.control })


    const mainSubTotal = useMemo(() => values?.items?.reduce((acc: string, curr: typeof initialItem) => {
        return acc + parseFloat(curr?.quantity) * parseFloat(curr?.rate)
    }, 0), [values])
    const mainDiscount = useMemo(() => values?.items?.reduce((acc: string, curr: typeof initialItem) => {
        const subTotal = parseFloat(curr?.quantity) * parseFloat(curr?.rate)
        return acc + subTotal * parseFloat(curr?.discount) / 100
    }, 0), [values])
    const mainTotal = useMemo(() => mainSubTotal - mainDiscount, [mainSubTotal, mainDiscount])

    return (
        <Card className="py-1 rounded-sm">
            <CardHeader className="p-0 py-6 px-6">
                <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
                    Supplier Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <FormField
                                disabled={loading}
                                control={form.control}
                                name="supplier"
                                render={({ field }) => {
                                    const { error, formMessageId } = useFormField()
                                    return (
                                        <FormItem >
                                            <FormLabel>Supplier *</FormLabel>
                                            <FormControl>
                                                <Select
                                                    placeholder="Select Supplier"
                                                    defaultValue={field.value}
                                                    name={field.name}
                                                    onChange={(value) => {
                                                        field.onChange({ _id: value?._id, code: value?.code })
                                                        form.setValue("address", value?.address)
                                                    }}
                                                    getOptionValue={(row) => row?._id}
                                                    getOptionLabel={(row) =>
                                                        `${row?.code} | ${row?.name}`
                                                    }
                                                    options={suppliers}
                                                    className="text-sm"
                                                    classNames={{
                                                        option: (state) =>
                                                            cn(state.isSelected && "!bg-black"),
                                                    }}
                                                    classNamePrefix="select"
                                                />
                                            </FormControl>
                                            <p
                                                id={formMessageId}
                                                className={cn("text-[0.8rem] font-medium text-xs text-left text-destructive")}
                                            >
                                                {error ? "supplier is a required field" : ""}
                                            </p>
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                disabled={loading}
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Address" {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
                            Order Details
                        </CardTitle>
                        <div className="mt-7 grid lg:grid-cols-2 gap-5">
                            <FormField
                                disabled={loading}
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem  >
                                        <FormLabel>Purchases Order #*</FormLabel>
                                        <FormControl>
                                            <div className="relative" >
                                                <Input placeholder="Purchases Order #" {...field} disabled={purchaseOrder ? true : false} />
                                                <Button
                                                    disabled={loading || purchaseOrder ? true : false}
                                                    onClick={() => fetchNextNumber()}
                                                    type="button"
                                                    variant={"ghost"}
                                                    size={"icon"}
                                                    className="absolute right-0 top-0"
                                                >
                                                    <RefreshCcwIcon className={cn("w-4", loadingNextNumber && "animate-spin")} />
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
                                name="orderDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Order Date *</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
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
                                name="requiredDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Required Date *</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
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
                                                Discount (%)
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
                                    <tbody>
                                        {items?.map((row: typeof initialItem, index: number) => {
                                            const item = values?.items[index]
                                            const total = parseFloat(item?.rate) * parseFloat(item?.quantity)
                                            const discountAmount = item?.discount ? total * parseFloat(item?.discount) / 100 : 0
                                            const subTotal = total - discountAmount || 0
                                            return (
                                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td
                                                        align="left"
                                                        className="px-3 py-4 min-w-[20rem] w-[20rem] max-w-[20rem]"
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
                                                                            className="text-sm"
                                                                            classNames={{
                                                                                option: (state) =>
                                                                                    cn(state.isSelected && "!bg-black"),
                                                                            }}
                                                                            value={products?.find(
                                                                                (product) => product?.code == field.value
                                                                            )}
                                                                            onChange={(value) => {
                                                                                field.onChange(value?.code);
                                                                                form.setValue(`items[${index}].rate`, value?.cost)
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
                                                    <td align="right" className="px-3 py-4 min-w-[8rem]">
                                                        <FormField
                                                            disabled={loading}
                                                            control={form.control}
                                                            name={`items[${index}].remark`}
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
                                                    <td align="right" className="px-3 py-4 min-w-[8rem]">
                                                        <FormField
                                                            disabled={loading}
                                                            control={form.control}
                                                            name={`items[${index}].quantity`}
                                                            render={({ field }) => (
                                                                <FormItem className="relative pb-5">
                                                                    <FormControl>
                                                                        <Input type="number" placeholder="" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage className="absolute bottom-0" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </td>
                                                    <td align="right" className="px-3 py-4 min-w-[8rem]">
                                                        <FormField
                                                            disabled={loading}
                                                            control={form.control}
                                                            name={`items[${index}].rate`}
                                                            render={({ field }) => (
                                                                <FormItem className="relative pb-5">
                                                                    <FormControl>
                                                                        <Input type="number" placeholder="" {...field} disabled={true} />
                                                                    </FormControl>
                                                                    <FormMessage className="absolute bottom-0" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </td>
                                                    <td align="right" className="px-3 py-4 min-w-[8rem]">
                                                        <FormField
                                                            disabled={loading}
                                                            control={form.control}
                                                            name={`items[${index}].discount`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <div className="relative pb-5" >
                                                                            <Input type="number" placeholder="" {...field} />
                                                                            <FormMessage className="absolute top-[70%] whitespace-nowrap" />
                                                                        </div>
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </td>
                                                    <td align="right" className="px-3 py-4 min-w-[8rem]">
                                                        <div className="mb-5" >{formatMoney(String(subTotal))}</div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            onClick={() => remove(index)}
                                                            disabled={index == 0}
                                                            type="button"
                                                            size={"icon"}
                                                            variant={"ghost"}
                                                            className="mb-5 mx-5"
                                                        >
                                                            <XIcon className="w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td colSpan={4} align="left" className="px-3 py-2">
                                                <Button
                                                    type="button"
                                                    onClick={() => append(initialItem)}
                                                    variant={"ghost"}
                                                >
                                                    Add Line Item
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="border-t grid grid-cols-2 items-start gap-5 p-6" >
                                    <FormField
                                        disabled={loading}
                                        control={form.control}
                                        name="remark"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea rows={5} placeholder="Remark" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="border rounded-md text-sm">
                                        <table className="w-full" >
                                            <tbody>
                                                <tr className="border-b" >
                                                    <td className="px-6 py-3 font-light" >Subtotal</td>
                                                    <td align="right" className="px-6 py-3 font-light" >{formatMoney(String(mainSubTotal))}</td>
                                                </tr>
                                                <tr className="border-b" >
                                                    <td className="px-6 py-3 font-light" >Discount</td>
                                                    <td align="right" className="px-6 py-3 font-light" >{formatMoney(String(mainDiscount))}</td>
                                                </tr>
                                                <tr className="font-semibold" >
                                                    <td className="px-6 py-3" >Total</td>
                                                    <td align="right" className="px-6 py-3" >{formatMoney(String(mainTotal))}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-5 items-center mt-5">
                            <Link href={'/purchaseOrders'} >
                                <Button size={"lg"} variant={"outline"} className="w-[10rem]">
                                    Cancel
                                </Button>
                            </Link>
                            <Button size={"lg"} className="w-[10rem]">
                                {purchaseOrder ? "Update" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}