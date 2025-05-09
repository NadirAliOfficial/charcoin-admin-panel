"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { stakingColumns } from "@/components/columns/staking_column";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { SearchInput } from "@/components/reuseable/search-input";
import { StakingTable } from "@/components/rewards/staking-table";
import { Card } from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { StakingData, StakingEntry } from "@/types/staking";

// Example Data
const stakingExample: StakingData = {
  staking_summary: {
    total_tokens_staked: 2245587,
    staking_profits: 336838.05,
    profit_percentage: 15,
  },
  display_data: "January 2025",
  total_records: 7457,
  staking_data: [
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 2450,
      start_date: new Date("Mar 17, 2025"),
      expiration_date: new Date("Apr 16, 2025"),
      staking_duration: 30,
      voting_power: 0.5,
      status: "Active",
    },
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 6475,
      start_date: new Date("May 22, 2025"),
      expiration_date: new Date("Feb 21, 2025"),
      staking_duration: 30,
      voting_power: 0.5,
      status: "Active",
    },
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 20000,
      start_date: new Date("May 10, 2025"),
      expiration_date: new Date("Jul 19, 2025"),
      staking_duration: 60,
      voting_power: 1,
      status: "Active",
    },
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 5110,
      start_date: new Date("Apr 15, 2025"),
      expiration_date: new Date("May 14, 2025"),
      staking_duration: 30,
      voting_power: 0.5,
      status: "Active",
    },
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 2447,
      start_date: new Date("Apr 7, 2025"),
      expiration_date: new Date("Sep 14, 2025"),
      staking_duration: 120,
      voting_power: 3,
      status: "Active",
    },
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 84475,
      start_date: new Date("Mar 30, 2025"),
      expiration_date: new Date("Apr 28, 2025"),
      staking_duration: 30,
      voting_power: 0.5,
      status: "Completed",
    },
    {
      username: "SmartCircus",
      wallet: "0H7hXwqZtB3VjKhgSa8nY7tCdPGzMoJFlxkuAWNqKv",
      staking_id: "37298478983",
      staked_amount: 7895,
      start_date: new Date("Mar 28, 2025"),
      expiration_date: new Date("Aug 22, 2025"),
      staking_duration: 180,
      voting_power: 5,
      status: "Stopped",
    },
  ],
};

// ✅ Explicitly define the return type as `Promise<TransactionRecord[]>`
const fetchTransactions = async (
  query = "",
  month = new Date()
): Promise<StakingEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = stakingExample?.staking_data.filter(
        (record) => record.username.toLowerCase().includes(query.toLowerCase())
        // ||
        // record.wallet.toLowerCase().includes(query.toLowerCase()) ||
        // record.hash.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};

const TopTiers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const { data = [], isLoading } = useQuery<StakingEntry[]>({
    queryKey: ["staking", searchQuery, date],
    queryFn: () => fetchTransactions(searchQuery, date),
  });

  return (
    <HeaderWrapper
    mainClassName="!justify-start items-start gap-4 max-md:flex-col" 
      title="Staking"
      description="List of users staking the CharCoin Token"
      actions={
        <div className="grid grid-cols-[1fr,_2px,_1fr] gap-4 mb-6  p-4 rounded-xl text-sm bg-background">
          <Card className=" text-white bg-transparent border-none shadow-none">
            <p className="text-lg font-semibold">2,245,587</p>
            <p className="text-gray-400">Tokens in Staking</p>{" "}
          </Card>
          <div className="w-full bg-custom-slate  " />
          <Card className=" text-white bg-transparent border-none shadow-none">
            <p className="text-lg font-semibold">336,838.05</p>
            <p className="text-gray-400">Profit for Staking (15%)</p>{" "}
          </Card>
        </div>
      }
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

        <StakingTable
          data={data}
          columns={stakingColumns}
          fetching={isLoading}
        />
      </div>
    </HeaderWrapper>
  );
};

export default TopTiers;
