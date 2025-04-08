import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

export const registerSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required").min(3, "Full name must be at least 3 characters"),
  employeeId: yup.string().required("Employee ID is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
})

export const recipeSchema = yup.object().shape({
  partyName: yup.string().required("Party name is required"),
  fabricName: yup.string().required("Fabric name is required"),
  lotNo: yup.string().required("Lot number is required"),
  registerNo: yup.string().required("Register number is required"),
  shade: yup.string().required("Shade is required"),
  date: yup.date().nullable().required("Date is required"),
  color1: yup.string(),
  percentage1: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, "Percentage must be between 0 and 100")
    .max(100, "Percentage must be between 0 and 100")
    .nullable(),
  color2: yup.string(),
  percentage2: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, "Percentage must be between 0 and 100")
    .max(100, "Percentage must be between 0 and 100")
    .nullable(),
  color3: yup.string(),
  percentage3: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, "Percentage must be between 0 and 100")
    .max(100, "Percentage must be between 0 and 100")
    .nullable(),
  color4: yup.string(),
  percentage4: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, "Percentage must be between 0 and 100")
    .max(100, "Percentage must be between 0 and 100")
    .nullable(),
  remarks: yup.string(),
})

