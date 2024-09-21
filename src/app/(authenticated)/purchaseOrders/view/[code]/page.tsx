import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderView from "@/components/PurchaseOrders/PurchaseOrderView";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";

type Props = {
    params: {
        code: string;
    };
};

export const metadata: Metadata = {
    title: "Purchase Order View",
};

export default function page({ params }: Props) {
    const { code } = params;
    const breadcrubmbs = [
        {
            title: "Purchase Orders",
            href: "/purchaseOrders",
        },
    {
            title: `View - ${code}`,
            href: "",
        },
    ];
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
            <div className="flex justify-end items-center pb-3 gap-5">
                <Link href={`/purchaseOrders/print/${code}`}>
                    <Button variant={"outline"} className="flex justify-between gap-3" >
                        <PrinterIcon className="w-5" />
                        <div>Print</div>
                    </Button>
                </Link>
                <Link href={`/purchaseOrders/${code}`}>
                    <Button>Edit</Button>
                </Link>
            </div>
            <PurchaseOrderView code={code} />
        </div>
    )
}