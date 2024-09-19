import React from "react";
import Header from "@/components/Header/Header";
import CustomerUpdate from "@/components/Customers/CustomerUpdate";
import { Metadata } from "next";

type Props = {
  params: {
    customercode: string;
  };
};

export const metadata: Metadata = {
  title: "Customer Update",
};

export default function page({ params }: Props) {
  const { customercode } = params;
  const breadcrubmbs = [
    {
      title: "Customers",
      href: "/customers",
    },
    {
      title: customercode,
      href: "",
    },
  ];

  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <CustomerUpdate customercode={customercode} />
    </div>
  );
}
