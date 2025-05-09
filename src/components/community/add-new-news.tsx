import { dummyData } from "@/lib/dummy-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
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

const CreateNfts = () => {
  const form = useForm<NewsSchemaType>({
    resolver: yupResolver(newsSchema),
    defaultValues: dummyData,
  });

  const {
    formState: { errors },
    register,
    setValue,
    getValues,
  } = form;

  const [videoFile, setVideoFile] = useState(null);

  const handleVideoUpload = (file: any) => {
    setVideoFile(file);
  };

  const onSubmit = async (data: NewsSchemaType) => {
    const formData = new FormData();
    formData.append("nftName", data.nftName);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("status", data.status);
    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      const response = await fetch("/api/nft", {
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
    <div className="px-4 max-md:p-0 flex flex-col gap-8">
      <HeaderWrapper
        title="Publish a new entry"
        description="Complete the following fields to create and publish news"
        size={"sm"}
        className="px-4 max-md:px-10"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormSectionTitle title="Main details" />

          <FormField
            id="nftName"
            label="NFT Name"
            error={errors.nftName?.message}
          >
            <Input
              id="nftName"
              inputSize={"lg"}
              variant={"newly_secondary"}
              {...register("nftName")}
            />
          </FormField>

          <FormField
            id="description"
            label="Description"
            error={errors.description?.message}
          >
            <Input
              id="description"
              inputSize={"lg"}
              variant={"newly_secondary"}
              {...register("description")}
            />
          </FormField>

          <VideoUploadSection
            fieldName="nftVideo"
            label="Video"
            description="Choose an MP4 Video, below you will see a preview thumbnail of the video"
            onUpload={handleVideoUpload}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8 py-8 border-y ">
            {/* NFT Type */}
            <FormField
              id="typeOfNFT"
              label="Category"
              description="Choose the category that best fits the news"
              error={errors.category?.message}
            >
              <SelectField
                selectSize={"lg"}
                variant={"newly_secondary"}
                placeholder="Select Category"
                value={getValues().category}
                onValueChange={(value) => setValue("category", value)}
                className="mt-auto bg-[red] relative"
                options={[
                  { value: "art", label: "Digital Art" },
                  { value: "collectible", label: "Collectible" },
                  { value: "music", label: "Music NFT" },
                  { value: "gaming", label: "Gaming Item" },
                  { value: "membership", label: "Exclusive Membership" },
                  { value: "virtual_land", label: "Virtual Land" },
                  { value: "ticket", label: "Event Ticket" },
                  { value: "sports", label: "Sports Memorabilia" },
                  { value: "utility", label: "Utility NFT" },
                  { value: "charity", label: "Charity Donation" },
                ]}
              />
            </FormField>

            {/* Campaign Selection */}
            <FormField
              id="Status"
              label="Status"
              description="Choose the campaign when this NFT will be awarded randomly"
              error={errors.status?.message}
            >
              <SelectField
                className="mt-auto relative"
                variant={"newly_secondary"}
                selectSize={"lg"}
                placeholder="Select Status"
                value={getValues().status}
                onValueChange={(value) => setValue("status", value)}
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "pending_review", label: "Pending Review" },
                  { value: "approved", label: "Approved" },
                  { value: "minted", label: "Minted" },
                  { value: "listed", label: "Listed for Sale" },
                  { value: "sold", label: "Sold" },
                  { value: "transferred", label: "Transferred" },
                  { value: "burned", label: "Burned" },
                ]}
              />
            </FormField>
          </div>

          <Button type="submit" size="lg" className="mt-8 font-bold flex gap-4">
            Publish Now <ArrowRight className="!w-5 !h-5" />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateNfts;
