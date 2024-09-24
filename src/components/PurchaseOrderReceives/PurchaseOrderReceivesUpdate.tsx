"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import { findByCodePOReceiveApi } from "@/api/purchaseOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IPurchaseOrderReceived } from "@/typings/purchaseOrderReceived";
import PurchaseOrderReceivesForm from "./PurchaseOrderReceivesForm";

type Props = {
  code: string;
};

export default function PurchaseOrderReceivesUpdate({ code }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchaseOrderReceive, setPurchaseOrderReceive] =
    useState<IPurchaseOrderReceived | null>(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await findByCodePOReceiveApi({ code: code });
        setPurchaseOrderReceive(data?.data);
        setLoading(false);
      } catch (error) {
        router.push("/purchaseOrderReceives");
        toast.error("Purchase Order Receive Not Found", { id: "POR404" });
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
        <PurchaseOrderReceivesForm
          purchaseOrderReceive={purchaseOrderReceive}
        />
      )}
    </>
  );
}
