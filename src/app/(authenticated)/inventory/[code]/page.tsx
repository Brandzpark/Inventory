import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import ProductUpdate from "@/components/Inventory/ProductUpdate";

type Props = {
  params: {
    code: string;
  };
};

export const metadata: Metadata = {
  title: "Item Update",
};

export default function page({ params }: Props) {
  const { code } = params;
  const breadcrubmbs = [
    {
      title: "Inventory Management",
      href: "/inventory",
    },
    {
      title: code,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <ProductUpdate code={code} />
    </div>
  );
}
