"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import DataTable from "../DataTable/DataTable";
import { useTable } from "./hooks/useTable";
import { IPaginated } from "@/typings/typings";
import { useSearchParams } from "next/navigation";
import ConfirmationModel from "@/components/ConfirmationModel";
import { getAllPOReceivesApi, getAllPOReturnsApi } from "@/api/purchaseOrder";
import { IPurchaseOrderReturn } from "@/typings/purchaseOrderReturn";
import { IPurchaseOrderReceived } from "@/typings/purchaseOrderReceived";
type Props = {}

export default function PurchaseOrderReceivesTable({ }: Props) {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || 1;
    const search = searchParams.get("search") || "";
    const [data, setData] = useState<IPurchaseOrderReceived[] | []>([]);
    const [pagination, setPagination] = useState<IPaginated | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    }, [page, search]);

    async function fetchData() {
        setLoading(true);
        const { data } = await getAllPOReceivesApi({ page, search });
        setData(data?.data?.docs);
        setPagination(data?.data);
        setLoading(false);
    }
    const { columns, showConfirmationModel, onDelete, onClose } = useTable({ fetchData });
    return (
        <Card className="px-3 rounded-sm">
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                paginationData={pagination}
            />
            <ConfirmationModel
                message="Are you sure you want to delete this record? this actions is cannot be restored"
                show={showConfirmationModel}
                onConfirmClick={onDelete}
                onCancelClick={onClose}
            />
        </Card>
    )
}