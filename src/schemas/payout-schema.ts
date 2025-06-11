import * as yup from "yup";

// Reusable schema for administrator authorizations
const authSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  pin: yup
    .string()
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits")
    .required("PIN is required"),
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

export const payoutSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  description: yup
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  receiverWallet: yup
    .string()
    .required("Receiver wallet is required")
    .matches(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, "Invalid Solana wallet address"),
  confirmWallet: yup
    .string()
    .required("Confirm receiver wallet is required")
    .oneOf([yup.ref("receiverWallet")], "Wallets must match"),
  auth1: authSchema,
  auth2: authSchema,
  auth3: authSchema,
});

export type PayoutForm = yup.InferType<typeof payoutSchema>;
