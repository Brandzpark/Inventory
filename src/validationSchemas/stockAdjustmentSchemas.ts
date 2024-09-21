import * as Yup from "yup";

export const createSchema = Yup.object({
  date: Yup.string().required(),
  type: Yup.string().required(),
  reason: Yup.string().required(),
  description: Yup.string().optional(),
  items: Yup.array()
    .of(
      Yup.object({
        code: Yup.string().required("required field"),
        quantity: Yup.string().required("required field"),
      })
    )
    .defined()
    .required()
    .min(1),
});
