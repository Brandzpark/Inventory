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
import { deleteSalesRepApi } from "@/api/salesReps";
import { Badge } from "@/components/ui/badge";
import { ISalesRep } from "@/typings/salesReps";

export function useTable({ fetchData }: { fetchData: () => void }) {
  const router = useRouter();
  const [selectedDeleteItem, setSelectedDeleteItem] =
    useState<ISalesRep | null>(null);

  async function onDelete() {
    const { data } = await deleteSalesRepApi({ _id: selectedDeleteItem?._id });
    toast.success("Sales Rep Deleted Successfully");
    setSelectedDeleteItem(null);
    fetchData();
  }

  function onClose() {
    setSelectedDeleteItem(null);
  }

  const columns: ColumnDef<ISalesRep>[] | [] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "mobileNumber",
      header: "Phone Number",
    },

    {
      header: "Customers",
      cell: ({ row }) => {
        const data = row?.original;
        return <Badge>{data?.customers?.length} assigened</Badge>;
      },
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
                    router.push(`/salesReps/${data?.code}`);
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
