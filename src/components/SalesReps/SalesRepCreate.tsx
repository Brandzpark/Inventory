"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import { getAllCustomersNoPaginateApi } from "@/api/customer";
import { ICustomer } from "@/typings/customer";
import React, { useState, useEffect } from "react";
import SalesRepForm from "./SalesRepForm";

type Props = {};

export default function SalesRepCreate({}: Props) {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[] | []>([]);

  useEffect(() => {
    async function fetchCustomer() {
      setLoading(true);
      const { data } = await getAllCustomersNoPaginateApi({});
      setCustomers(data?.data);
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
        <SalesRepForm customers={customers} />
      )}
    </>
  );
}
