"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

import { AddCauseTable } from "@/components/causes/add-cause-table";
import { runningCauseColumns } from "@/components/columns/running_cause_column";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cause } from "@/types/causes";
import useDialogStore from "@/stores/dialog-store";
import { CustomSheet } from "@/components/reuseable/add-causes-sheet";

// Create dummy data
const causes: Cause[] = [
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
    type: "Infinite Impact",
    image: "/placeholder.svg?height=80&width=80",
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
    type: "Cause",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 178,
    name: "Attacking the hunger in the east side of Haiti",
    category: "Nourishing & Hunger",
    organization: "Eradication Hunger Association",
    currentlyWinning: {
      amount: "$30,000.00",
      position: 3,
    },
    startedOn: "Feb 1, 2023",
    endsOn: "Feb 20, 2025",
    benefactors: 4124,
    points: {
      count: 27478,
      label: "Points",
    },
    type: "Infinite Impact",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 112,
    name: "Building houses for the homeless in Guadalajara, Mexico",
    category: "Shelter & Food",
    organization: "TheShelter.Log",
    currentlyWinning: {
      amount: "$10,000.00",
      position: 4,
    },
    startedOn: "Feb 1, 2023",
    endsOn: "Feb 20, 2025",
    benefactors: 2105,
    points: {
      count: 12877,
      label: "Points",
    },
    type: "Infinite Impact",
    image: "/placeholder.svg?height=80&width=80",
  },
];

const fetchCauses = async (query = "", tab = "running") => {
  return new Promise<Cause[]>((resolve) => {
    setTimeout(() => {
      // Filter the dummy data based on the search query
      const filteredCauses = causes.filter(
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


  // React Query for fetching causes
  const { data = [], isLoading } = useQuery({
    queryKey: ["causes", searchQuery, activeTab],
    queryFn: () => fetchCauses(searchQuery, activeTab),
  });

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-6">Causes</h1>

      <div className="mb-6">
        <Tabs
          defaultValue="running"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex items-end gap-4 max-md:flex-col">
            <TabsList className="!bg-custom-slate">
              <TabsTrigger value="running">Running</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 mb-4 max-md:flex-col">
              <DateTimePicker date={date} setDate={setDate} />

              <div className="relative w-80">
                <Input
                  className="!w-full !bg-[#3D3C44]"
                  placeholder="Search by username, wallet, or hash"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <TabsContent value="running">
            <AddCauseTable
              data={data}
              columns={runningCauseColumns}
              fetching={isLoading}
            />
          </TabsContent>
          <TabsContent value="completed">
            <AddCauseTable
              data={data}
              columns={runningCauseColumns}
              fetching={isLoading}
            />
          </TabsContent>
          <TabsContent value="drafts">
            <AddCauseTable
              data={data}
              columns={runningCauseColumns}
              fetching={isLoading}
            />
          </TabsContent>
        </Tabs>

      </div>

    </div>
  );
}
