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
    <div className="mb-8">
      <FormSectionTitle title="Contact details" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            className="bg-gray-800 border-gray-700 text-white"
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
            className="bg-gray-800 border-gray-700 text-white"
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
            className="bg-gray-800 border-gray-700 text-white"
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
            className="bg-gray-800 border-gray-700 text-white"
            {...register("phone")}
          />
        </FormField>
      </div>

      <FileUploadSection
        description="Choose the PDF file containing the agreement between the parties"
        fieldName="contractFile"
        label="Contract"
      />

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
  );
}
