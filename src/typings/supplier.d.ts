import { IPaginated } from "./typings";

export type ISupplier = {
  _id: string;
  code: string;
  salutation: string;
  name: string;
  email: string;
  nic: string;
  mobileNumber: string;
  address: string;
  taxNo: string;
};

export type ISupplierPaginated = {
  docs: ISupplier[] | [];
} & IPaginated;
supplier