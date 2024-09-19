import * as Yup from "yup";

export const createSchema = Yup.object({
  code: Yup.string().required(),
  name: Yup.string().required(),
  category: Yup.string().required(),
  department: Yup.string().required(),
  remark: Yup.string().nullable().optional(),
  price: Yup.string().required(),
  isActive: Yup.boolean().required(),
  cost: Yup.string().required(),
  discount: Yup.string().nullable().optional(),
  warehouseQuantity: Yup.array()
    .of(
      Yup.object({
        warehouse: Yup.string().default("Default"),
        quantity: Yup.string().required(),
      })
    )
    .defined()
    .required()
    .min(1),
});
