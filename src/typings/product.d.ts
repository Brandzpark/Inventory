import { IPaginated } from "./typings";

export type IProductHistory = {
  even: string;
  type: string;
  quantity: string;
  user: any;
  stockAdjustment: string;
  timestamps: string;
};

type IProductWarehouse = {
  warehouse: string;
  quantity: string;
};

export type IProduct = {
  _id: string;
  code: string;
  name: string;
  department: string;
  category: string;
  isActive: string;
  remark: string;
  price: string;
  cost: string;
  discount: string;
  history: IProductHistory[];
  warehouseQuantity: IProductWarehouse[];
};

export type IProductPaginated = {
  docs: IProduct[] | [];
} & IPaginated;

export type IProductCategory = {
  _id: string;
  name: string;
  label: string;
};

export type IProductDepartment = {
  _id: string;
  name: string;
  label: string;
};

export type IStockAdjustment = {
  _id: string;
  date: string;
  type: string;
  reason: string;
  description: string;
  items: any[];
};
