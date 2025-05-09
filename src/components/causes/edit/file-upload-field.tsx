"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "./form-field";

interface FileUploadSectionProps {
  fieldName: string;
  label: string;
  description: string;
}

export default function FileUploadSection({
  fieldName,
  label,
  description,
}: FileUploadSectionProps) {
  const { setValue, getValues } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const file = getValues()[fieldName] as File | undefined;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Called");
    if (event.target.files?.length) {
      setValue(fieldName, event.target.files[0]); // Store the File object
    }
  };

  const handleFileDelete = () => {
    setValue(fieldName, undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input field
    }
  };

  return (
    <FormField id={fieldName} label={label} description={description}>
      <div className="flex items-center gap-2 mt-2 text-gray-400">
        {file ? file.name : "No file selected"}
      </div>

      <div className="flex gap-4 max-sm:flex-col flex-row mt-4">
        <Button
          type="button"
          size={"lg"}
          className="bg-primary hover:bg-primary/80 text-background flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          Upload a File
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          id={`fileInput-${fieldName}`}
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          type="button"
          size={"lg"}
          variant="destructive"
          onClick={handleFileDelete}
          disabled={!file}
          startIcon={Trash2}
          className={"!ring-destructive"}
        >
          Delete File
        </Button>
      </div>
    </FormField>
  );
}
