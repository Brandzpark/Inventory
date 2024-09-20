import { ColumnDef } from "@tanstack/react-table";
import { IStockAdjustment } from "@/typings/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function useTable({ fetchData }: { fetchData: () => void }) {
  const columns: ColumnDef<IStockAdjustment>[] | [] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Type",
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <Badge
            variant={data.type == "add" ? "active" : "deactivated"}
            className="capitalize"
          >
            {data.type}
          </Badge>
        );
      },
    },
    {
      header: "Items",
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <Dialog>
            <DialogTrigger className="text-blue-600">
              {data?.items?.length} Item(s)
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogHeader>Items</DialogHeader>
              </DialogHeader>
              <table className="w-full text-sm text-left text-gray-500 rounded-md overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Item Name
                    </th>
                    <th align="right" scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.map((row) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{row?.code}</td>
                        <td className="px-6 py-4">{row?.name}</td>
                        <td align="right" className="px-6 py-4">
                          {row?.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </DialogContent>
          </Dialog>
        );
      },
    },
    {
      accessorFn: (data) => format(data?.date, "Y-MM-dd"),
      header: "Created Date",
    },
  ];

  return {
    columns,
  };
}
