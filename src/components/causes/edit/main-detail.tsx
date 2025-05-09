"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import ImageUploadSection from "./field-upload-section";
import FormField from "./form-field";
import FormSectionTitle from "./form-section-title";
import { SelectField } from "./form-select";

export default function MainDetailsSection() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  return (
    <div className="mb-8">
      <FormSectionTitle title="Main details" />

      <FormField
        id="causeTitle"
        label="Cause public title"
        description="This is what benefactors will see and identify the cause in the entire system"
        error={errors.causeTitle?.message as string | undefined}
      >
        <Input
          variant="newly_secondary"
          inputSize="lg"
          id="causeTitle"
          className="bg-gray-800 border-gray-700 text-white"
          {...register("causeTitle")}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          id="organization"
          label="Organization"
          description="The organization in charge of distributing the donations received"
          error={errors.organization?.message as string | undefined}
        >
          <Input
            variant="newly_secondary"
            inputSize="lg"
            id="organization"
            className="bg-gray-800 border-gray-700 text-white"
            {...register("organization")}
          />
        </FormField>

        <FormField
          id="website"
          label="Organization - Website"
          description="The public organization website"
          error={errors.website?.message as string | undefined}
        >
          <Input
            variant="newly_secondary"
            inputSize="lg"
            id="website"
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="https://"
            {...register("website")}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          id="country"
          label="Country"
          description="Choose the country where the cause / project will be executed"
          error={errors.country?.message as string | undefined}
        >
          <SelectField
            variant="newly_secondary"
            selectSize="lg"
            placeholder="Select country"
            value={getValues().country}
            onValueChange={(value) => setValue("country", value)}
            options={[
              { value: "Nicaragua", label: "Nicaragua" },
              { value: "Honduras", label: "Honduras" },
              { value: "Guatemala", label: "Guatemala" },
              { value: "El Salvador", label: "El Salvador" },
            ]}
          />
        </FormField>

        <FormField
          id="campaign"
          label="Campaign"
          description="Choose the campaign where the cause / project will be running"
          error={errors.campaign?.message as string | undefined}
        >
          <SelectField
            variant="newly_secondary"
            selectSize="lg"
            placeholder="Select campaign"
            value={getValues().campaign}
            onValueChange={(value) => setValue("campaign", value)}
            options={[
              {
                value: "February 2025 (Feb 1 to Feb 20)",
                label: "February 2025 (Feb 1 to Feb 20)",
              },
              {
                value: "March 2025 (Mar 1 to Mar 31)",
                label: "March 2025 (Mar 1 to Mar 31)",
              },
              {
                value: "April 2025 (Apr 1 to Apr 30)",
                label: "April 2025 (Apr 1 to Apr 30)",
              },
            ]}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          id="category"
          label="Main Category"
          description="Choose the category that most relates to the cause / project"
          error={errors.category?.message as string | undefined}
        >
          <SelectField
            variant="newly_secondary"
            selectSize="lg"
            placeholder="Select category"
            value={getValues().category}
            onValueChange={(value) => setValue("category", value)}
            options={[
              { value: "Education", label: "Education" },
              { value: "Healthcare", label: "Healthcare" },
              { value: "Environment", label: "Environment" },
              { value: "Humanitarian", label: "Humanitarian" },
            ]}
          />
        </FormField>

        <FormField
          id="type"
          label="Type"
          description="Choose the type of cause / project"
          error={errors.type?.message as string | undefined}
        >
          <SelectField
            variant="newly_secondary"
            selectSize="lg"
            placeholder="Select type"
            value={getValues().type}
            onValueChange={(value) => setValue("type", value)}
            options={[
              { value: "One Time Only", label: "One Time Only" },
              { value: "Recurring", label: "Recurring" },
              { value: "Emergency", label: "Emergency" },
            ]}
          />
        </FormField>
      </div>

      <FormField
        id="wallet"
        label="Receiver Wallet"
        description="Enter the USDT (Solana Network) Wallet of the cause / project, this wallet will be used to transfer the funds and will be public"
        error={errors.wallet?.message as string | undefined}
      >
        <Input
          variant={"newly_secondary"}
          inputSize={"lg"}
          id="wallet"
          className="bg-gray-800 border-gray-700 text-white"
          {...register("wallet")}
        />
      </FormField>

      <ImageUploadSection
        fieldName="featuredImages"
        label="Featured Images"
        description={
          "Choose a 1000x600 pixels PNG image, below you will see a preview of the uploaded image"
        }
      />
    </div>
  );
}
