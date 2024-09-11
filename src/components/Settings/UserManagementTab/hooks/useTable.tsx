import { useContext, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../typings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MainContext } from "@/lib/MainContext";

export function useTable() {
  const [selectedData, setSelectedData] = useState<IUser | null>(null);
  const [createModel, setCreateModel] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<IUser | null>(
    null
  );

  const { userData } = useContext(MainContext);
  const columns: ColumnDef<IUser>[] | [] = [
    {
      accessorFn: (row) => row?.firstName + " " + row?.lastName,
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      header: "Role",
      cell: ({ row }) => {
        const data = row.original;
        return <Badge>{data.role}</Badge>;
      },
    },

    {
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Badge variant={data.isActive ? "active" : "deactivated"}>
            {data.isActive ? "Active" : "Deactivated"}
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
                    setSelectedData(data);
                    setCreateModel(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                {userData?._id != data._id && (
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedDeleteItem(data);
                    }}
                    className="focus-visible:text-destructive text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return {
    columns,
    setCreateModel,
    createModel,
    selectedData,
    setSelectedData,
    selectedDeleteItem,
    setSelectedDeleteItem,
  };
}
