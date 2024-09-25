"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import { findByCodePOReturnApi } from "@/api/purchaseOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PurchaseOrderReturnsForm from "./PurchaseOrderReturnsForm";
import { IPurchaseOrderReturn } from "@/typings/purchaseOrderReturn";

type Props = {
  code: string;
};

export default function PurchaseOrderReturnsUpdate({ code }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchaseOrderReturn, setPurchaseOrderReturn] =
    useState<IPurchaseOrderReturn | null>(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await findByCodePOReturnApi({ code: code });
        setPurchaseOrderReturn(data?.data);
        setLoading(false);
      } catch (error) {
        router.push("/purchaseOrderReturns");
        toast.error("Purchase Order Return Not Found", { id: "PORETURN404" });
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
        <PurchaseOrderReturnsForm purchaseOrderReturn={purchaseOrderReturn} />
      )}
    </>
  );
}
