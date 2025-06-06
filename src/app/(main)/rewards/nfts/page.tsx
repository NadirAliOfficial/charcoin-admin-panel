"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { nftsColumns } from "@/components/columns/nfts_column";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { CreateNftsTwo } from "@/components/nfts/create-nfts-02";
import { CustomSheet } from "@/components/reuseable/add-causes-sheet";
import { SearchInput } from "@/components/reuseable/search-input";
import { NftsTable } from "@/components/rewards/nfts-table";
import { Button } from "@/components/ui/button";
import useDialogStore from "@/stores/dialog-store";
import { NFTSRecord } from "@/types/rewards";
import { ArrowRightIcon } from "lucide-react";
import { TypeSelector, TypeOption } from "@/components/ui/TypeSelector";
import { NftDetail } from "@/components/nfts/nft-detail";

const transactionRecords: NFTSRecord[] = [
  {
    username: "Waiting campaign completion",
    wallet: "",
    hash: "",
    status: "Waiting campaign completion",
    typeOfAward: "Campaign Winner",
    date: new Date("2025-03-25T00:00:00Z"),
    preview: "Preview in Solanart",
    name: "March 2025 Campaign Winner NFT",
    description: "NFT for campaign winner",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    username: "SmartCircus",
    wallet: "9H7XWqE2r1B5YvKjkhq3n8v7TcdPzMoJfHxuAWfhqXg",
    hash: "qE2r1B5YvKjkhq3n8v7H7XWqE2r1B7TCdPq6B5YvKjkhq3n",
    status: "Awarded",
    typeOfAward: "Campaign Winner",
    date: new Date("2025-02-25T00:00:00Z"),
    preview: "Preview in Solanart",
    name: "February 2025 Winner NFT",
    description: "NFT awarded to SmartCircus",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    username: "DeepWaters87",
    wallet: "VjKjkhq3n8v7TcdPzMoJfHxuAWfhqXg9H7XWqE2r1B5",
    hash: "5VjKjkhq3n8v7H7XWqE2r1B5YvKjkhq3n8HHoJf7TCdPq6B5YvKjkhq3n",
    status: "Awarded",
    typeOfAward: "Direct Transfer",
    date: new Date("2025-02-25T00:00:00Z"),
    preview: "Preview in Solanart",
    name: "DeepWaters Special NFT",
    description: "Direct transfer NFT",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    username: "GreatLakes_23",
    wallet: "VjKjkhq3n8v7TcdPzMoJfHxuAWfhqXg9H7XWqE2r1B5VhNqXg",
    hash: "qE2r1B7XWqE2eB5YvKjKjkhq3n8HHoJf7TCdPq6B5YvKjkhq3n",
    status: "Awarded",
    typeOfAward: "Campaign Winner",
    date: new Date("2025-01-25T00:00:00Z"),
    preview: "Preview in Solanart",
    name: "January 2025 Winner NFT",
    description: "Campaign winner NFT",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    username: "Marcus_lkl",
    wallet: "VjKjkhq3n8ku4H7XWqE2r1B5YvKjkhq3n8v7TcdPzMoJf",
    hash: "qE2r1H7XWqE2r1B5VjKjkhq3n8HHoJf7TCdPq6B5YvKjkhq3n",
    status: "Awarded",
    typeOfAward: "Campaign Winner",
    date: new Date("2024-12-25T00:00:00Z"),
    preview: "Preview in Solanart",
    name: "December 2024 Winner NFT",
    description: "Campaign winner NFT",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    username: "FroSand82",
    wallet: "VjKjkhq3n8v7H7XWqE2r1B5VhNqXg9H7XWqE2r1B5T5Tc",
    hash: "qE2r1B5VjKjkhq3n8HHoJf7TCdPq6B5YvKjkhq3n",
    status: "Awarded",
    typeOfAward: "Campaign Winner",
    date: new Date("2024-12-25T00:00:00Z"),
    preview: "Preview in Solanart",
    name: "December 2024 Special NFT",
    description: "Campaign winner NFT",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// ✅ Explicitly define the return type as `Promise<TransactionRecord[]>`
const fetchTransactions = async (
  query = "",
  month = new Date()
): Promise<NFTSRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = transactionRecords.filter(
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
  const { openDialog, setNftsAdd } = useDialogStore();
  // Import TypeOption from the correct location if not already imported
  // import type { TypeOption } from "@/components/ui/TypeSelector";
  const [selectedType, setSelectedType] = useState<TypeOption | undefined>(undefined);

  const { data = [], isLoading } = useQuery<NFTSRecord[]>({
    queryKey: ["nfts", searchQuery, date],
    queryFn: () => fetchTransactions(searchQuery, date),
  });

  return (
    <HeaderWrapper
      title="Rewards - NFTs"
      description="NFT collections and distribution control"
      actions={
        <Button size={"lg"} onClick={() => setNftsAdd(true)} endIcon={ArrowRightIcon}>
          Add new
        </Button>
      }
    >
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4 max-md:flex-col">
          <TypeSelector
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            className="your-custom-styles"
          />
          <SearchInput
            placeholder="Search by username, wallet, or hash"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <NftsTable
          data={data}
          columns={nftsColumns}
          fetching={isLoading}
        />
        <CustomSheet
          isOpen={openDialog == "nfts_add"}
          setIsOpen={setNftsAdd}
          title="Add NFT"
          className="pt-2 px-4"
        >
          <CreateNftsTwo />
        </CustomSheet>
      </div>
    </HeaderWrapper>
  );
};

export default TopTiers;
