import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import PurchaseOrderReceivesTable from "@/components/PurchaseOrderReceives/PurchaseOrderReceivesTable";

const breadcrubmbs = [
    {
        title: "Purchase Orders",
        href: "/purchaseOrders",
    },
    {
        title: "Purchase Received",
        href: "/",
    },
];

type Props = {}

export const metadata: Metadata = {
    title: "Purchase Received",
};

export default function page({ }: Props) {
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
            <div className="flex justify-between items-center pb-3">
                <SearchInput />
                <Link href={"/purchaseOrders/new"}>
                    <Button>Add New Purchase Receive</Button>
                </Link>
            </div>
            <PurchaseOrderReceivesTable />
        </div>
    )
}