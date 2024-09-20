import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import StockAdjustmentForm from "@/components/StockAdjustment/StockAdjustmentForm";

const breadcrubmbs = [
  {
    title: "Inventory Management",
    href: "/inventory",
  },
  {
    title: "Stock Adjustment",
    href: "/inventory/stockAdjustments",
  },
  {
    title: "Create",
    href: "",
  },
];

export const metadata: Metadata = {
  title: "Stock Adjustment Create",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <StockAdjustmentForm />
    </div>
  );
}
