import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import SupplerUpdate from "@/components/Suppliers/SupplerUpdate";

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
      title: "Suppliers",
      href: "/suppliers",
    },
    {
      title: code,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <SupplerUpdate code={code} />
    </div>
  );
}
