import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import SalesRepsTable from "@/components/SalesReps/SalesRepsTable";

const breadcrubmbs = [
  {
    title: "Sales Reps",
    href: "/",
  },
];

type Props = {};

export const metadata: Metadata = {
  title: "Sales Reps",
};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <div className="flex justify-between items-center pb-3">
        <SearchInput />
        <Link href={"/salesReps/new"}>
          <Button>Add Sales Rep</Button>
        </Link>
      </div>
      <SalesRepsTable />
    </div>
  );
}
