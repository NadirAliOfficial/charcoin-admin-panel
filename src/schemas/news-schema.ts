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

  video: yup
    .mixed()
    .required("Video is required")
    .test(
      "fileType",
      "Only MP4 files are allowed",
      (value) => {
        if (!value) return false;
        if (!(value instanceof File)) return false;
        return ["video/mp4"].includes(value.type);
      }
    )
    .test("fileSize", "Video must be less than 50MB", (value) => {
      if (!value) return false;
      if (!(value instanceof File)) return false;
      return value.size <= 50 * 1024 * 1024; // 50MB limit
    }),

  category: yup.string().required("Category is required"),

  status: yup.string().required("Status is required"),
});

export type NewsSchemaType = yup.InferType<typeof newsSchema>;

export { newsSchema };
