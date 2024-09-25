import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IRole } from "@/typings/role";

export function useTable() {
  const [selectedData, setSelectedData] = useState<IRole | null>(null);
  const [createModel, setCreateModel] = useState(false);

  const columns: ColumnDef<IRole>[] | [] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      header: "Permissions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-wrap gap-2">
            {data.permissions?.map((permission: string, index: number) => {
              return <Badge key={permission}>{permission}</Badge>;
            })}
          </div>
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
                {/* <DropdownMenuItem className="focus-visible:text-destructive text-destructive">
                  Delete
                </DropdownMenuItem> */}
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
  };
}
