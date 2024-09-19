import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import SupplerUpdate from "@/components/Suppliers/SupplerUpdate";
import SalesRepUpdate from "@/components/SalesReps/SalesRepUpdate";

type Props = {
  params: {
    code: string;
  };
};

export const metadata: Metadata = {
  title: "Suppler Update",
};

export default function page({ params }: Props) {
  const { code } = params;
  const breadcrubmbs = [
    {
      title: "Sales Rep",
      href: "/salesReps",
    },
    {
      title: code,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <SalesRepUpdate code={code} />
    </div>
  );
}
