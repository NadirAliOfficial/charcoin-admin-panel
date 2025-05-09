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

// Function to filter transactions based on search and date
const fetchTransactions = async (
  query = "",
  selectedDate: Date
): Promise<TransactionRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = transactionRecords.filter((record) => {
        const matchesSearch =
          record.username.toLowerCase().includes(query.toLowerCase()) ||
          record.wallet.toLowerCase().includes(query.toLowerCase()) ||
          record.hash.toLowerCase().includes(query.toLowerCase());

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

  const { data = [], isLoading } = useQuery<TransactionRecord[]>({
    queryKey: ["transactions", searchQuery, selectedDate],
    queryFn: () => fetchTransactions(searchQuery, selectedDate),
  });

  return (
    <div >
       <HeaderWrapper
      title="Rewards - Top Tiers"
      description="Showing the top 10 users with the most volume in the selected period"
    />
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4 max-md:flex-col">
          <DateTimePicker date={selectedDate} setDate={setSelectedDate} />
          <SearchInput placeholder="Search by username, wallet, or hash" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
         
        </div>

        <TopTierTable
          data={data}
          columns={TopTierColumn}
          fetching={isLoading}
        />
      </div>
   </div>
  );
};

export default TopTiers;
