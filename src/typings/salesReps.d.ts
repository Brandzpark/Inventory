import { ICustomer } from "./customer";
import { IPaginated } from "./typings";

export type ISalesRep = {
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
  customers: ICustomer[] | [];
};

export type ISalesRepPaginated = {
  docs: ISalesRep[] | [];
} & IPaginated;
