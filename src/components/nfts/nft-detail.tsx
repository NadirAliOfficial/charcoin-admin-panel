import { NFTSRecord } from "@/types/rewards";
import { ArrowRight, ImageIcon, Trash } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";

interface NftDetailProps {
  nft: NFTSRecord;
}

export function NftDetail({ nft }: NftDetailProps) {
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
    <div className="text-white p-6 rounded-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 mt-5">
        <div>
          <h2 className="text-2xl font-semibold">NFT Details</h2>
          <p className="text-sm text-[#A1A1AA]">
            View and manage NFT details
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <div className="space-y-2 mt-4 border-b border-[#2A2931] pb-4">
          <h3 className="text-lg font-semibold">Main details</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[#A1A1AA]">NFT Name</label>
            <p className="text-xs text-[#A1A1AA] mb-4">The name of the NFT</p>
            <input
              type="text"
              value={nft.name}
              readOnly
              className="w-full bg-[#2A2931] text-white px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#A1A1AA]">Username</label>
            <p className="text-xs text-[#A1A1AA] mb-4">The username of the NFT owner</p>
            <input
              type="text"
              value={nft.username}
              readOnly
              className="w-full bg-[#2A2931] text-white px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#A1A1AA]">Description</label>
            <p className="text-xs text-[#A1A1AA] mb-4">Describe the visuals found on the NFT</p>
            <input
              value={nft.description}
              readOnly
              className="w-full bg-[#2A2931] text-white px-4 py-2 rounded-md"
            />
          </div>
          <div className="border-b pb-10 border-[#2A2931] rounded-md">
            <label className="block text-sm mb-1 text-[#A1A1AA]">NFT image</label>
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
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#3CFEC3] flex gap-2 items-center text-black px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
                >
                  Upload an image
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleDeleteImage}
                  className="bg-[#3CFEC3] flex gap-2 items-center text-black px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
                >
                  Delete Image
                  <Trash className="w-4 h-4" />
                </button>
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

          <div className="grid grid-cols-2 gap-4 border-b border-[#2A2931] rounded-md pb-10">
            <div className="h-full flex flex-col justify-between">
              <label className="block text-sm mb-1 text-[#A1A1AA]">Type of Nft</label>
              <p className="text-xs text-[#A1A1AA] mb-4">Choose the correct awarding method</p>
              <div className="bg-[#2A2931] px-4 py-2 rounded-md text-white text-sm">
                {nft.typeOfAward}
              </div>
            </div>
            <div className="h-full flex flex-col justify-between">
              <label className="block text-sm mb-1 text-[#A1A1AA]">Campaign</label>
              <p className="text-xs text-[#A1A1AA] mb-4">Choose the campaign when this NFT will be awarded randomly</p>
              <div className="bg-[#2A2931] px-4 py-2 rounded-md text-white text-sm">
                {nft.status}
              </div>
            </div>
          </div>

       <div className="text-[10px] text-[#A1A1AA] mb-4 pt-10">
       A new NFT will be minted within the OpenSea ecosystem as part of the official CharCoin collection. This NFT will remain under CharCoin&apos;s ownership until it is transferred to the randomly selected winner of the month. Each NFT carries a 10% intellectual property royalty on every transaction, supporting the CharCoin community. The NFT will be awarded as a gift to a CharCoin ecosystem user who has completed at least one transaction during the campaign month. The winner will be announced and credited on the 25th of the campaign month.
       </div>

          <div className="pt-4">
            <a 
              href={nft.preview} 
              target="_blank" 
              rel="noopener noreferrer"
              className=" flex w-fit gap-2 items-center  bg-[#3CFEC3] text-black font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90"
            >
              Mint NFT in Solanart 
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
