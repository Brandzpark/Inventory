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
import { IPurchaseOrder } from "@/typings/purchaseOrder";
import { format } from "date-fns";
import { deletePurchaseOrderApi } from "@/api/purchaseOrder";
import Link from "next/link";

export function useTable({ fetchData }: { fetchData: () => void }) {
  const router = useRouter();
  const [selectedDeleteItem, setSelectedDeleteItem] =
    useState<IPurchaseOrder | null>(null);

  async function onDelete() {
    const { data } = await deletePurchaseOrderApi({ _id: selectedDeleteItem?._id });
    toast.success("Purchase Order Deleted Successfully");
    setSelectedDeleteItem(null);
    fetchData();
  }

  function onClose() {
    setSelectedDeleteItem(null);
  }

  const columns: ColumnDef<IPurchaseOrder>[] | [] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorFn: (data) => format(data?.orderDate, "Y-MM-dd"),
      header: "Date",
    },
    {
      accessorKey: "supplier.code",
      header: "Supplier",
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link className="text-blue-500" target="_blank" href={`/suppliers?search=${data?.supplier?.code}`} >{data?.supplier?.name}</Link>
        )
      }
    },
    {
      accessorKey: "total",
      header: "Amount",
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
                    router.push(`/purchaseOrders/view/${data?.code}`);
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/purchaseOrders/${data?.code}`);
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
