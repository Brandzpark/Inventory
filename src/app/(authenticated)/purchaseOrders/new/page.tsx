import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderForm from "@/components/PurchaseOrders/PurchaseOrderForm";

const breadcrubmbs = [
    {
        title: "Purchase Orders",
        href: "/purchaseOrders",
    },
    {
        title: "Create",
        href: "",
    },
];

export const metadata: Metadata = {
    title: "Purchase Order Create",
};

type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
            <PurchaseOrderForm />
        </div>
    )
}