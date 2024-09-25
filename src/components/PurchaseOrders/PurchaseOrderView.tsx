"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPurchaseOrder, IPurchaseOrderItem } from "@/typings/purchaseOrder";
import { findByCodePurchaseOrderApi } from "@/api/purchaseOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { formatMoney } from "@/lib/helpers";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { Button } from "../ui/button";
import { PrinterIcon } from "lucide-react";

type Props = {
  code: string;
};

export default function PurchaseOrderView({ code }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchaseOrder, setPurchaseOrder] = useState<IPurchaseOrder | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await findByCodePurchaseOrderApi({ code: code });
        setPurchaseOrder(data?.data);
        setLoading(false);
      } catch (error) {
        router.push("/purchaseOrders");
        toast.error("Purchase Order Not Found", { id: "PO404" });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Card className="w-full flex justify-center items-center h-[40rem] bg-white">
          <LoadingSpinner />{" "}
        </Card>
      ) : (
        <div>
          <div className="flex justify-end items-center pb-3 gap-5">
            <Link target="_blank" href={`/purchaseOrders/print/${code}`}>
              <Button
                variant={"outline"}
                className="flex justify-between gap-3"
              >
                <PrinterIcon className="w-5" />
                <div>Print</div>
              </Button>
            </Link>
            {!purchaseOrder?.isReceiveCreated && (
              <Link href={`/purchaseOrders/${code}`}>
                <Button>Edit</Button>
              </Link>
            )}
          </div>
          <Card className="py-1 rounded-sm">
            <CardHeader className="p-0 py-6 px-6">
              <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
                Supplier Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label>Supplier Code</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrder?.supplier?.code}
                  />
                </div>
                <div>
                  <Label>Supplier Name</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrder?.supplier?.name}
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrder?.supplier?.address}
                  />
                </div>
              </div>
              <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
                Order Details
              </CardTitle>
              <div className="mt-7 grid lg:grid-cols-2 gap-5">
                <div>
                  <Label>Purchases Order #</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrder?.code}
                  />
                </div>
                <div>
                  <Label>Order Date</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={
                      purchaseOrder
                        ? format(purchaseOrder.orderDate, "Y-MM-dd")
                        : ""
                    }
                  />
                </div>
                <div>
                  <Label>Required Date</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={
                      purchaseOrder
                        ? format(purchaseOrder.requiredDate, "Y-MM-dd")
                        : ""
                    }
                  />
                </div>
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
                          align="right"
                          scope="col"
                          className="px-3 py-3 font-light"
                        >
                          Qty
                        </th>
                        <th
                          align="right"
                          scope="col"
                          className="px-3 py-3 font-light"
                        >
                          Rate
                        </th>
                        <th
                          align="right"
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
                      {purchaseOrder?.items?.map(
                        (row: IPurchaseOrderItem, index: number) => {
                          const total =
                            parseFloat(row?.rate) * parseFloat(row?.quantity);
                          const discountAmount = row?.discount
                            ? (total * parseFloat(row?.discount)) / 100
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
                                <div className="text-slate-500">{`${row?.code} | ${row?.name}`}</div>
                              </td>
                              <td className="px-3 py-4 min-w-[8rem]">
                                <div className="text-slate-500">
                                  {row?.remark}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {row?.quantity}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {row?.rate}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {row?.discount}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className=" text-slate-500">
                                  {formatMoney(String(subTotal))}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  <div className="border-t grid grid-cols-2 items-start gap-5 p-6">
                    <Textarea
                      disabled
                      rows={5}
                      placeholder="Remark"
                      value={purchaseOrder?.remark}
                    />
                    <div className="border rounded-md text-sm">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b">
                            <td className="px-6 py-3 font-light">Subtotal</td>
                            <td align="right" className="px-6 py-3 font-light">
                              {formatMoney(String(purchaseOrder?.subTotal))}
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-6 py-3 font-light">Discount</td>
                            <td align="right" className="px-6 py-3 font-light">
                              {formatMoney(
                                String(
                                  parseFloat(
                                    purchaseOrder
                                      ? purchaseOrder?.subTotal
                                      : "0"
                                  ) -
                                    parseFloat(
                                      purchaseOrder ? purchaseOrder?.total : "0"
                                    )
                                )
                              )}
                            </td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="px-6 py-3">Total</td>
                            <td align="right" className="px-6 py-3">
                              {formatMoney(String(purchaseOrder?.total))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
