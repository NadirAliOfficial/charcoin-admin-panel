
"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

import { AdminstrationColumn } from "@/components/columns/administration";
import { AdministrationTable } from "@/components/community/administration-table";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { CustomSheet } from "@/components/reuseable/add-causes-sheet";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import useDialogStore from "@/stores/dialog-store";
import { Administration } from "@/types/administration";
import { AddAdministrator } from "@/components/community/add-adminstration";
import { administration } from "./admins";

// ✅ Explicitly define the return type as `Promise<TransactionRecord[]>`
const fetchTransactions = async (
  query = "",
  month = new Date()
): Promise<Administration[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = administration.filter(
        (record) => record.username.toLowerCase().includes(query.toLowerCase())
        // record.username.toLowerCase().includes(query.toLowerCase()) ||
        // record.wallet.toLowerCase().includes(query.toLowerCase()) ||
        // record.hash.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};








const AdministrationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const { openDialog, setCommunityAdministrationAdd } = useDialogStore();


  const { data = [], isLoading } = useQuery<Administration[]>({
    queryKey: ["administration", searchQuery, date],
    queryFn: () => fetchTransactions(searchQuery, date),
  });




  return (
    <HeaderWrapper
      title="Administrators"
      description="Users with privilege access in the CharCoin ecosystem"
      actions={
        <Button
          size={"lg"}
          className="max-md:px-4 max-md:h-10 ml-4"
          onClick={() => {
            setCommunityAdministrationAdd(true);
          }}
        >
          Add new →
        </Button>
      }
    >
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
      
          <div className="relative  w-80 ">
            <Input
              className="!w-full !bg-[#3D3C44] "
              variant={"newly_secondary"}
              placeholder="Search by Username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <AdministrationTable
          data={data} // ✅ Now `data` is always a TransactionRecord[]
          columns={AdminstrationColumn}
          fetching={isLoading}
        />
      </div>



      
      <CustomSheet
        isOpen={openDialog == "community_administration_add"}
        setIsOpen={setCommunityAdministrationAdd}
        title="Edit Cause form"
        className="!p-0"
      >
        <AddAdministrator />
      </CustomSheet>
    </HeaderWrapper>
  );
};

export default AdministrationPage;
