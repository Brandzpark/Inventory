import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import SupplierForm from "@/components/Suppliers/SupplierForm";

const breadcrubmbs = [
  {
    title: "Suppliers",
    href: "/suppliers",
  },
  {
    title: "Create",
    href: "",
  },
];

export const metadata: Metadata = {
  title: "Suppliers Create",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <SupplierForm />
    </div>
  );
}
