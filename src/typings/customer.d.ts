import { IPaginated } from "./typings";

export type ICustomer = {
  _id: string;
  code: string;
  status: string;
  salutation: string;
  name: string;
  email: string;
  nic: string;
  mobileNumber: string;
  address: string;
  taxNo: string;
  openingBalance: string;
  creditLimit: string;
  creditPeriod: string;
};

export type ICustomerPaginated = {
  docs: ICustomer[] | [];
} & IPaginated;
