import { dummyData } from "@/lib/dummy-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import FormField from "../causes/edit/form-field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { nftSchema, NftsSchemaType } from "@/schemas/nfts-schema";
import ImageUploadSection from "../causes/edit/field-upload-section";
import { SelectField } from "../causes/edit/form-select";
import { HeaderWrapper } from "../custom/header-wrapper";
import FormSectionTitle from "../causes/edit/form-section-title";
import { ArrowRight } from "lucide-react";

export const CreateNfts = () => {
  const form = useForm<NftsSchemaType>({
    resolver: yupResolver(nftSchema),
    defaultValues: dummyData,
  });

  const {
    formState: { errors },
    register,
    setValue,
    getValues,
  } = form;

  const onSubmit = (data: NftsSchemaType) => {
    console.log(data);
  };

  return (
    <div className="px-4 flex flex-col gap-8  ">
      {/* Header */}

      <HeaderWrapper
        title="Create a new Official NFT"
        description="Complete the following fields to create and mint a new NFT."
        size={"sm"}
        className="px-4"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header */}
          <FormSectionTitle title="Main details" />
          {/* NFT Name */}
          <FormField
            id="nftName"
            label="NFT Name"
            description="This is the public NFT name"
            error={errors.nftName?.message}
          >
            <Input
              id="nftName"
              variant="newly_secondary"
              inputSize="lg"
              {...register("nftName")}
            />
          </FormField>

          {/* Description */}
          <FormField
            id="description"
            label="Description"
            description="Describe the visuals and purpose of this NFT"
            error={errors.description?.message}
          >
            <Input
              variant="newly_secondary"
              inputSize="lg"
              id="description"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("description")}
            />
          </FormField>

          {/* NFT Image Upload */}
          <ImageUploadSection
            fieldName="nftImage"
            label="NFT Image"
            description="Upload a 1000x600 pixels PNG image"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 py-6 border-y ">
            {/* NFT Type */}
            <FormField
              id="typeOfNFT"
              label="Type of NFT"
              description="Choose the correct awarding method"
              error={errors.typeOfNFT?.message}
            >
              <SelectField
                selectSize={"lg"}
                variant={"newly_secondary"}
                placeholder="Select NFT Type"
                value={getValues().typeOfNFT}
                onValueChange={(value) => setValue("typeOfNFT", value)}
                options={[
                  { value: "Campaign Winner", label: "Campaign Winner" },
                  { value: "Exclusive Access", label: "Exclusive Access" },
                  { value: "Special Reward", label: "Special Reward" },
                ]}
              />
            </FormField>

            {/* Campaign Selection */}
            <FormField
              id="campaign"
              label="Campaign"
              description="Choose the campaign where this NFT will be awarded"
              error={errors.campaign?.message}
            >
              <SelectField
                variant={"newly_secondary"}
                selectSize={"lg"}
                placeholder="Select Campaign"
                value={getValues().campaign}
                onValueChange={(value) => setValue("campaign", value)}
                options={[
                  {
                    value: "April 2025",
                    label: "April 2025 (Apr 1 to Apr 30)",
                  },
                  { value: "May 2025", label: "May 2025 (May 1 to May 31)" },
                  { value: "June 2025", label: "June 2025 (Jun 1 to Jun 30)" },
                ]}
              />
            </FormField>
          </div>

          <p className="text-muted-foreground">
            A new NFT will be minted within the OpenSea ecosystem as part of the
            official CharCoin collection. This NFT will remain under CharCoin’s
            ownership until it is transferred to the randomly selected winner of
            the month. Each NFT carries a 10% intellectual property royalty on
            every transaction, supporting the CharCoin community. The NFT will
            be awarded as a gift to a CharCoin ecosystem user who has completed
            at least one transaction during the campaign month. The winner will
            be announced and credited on the 25th of the campaign month.
          </p>

          {/* Mint NFT Button */}
          <Button type="submit" size={"lg"} className="mt-8 flex gap-4">
            Mint NFT in Solana <ArrowRight className="!w-5 !h-5" />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
