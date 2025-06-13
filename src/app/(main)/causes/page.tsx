"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

import { AddCauseTable } from "@/components/causes/add-cause-table";
import { runningCauseColumns } from "@/components/columns/running_cause_column";
import { draftCauseColumns } from "@/components/columns/draft_cause_column";
import { completedCauseColumns } from "@/components/columns/completed_cause_column";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cause } from "@/types/causes";
import useDialogStore from "@/stores/dialog-store";
import { Button } from "@/components/ui/button";

// Create dummy data for different tabs
const runningCauses: Cause[] = [
  {
    id: 124,
    name: "Clean water in Guatemala's most affected community",
    category: "Clean Water",
    organization: "Water For America",
    currentlyWinning: {
      amount: "$70,000.00",
      position: 1,
    },
    startedOn: "Feb 1, 2023",
    endsOn: "Feb 20, 2025",
    benefactors: 8475,
    points: {
      count: 58457,
      label: "Points",
    },
    updates: 0,
    impact: { amount: "$0.00", payouts: 0 },
    type: "Infinite Impact",
    image: "/images/a1.png",
    status: "Published",
  },
  {
    id: 133,
    name: "Building 3 schools in the west side of Nicaragua",
    category: "Education",
    organization: "Schools For the Future",
    currentlyWinning: {
      amount: "$40,000.00",
      position: 2,
    },
    startedOn: "Feb 1, 2023",
    endsOn: "Feb 20, 2025",
    benefactors: 6345,
    points: {
      count: 30114,
      label: "Points",
    },
    updates: 0,
    impact: { amount: "$0.00", payouts: 0 },
    type: "Cause",
    image: "/images/a2.png",
    status: "Unpublished",
  }
];

const completedCauses: Cause[] = [
  {
    id: 89,
    name: "Providing clean and water sources to remote villages in Sub-Saharan Africa",
    category: "Clean Water",
    organization: "Global Water Relief Foundation",
    currentlyWinning: {
      amount: "$70,000.00",
      position: 1,
    },
    startedOn: "Jan 1, 2023",
    endsOn: "Jan 20, 2025",
    benefactors: 8475,
    points: {
      count: 58457,
      label: "Points",
    },
    updates: 2,
    impact: {
      amount: "$7,145.00",
      payouts: 3,
    },
    type: "Infinite Impact",
    image: "/images/a3.png",
    status: "Published",
  },
  {
    id: 78,
    name: "Constructing emergency shelters for families affected by natural disasters",
    category: "Shelter & Food",
    organization: "Humanity Rebuilds",
    currentlyWinning: {
      amount: "$40,000.00",
      position: 2,
    },
    startedOn: "Jan 1, 2023",
    endsOn: "Jan 20, 2025",
    benefactors: 6245,
    points: {
      count: 30114,
      label: "Points",
    },
    updates: 4,
    impact: {
      amount: "$40,000.00",
      payouts: 2,
      status: "Closed",
    },
    type: "One time",
    image: "/images/a4.png",
    status: "Completed",
  },
  {
    id: 69,
    name: "Providing nutritious meals to malnourished children in impoverished regions",
    category: "Malnutrition & Hunger",
    organization: "Feeding Hope Initiative",
    currentlyWinning: {
      amount: "$30,000.00",
      position: 3,
    },
    startedOn: "Jan 1, 2023",
    endsOn: "Jan 20, 2025",
    benefactors: 4124,
    points: {
      count: 22478,
      label: "Points",
    },
    updates: 1,
    impact: {
      amount: "$1,250.00",
      payouts: 3,
    },
    type: "Infinite Impact",
    image: "/images/a5.png",
    status: "Published",
  },
  {
    id: 71,
    name: "Delivering essential medical aid and free surgeries to underserved communities",
    category: "Healthcare",
    organization: "Global Medical Outreach",
    currentlyWinning: {
      amount: "$10,000.00",
      position: 4,
    },
    startedOn: "Jan 1, 2023",
    endsOn: "Jan 20, 2025",
    benefactors: 2125,
    points: {
      count: 12877,
      label: "Points",
    },
    updates: 2,
    impact: {
      amount: "$920.00",
      payouts: 3,
    },
    type: "Infinite Impact",
    image: "/images/a6.png",
    status: "Published",
  }
];

const draftCauses: Cause[] = [
  {
    id: 201,
    name: "Medical supplies for rural clinics in Kenya",
    category: "Healthcare",
    organization: "Global Health Initiative",
    currentlyWinning: {
      amount: "$0.00",
      position: 0,
    },
    startedOn: "Not Started",
    endsOn: "Not Set",
    benefactors: 0,
    points: {
      count: 0,
      label: "Points",
    },
    updates: 0,
    impact: { amount: "$0.00", payouts: 0 },
    type: "Draft",
    image: "/images/a7.png",
    status: "Unpublished",
  },
  {
    id: 202,
    name: "Solar power installation in rural India",
    category: "Renewable Energy",
    organization: "Green Energy Foundation",
    currentlyWinning: {
      amount: "$0.00",
      position: 0,
    },
    startedOn: "Not Started",
    endsOn: "Not Set",
    benefactors: 0,
    points: {
      count: 0,
      label: "Points",
    },
    updates: 0,
    impact: { amount: "$0.00", payouts: 0 },
    type: "Draft",
    image: "/images/a8.png",
    status: "Unpublished",
  }
];

const fetchCauses = async (query = "", tab = "running") => {
  return new Promise<Cause[]>((resolve) => {
    setTimeout(() => {
      let dataToFilter;
      switch (tab) {
        case "running":
          dataToFilter = runningCauses;
          break;
        case "completed":
          dataToFilter = completedCauses;
          break;
        case "drafts":
          dataToFilter = draftCauses;
          break;
        default:
          dataToFilter = runningCauses;
      }

      // Filter the data based on the search query
      const filteredCauses = dataToFilter.filter(
        (cause) =>
          cause.name.toLowerCase().includes(query.toLowerCase()) ||
          cause.organization.toLowerCase().includes(query.toLowerCase())
      );

      console.log(`Fetching data for tab: ${tab} with query: ${query}`);
      resolve(filteredCauses);
    }, 500);
  });
};

export default function CausesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("running");
  const {
    setCausesOpenAdd,
  } = useDialogStore();

  // React Query for fetching causes
  const { data = [], isLoading } = useQuery({
    queryKey: ["causes", searchQuery, activeTab],
    queryFn: () => fetchCauses(searchQuery, activeTab),
  });

  return (
    <div className="container mx-auto py-8 ">
      <div className="flex items-center mb-6 justify-between">
      <h1 className="text-2xl   ">Causes</h1>
      <Button onClick={() => setCausesOpenAdd(true)}>
          Add New <ArrowRight />
        </Button>
      </div>

      <div className="mb-6">
        <Tabs
          defaultValue="running"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex  gap-4 flex-col md:flex-row mb-4">
            <div className="flex">
              <TabsList className="!bg-custom-slate mb-1">
                <TabsTrigger value="running">Running</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4 max-md:flex-col">
                <DateTimePicker date={date} setDate={setDate} />
              </div>
            </div>

            <div className="relative w-full border-t border-[#3d3c44] md:border-0 pt-4 md:pt-0 ">
              <Input
                className="!w-full !bg-[#3D3C44]"
                placeholder="Search by username, wallet, or hash"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <TabsContent value="running">
            <AddCauseTable
              data={data}
              columns={runningCauseColumns}
              fetching={isLoading}
              activeTab={activeTab}
            />
          </TabsContent>
          <TabsContent value="completed">
            <AddCauseTable
              data={data}
              columns={completedCauseColumns}
              fetching={isLoading}
              activeTab={activeTab}
            />
          </TabsContent>
          <TabsContent value="drafts">
            <AddCauseTable
              data={data}
              columns={draftCauseColumns}
              fetching={isLoading}
              activeTab={activeTab}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
