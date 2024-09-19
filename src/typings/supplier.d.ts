import { IPaginated } from "./typings";

export type ISuppplier = {
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

export type ISuppplierPaginated = {
  docs: ISuppplier[] | [];
} & IPaginated;
