import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import PurchaseOrdersTable from "@/components/PurchaseOrders/PurchaseOrdersTable";

const breadcrubmbs = [
    {
        title: "Purchase Orders",
        href: "/",
    },
];

type Props = {}

export const metadata: Metadata = {
    title: "Purchase Orders",
};

export default function page({ }: Props) {
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
            <div className="flex justify-between items-center pb-3">
                <SearchInput />
                <Link href={"/purchaseOrders/new"}>
                    <Button>Add New Purchase Order</Button>
                </Link>
            </div>
            <PurchaseOrdersTable />
        </div>
    )
}