"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import SupplierForm from "./SupplierForm";
import { ISupplier } from "@/typings/supplier";
import { findSupplierByCodeApi } from "@/api/suppliers";

type Props = {
  code: string;
};

export default function SupplerUpdate({ code }: Props) {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState<ISupplier | null>(null);

  useEffect(() => {
    async function fetchCustomer() {
      setLoading(true);
      const { data } = await findSupplierByCodeApi({ code: code });
      setSupplier(data?.data);
      setLoading(false);
    }
    fetchCustomer();
  }, []);

  return (
    <>
      {loading ? (
        <Card className="w-full flex justify-center items-center h-[40rem] bg-white">
          <LoadingSpinner />{" "}
        </Card>
      ) : (
        <SupplierForm supplier={supplier} />
      )}
    </>
  );
}
