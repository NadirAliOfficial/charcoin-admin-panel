"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

import { NewsColumn } from "@/components/columns/news-column";
import AddNewNews from "@/components/community/add-new-news";
import { NewsTable } from "@/components/community/news-table";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { CustomSheet } from "@/components/reuseable/add-causes-sheet";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import useDialogStore from "@/stores/dialog-store";
import { NewsArticle, NewsData, NewsStatus } from "@/types/news";

const newsExample: NewsData = {
  news_summary: {
    total_articles: 5,
  },
  news_data: [
    {
      id: 124,
      video_thumbnail:
        "https://fastly.picsum.photos/id/606/200/300.jpg?blur=2&hmac=zNI-M9rxd9jMP10_lTs7UEldQB-G0RIEBoY7JHePXAA",
      title: "We are making a difference in water cleaning",
      short_description:
        "We are making a difference in water purification, bringing clean and safe water to communities in need. Every drop counts, and every effort changes lives. Join us in creating a cleaner future!",
      status: NewsStatus.Published,
      category: "Clean Water",
      posted_on: "Mar 21, 2025",
      views: 7145,
    },
    {
      id: 110,
      video_thumbnail:
        "https://fastly.picsum.photos/id/606/200/300.jpg?blur=2&hmac=zNI-M9rxd9jMP10_lTs7UEldQB-G0RIEBoY7JHePXAA",
      title: "Clean Water for Thousands: New Wells Installed in Kenya",
      short_description:
        "Donations funded 10 new wells, providing clean water to over 5,000 people in rural Kenya, reducing disease and improving lives.",
      status: NewsStatus.Published,
      category: "Clean Water",
      posted_on: "Feb 17, 2025",
      views: 14214,
    },
    {
      id: 104,
      video_thumbnail:
        "https://fastly.picsum.photos/id/606/200/300.jpg?blur=2&hmac=zNI-M9rxd9jMP10_lTs7UEldQB-G0RIEBoY7JHePXAA",
      title: "100,000 Meals Delivered to Families in Crisis",
      short_description:
        "Thanks to generous donations, emergency food packages reached over 20,000 families suffering from hunger and malnutrition.",
      status: NewsStatus.Unpublished,
      category: "Malnutrition & Hunger",
      posted_on: "Feb 10, 2025",
      views: 8547,
    },
    {
      id: 90,
      video_thumbnail:
        "https://fastly.picsum.photos/id/606/200/300.jpg?blur=2&hmac=zNI-M9rxd9jMP10_lTs7UEldQB-G0RIEBoY7JHePXAA",
      title: "New School Opens, Giving 500 Kids a Future",
      short_description:
        "A new school, built with donor support, now educates 500 children in a low-income area, empowering them with knowledge and opportunities.",
      status: NewsStatus.Published,
      category: "Education",
      posted_on: "Dec 10, 2024",
      views: 3658,
    },
    {
      id: 90,
      video_thumbnail:
        "https://fastly.picsum.photos/id/606/200/300.jpg?blur=2&hmac=zNI-M9rxd9jMP10_lTs7UEldQB-G0RIEBoY7JHePXAA",
      title: "Solar Power Brings Light to Remote Villages",
      short_description:
        "Solar power installations in remote villages now provide sustainable energy for schools, homes, and healthcare access.",
      status: NewsStatus.Published,
      category: "House Building",
      posted_on: "Dec 2, 2024",
      views: 1124,
    },
  ],
};

// ✅ Explicitly define the return type as `Promise<TransactionRecord[]>`
const fetchTransactions = async (
  query = "",
  month = new Date()
): Promise<NewsArticle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = newsExample.news_data.filter(
        (record) => record.title.toLowerCase().includes(query.toLowerCase())
        // record.username.toLowerCase().includes(query.toLowerCase()) ||
        // record.wallet.toLowerCase().includes(query.toLowerCase()) ||
        // record.hash.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>(new Date()); 
  const { openDialog, setCommunityNewsAdd } = useDialogStore();

  const { data = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["news", searchQuery, date],
    queryFn: () => fetchTransactions(searchQuery, date),
  });

  return (
    <HeaderWrapper
      title="News"
      description="Public news about the progress of each donation and the CharCoin impact"
      actions={
        <Button
          size={"lg"}
          className="max-md:px-4 max-md:h-10 ml-4"
          onClick={() => {
            setCommunityNewsAdd(true);
          }}
        >
          Add new →
        </Button>
      }
    >
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4 max-md:flex-col">
          <DateTimePicker date={date  } setDate={setDate} />
         
          <div className="relative  w-80 ">
            <Input
              className="!w-full !bg-[#3D3C44] "
              variant={"newly_secondary"}
              placeholder="Search by username, wallet, or hash"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <NewsTable
          data={data} // ✅ Now `data` is always a TransactionRecord[]
          columns={NewsColumn}
          fetching={isLoading}
        />
      </div>
      <CustomSheet
        isOpen={openDialog == "community_news_add"}
        setIsOpen={setCommunityNewsAdd}
        title="Edit Cause form"
        className="pt-2 px-4"
      >
        <AddNewNews />
      </CustomSheet>
    </HeaderWrapper>
  );
};

export default News;
