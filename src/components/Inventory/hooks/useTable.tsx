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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { IProduct } from "@/typings/product";
import { deleteProductApi } from "@/api/product";

export function useTable({ fetchData }: { fetchData: () => void }) {
  const router = useRouter();
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<IProduct | null>(
    null
  );

  async function onDelete() {
    const { data } = await deleteProductApi({ _id: selectedDeleteItem?._id });
    toast.success("Product Deleted Successfully");
    setSelectedDeleteItem(null);
    fetchData();
  }

  function onClose() {
    setSelectedDeleteItem(null);
  }

  const columns: ColumnDef<IProduct>[] | [] = [
    {
      accessorKey: "code",
      header: "Item Code",
    },
    {
      accessorKey: "name",
      header: "Item Name",
    },

    {
      accessorKey: "category",
      header: "Category",
    },
    {
      header: "Stock Level",
      cell: ({ row }) => {
        const data = row?.original;

        const quantity =
          data?.warehouseQuantity?.find((row) => row?.warehouse === "Default")
            ?.quantity || "0";

        let variant: any = "active";

        if (parseFloat(quantity) < 20) {
          variant = "warning";
        }
        if (parseFloat(quantity) < 5) {
          variant = "deactivated";
        }
        return (
          <Badge
            className="text-black w-16 flex justify-end items-center"
            variant={variant}
          >
            {quantity}
          </Badge>
        );
      },
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const data = row?.original;

        return (
          <Badge
            variant={data?.isActive ? "active" : "deactivated"}
            className="capitalize"
          >
            {data?.isActive ? "Active" : "Deactivated"}
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
                    router.push(`/inventory/item/view/${data?.code}`);
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/inventory/item/${data?.code}`);
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
