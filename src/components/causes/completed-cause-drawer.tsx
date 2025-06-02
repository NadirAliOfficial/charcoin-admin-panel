import { CustomSheet } from "../reuseable/add-causes-sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { DownloadSolid, X } from "@mynaui/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircleArrowUp, Trash } from "lucide-react";

interface CompletedCauseDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cause: any;
}

export function CompletedCauseDrawer({ isOpen, setIsOpen, cause }: CompletedCauseDrawerProps) {
  // Dummy payout and update data for now
  const [payouts] = useState([
    {
      amount: "$6,000.00 USD (SOL)",
      hash: "0xfd8bd18ba3c2a780040f15634d6fe8987b67c265fe57f1bdb3b5797b717ef567e20",
      date: "May 5, 2025 at 16:23",
      admin: "Confidencial Name 1",
    },
    {
      amount: "$6,000.00 USD (SOL)",
      hash: "0xfd8bd18ba3c2a780040f15634d6fe8987b67c265fe57f1bdb3b5797b717ef567e20",
      date: "April 5, 2025 at 19:54",
      admin: "Confidencial Name 1",
    },
    {
      amount: "$5,000.00 USD (SOL)",
      hash: "0xfd8bd34d6fe8987b67c265fe57f1bdb3b5797b717ef567e20",
      date: "March 5, 2025 at 10:11",
      admin: "Confidencial Name 1",
    },
  ]);

  // Dummy video updates
  const proMedia = [
    { url: "/placeholder.svg?height=120&width=200", uploadedBy: "CharCoin", date: "February 20, 2025" },
    { url: "/placeholder.svg?height=120&width=200", uploadedBy: "CharCoin", date: "February 27, 2025" },
  ];
  const orgMedia = [
    { url: "/placeholder.svg?height=120&width=200", uploadedBy: "José Ernesto Manzón", date: "February 23, 2025" },
    { url: "/placeholder.svg?height=120&width=200", uploadedBy: "José Ernesto Manzón", date: "February 25, 2025" },
  ];

  return (
    <CustomSheet isOpen={isOpen} setIsOpen={setIsOpen} title="Cause Details" className="!p-0">
      <div className=" bg-[#232226] relative">
        {/* Header image and close button */}
        <div className="relative">
          <Image
            src={"/feature-image.png"}
            alt="cover"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />

        </div>
        <div className="p-8 flex flex-col gap-6">
          {/* Project Details */}
          <div>
            <span className="uppercase text-xs leading-5 tracking-[3px]">{cause?.category}</span>
            <h1 className="text-2xl leading-10 mb-1">{cause?.name}</h1>
            <span className="gap-2 text-xs inline">
              Organization: <span className="text-primary">{cause?.organization}</span> - {cause?.points?.count?.toLocaleString()} Points from {cause?.benefactors?.toLocaleString()} benefactors
            </span>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 bg-[#1d1c21] rounded-xl p-6 ">
            <div>
              <div className="text-3xl">{cause?.currentlyWinning?.position}</div>
              <div className="text-custom-light_text text-xs">Current position</div>
            </div>
            <div>
              <div className="text-3xl">{cause?.currentlyWinning?.amount}</div>
              <div className="text-custom-light_text text-xs">Won</div>
            </div>
            <div>
              <div className="text-3xl">$6,000.00</div>
              <div className="text-custom-light_text text-xs">Monthly donation (15% staking profit)</div>
              <Button className="bg-custom-purple h-[30px] text-[10px] mt-2 !ring-custom-purple tracking-wider hover:bg-custom-purple-/90 text-foreground">Infinite Impact</Button>
            </div>
          </div>
          {/* Details */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 text-sm border-b border-[#323138] pb-5">
            <div className="flex flex-col">
              <span>{cause?.country || "Chile"}</span>
              <span className="text-xs text-gray-400">Country</span>
            </div>
            <div className="flex flex-col">
              <span>{cause?.startedOn}</span>
              <span className="text-xs text-gray-400">Start date</span>
            </div>
            <div className="flex flex-col">
              <span>{cause?.endsOn}</span>
              <span className="text-xs text-gray-400">End date</span>
            </div>
            <div className="flex flex-col">
              <span>January 2025</span>
              <span className="text-xs text-gray-400">Month / Year Campaign</span>
            </div>
          </div>
          {/* Wallet Info */}
          <div className="flex justify-between flex-wrap text-sm border-b border-[#323138] pb-5">
            <p className="text-primary !break-words line-clamp-1 text-xs">
              0xfd8bd18ba3c2a780040f15634d6fe8987b67c265fe57f1bdb3b5797b717ef567e20
              <br />
              <span className="text-muted-foreground text-xs">Donation Receiver Wallet</span>
            </p>
            <Button variant={"link"} size={"sm"} className="text-xs">
              <DownloadSolid /> Download Agreement
            </Button>
          </div>
          {/* Contact Info */}
          <div className="flex flex-wrap justify-between items-center border-b border-[#323138] pb-4 space-y-5 gap-x-10 text-sm">
            <div className="flex flex-col">
              <span>Mr. Ernesto José Manzón</span>
              <span className="text-gray-400">Contact / Responsible</span>
            </div>
            <div className="flex flex-col">
              <span>ernesto.monzon@foundation.org</span>
              <span className="text-gray-400">Email</span>
            </div>
            <div className="flex flex-col">
              <span>+515-125-9854541</span>
              <span className="text-gray-400">Phone</span>
            </div>
            <div className="flex flex-col">
              <span>General Director</span>
              <span className="text-gray-400">Position</span>
            </div>
          </div>
          {/* Updates Section - Professional Media by CharCoin */}
          <div className="mt-6">
            <div className=" border-b border-gray-700 mb-5 pb-5 justify-between">
              <h2 className="text-lg font-semibold">Updates -<span className="text-gray-400 ml-2">Professional Media by CharCoin</span> </h2>
              <p className="text-gray-400 text-xs">Videos uploaded in this section will show up to all benefactors that voted for this project.</p>
            </div>
            <Button className="bg-primary text-xs px-10 py-2 mb-5">Upload Video <CircleArrowUp size={20} /></Button>
            <div className="w-full gap-4 mb-4 pb-10">
              {proMedia.map((media, idx) => (
                <div key={idx} className=" w-full flex gap-4 justify-between  rounded-lg p-2  items-center">

                  <div className="flex items-center gap-5">
                  <Image src={"/feature-image.png"} alt="video" width={180} height={30} className="rounded-md  mb-2" />
                  <div >
                    <div className="text-xs text-muted-foreground mb-1">Uploaded by: {media.uploadedBy}</div>
                    <div className="text-xs text-muted-foreground mb-2">Uploaded on {media.date}</div>
                  </div>
                  </div>
                  


                  <Button variant="destructive" size="sm" className="w-fit text-black bg-red-300 px-10">Delete <Trash size={20}/></Button>
                </div>
              ))}
            </div>
            {/* Organization uploads */}
            <div className="border-b border-gray-700 pb-5 mb-10">
            <h2 className="text-lg font-semibold mb-2">Updates - <span className="text-gray-400">Uploaded by Organization</span></h2>
            <p className="text-xs text-gray-400">Videos uploaded in this section will show up to all benefactors that voted for this project only after approval.</p>
            </div>
            
            <div className="flex flex-col w-full gap-4 mb-4">
              {orgMedia.map((media, idx) => (
                <div key={idx} className=" rounded-lg p-2 flex w-full justify-between items-center">
                  <Image src={media.url} alt="video" width={180} height={100} className="rounded-md mb-2" />
                  <div className="text-xs text-muted-foreground mb-1">Uploaded by: {media.uploadedBy}</div>
                  <div className="text-xs text-muted-foreground mb-2">Uploaded on {media.date}</div>
                  <div className="flex gap-2 w-full">
                    <Button variant="destructive" size="sm" className="">Delete</Button>
                    {idx === 1 ? (
                      <>
                        <Button variant="default" size="sm" className="flex-1 bg-custom-purple">Approve ✓</Button>
                        <Button variant="outline" size="sm" className="flex-1 border-red-500 text-red-500">Reject ✗</Button>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Payouts Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Payouts</h2>
            <div className="bg-[#1d1c21] rounded-lg p-4">
              <div className="mb-2 text-xs text-muted-foreground">Review the payouts history and place a new wallet transfer request.</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="text-xs mb-1">New transfer payout request</div>
                  <div className="w-full h-2 bg-[#323138] rounded-full mb-2">
                    <div className="h-2 bg-custom-purple rounded-full" style={{ width: '4%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Maximum for this transaction: $6,000 USDT (SOL)</div>
                </div>
                <Button className="bg-custom-purple text-xs px-4 py-2">Release Payout</Button>
              </div>
              <div className="text-right text-xl font-bold mb-2 text-white">$17,000.00</div>
              <div className="text-xs text-muted-foreground mb-2">Donated so far</div>
              <div className="border-t border-[#323138] pt-2 mt-2">
                {payouts.map((p, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-sm text-white">{p.amount}</div>
                    <div className="text-xs text-primary break-all">HASH: {p.hash}</div>
                    <div className="text-xs text-muted-foreground">Sent on {p.date} - Authorized by administrator: {p.admin}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomSheet>
  );
} 