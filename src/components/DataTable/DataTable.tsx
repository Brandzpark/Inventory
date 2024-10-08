import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  // getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableProps } from "@/typings/data-table";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import DataTablePagination from "./DataTablePagination";
import { IPaginated } from "@/typings/typings";

type Props<TData, TValue> = DataTableProps<TData, TValue> & {
  loading?: boolean;
  paginationData?: IPaginated | null;
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  paginationData,
}: Props<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <>
      {" "}
      <Table className="mb-5" >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {loading ? <LoadingSpinner /> : "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {paginationData && paginationData?.totalPages > 1 && (
        <DataTablePagination paginationData={paginationData} />
      )}
    </>
  );
}
