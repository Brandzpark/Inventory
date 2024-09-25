import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderView from "@/components/PurchaseOrders/PurchaseOrderView";
import puppeteer from "puppeteer";
import { printPurchaseOrderApi } from "@/api/purchaseOrder";

type Props = {
  params: {
    code: string;
  };
};

export const metadata: Metadata = {
  title: "Purchase Order View",
};

export default async function page({ params }: Props) {
  const { code } = params;
  const breadcrubmbs = [
    {
      title: "Purchase Orders",
      href: "/purchaseOrders",
    },
    {
      title: `View - ${code}`,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <PurchaseOrderView code={code} />
    </div>
  );
}
