import useDialogStore from "@/stores/dialog-store";
import { DownloadSolid, Edit } from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HeaderWrapper } from "../custom/header-wrapper";

const details = [
  { label: "Country", value: "Nicaragua" },
  { label: "Start Date", value: new Date().getUTCDate() },
  { label: "End Date", value: new Date().getUTCDate() },
  { label: "Month / Year Campaign", value: new Date().getUTCDate() },
];

const personalDetails = [
  { label: "Contact / Responsible", value: "Mr. Josué Eliseo Méndez" },
  { label: "Email", value: "josue.mendez@foundation.org" },
  { label: "Phone", value: "+505-9856-98745" },
  { label: "Position", value: "Finance Director" },
];

export const CauseDetail = () => {
  const { setCausesOpenEdit } = useDialogStore();
  const [isEdit, setIsEdit] = useState(true);
  return (
    <div >
      <Image
        src={"/board.svg"}
        alt="board"
        width={500}
        height={300}
        className="w-full "
      />
      <div className="p-6 flex flex-col  gap-6">
        {/* Header Information */}
        <div>
          <span className="uppercase text-xs leading-5 tracking-[3px]">
            Education
          </span>
          <h1 className="text-2xl  leading-10">
            Building 3 schools in the west side of Nicaragua{" "}
          </h1>
          <span className="gap-2 text-xs inline ">
            Organization:{" "}
            <Link href={"/"} className="text-primary hover:underline">
              Schools For the Future
            </Link>{" "}
            - 30,114 Points from 6,245 benefactors{" "}
          </span>
        </div>
        {/* Stats */}
        <div className="grid h-max my-auto  grid-cols-[repeat(auto-fit,_minmax(120,+1fr))]  gap-8">
          <div className="!bg-custom-slate text-center gap-4  p-4 py-8 rounded-xl flex justify-between px-8 max-md:flex-col ">
            <span className="space-y-2">
              {" "}
              <div className="text-3xl">2</div>
              <p className="text-custom-light_text text-xs">Current position</p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />
            <span className="space-y-2">
              {" "}
              <div className="text-3xl flex justify-center items-center">
                $40,000.00
              </div>
              <p className="text-custom-light_text text-xs">
                Potential winning
              </p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />

            <span className="space-y-2">
              {" "}
              <div className="text-3xl flex whitespace-nowrap  justify-center items-center">
                $6,000.00{" "}
              </div>
              <p className="text-custom-light_text text-xs">
                Final potential monthly donation (15% staking profit){" "}
              </p>
              <Button className="bg-custom-purple !ring-custom-purple tracking-wider hover:bg-custom-purple-/90 text-foreground">
                Infinite Impact
              </Button>
            </span>
          </div>
        </div>
        {/* Detail Like Country,.... */}
        <div className="flex flex-wrap gap-x-10  gap-y-5 text-sm">
          {details?.map((item, key) => {
            return (
              <div key={key} className="flex flex-col  text-center">
                <span className="text-muted-foreground">{item?.value}</span>
                <span>{item?.label}</span>
              </div>
            );
          })}
        </div>
        <hr className="bg-[#323138] " />
        {/* Wallet Information */}
        <div className="flex justify-between flex-wrap text-sm">
          <p className="text-primary !break-words line-clamp-1  ">
            0xfd88987b67c265fe57f1bdb3b57d97b717ef567e20bd18ba3c2a780040f15634d6fe
            <br />
            <span className="text-muted-foreground">
              Donation Receiver Wallet
            </span>
          </p>
          <Button variant={"link"} size={"sm"}>
            <DownloadSolid />
            Download Agreement
          </Button>
        </div>
        <hr className="bg-[#323138] " />

        {/* User Information */}
        <div className="flex flex-wrap justify-between space-y-5 gap-x-10 text-sm">
          {personalDetails?.map((item, key) => {
            return (
              <div key={key} className="flex flex-col  text-center">
                <span className="text-muted-foreground">{item?.value}</span>
                <span>{item?.label}</span>
              </div>
            );
          })}
        </div>
        <hr className="bg-[#323138] " />
        {/* Edit Button  */}
        <Button
          size={"lg"}
          onClick={() => setCausesOpenEdit(true)}
          className={cn("text-lg ml-auto", !isEdit && "hidden")}
          rounded={"xl"}
        >
          Edit
          <Edit className="!w-6 !h-6" />
        </Button>

        <HeaderWrapper
        size={"sm"}
        title={<div className="font-normal tracking-wider">Updates - <span className="text-muted-foreground">Professional Media by CharCoin</span></div>}
        description={<span className="text-xs">Videos uploaded in this section will show up to all benefactors that voted for this project.</span>}
       
        />
      </div>

    </div>
  );
};
