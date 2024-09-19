import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import ProductForm from "@/components/Inventory/ProductForm";

const breadcrubmbs = [
  {
    title: "Inventory Management",
    href: "/inventory",
  },
  {
    title: "Create",
    href: "",
  },
];

export const metadata: Metadata = {
  title: "Item Create",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <ProductForm />
    </div>
  );
}
