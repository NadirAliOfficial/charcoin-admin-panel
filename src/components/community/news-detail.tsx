import { NewsArticle } from "@/types/news";
import { format } from "date-fns";
import { ArrowRight, ImageIcon, Trash, VideoIcon } from "lucide-react";
import { useState, useRef } from "react";

interface NewsDetailProps {
  news: NewsArticle;
}

export function NewsDetail({ news }: NewsDetailProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(news.video_thumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        alert('Please upload a video file');
        return;
      }

      // Create a video element to get thumbnail
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        // Set video time to 1 second to get thumbnail
        video.currentTime = 1;
      };

      video.onseeked = () => {
        // Create canvas to capture thumbnail
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const thumbnail = canvas.toDataURL('image/jpeg');
        setSelectedVideo(thumbnail);
      };

      // Create object URL for video
      const videoUrl = URL.createObjectURL(file);
      video.src = videoUrl;
    }
  };

  const handleDeleteVideo = () => {
    setSelectedVideo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="text-white p-6 rounded-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 mt-5">
        <div>
          <h2 className="text-2xl font-semibold">Publish a new entry</h2>
          <p className="text-sm text-[#A1A1AA]">
            Complete the following fields to create and publish news
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <div className="space-y-2 mt-4 border-b border-[#2A2931] pb-4">
          <h3 className="text-lg font-semibold">Main details</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">News title</label>
            <p className="text-xs text-[#A1A1AA] mb-4">Enter a short but powerful headline</p>
            <input
              type="text"
              value={news.title}
              readOnly
              className="w-full bg-[#2A2931] text-white px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Short description</label>
            <p className="text-xs text-[#A1A1AA] mb-4">The description of the news article</p>
            <input
              value={news.short_description}
              readOnly
              className="w-full bg-[#2A2931] text-white px-4 py-2 rounded-md"
            />
          </div>

          <div className="border-b pb-10 border-[#2A2931] rounded-md">
            <label className="block text-sm mb-1">Video</label>
            <p className="text-xs text-[#A1A1AA] mb-4">Choose an MP4 Video, below you will see a preview thumbnail of the video</p>
            <div className="flex items-center gap-4">
              <div className="space-x-2 flex">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleVideoUpload}
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#3CFEC3] flex gap-2 items-center text-black px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
                >
                  Upload a video
                  <ImageIcon className="w-4 h-4" />
                </button>
                {selectedVideo && (
                  <button 
                    onClick={handleDeleteVideo}
                    className="bg-red-300 flex gap-2 items-center text-black px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
                  >
                    Delete Video
                    <VideoIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              {selectedVideo && (
                <div className="flex-shrink-0">
                  <img 
                    src={selectedVideo} 
                    alt="Video Thumbnail" 
                    className="w-32 h-32 rounded-lg object-cover bg-[#2A2931]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-[#2A2931] rounded-md pb-10">
            <div className="h-full flex flex-col justify-between">
              <label className="block text-sm mb-1 text-[#A1A1AA]">Category</label>
              <p className="text-xs text-[#A1A1AA] mb-4">The category of the news article</p>
              <div className="bg-[#2A2931] px-4 py-2 rounded-md text-white text-sm">
                {news.category}
              </div>
            </div>
            <div className="h-full flex flex-col justify-between">
              <label className="block text-sm mb-1 text-[#A1A1AA]">Status</label>
              <p className="text-xs text-[#A1A1AA] mb-4">The current status of the news article</p>
              <div className="bg-[#2A2931] px-4 py-2 rounded-md text-white text-sm">
                {news.status}
              </div>
            </div>
          </div>

         

          <div className="pt-4 flex justify-between">
            <button 
              className="flex w-fit gap-2 items-center bg-[#3CFEC3] text-black font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90"
            >
              Update
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex w-fit gap-2 items-center bg-red-300 text-black font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90">
                Delete
                <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 