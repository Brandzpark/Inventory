import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IProductHistory } from "@/typings/product";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
export function useViewTable() {
  const columns: ColumnDef<IProductHistory>[] | [] = [
    {
      accessorFn: (data) =>
        moment(data?.timestamps)?.format("YYYY-MM-DD HH:mm:ss A"),
      header: "Date",
    },
    {
      accessorKey: "event",
      header: "Event",
    },
    {
      header: "Quantity Action",
      cell: ({ row }) => {
        const data = row?.original;
        if (!data?.type) {
          return "-";
        }
        return (
          <Badge
            variant={data?.type == "add" ? "active" : "deactivated"}
            className="capitalize"
          >
            {data?.type}
          </Badge>
        );
      },
    },
    {
      header: "Quantity",
      cell: ({ row }) => {
        const data = row?.original;
        if (!data?.quantity) {
          return "-";
        }
        return (
          <div
            className={cn(
              "",
              data?.type == "add" && "text-green-500",
              data?.type == "remove" && "text-red-500"
            )}
          >
            {data?.quantity}
          </div>
        );
      },
    },
    {
      accessorFn: (data) => data?.user?.firstName + " " + data?.user?.lastName,
      header: "User",
    },
  ];

  return {
    columns,
  };
}
