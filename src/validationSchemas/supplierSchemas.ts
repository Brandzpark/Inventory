import * as Yup from "yup";

export const createSchema = Yup.object({
  code: Yup.string().required(),
  salutation: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  nic: Yup.string().required(),
  mobileNumber: Yup.string().required(),
  address: Yup.string().required(),
  taxNo: Yup.string().required(),
});
