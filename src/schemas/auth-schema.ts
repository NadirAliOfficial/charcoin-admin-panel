import * as yup from "yup";

export const loginSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    pinCode: yup
      .string()
      .required("PIN code is required")
      .min(4, "PIN must be at least 4 digits"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    otp: yup
      .string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  })
  .required();
