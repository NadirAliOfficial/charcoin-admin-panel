import * as yup from "yup";

const newsSchema = yup.object().shape({
  title: yup
    .string()
    .required("News title is required")
    .max(100, "News title must be at most 100 characters"),

  short_description: yup
    .string()
    .required("Short description is required")
    .max(500, "Short description must be at most 500 characters"),

  video_thumbnail: yup
    .string()
    .nullable()
    .test(
      "is-valid-url",
      "Video thumbnail must be a valid URL or a data URL",
      (value) => {
        if (!value) return true; // Allow null or empty string
        try {
          new URL(value); // Check if it's a valid URL
          return true;
        } catch (_) {
          // Also allow data URLs
          return value.startsWith("data:image/");
        }
      }
    ),

  category: yup.string().required("Category is required"),

  status: yup.string().required("Status is required"),
});

export type NewsSchemaType = yup.InferType<typeof newsSchema>;

export { newsSchema };
