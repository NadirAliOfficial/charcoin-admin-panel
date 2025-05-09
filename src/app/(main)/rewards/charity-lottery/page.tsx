"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { TopTierColumn } from "@/components/columns/top-tier-column";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { SearchInput } from "@/components/reuseable/search-input";
import { TopTierTable } from "@/components/rewards/top-tier-table";
import { DateTimePicker } from "@/components/ui/date-time-picker";

// Define a type for transactions
type TransactionRecord = {
  position: number;
  username: string;
  wallet: string;
  hash: string;
  transactions: number;
  amount: number;
  registration: Date;
  lastTransaction: Date;
  awarded: number;
};

// Mock transaction data
const transactionRecords: TransactionRecord[] = [
  {
    position: 1,
    username: "SmartCircus",
    wallet: "9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv",
    hash: "qE2z1B5VjKshp3Q9fH7XWqE2z18Y7TcdP6pB5VjKshp3Qn",
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
    hash: "rTqE9B5VjKshp3Q8H7XWqE2z1Y7TcdP6pB5VjKshp3Qn",
    transactions: 220,
    amount: 121178.98,
    registration: new Date(2024, 8, 17),
    lastTransaction: new Date(2025, 2, 21),
    awarded: 2008.1,
  },
];

// ✅ Explicitly define the return type as `Promise<TransactionRecord[]>`
const fetchTransactions = async (
  query = "",
  month = new Date()
): Promise<TransactionRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = transactionRecords.filter(
        (record) =>
          record.username.toLowerCase().includes(query.toLowerCase()) ||
          record.wallet.toLowerCase().includes(query.toLowerCase()) ||
          record.hash.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};

const TopTiers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const { data = [], isLoading } = useQuery<TransactionRecord[]>({
    queryKey: ["transactions", searchQuery, date],
    queryFn: () => fetchTransactions(searchQuery, date),
  });

  return (
    <HeaderWrapper
      title="Rewards - Top Tiers"
      description="Showing the top 10 users with the most volume in the selected period"
    >
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4 max-md:flex-col">
          <DateTimePicker date={date} setDate={setDate} />

          <SearchInput
            placeholder="Search by username, wallet, or hash"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TopTierTable
          data={data} // ✅ Now `data` is always a TransactionRecord[]
          columns={TopTierColumn?.slice(1)}
          fetching={isLoading}
        />
      </div>
    </HeaderWrapper>
  );
};

export default TopTiers;
