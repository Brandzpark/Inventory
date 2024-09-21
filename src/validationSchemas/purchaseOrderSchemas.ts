import * as Yup from "yup";

export const createSchema = Yup.object({
    code: Yup.string().required(),
    orderDate: Yup.string().required("order date is a required field"),
    requiredDate: Yup.string().required("required date is a required field"),
    remark: Yup.string().optional(),
    supplier: Yup
        .object({
            _id: Yup.string().required(),
            code: Yup.string().required(),
        })
        .required(),
    items: Yup
        .array()
        .of(
            Yup.object({
                code: Yup.string().required("required field"),
                remark: Yup.string().optional(),
                rate: Yup.string().required(" "),
                discount: Yup.string().matches(/^(100|[0-9]{1,2})$/, 'discount must be a number between 0 and 100'),
                quantity: Yup.string().required("required field"),
            })
        )
        .defined()
        .required()
        .min(1),
});
