"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../causes/edit/form-field";
import { Image } from "@mynaui/icons-react";

interface FileUploadSectionProps {
  fieldName: string;
  label: string;
  description: string;
  accentColor: string; // Hex color to change SVG color
}

export default function IconUploadSection({
  fieldName,
  label,
  description,
  accentColor,
}: FileUploadSectionProps) {
  const { setValue, getValues, formState: { errors } } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Update the file and preview when file is selected
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setValue(fieldName, [selectedFile]); // Store the file in the form context
    }
  };

  // Clear the file input
  const handleFileDelete = () => {
    setFile(null);
    setFilePreview(null);
    setValue(fieldName, undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input field
    }
  };

  // Generate preview URL for the selected file
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string); // Set the file preview as SVG data URL
      };
      reader.readAsText(file); // Read file as text to keep it as SVG content
    }
  }, [file]);

  return (
    <div>
      <FormField id={fieldName} label={label} description={description} error={errors?.[fieldName]?.message as string | undefined}>

        <div className="flex gap-4 items-center max-md:flex-col-reverse ">
          <Button
            type="button"
            size={"lg"}
            className="bg-primary hover:bg-primary/80 text-background flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
            endIcon={Image}
            iconProps={{
              className: "!h-5 !w-5",
            }}
          >
            Upload an SVG Icon
          </Button>
          {/* Show SVG Preview with a fixed 256x256 aspect ratio */}
          {filePreview && filePreview.includes("svg") ? (
            <div className="w-[256px] h-[256px] bg-accent overflow-auto  text-center justify-center items-center flex text-custom-light_text">
              <div
                className="svg-preview"
                dangerouslySetInnerHTML={{
                  __html: filePreview, // Inject the SVG content directly
                }}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          ) : (
            <div className="w-[256px] h-[256px] bg-accent rounded-xl text-center justify-center items-center flex text-custom-light_text">
              Preview
            </div>
          )}

        </div>
        <div className=" hidden">

          <input
            type="file"
            ref={fileInputRef}
            id={`fileInput-${fieldName}`}
            accept=".svg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

      </FormField>
    </div>
  );
}
