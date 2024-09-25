import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderReceivesForm from "@/components/PurchaseOrderReceives/PurchaseOrderReceivesForm";
import PurchaseOrderReturnsForm from "@/components/PurchaseOrderReturns/PurchaseOrderReturnsForm";

const breadcrubmbs = [
  {
    title: "Stock Returns",
    href: "/purchaseOrderReturns",
  },
  {
    title: "Create",
    href: "",
  },
];

export const metadata: Metadata = {
  title: "Stock Return Create",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <PurchaseOrderReturnsForm />
    </div>
  );
}
