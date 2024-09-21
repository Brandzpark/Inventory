import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderUpdate from "@/components/PurchaseOrders/PurchaseOrderUpdate";

type Props = {
    params: {
        code: string;
    };
};

export const metadata: Metadata = {
    title: "Purchase Order Update",
};

export default function page({ params }: Props) {
    const { code } = params;
    const breadcrubmbs = [
        {
            title: "Purchase Orders",
            href: "/purchaseOrders",
        },
        {
            title: code,
            href: "",
        },
    ];
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
            <PurchaseOrderUpdate code={code} />
        </div>
    )
}