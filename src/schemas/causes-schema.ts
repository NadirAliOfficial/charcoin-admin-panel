import * as yup from "yup";

export const causeFormSchema = yup.object({
  causeTitle: yup
    .string()
    .required("Cause title is required")
    .min(5, "Title must be at least 5 characters"),
  organization: yup.string().required("Organization name is required"),
  website: yup
    .string()
    .url("Must be a valid URL")
    .required("Website is required"),
  country: yup.string().required("Country is required"),
  campaign: yup.string().required("Campaign is required"),
  category: yup.string().required("Category is required"),
  type: yup.string().required("Type is required"),
  wallet: yup
    .string()
    .required("Wallet address is required")
    .matches(/^[a-zA-Z0-9]{40,}$/, "Must be a valid wallet address"),
  responsibleContact: yup.string().required("Contact name is required"),
  role: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+[0-9]{1,4}-[0-9]{3,}-[0-9]{4,}$/,
      "Must be a valid phone number format: +XXX-XXXX-XXXX"
    ),
  status: yup.string().required("Status is required"),

  // ✅ Featured Images (Multiple Image Uploads)
  featuredImages: yup
    .array()
    .of(
      yup
        .mixed()
        .required("Image is required")
        .test(
          "fileType",
          "Only PNG, JPG, and JPEG files are allowed",
          (value) => {
            if (!value) return false;
            if (!(value instanceof File)) return false;
            return ["image/png", "image/jpeg", "image/jpg"].includes(
              value.type
            );
          }
        )
        .test("fileSize", "Each image must be less than 3MB", (value) => {
          if (!value) return false;
          if (!(value instanceof File)) return false;
          return value.size <= 3 * 1024 * 1024; // 3MB limit per image
        })
    )
    .min(1, "At least one image is required") // Ensures at least one image is uploaded
    .max(5, "You can upload up to 5 images"), // Limits the maximum number of images

  // ✅ Contract File (Single PDF Upload)
  contractFile: yup
    .mixed()
    .required("Contract file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;
      if (!(value instanceof File)) return false;
      return value.type === "application/pdf";
    })
    .test("fileSize", "File size should be less than 5MB", (value) => {
      if (!value) return false;
      if (!(value instanceof File)) return false;
      return value.size <= 5 * 1024 * 1024; // 5MB
    }),
});

export type CauseFormData = yup.InferType<typeof causeFormSchema>;
