import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deletePOReceiveApi } from "@/api/purchaseOrder";
import { format } from "date-fns";
import Link from "next/link";
import { IPurchaseOrderReceived } from "@/typings/purchaseOrderReceived";

export function useTable({ fetchData }: { fetchData: () => void }) {
  const router = useRouter();
  const [selectedDeleteItem, setSelectedDeleteItem] =
    useState<IPurchaseOrderReceived | null>(null);

  async function onDelete() {
    const { data } = await deletePOReceiveApi({ _id: selectedDeleteItem?._id });
    toast.success("Customer Deleted Successfully");
    setSelectedDeleteItem(null);
    fetchData();
  }

  function onClose() {
    setSelectedDeleteItem(null);
  }

  const columns: ColumnDef<IPurchaseOrderReceived>[] | [] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorFn: (data) => format(data?.receivedDate, "Y-MM-dd"),
      header: "Date",
    },
    {
      accessorKey: "purchaseOrderCode",
      header: "PO Code",
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link className="text-blue-500" target="_blank" href={`/purchaseOrders?search=${data?.purchaseOrderCode}`} >{data?.purchaseOrderCode}</Link>
        )
      }
    },
    {
      header: "Supplier",
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link className="text-blue-500" target="_blank" href={`/suppliers?search=${data?.supplier?.code}`} >{data?.supplier?.name}</Link>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/purchaseOrderReceives/${data?.code}`);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedDeleteItem(data);
                  }}
                  className="focus-visible:text-destructive text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return {
    columns,
    showConfirmationModel: selectedDeleteItem ? true : false,
    onDelete,
    onClose,
  };
}
