import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import InventoryTable from "@/components/Inventory/InventoryTable";


const breadcrubmbs = [
  {
    title: "Inventory Management",
    href: "/",
  },
];

type Props = {};

export const metadata: Metadata = {
  title: "Inventory Management",
};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <div className="flex justify-between items-center pb-3">
        <SearchInput />
        <div className="flex justify-end gap-5 items-center" >
          <Link href={"/inventory/new"}>
            <Button>Add New Item</Button>
          </Link>
          <Link href={"/inventory/stockAdjustment"}>
            <Button variant={"outline"} >Stock Adjustment</Button>
          </Link>
        </div>
      </div>
      <InventoryTable />
    </div>
  );
}
