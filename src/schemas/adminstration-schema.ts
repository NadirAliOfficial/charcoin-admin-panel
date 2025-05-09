
import * as yup from "yup";

const administrators = yup.object().shape({
  username: yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
    name: yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  accessPin: yup.string()
    .required("Access PIN is required")
    .matches(/^\d{6}$/, "Access PIN must be 6 digits"),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  phone: yup.string().required("Phone is required"),
  authenticatorApp: yup.string().required("Authenticator app is required"),
  permissions: yup.object({
    dashboard: yup.boolean(),
    causes: yup.object({
      view: yup.boolean(),
      create: yup.boolean(),
      update: yup.boolean(),
      delete: yup.boolean(),
    }),
    rewards: yup.object({
      topTier: yup.object({ view: yup.boolean() }),
      charityLottery: yup.object({ view: yup.boolean() }),
      nfts: yup.object({ view: yup.boolean(), create: yup.boolean() }),
      staking: yup.object({ view: yup.boolean() }),
    }),
    community: yup.object({
      news: yup.object({
        view: yup.boolean(),
        create: yup.boolean(),
        update: yup.boolean(),
        delete: yup.boolean(),
      }),
      users: yup.object({
        view: yup.boolean(),
        blockUnblock: yup.boolean(),
      }),
      administrators: yup.object({
        view: yup.boolean(),
        create: yup.boolean(),
        update: yup.boolean(),
        updateOwnAccount: yup.boolean(),
        delete: yup.boolean(),
      }),
    }),
    dappGlobalSettings: yup.object({
      causes: yup.boolean(),
      governance: yup.boolean(),
      rewards: yup.boolean(),
      walletsManagement: yup.boolean(),
    }),
  }),
});


export type Administrator = yup.InferType<typeof administrators>;

export { administrators };
