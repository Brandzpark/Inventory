"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IProduct } from "@/typings/product";
import { findProductBycodeApi } from "@/api/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMoney } from "@/lib/helpers";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useViewTable } from "./hooks/useViewTable";
import DataTable from "../DataTable/DataTable";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  code: string;
};

export default function ProductView({ code }: Props) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const { columns } = useViewTable();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await findProductBycodeApi({ code: code });
      setProduct(data?.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[10rem]">
          <LoadingSpinner />{" "}
        </div>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <div>
              <Link href={`/inventory/${product?.code}`} >
                <Button>Edit</Button>
              </Link>
            </div>
          </div>
          <TabsContent value="overview">
            <div className="grid grid-cols-3 gap-5 mt-8">
              <Card className="p-3 shadow-none border-2 rounded-md">
                <div>Total Stock</div>
                <div className="font-semibold mt-1">
                  {product?.warehouseQuantity?.reduce((acc, curr) => {
                    return acc + parseFloat(curr?.quantity);
                  }, 0)}
                </div>
              </Card>
              <Card className="p-3 shadow-none border-2 rounded-md">
                <div>Selling Price</div>
                <div className="font-semibold mt-1">
                  {formatMoney(product?.price)}
                </div>
              </Card>
              <Card className="p-3 shadow-none border-2 rounded-md">
                <div>Cost Price</div>
                <div className="font-semibold mt-1">
                  {formatMoney(product?.cost)}
                </div>
              </Card>
            </div>
            <Card className="mt-10 rounded-md">
              <CardHeader className="p-0 py-6 px-3">
                <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div>
                    <Label>Department</Label>
                    <Input
                      className="mt-2"
                      disabled
                      value={product?.department}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      className="mt-2"
                      disabled
                      value={product?.category}
                    />
                  </div>
                  <div>
                    <Label>Item Name</Label>
                    <Input className="mt-2" disabled value={product?.name} />
                  </div>
                  <div>
                    <Label>Item Code</Label>
                    <Input className="mt-2" disabled value={product?.code} />
                  </div>
                  <div>
                    <Label>Remark</Label>
                    <Input className="mt-2" disabled value={product?.remark} />
                  </div>
                  <div>
                    <Label>Discount</Label>
                    <Input
                      className="mt-2"
                      disabled
                      value={product?.discount}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card className="px-3 rounded-sm">
              <DataTable
                columns={columns}
                data={product?.history ?? []}
                loading={loading}
              />
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
