import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderReceivesUpdate from "@/components/PurchaseOrderReceives/PurchaseOrderReceivesUpdate";

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
            title: "Purchase Orders Receives",
            href: "/purchaseOrderReceives",
        },
        {
            title: code,
            href: "",
        },
    ];
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
            <PurchaseOrderReceivesUpdate code={code} />
        </div>
    )
}