import { useFormContext } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, X } from "lucide-react";
import FormField from "../causes/edit/form-field";
import { z } from "zod";
import Video from "next-video";

interface VideoUploadSectionProps {
  fieldName: string;
  label: string;
  description: string;
  onUpload: (file: File | null) => void;
}

const videoSchema = z
  .instanceof(File)
  .refine((file) => file.type === "video/mp4", {
    message: "Only MP4 format is allowed",
  });

export default function VideoUploadSection({
  fieldName,
  label,
  description,
  onUpload,
}: VideoUploadSectionProps) {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(
    () => getValues(fieldName) || null
  );

  useEffect(() => {
    setValue(fieldName, videoFile || undefined);
  }, [videoFile, fieldName, setValue]);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const validation = videoSchema.safeParse(file);
      if (validation.success) {
        setVideoFile(file);
        onUpload(file);
      } else {
        alert(validation.error.errors[0].message);
      }
    }
  };

  const handleDeleteVideo = () => {
    setVideoFile(null);
    onUpload(null);
  };

  return (
    <FormField
      id={fieldName}
      label={label}
      description={description}
      error={errors[fieldName]?.message as string}
    >
      {/* Video Preview or No Preview Fallback */}
      <div className="relative mt-4 border rounded-lg w-full bg-gray-100">
        {videoFile ? (
          <>
            <Video src={URL.createObjectURL(videoFile)} />
            <button
              type="button"
              onClick={handleDeleteVideo}
              className="absolute top-2 right-2 bg-destructive/50 hover:bg-destructive rounded-full p-1"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </>
        ) : (
          <div className="bg-accent flex justify-center items-center text-center py-4 h-32">
            No Preview Available
          </div>
        )}
      </div>

      {/* Upload & Delete Buttons */}
      <div className="flex gap-4 mt-4 max-sm:flex-col">
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          size="lg"
          className="bg-primary hover:bg-primary/80 text-background flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Video
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          accept="video/mp4"
          className="hidden"
          onChange={handleVideoUpload}
        />

        <Button
          type="button"
          variant="destructive"
          size="lg"
          className="bg-red-500 text-foreground flex items-center gap-2"
          onClick={handleDeleteVideo}
          disabled={!videoFile}
        >
          <Trash2 className="h-4 w-4" />
          Delete Video
        </Button>
      </div>
    </FormField>
  );
}
