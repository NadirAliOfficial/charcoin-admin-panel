"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "@/components/ui/date-time-picker";

import { TopTierTable } from "@/components/rewards/top-tier-table";
import { TopTierColumn } from "@/components/columns/top-tier-column";
import InputWithText from "@/components/ui/input-with-text";
import { SearchInput } from "@/components/reuseable/search-input";
import { CampaignPeriodSelector } from "@/components/ui/CampaignPeriodSelector";
import type { CampaignPeriod } from "@/components/ui/CampaignPeriodSelector";

// Update TransactionRecord type
type TransactionRecord = {
  position: number;
  username: string;
  wallet: string;
  transactions: number;
  amount: number;
  registration: Date;
  lastTransaction: Date;
  awarded: number;
};

// Update mock data without hash
const transactionRecords: TransactionRecord[] = [
  {
    position: 1,
    username: "SmartCircus",
    wallet: "9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv",
    transactions: 241,
    amount: 124125.2,
    registration: new Date(2024, 8, 20),
    lastTransaction: new Date(2025, 2, 21),
    awarded: 2245.25,
  },
  {
    position: 2,
    username: "BoosterCoast",
    wallet: "2aH8KWrTqE9B5VjKshp7Qn3Y7TcdP6ZMoJFkxuAWhqKv",
    transactions: 220,
    amount: 121178.98,
    registration: new Date(2024, 8, 17),
    lastTransaction: new Date(2025, 2, 21),
    awarded: 2008.1,
  },
];

// Update search filter logic
const fetchTransactions = async (
  query = "",
  selectedDate: Date
): Promise<TransactionRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = transactionRecords.filter((record) => {
        const matchesSearch =
          record.username.toLowerCase().includes(query.toLowerCase()) ||
          record.wallet.toLowerCase().includes(query.toLowerCase());

        // Check if the record falls in the range
        const startDate = new Date(1999, 0, 1);
        const isWithinRange =
          record.registration >= startDate &&
          record.registration <= selectedDate &&
          record.lastTransaction >= startDate &&
          record.lastTransaction <= selectedDate;

        return matchesSearch && isWithinRange;
      });

      resolve(filtered);
    }, 500);
  });
};

const TopTiers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Import the CampaignPeriod type if not already imported

  const [selectedCampaign, setSelectedCampaign] = useState<CampaignPeriod | undefined>();

  const { data = [], isLoading } = useQuery<TransactionRecord[]>({
    queryKey: ["transactions", searchQuery, selectedDate],
    queryFn: () => fetchTransactions(searchQuery, selectedDate),
  });

  return (
    <div>
      <HeaderWrapper
        title="Rewards - Top Tiers"
        description="Showing the top 10 users with the most volume in the selected period"
      />
      <div className="mb-6 ">
        <div className="flex items-center justify-between gap-4 mb-4 max-md:flex-col">
          <div className="flex items-center gap-4">
            <CampaignPeriodSelector
              selectedCampaign={selectedCampaign}
              onCampaignChange={setSelectedCampaign}
              className="text-xs"
            />
            <SearchInput
              placeholder="Search by username, wallet, or hash"
              value={searchQuery}
              className="text-xs"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex text-xs gap-1 text-[#eda406]">
            The data below changes every 10 minutes based on latest query to the blockchain and is not final.
            <button className="text-primary" onClick={() => window.location.reload()}>
              Refresh page.
            </button>
          </div>

        </div>

        <TopTierTable
          data={data}
          hideHash={true} 
          columns={TopTierColumn as import("@tanstack/react-table").ColumnDef<TransactionRecord, unknown>[]}
          fetching={isLoading}
        />
      </div>
    </div>
  );
};

export default TopTiers;
