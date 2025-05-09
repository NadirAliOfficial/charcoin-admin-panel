"use client";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { CustomSheet } from "@/components/reuseable/add-causes-sheet";
import { AddCampaign } from "@/components/settings/add-campaign";
import { AddCategory } from "@/components/settings/add-category";
import { EditCampaign } from "@/components/settings/edit-campaign";
import { EditCategory } from "@/components/settings/edit-category";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateRange } from "@/lib/helper";
import { cn } from "@/lib/utils";
import useDialogStore from "@/stores/dialog-store";
import { HeartPlus, DropSolid, Cookie, Drop, Activity, AcademicHat, Accessibility, ArrowRight } from "@mynaui/icons-react";
import { formatDate } from "date-fns";

const categories = [
  {
    name: "Disaster Relief Assistance",
    projects: 0,
    news: 10,
    icon: HeartPlus,
    color: "#D83A3A",
  },
  { name: "Food Security & Nutrition", projects: 0, news: 8, icon: Cookie, color: "#843AD8" },
  { name: "Clean Water & Sanitation", projects: 0, news: 5, icon: Drop, color: "#D83AC8" },
  {
    name: "Medical & Healthcare Support",
    projects: 0,
    news: 12,
    icon: AcademicHat,
    color: "#B8D83A"
  },
  {
    name: "Education & Literacy Programs",
    projects: 10,
    news: 12,
    icon: Accessibility,
    color: "#3DD83A"
  },

];

const campaigns = [
  {
    "title": "2025-05-01T00:00:00.000Z",
    "date_range": "2025-05-01T00:00:00.000Z to 2025-05-20T00:00:00.000Z",
    "start_date": "2025-05-01T00:00:00.000Z",
    "end_date": "2025-05-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#0088FF"

  },
  {
    "title": "2025-04-01T00:00:00.000Z",
    "date_range": "2025-04-01T00:00:00.000Z to 2025-04-20T00:00:00.000Z",
    "start_date": "2025-04-01T00:00:00.000Z",
    "end_date": "2025-04-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#AAAAAA"
  },
  {
    "title": "2025-03-01T00:00:00.000Z",
    "date_range": "2025-03-01T00:00:00.000Z to 2025-03-20T00:00:00.000Z",
    "start_date": "2025-03-01T00:00:00.000Z",
    "end_date": "2025-03-20T00:00:00.000Z",
    "status": "Current",
    "color": "#00FF88"
  },
  {
    "title": "2025-02-01T00:00:00.000Z",
    "date_range": "2025-02-01T00:00:00.000Z to 2025-02-20T00:00:00.000Z",
    "start_date": "2025-02-01T00:00:00.000Z",
    "end_date": "2025-02-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#2B2B2B"
  },
  {
    "title": "2025-01-01T00:00:00.000Z",
    "date_range": "2025-01-01T00:00:00.000Z to 2025-01-20T00:00:00.000Z",
    "start_date": "2025-01-01T00:00:00.000Z",
    "end_date": "2025-01-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#00FF88"
  },

  {
    "title": "2024-12-01T00:00:00.000Z",
    "date_range": "2024-12-01T00:00:00.000Z to 2024-12-20T00:00:00.000Z",
    "start_date": "2024-12-01T00:00:00.000Z",
    "end_date": "2024-12-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#00FF88"
  },
  {
    "title": "2025-11-01T00:00:00.000Z",
    "date_range": "2025-11-01T00:00:00.000Z to 2025-11-20T00:00:00.000Z",
    "start_date": "2025-11-01T00:00:00.000Z",
    "end_date": "2025-11-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#00FF88"
  },
  {
    "title": "2025-10-01T00:00:00.000Z",
    "date_range": "2025-10-01T00:00:00.000Z to 2025-10-20T00:00:00.000Z",
    "start_date": "2025-10-01T00:00:00.000Z",
    "end_date": "2025-10-20T00:00:00.000Z",
    "status": "Upcoming",
    "color": "#00FF88"
  }
]



const SettingsCauses = () => {
  const { openDialog, setAddCategory, setEditCategory, setAddCampaign, setEditCampaign } = useDialogStore()



  return (
    <div>
      <HeaderWrapper
        title="Dapp Global Settings - Causes"
        description="Manage settings related to the causes / projects in the CharCoin ecosystem"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3 max-md:p-0  text-white min-h-screen">
        {/* Categories Section */}
        <Card className="bg-background">
          <CardHeader >
            <CardTitle className="text-xl">Categories</CardTitle>
            <p className="text-sm text-gray-400">
              Manage the categories available for the causes/projects and news
              sections
            </p>
            <Button size={"lg"} endIcon={ArrowRight} iconProps={{
              className: "!w-5 !h-5"
            }} className="w-max"
              onClick={() => setAddCategory(true)}
            >
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <hr />
            <ScrollArea className="h-[540px]">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between space-x-4  p-3 border-b "
                  onClick={() => setEditCategory(true)}
                >
                  <div className={cn("min-w-[3px]   rounded-xl ",)} style={{
                    backgroundColor: category.color
                  }} />
                  <div className="flex items-center gap-3">
                    <category.icon size={40} />
                  </div>
                  <div className="w-full flex flex-col">
                    <span>{category.name}</span>
                    <span className="text-gray-400">
                      {category.projects} projects, {category.news} news
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Campaigns Section */}
        <Card className="bg-background">
          <CardHeader >
            <CardTitle className="text-xl">Campaigns</CardTitle>
            <p className="text-sm text-gray-400">
              Manage the campaigns available for the causes / projects in the entire ecosystem
            </p>
            <Button size={"lg"} endIcon={ArrowRight} iconProps={{
              className: "!w-5 !h-5"
            }} className="w-max"
              onClick={() => setAddCampaign(true)}

            >
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <hr />
            <ScrollArea className="h-[540px]">
              {campaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="flex   space-x-4  p-3 border-b "
                  onClick={() => setEditCampaign(true)}
                >

                  <div className={cn("min-w-[3px] w-min h-12   rounded-xl ",)} style={{
                    backgroundColor: campaign?.color
                  }} />                  <div className="w-full flex flex-col">
                    <span>{formatDate(campaign.title, "MMMM, yyyy")}</span>
                    <span className="text-sm flex gap-2 text-muted-foreground">{formatDateRange(campaign.start_date as string, campaign.end_date as string)} {campaign?.status == "Current" && <p className="text-primary tracking-wider">(Current)</p>} </span>

                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <CustomSheet
        isOpen={openDialog == "add_category"}
        setIsOpen={setAddCategory}
        title="Add Category form"
        className="pt-2 px-4"
      >
        <AddCategory />
      </CustomSheet>
      <CustomSheet
        isOpen={openDialog == "edit_category"}
        setIsOpen={setEditCategory}
        title="Edit Cateogyr form"
        className="pt-2 px-4"
      >
        <EditCategory />
      </CustomSheet>

      <CustomSheet
        isOpen={openDialog == "add_campaign"}
        setIsOpen={setAddCampaign}
        title="Add Campaign form"
        className="pt-2 px-4"
      >
        <AddCampaign />
      </CustomSheet>
      <CustomSheet
        isOpen={openDialog == "edit_campaign"}
        setIsOpen={setEditCampaign}
        title="Edit Campaign form"
        className="pt-2 px-4"
      >
        <EditCampaign />
      </CustomSheet>
    </div>
  );
};

export default SettingsCauses;
