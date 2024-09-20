import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import InventoryTable from "@/components/Inventory/InventoryTable";
import StockAdjustmentTable from "@/components/StockAdjustment/StockAdjustmentTable";

const breadcrubmbs = [
  {
    title: "Inventory Management",
    href: "/inventory",
  },
  {
    title: "Stock Adjustments",
    href: "/",
  },
];

export const metadata: Metadata = {
  title: "Stock Adjustments",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <div className="flex justify-between items-center pb-3">
        <SearchInput />
        <div className="flex justify-end gap-5 items-center">
          <Link href={"/inventory/stockAdjustments/new"}>
            <Button>Create Stock Adjustment</Button>
          </Link>
        </div>
      </div>
      <StockAdjustmentTable />
    </div>
  );
}
