"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import DataTable from "../DataTable/DataTable";
import { useTable } from "./hooks/useTable";
import { IPaginated } from "@/typings/typings";
import { useSearchParams } from "next/navigation";
import { getAllStockAdjustmentApi } from "@/api/product";
import { IStockAdjustment } from "@/typings/product";

type Props = {};

export default function StockAdjustmentTable({}: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const [data, setdata] = useState<IStockAdjustment[] | []>([]);
  const [pagination, setPagination] = useState<IPaginated | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page, search]);

  async function fetchData() {
    setLoading(true);
    const { data } = await getAllStockAdjustmentApi({ page, search });
    setdata(data?.data?.docs);
    setPagination(data?.data);
    setLoading(false);
  }
  const { columns } = useTable({
    fetchData,
  });
  return (
    <Card className="px-3 rounded-sm">
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        paginationData={pagination}
      />
    </Card>
  );
}
