"use client";
import { findProductBycodeApi } from "@/api/product";
import { IProduct } from "@/typings/product";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductForm from "./ProductForm";

type Props = {
  code: string;
};

export default function ProductUpdate({ code }: Props) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
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
        <Card className="w-full flex justify-center items-center h-[40rem] bg-white">
          <LoadingSpinner />{" "}
        </Card>
      ) : (
        <ProductForm product={product} />
      )}
    </>
  );
}
