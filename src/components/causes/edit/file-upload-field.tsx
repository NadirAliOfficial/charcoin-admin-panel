"use client";

import { Button } from "@/components/ui/button";
import { File, Trash2, Upload } from "lucide-react";
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

      <div className="flex gap-4 w-full justify-between max-sm:flex-col flex-row mt-4">
        <div className="flex gap-2 items-center w-full max-sm:w-auto">
          <Button
            type="button"
            size={"lg"}
            className="bg-primary hover:bg-primary/80 text-background text-xs flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload a PDF File
            <File className="h-4 w-4" />
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            id={`fileInput-${fieldName}`}
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-xs text-gray-400">
            Final Formal Agreement - Nicaragua.pdf
          </div>
        </div>

        <Button
          type="button"
          size={"lg"}
          variant="destructive"
          onClick={handleFileDelete}
          disabled={!file}
          endIcon={Trash2}
          className={"bg-red-300 text-background text-xs flex items-center gap-2"}
        >
          Delete File
        </Button>
      </div>
    </FormField>
  );
}
