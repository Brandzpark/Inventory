import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ICustomer } from "@/typings/customer";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { deleteCustomerApi } from "@/api/customer";
import { toast } from "sonner";

export function useTable({ fetchData }: { fetchData: () => void }) {
  const router = useRouter();
  const [selectedDeleteItem, setSelectedDeleteItem] =
    useState<ICustomer | null>(null);

  async function onDelete() {
    const { data } = await deleteCustomerApi({ _id: selectedDeleteItem?._id });
    toast.success("Customer Deleted Successfully");
    setSelectedDeleteItem(null);
    fetchData();
  }

  function onClose() {
    setSelectedDeleteItem(null);
  }

  const columns: ColumnDef<ICustomer>[] | [] = [
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const data = row?.original;
        let variant: any = "warning";
        if (data?.status == "active") {
          variant = "active";
        }
        if (data?.status == "blocked") {
          variant = "deactivated";
        }
        return (
          <Badge variant={variant} className="capitalize">
            {data?.status}
          </Badge>
        );
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
                    router.push(`/customers/${data?.code}`);
                    // setSelectedData(data);
                    // setCreateModel(true);
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
