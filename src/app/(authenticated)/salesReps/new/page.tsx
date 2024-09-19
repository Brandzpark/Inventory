import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import SupplierForm from "@/components/Suppliers/SupplierForm";
import SalesRepForm from "@/components/SalesReps/SalesRepForm";

const breadcrubmbs = [
  {
    title: "Sales Rep",
    href: "/salesReps",
  },
  {
    title: "Create",
    href: "",
  },
];

export const metadata: Metadata = {
  title: "Sales Rep Create",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <SalesRepForm />
    </div>
  );
}
