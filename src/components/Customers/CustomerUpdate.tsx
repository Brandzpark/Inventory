"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import CustomerForm from "@/components/Customers/CustomerForm";
import { ICustomer } from "@/typings/customer";
import { findCustomerBycodeApi } from "@/api/customer";

type Props = {
  customercode: string;
};

export default function CustomerUpdate({ customercode }: Props) {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    async function fetchCustomer() {
      setLoading(true);
      const { data } = await findCustomerBycodeApi({ code: customercode });
      setCustomer(data?.data);
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
        <CustomerForm customer={customer} />
      )}
    </>
  );
}
