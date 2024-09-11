import * as Yup from "yup";

export const createRoleSchema = Yup.object({
  name: Yup.string().required("name is a required field"),
  permissions: Yup.array().of(Yup.string()).defined().required().min(1),
});