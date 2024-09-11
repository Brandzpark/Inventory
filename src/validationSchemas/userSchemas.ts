import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export const passwordResetSendSchema = Yup.object({
  email: Yup.string().email().required(),
});

export const passwordResetSchema = Yup.object({
  password: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Password confirmation is required"),
});

export const profileUpdateSchema = Yup.object({
  firstName: Yup.string().required("first name is a required field"),
  lastName: Yup.string().required("last name is a required field"),
  image: Yup.mixed().nullable(),
  email: Yup.string().email().required(),
});

export const passwordChangeSchema = Yup.object({
  password: Yup.string().required(),
  newPassword: Yup.string().min(6).required("new password is a required field"),
  passwordConfirmation: Yup.string()
    .min(6)
    .oneOf([Yup.ref("newPassword"), ""], "new passwords must match")
    .required("password confirmation is a required field"),
});

export const createUserSchema = Yup.object({
  firstName: Yup.string().required("first name is a required field"),
  lastName: Yup.string().required("last name is a required field"),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  isActive: Yup.boolean().required(),
  role: Yup.string().required(),
});

export const updateUserSchema = Yup.object({
  firstName: Yup.string().required("first name is a required field"),
  lastName: Yup.string().required("last name is a required field"),
  email: Yup.string().email().required(),
  isActive: Yup.boolean().required(),
  role: Yup.string().required(),
});
