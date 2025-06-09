import * as yup from "yup";

const nftSchema = yup.object().shape({
  nftName: yup
    .string()
    .required("NFT Name is required")
    .max(100, "NFT Name must be at most 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),

  nftImage: yup
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

  typeOfNFT: yup.string().required("Type of NFT is required"),

  campaign: yup.string().required("Campaign is required"),
});

const nftSchemaWithWallet = yup.object().shape({
  nftName: yup
    .string()
    .required("NFT Name is required")
    .max(100, "NFT Name must be at most 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),

  nftImage: yup
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

  typeOfNFT: yup.string().required("Type of NFT is required"),

  wallet: yup.string().required("Wallet is required"),
}); 

export type NftsSchemaType = yup.InferType<typeof nftSchema>;

export type NftsSchemaWithWalletType = yup.InferType<typeof nftSchemaWithWallet>;


const nftSchemaWithWalletDetail = yup.object().shape({
  name: yup
    .string()
    .required("NFT Name is required")
    .max(100, "NFT Name must be at most 100 characters"),

  username: yup.string().required("Username is required").max(100, "Username must be at most 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),

  nftImage: yup
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

    typeOfAward: yup.string().required("Type of Award is required"),

    status: yup.string().required("Status is required"),
});

export type NftsSchemaWithWalletDetailType = yup.InferType<typeof nftSchemaWithWalletDetail>;



export { nftSchema, nftSchemaWithWallet, nftSchemaWithWalletDetail };
