import React from "react";
import Header from "@/components/Header/Header";
import CustomerForm from "@/components/Customers/CustomerForm";
import { Metadata } from "next";

const breadcrubmbs = [
  {
    title: "Customers",
    href: "/customers",
  },
  {
    title: "Create",
    href: "",
  },
];

export const metadata: Metadata = {
  title: "Customer Create",
};

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <CustomerForm />
    </div>
  );
}
