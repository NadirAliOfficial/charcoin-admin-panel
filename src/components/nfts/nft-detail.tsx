import { NFTSRecord } from "@/types/rewards";
import { ArrowRight, ImageIcon, Trash } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { HeaderWrapper } from "../custom/header-wrapper";
import { nftSchemaWithWallet, nftSchemaWithWalletDetail, NftsSchemaWithWalletDetailType, NftsSchemaWithWalletType } from "@/schemas/nfts-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FormSectionTitle from "../causes/edit/form-section-title";
import { Input } from "../ui/input";
import FormField from "../causes/edit/form-field";
import ImageUploadSection from "../causes/edit/field-upload-section";
import { SelectField } from "../causes/edit/form-select";
import { Button } from "../ui/button";

interface NftDetailProps {
  nft: NFTSRecord;
}

export function NftDetail({ nft }: NftDetailProps) {
  const form = useForm<NftsSchemaWithWalletDetailType>({
    resolver: yupResolver(nftSchemaWithWalletDetail),
    defaultValues: { ...nft }
  });

  const {
    formState: { errors },
    register,
    setValue,
    getValues,
  } = form;

  const onSubmit = (data: NftsSchemaWithWalletDetailType) => {
    console.log(data);
  };

  const [selectedImage, setSelectedImage] = useState<string>(nft.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="px-4 max-md:px-0 flex flex-col gap-0  ">
      <HeaderWrapper
        title="NFT Details"
        description="View and manage NFT details"
        size={"sm"}
        className="px-4 max-md:px-10"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header */}
          <FormSectionTitle title="Main details" />
          {/* NFT Name */}
          <FormField
            id="name"
            label="NFT Name"
            description="This is the public NFT name"
            error={errors.name?.message}
          >
            <Input
              id="name"
              placeholder="NFT Name"
              variant="newly_secondary"
              inputSize="lg"
              {...register("name")}
              disabled
            />
          </FormField>

          <FormField
            id="username"
            label="Username"
            description="The username of the NFT owner"
            error={errors.name?.message}
          >
            <Input
              id="username"
              placeholder="NFT Name"
              variant="newly_secondary"
              inputSize="lg"
              {...register("username")}
              disabled
            />
          </FormField>

          <FormField
            id="description"
            label="Description"
            description="Describe the visuals and purpose of this NFT"
            error={errors.description?.message}
          >
            <Input
              variant="newly_secondary"
              inputSize="lg"
              placeholder="Description"
              id="description"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("description")}
              disabled
            />
          </FormField>
          {/* <ImageUploadSection
            fieldName="image"
            label="NFT Image"
            description="Upload a 1000x600 pixels PNG image"
          /> */}

              <div className="border-b pb-10 border-[#2A2931] rounded-md">
            <label className="block text-sm mb-1 text-white">NFT image</label>
            <p className="text-xs text-[#A1A1AA] mb-4">Choose a 1000x600 pixels PNG image, below you will see a preview of the uploaded image</p>
            <div className="flex items-center  w-full gap-4">
              <div className="space-x-2 flex">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload an image
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleDeleteImage}
                  variant={"destructive"}
                >
                  Delete Image
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
              {selectedImage && (
                <div className="flex-shrink-0">
                  <Image
                    src={selectedImage}
                    alt="NFT Preview"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-lg object-cover bg-[#2A2931]"
                  />
                </div>
              )}
            </div>
          </div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 py-6 border-y ">
            {/* NFT Type */}
            <FormField
              id="typeOfAward"
              label="Type of NFT"
              description="Choose the correct awarding method"
              error={errors.typeOfAward?.message}
            >
              <SelectField
                selectSize={"lg"}
                variant={"newly_secondary"}
                placeholder="Select NFT Type"
                value={getValues().typeOfAward}
                onValueChange={(value) => setValue("typeOfAward", value)}
                disabled
                options={[
                  { value: "Campaign Winner", label: "Campaign Winner" },
                  { value: "Exclusive Access", label: "Exclusive Access" },
                  { value: "Special Reward", label: "Special Reward" },
                ]}
              />
            </FormField>

            {/* Campaign Selection */}
            <FormField
              id="status"
              label="Campaign"
              description="Choose the campaign when this NFT will be awarded randomly"
              error={errors.status?.message}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                placeholder="Enter Campaign"
                id="status"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("status")}
                disabled
              />{" "}
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
          <Button
            type="submit"
            disabled
            size="lg"
            endIcon={ArrowRight}  // ✅ Pass the component, NOT JSX
           
            className="mt-8 font-semibold flex gap-4"
          >
            Mint NFT and Transfer
          </Button>
        </form>
      </FormProvider>


     
    </div>
  );
}
