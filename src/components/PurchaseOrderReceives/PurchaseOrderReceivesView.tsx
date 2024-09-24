"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPurchaseOrder, IPurchaseOrderItem } from "@/typings/purchaseOrder";
import {
  findByCodePOReceiveApi,
  findByCodePurchaseOrderApi,
} from "@/api/purchaseOrder";
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
import {
  IPurchaseOrderReceived,
  IPurchaseOrderReceivedItem,
} from "@/typings/purchaseOrderReceived";

type Props = {
  code: string;
};

export default function PurchaseOrderReceivesView({ code }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchaseOrderReveived, setPurchaseOrderReveived] =
    useState<IPurchaseOrderReceived | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await findByCodePOReceiveApi({ code: code });
        setPurchaseOrderReveived(data?.data);
        setLoading(false);
      } catch (error) {
        router.push("/purchaseOrderReceives");
        toast.error("Purchase Order Recevied Not Found", { id: "POR404" });
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
            {/* <Link target="_blank" href={`/purchaseOrders/print/${code}`}>
              <Button
                variant={"outline"}
                className="flex justify-between gap-3"
              >
                <PrinterIcon className="w-5" />
                <div>Print</div>
              </Button>
            </Link> */}
            <Link href={`/purchaseOrderReceives/${code}`}>
              <Button>Edit</Button>
            </Link>
          </div>
          <Card className="py-1 rounded-sm">
            <CardHeader className="p-0 py-6 px-6">
              <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
                Purchases Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label>Purchases Received #</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrderReveived?.code}
                  />
                </div>
                <div>
                  <Label>Supplier Name</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={
                      purchaseOrderReveived?.purchaseOrder?.supplier?.code +
                      " | " +
                      purchaseOrderReveived?.purchaseOrder?.supplier?.name
                    }
                  />
                </div>
                <div>
                  <Label>Purchases Order #</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrderReveived?.purchaseOrder?.code}
                  />
                </div>
                <div>
                  <Label>Required Date</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrderReveived?.purchaseOrder?.requiredDate}
                  />
                </div>
                <div>
                  <Label>Received Date</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrderReveived?.purchaseOrder?.orderDate}
                  />
                </div>
                <div>
                  <Label>Purchases Order #</Label>
                  <Input
                    className="mt-2"
                    disabled
                    value={purchaseOrderReveived?.receivedDate}
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
                          Ordered
                        </th>
                        <th
                          align="right"
                          scope="col"
                          className="px-3 py-3 font-light"
                        >
                          Received
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
                          Discount
                        </th>
                        <th
                          align="right"
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
                    <tbody>
                      {purchaseOrderReveived?.items?.map(
                        (row: IPurchaseOrderReceivedItem, index: number) => {
                          const poItem =
                            purchaseOrderReveived?.purchaseOrder?.items?.find(
                              (poItem) => poItem?.code == row?.code
                            );
                          let reqTotal = 0;
                          let reqDiscountAmount = 0;
                          let reqSubTotal = 0;
                          let total = 0;
                          let discountAmount = 0;
                          let subTotal = 0;
                          if (poItem) {
                            reqTotal =
                              parseFloat(poItem?.rate) *
                              parseFloat(poItem?.quantity);
                            console.log(reqTotal);

                            reqDiscountAmount = poItem?.discount
                              ? (reqTotal * parseFloat(poItem?.discount)) / 100
                              : 0;
                            reqSubTotal = reqTotal - reqDiscountAmount || 0;

                            total =
                              parseFloat(poItem?.rate) *
                              parseFloat(row?.receivedQuantity);
                            discountAmount = poItem?.discount
                              ? (total * parseFloat(poItem?.discount)) / 100
                              : 0;
                            subTotal = total - discountAmount || 0;
                          }
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
                                  {poItem?.quantity}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {row?.receivedQuantity}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {formatMoney(poItem?.rate)}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {poItem?.discount}%
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
                                  {formatMoney(String(reqSubTotal))}
                                </div>
                              </td>
                              <td
                                align="right"
                                className="px-3 py-4 min-w-[8rem]"
                              >
                                <div className="text-slate-500">
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
                      value={purchaseOrderReveived?.remark}
                    />
                    <div className="border rounded-md text-sm">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b">
                            <td className="px-6 py-3 font-light">Subtotal</td>
                            <td align="right" className="px-6 py-3 font-light">
                              {formatMoney(
                                String(purchaseOrderReveived?.subTotal)
                              )}
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-6 py-3 font-light">Discount</td>
                            <td align="right" className="px-6 py-3 font-light">
                              {formatMoney(
                                String(
                                  parseFloat(
                                    purchaseOrderReveived
                                      ? purchaseOrderReveived?.subTotal
                                      : "0"
                                  ) -
                                    parseFloat(
                                      purchaseOrderReveived
                                        ? purchaseOrderReveived?.total
                                        : "0"
                                    )
                                )
                              )}
                            </td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="px-6 py-3">Total</td>
                            <td align="right" className="px-6 py-3">
                              {formatMoney(
                                String(purchaseOrderReveived?.total)
                              )}
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
