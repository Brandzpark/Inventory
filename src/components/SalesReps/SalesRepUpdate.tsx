"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import SalesRepForm from "./SalesRepForm";
import { findSalesRepBycodeApi } from "@/api/salesReps";
import { ISalesRep } from "@/typings/salesReps";
import { ICustomer } from "@/typings/customer";
import { getAllCustomersApi, getAllCustomersNoPaginateApi } from "@/api/customer";

type Props = {
  code: string;
};

export default function SalesRepUpdate({ code }: Props) {
  const [loading, setLoading] = useState(false);
  const [salesRep, setSalesRep] = useState<ISalesRep | null>(null);
  const [customers, setCustomers] = useState<ICustomer[] | []>([]);

  useEffect(() => {
    async function fetchCustomer() {
      setLoading(true);
      const { data } = await findSalesRepBycodeApi({ code: code });
      const customerReponse = await getAllCustomersNoPaginateApi({});
      setSalesRep(data?.data);
      setCustomers(customerReponse?.data?.data)
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
        <SalesRepForm salesRep={salesRep} customers={customers} />
      )}
    </>
  );
}
