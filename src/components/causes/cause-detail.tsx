import useDialogStore from "@/stores/dialog-store";
import { DownloadSolid, Edit } from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HeaderWrapper } from "../custom/header-wrapper";
import { Cause } from "@/types/causes";

interface CauseDetailProps {
  initialData: Cause | null;
}

export const CauseDetail = ({ initialData }: CauseDetailProps) => {
  const { setCausesOpenEdit } = useDialogStore();
  const [isEdit, setIsEdit] = useState(true);

  const cause = initialData;

  if (!cause) {
    return <div>Select a cause to see details.</div>;
  }

  const details = [
    { label: "Country", value: "Nicaragua" },
    { label: "Start Date", value: cause.startedOn },
    { label: "End Date", value: cause.endsOn },
    { label: "Month / Year Campaign", value: cause.endsOn },
  ];

  const personalDetails = [
    { label: "Contact / Responsible", value: "Mr. Josué Eliseo Méndez" },
    { label: "Email", value: "josue.mendez@foundation.org" },
    { label: "Phone", value: "+505-9856-98745" },
    { label: "Position", value: "Finance Director" },
  ];

  return (
    <div className="font-WFVisualSansRegular bg-[#232226]">
      <Image
        src={cause.image || "/placeholder.svg"}
        alt={cause.name || "Cause image"}
        width={500}
        height={300}
        className="w-full"
      />
      <div className="p-6 flex flex-col gap-6">
        <div>
          <span className="uppercase text-xs leading-5 tracking-[3px]">
            {cause.category}
          </span>
          <h1 className="text-2xl leading-10">
            {cause.name}
          </h1>
          <span className="gap-2 text-xs inline">
            Organization:{" "}
            <Link href={"/"} className="text-primary hover:underline">
              {cause.organization}
            </Link>{" "}
            - {cause.points?.count} {cause.points?.label} from {cause.benefactors} benefactors
          </span>
        </div>
        <div className="grid h-max my-auto grid-cols-[repeat(auto-fit,_minmax(120,+1fr))] gap-8">
          <div className="bg-[#1d1c21] text-center gap-4 p-4 py-8 rounded-xl flex justify-between px-8 max-md:flex-col">
            <span className="space-y-2">
              <div className="text-3xl">2</div>
              <p className="text-custom-light_text text-xs">Current position</p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />
            <span className="space-y-2">
              <div className="text-3xl flex justify-center items-center">
                $40,000.00
              </div>
              <p className="text-custom-light_text text-xs">
                Potential winning
              </p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />
            <span className="space-y-2">
              <div className="text-3xl flex whitespace-nowrap items-center">
                $6,000.00
              </div>
              <p className="text-custom-light_text text-xs">
                Final potential monthly donation (15% staking profit)
              </p>
              <Button className="bg-custom-purple h-[30px] text-[10px] !ring-custom-purple tracking-wider hover:bg-custom-purple-/90 text-foreground">
                {cause.type}
              </Button>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-5 text-sm border-b border-[#323138] pb-5">
          {details?.map((item, key) => (
            <div key={key} className="flex flex-col">
              <span className="tex-xs">{item?.value}</span>
              <span className="text-xs text-gray-400">{item?.label}</span>
            </div>
          ))}
        </div>
       
        <div className="flex justify-between flex-wrap text-sm border-b border-[#323138] pb-5">
          <p className="text-primary !break-words line-clamp-1 text-xs">
            0xfd88987b67c265fe57f1bdb3b57d97b717ef567e20bd18ba3c2a780040f15634d6fe
            <br />
            <span className="text-muted-foreground text-xs">
              Donation Receiver Wallet
            </span>
          </p>
          <Button variant={"link"} size={"sm"} className="text-xs">
            <DownloadSolid />
            Download Agreement
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-between items-center border-b border-[#323138] pb-4 space-y-5 gap-x-10 text-sm">
          {personalDetails?.map((item, key) => (
            <div key={key} className="flex flex-col">
              <span className="">{item?.value}</span>
              <span className="text-gray-400">{item?.label}</span>
            </div>
          ))}
        </div>
       
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
          title={
            <div className="tracking-wider">
              Updates -{" "}
              <span className="text-muted-foreground">
                Professional Media by CharCoin
              </span>
            </div>
          }
          description={
            <span className="text-xs">
              Videos uploaded in this section will show up to all benefactors that
              voted for this project.
            </span>
          }
        />
      </div>
    </div>
  );
};
