import { NewsArticle } from "@/types/news";
import { format } from "date-fns";
import { ArrowRight, ImageIcon, Trash } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormField from "../causes/edit/form-field";
import { HeaderWrapper } from "../custom/header-wrapper";
import FormSectionTitle from "../causes/edit/form-section-title";
import { SelectField } from "../causes/edit/form-select";
import { newsSchema, NewsSchemaType } from "@/schemas/news-schema";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface NewsDetailProps {
  news: NewsArticle;
}

export function NewsDetail({ news }: NewsDetailProps) {
  const form = useForm<NewsSchemaType>({
    resolver: yupResolver(newsSchema),
    defaultValues: { ...news, video_thumbnail: news.video_thumbnail || undefined },
  });

  const { formState: { errors }, register, setValue, getValues } = form;

  const [selectedVideo, setSelectedVideo] = useState<string | undefined | null>(news.video_thumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('Please upload a video file');
        return;
      }

      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const thumbnail = canvas.toDataURL('image/jpeg');
        setSelectedVideo(thumbnail);
        setValue("video_thumbnail", thumbnail);
      };

      const videoUrl = URL.createObjectURL(file);
      video.src = videoUrl;
    }
  };

  const handleDeleteVideo = () => {
    setSelectedVideo(null);
    setValue("video_thumbnail", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: NewsSchemaType) => {
    console.log(data);
  };

  return (
    <div className="px-4 max-md:px-0 flex flex-col gap-0 pb-4  ">
      <HeaderWrapper
        title="News Details"
        description="View and manage news details"
        size={"sm"}
        className="px-10 py-1 max-md:px-10"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormSectionTitle title="Main details" />

          <div className="space-y-4">
            <FormField
              id="title"
              label="News title"
              description="Enter a short but powerful headline"
              error={errors.title?.message}
            >
              <Input
                type="text"
                id="title"
                placeholder="News Title"
                variant="newly_secondary"
                inputSize="lg"
                {...register("title")}
                disabled
              />
            </FormField>

            <FormField
              id="short_description"
              label="Short description"
              description="The description of the news article"
              error={errors.short_description?.message}
            >
              <Input
                id="short_description"
                placeholder="Short Description"
                variant="newly_secondary"
                inputSize="lg"
                {...register("short_description")}
                disabled
              />
            </FormField>

            <FormField
              id="video_thumbnail"
              label="Video"
              description="Choose an MP4 Video, below you will see a preview thumbnail of the video"
            >
              <div className="flex items-center w-full gap-4 max-sm:flex-col">
                <div className="space-x-2 flex">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    className="hidden"
                    id="video-upload"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex gap-2 items-center"
                    size="lg"
                    endIcon={ImageIcon}
                    disabled
                  >
                    Upload a video
                  </Button>
                  {selectedVideo && (
                    <Button
                      onClick={handleDeleteVideo}
                      className="flex gap-2 items-center"
                      size="lg"
                      variant="destructive"
                      endIcon={Trash}
                      disabled
                    >
                      Delete Video
                    </Button>
                  )}
                </div>
                {selectedVideo && (
                  <div className="flex-shrink-0">
                    <Image
                      src={selectedVideo}
                      alt="Video Thumbnail"
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-lg object-cover bg-[#2A2931]"
                    />
                  </div>
                )}
              </div>
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 py-6 border-y">
              <FormField
                id="category"
                label="Category"
                description="The category of the news article"
                error={errors.category?.message}
              >
                  <Input
                id="category"
                placeholder="Enter Categories"
                variant="newly_secondary"
                inputSize="lg"
                {...register("category")}
                disabled
              />
              </FormField>
              <FormField
                id="status"
                label="Status"
                description="The current status of the news article"
                error={errors.status?.message}
              >
                <SelectField
                  selectSize={"lg"}
                  variant={"newly_secondary"}
                  placeholder="Select Status"
                  value={getValues().status}
                  onValueChange={(value) => setValue("status", value)}
                  options={[
                    { value: "published", label: "Published" },
                    { value: "unpublished", label: "UnPublished" },
                    { value: "archived", label: "Archived" },
                  ]}
                  disabled
                />
              </FormField>
            </div>

            <div className="pt-4 flex justify-between">
              <Button
                type="submit"
                size="lg"
                endIcon={ArrowRight}
                className="font-semibold flex gap-4"
                disabled
              >
                Update
              </Button>
              <Button
                type="button"
                size="lg"
                variant="destructive"
                endIcon={Trash}
                className="font-semibold flex gap-4"
                disabled
              >
                Delete
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
} 