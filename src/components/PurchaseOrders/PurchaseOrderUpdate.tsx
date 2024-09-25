"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import PurchaseOrderForm from "./PurchaseOrderForm";
import { IPurchaseOrder } from "@/typings/purchaseOrder";
import { findByCodePurchaseOrderApi } from "@/api/purchaseOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

type Props = {
  code: string;
};

export default function PurchaseOrderUpdate({ code }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchaseOrder, setPurchaseOrder] = useState<IPurchaseOrder | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await findByCodePurchaseOrderApi({
          code: code,
          type: "update",
        });
        setPurchaseOrder(data?.data);
        setLoading(false);
      } catch (error) {
        if (isAxiosError(error)) {
          router.push("/purchaseOrders");
          toast.error(error.response?.data?.errors, { id: "PO404" });
        }
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
        <PurchaseOrderForm purchaseOrder={purchaseOrder} />
      )}
    </>
  );
}
