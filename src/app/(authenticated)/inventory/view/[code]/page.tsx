import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import ProductUpdate from "@/components/Inventory/ProductUpdate";
import ProductView from "@/components/Inventory/ProductView";

type Props = {
  params: {
    code: string;
  };
};

export const metadata: Metadata = {
  title: "Item View",
};

export default function page({ params }: Props) {
  const { code } = params;
  const breadcrubmbs = [
    {
      title: "Inventory Management",
      href: "/inventory",
    },
    {
      title: `View ${code}`,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <ProductView code={code} />
    </div>
  );
}
