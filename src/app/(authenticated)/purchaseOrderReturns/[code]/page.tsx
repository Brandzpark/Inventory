import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderReturnsUpdate from "@/components/PurchaseOrderReturns/PurchaseOrderReturnsUpdate";

type Props = {
  params: {
    code: string;
  };
};

export const metadata: Metadata = {
  title: "Stock Return Update",
};

export default function page({ params }: Props) {
  const { code } = params;
  const breadcrubmbs = [
    {
      title: "Stock Returns",
      href: "/purchaseOrderReturns",
    },
    {
      title: code,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <PurchaseOrderReturnsUpdate code={code} />
    </div>
  );
}
