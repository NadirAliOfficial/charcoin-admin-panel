import * as yup from "yup";

const categorySchema = yup
    .object({
        name: yup.string().required("Name is required"),
        accentColor: yup
            .string()
            .matches(
                /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/,
                "Invalid hex color code. Use #RRGGBB or #RRGGBBAA"
            )
            .required("Accent color is required"),
        icon: yup
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
            .max(1, "You can upload up to 1 image"), // Limits the maximum number of images
    })
    .required();


export type CategorySchemaType = yup.InferType<typeof categorySchema>;

export { categorySchema };