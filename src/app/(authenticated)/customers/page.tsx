import React from "react";
import Header from "@/components/Header/Header";
import CustomersTable from "@/components/Customers/CustomersTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";

const breadcrubmbs = [
  {
    title: "Customers",
    href: "/",
  },
];

type Props = {};

export const metadata: Metadata = {
  title: "Customers",
};

export default function Customers({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <div className="flex justify-between items-center pb-3">
        <SearchInput />
        <Link href={"/customers/new"}>
          <Button>Add Customer</Button>
        </Link>
      </div>
      <CustomersTable />
    </div>
  );
}
