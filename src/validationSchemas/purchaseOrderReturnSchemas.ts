import * as Yup from "yup";

export const createSchema = Yup.object({
  code: Yup.string().required(),
  purchaseOrderCode: Yup.string().required(
    "purchase order code is a required field"
  ),
  receivedDate: Yup.string().required("received date is a required field"),
  remark: Yup.string()?.nullable().optional(),
  items: Yup.array()
    .of(
      Yup.object({
        code: Yup.string().required("required field"),
        receivedQuantity: Yup.string()
          .required("required field")
          .test(
            "is-less-than-or-equal",
            "received quantity must not exceed receivable quantity",
            function (value) {
              const { returnableQuantity } = this.parent;
              return Number(value) <= Number(returnableQuantity);
            }
          ),
        returnableQuantity: Yup.string().required(),
      })
    )
    .defined()
    .required()
    .min(1, "Select Purchase Order"),
});
