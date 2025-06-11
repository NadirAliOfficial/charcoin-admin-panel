import { dummyData, newsDummyData } from "@/lib/dummy-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, Controller } from "react-hook-form";
import FormField from "../causes/edit/form-field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { nftSchema, NftsSchemaType } from "@/schemas/nfts-schema";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { HeaderWrapper } from "../custom/header-wrapper";
import ImageUploadSection from "../causes/edit/field-upload-section";
import VideoUploadSection from "../ui/form-video-upload";
import FormSectionTitle from "../causes/edit/form-section-title";
import { SelectField } from "../causes/edit/form-select";
import { newsSchema, NewsSchemaType } from "@/schemas/news-schema";

const AddNewNews = () => {
  const form = useForm<NewsSchemaType>({
    resolver: yupResolver(newsSchema),
    defaultValues: {
      title: "",
      short_description: "",
      video: undefined,
      category: "",
      status: "",
    },
  });

  const {
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
  } = form;

  const [videoFile, setVideoFile] = useState(null);

  const handleVideoUpload = (file: any) => {
    setVideoFile(file);
  };

  const onSubmit = async (data: NewsSchemaType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("short_description", data.short_description);
    formData.append("category", data.category);
    formData.append("status", data.status);
    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <HeaderWrapper
        title="Publish a new entry"
        description="Complete the following fields to create and publish news"
        size={"sm"}
        className=""
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
          <FormSectionTitle title="Main details" />

          <FormField
            id="title"
            label="News title"
            description="Enter a short but powerful headline"
            error={errors.title?.message}
          >
            <Input
              id="title"
              inputSize={"lg"}
              variant={"newly_secondary"}
              placeholder="Enter a title"
              {...register("title")}
            />
          </FormField>

          <FormField
            id="short_description"
            label="Short description"
            description="Enter a short content that describes and previews the video"
            error={errors.short_description?.message}
          >
            <Input
              id="short_description"
              inputSize={"lg"}
              variant={"newly_secondary"}
              placeholder="Enter a short description"
              {...register("short_description")}
            />
          </FormField>

          <VideoUploadSection
            fieldName="video"
            label="Video"
            description="Choose an MP4 Video, below you will see a preview thumbnail of the video"
            onUpload={handleVideoUpload}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8 py-8 border-y ">
            {/* Category */}
            <FormField
              id="category"
              label="Category"
              description="Choose the category that best fits the news"
              error={errors.category?.message}
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => {
                  console.log(`Category Controller: field.value=${field.value}`);
                  return (
                    <SelectField
                      selectSize={"lg"}
                      variant={"newly_secondary"}
                      placeholder="Select a category"
                      value={field.value}
                      onValueChange={(val) => {
                        console.log(`Category SelectField: onValueChange received ${val}`);
                        field.onChange(val);
                      }}
                      className="mt-auto relative text-white"
                      options={[
                        { value: "clean_water", label: "Clean Water" },
                        { value: "education", label: "Education" },
                        { value: "malnutrition_hunger", label: "Malnutrition & Hunger" },
                        { value: "house_building", label: "House Building" },
                        { value: "healthcare", label: "Healthcare" },
                        { value: "renewable_energy", label: "Renewable Energy" },
                        { value: "wildlife_conservation", label: "Wildlife Conservation" },
                      ]}
                    />
                  );
                }}
              />
            </FormField>

            {/* Status */}
            <FormField
              id="status"
              label="Status"
              description="Choose the status of the news article"
              error={errors.status?.message}
            >
              <Controller
                name="status"
                control={control}
                render={({ field }) => {
                  console.log(`Status Controller: field.value=${field.value}`);
                  return (
                    <SelectField
                      className="mt-auto text-white relative"
                      variant={"newly_secondary"}
                      selectSize={"lg"}
                      placeholder="Published"
                      value={field.value}
                      onValueChange={(val) => {
                        console.log(`Status SelectField: onValueChange received ${val}`);
                        field.onChange(val);
                      }}
                      options={[
                        { value: "published", label: "Published" },
                        { value: "draft", label: "Draft" },
                        { value: "archived", label: "Archived" },
                      ]}
                    />
                  );
                }}
              />
            </FormField>
          </div>

          <Button type="submit" size="lg" className="mt-8 w-fit font-bold flex gap-4 max-w-md">
            Publish news <ArrowRight className="!w-5 !h-5" />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddNewNews;
