"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormSectionTitle from "./form-section-title";
import FormField from "./form-field";
import { SelectField } from "./form-select";
import FileUploadSection from "./file-upload-field";
import { CauseFormData } from "@/schemas/causes-schema";

export default function ContactDetailsSection() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CauseFormData>();

  return (
    <div className="mb-8 mt-20">
      <FormSectionTitle title="Contact details" className="border-b-2 border-[#3d3c44]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="responsibleContact"
          label="Responsible Contact"
          description="Enter the full name of the person responsible for the donations"
          error={errors.responsibleContact?.message}
        >
          <Input
            variant="newly_secondary"
            inputSize="lg"
            id="responsibleContact"
            className="bg-gray-800 border-gray-700 text-gray-400 font-WFVisualSansRegular text-[14px]"
            {...register("responsibleContact")}
          />
        </FormField>

        <FormField
          id="role"
          label="Role / Position"
          description="Enter the role of the responsible person"
          error={errors.role?.message}
        >
          <Input
            variant="newly_secondary"
            inputSize="lg"
            id="role"
            className="bg-gray-800 border-gray-700 text-gray-400 font-WFVisualSansRegular text-[14px]"
            {...register("role")}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          id="email"
          label="Email"
          description="Enter the contact email"
          error={errors.email?.message}
        >
          <Input
            variant="newly_secondary"
            inputSize="lg"
            id="email"
            className="bg-gray-800 border-gray-700 text-gray-400 font-WFVisualSansRegular text-[14px]"
            {...register("email")}
          />
        </FormField>

        <FormField
          id="phone"
          label="Phone"
          description="Enter the contact phone"
          error={errors.phone?.message}
        >
          <Input
            variant="newly_secondary"
            inputSize="lg"
            id="phone"
            className="bg-gray-800 border-gray-700 text-gray-400 font-WFVisualSansRegular text-[14px]"
            {...register("phone")}
          />
        </FormField>
      </div>

      <div className="border-b-2 border-secondary pb-2">
        <FileUploadSection
          description="Choose the PDF file containing the agreement between the parties"
          fieldName="contractFile"
          label="Contract"
        />
      </div>

<div className="border-b-2 border-secondary pb-2 mt-4">
 <FormField
        id="status"
        label="Status"
        description="The publish status of the cause / project"
        error={errors.status?.message}
      >
        <SelectField
          variant="newly_secondary"
          selectSize="lg"
          placeholder="Select status"
          className="bg-gray-800 border-gray-700 text-gray-400 font-WFVisualSansRegular text-[14px]"
          value={getValues().status}
          onValueChange={(value) => setValue("status", value)}
          options={[
            { value: "Draft", label: "Draft" },
            { value: "Published", label: "Published" },
            { value: "Archived", label: "Archived" },
          ]}
        />
      </FormField>
</div>
     
    </div>
  );
}
