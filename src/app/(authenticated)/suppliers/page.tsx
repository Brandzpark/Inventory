import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import SuppliersTable from "@/components/Suppliers/SuppliersTable";

const breadcrubmbs = [
  {
    title: "Suppliers",
    href: "/",
  },
];

type Props = {};

export const metadata: Metadata = {
  title: "Suppliers",
};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <div className="flex justify-between items-center pb-3">
        <SearchInput />
        <Link href={"/suppliers/new"}>
          <Button>Add Supplier</Button>
        </Link>
      </div>
      <SuppliersTable />
    </div>
  );
}
