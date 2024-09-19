"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CreatableSelect from "react-select/creatable";

import { createSchema } from "@/validationSchemas/productSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  IProduct,
  IProductCategory,
  IProductDepartment,
} from "@/typings/product";
import {
  createProductApi,
  updateProductApi,
  getProductCategoriesApi,
  getProductDepartmentsApi,
  createProductCategoryApi,
  createProductDepartmentApi,
} from "@/api/product";
import { Switch } from "../ui/switch";

type Props = {
  product?: IProduct | null;
};

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<IProductCategory[] | []>([]);
  const [departments, setDepartments] = useState<IProductDepartment[] | []>([]);

  useEffect(() => {
    fetchDepartmentData();
    fetchCategoryData();
  }, []);

  async function fetchDepartmentData() {
    setLoading(true);
    const departmentReponse = await getProductDepartmentsApi();
    setDepartments(departmentReponse?.data?.data);
    setLoading(false);
  }

  async function fetchCategoryData() {
    setLoading(true);
    const categoryReponse = await getProductCategoriesApi();
    setCategories(categoryReponse?.data?.data);
    setLoading(false);
  }

  const productForm = useForm<any>({
    resolver: yupResolver(createSchema),
    values: product
      ? {
          ...product,
        }
      : {
          isActive: true,
          discount: 0,
          warehouseQuantity: [
            {
              warehouse: "Default",
              quantity: 0,
            },
          ],
        },
  });

  console.log(productForm.getValues());

  async function onSubmit(values: Yup.InferType<typeof createSchema>) {
    if (product) {
      const { data } = await updateProductApi({
        ...values,
        _id: product?._id,
      });
      toast.success("Item Updated");
      router.push(`/inventory/view/${values?.code}`);
      return;
    }
    const { data } = await createProductApi({
      ...values,
    });
    toast.success("Item Created");
    router.push(`/inventory/view/${values?.code}`);
    return;
  }

  return (
    <Card className="py-1 rounded-sm">
      <CardHeader className="p-0 py-6 px-3">
        <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md">
          Item Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...productForm}>
          <form onSubmit={productForm.handleSubmit(onSubmit)}>
            <FormField
              disabled={loading}
              control={productForm.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-5">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Active</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                disabled={loading}
                control={productForm.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <FormControl>
                      <CreatableSelect
                        isLoading={loading}
                        value={departments?.find(
                          (row) => row?.name == field.value
                        )}
                        onChange={async (value, actionMeta) => {
                          if (actionMeta?.action == "create-option") {
                            setLoading(true);
                            const response = await createProductDepartmentApi({
                              name: value?.label,
                            });
                            await fetchDepartmentData();
                            toast.success("Department Created");
                          }
                          field.onChange(value?.name);
                        }}
                        placeholder="Department"
                        getOptionLabel={(row) =>
                          row?.name ? row?.name : row?.label
                        }
                        getOptionValue={(row) => row?.name}
                        isClearable
                        options={departments}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={productForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <CreatableSelect
                        isLoading={loading}
                        value={categories?.find(
                          (row) => row?.name == field.value
                        )}
                        onChange={async (value, actionMeta) => {
                          if (actionMeta?.action == "create-option") {
                            setLoading(true);
                            const response = await createProductCategoryApi({
                              name: value?.label,
                            });
                            await fetchCategoryData();
                            toast.success("Category Created");
                          }
                          field.onChange(value?.name);
                        }}
                        placeholder="Category"
                        getOptionLabel={(row) =>
                          row?.name ? row?.name : row?.label
                        }
                        getOptionValue={(row) => row?.name}
                        isClearable
                        options={categories}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={productForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Item Name " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={productForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="Item Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={productForm.control}
                name="remark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
                    <FormControl>
                      <Input placeholder="Remark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!product && (
              <>
                <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
                  Current Stock Details
                </CardTitle>
                <div className="mt-7">
                  <FormField
                    disabled={loading}
                    control={productForm.control}
                    name="warehouseQuantity[0].quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Current Stock"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <CardTitle className="bg-[#FAFAFA] py-2 px-3 rounded-md mt-10">
              Sales and Costs Information
            </CardTitle>
            <div className="grid lg:grid-cols-2 gap-5 mt-7">
              <FormField
                disabled={loading}
                control={productForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Selling Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={productForm.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={productForm.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Discount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end items-center mt-5">
              <Button size={"lg"} className="w-[10rem]">
                {product ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
