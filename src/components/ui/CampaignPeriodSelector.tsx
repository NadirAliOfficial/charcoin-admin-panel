"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Calendar } from "@mynaui/icons-react";
import { Trophy } from "lucide-react";

export interface CampaignPeriod {
  id: string;
  name: string;
  period: string;
  isActive?: boolean;
  onCampaignChange?: (campaign: CampaignPeriod) => void;
}

const defaultCampaigns: CampaignPeriod[] = [
  { id: "1", name: "Current Campaign", period: "February 2025", isActive: true },
  { id: "2", name: "Previous Campaign", period: "January 2025" },
  { id: "3", name: "Holiday Campaign", period: "December 2024" },
  { id: "4", name: "Black Friday", period: "November 2024" },
  { id: "5", name: "Summer Campaign", period: "July 2024" },
  { id: "6", name: "Spring Launch", period: "March 2024" },
];

export function CampaignPeriodSelector({
  selectedCampaign,
  onCampaignChange,
  campaigns = defaultCampaigns,
  size = "default",
  className,
  iconClassName = "",
  placeholder = "Select campaign period"
}: {
  selectedCampaign?: CampaignPeriod;
  onCampaignChange?: (campaign: CampaignPeriod) => void;
  campaigns?: CampaignPeriod[];
  size?: "lg" | "sm" | "default" | "icon" | "main_btn";
  className?: string;
  iconClassName?: string;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CampaignPeriod | undefined>(
    selectedCampaign || campaigns.find(c => c.isActive)
  );

  const handleCampaignSelect = (campaign: CampaignPeriod) => {
    setSelected(campaign);
    onCampaignChange?.(campaign);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="newly_darken"
          size={size}
          className={cn(
            "justify-start text-left font-normal min-w-[280px]",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Display data:</span>
            {selected ? (
              <span className="text-cyan-400 font-medium">
                {selected.name} - {selected.period}
              </span>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronDown className={cn("ml-auto h-4 w-4", iconClassName)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-sm">Select Campaign Period</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Choose a campaign to display data for
          </p>
        </div>
        <ScrollArea className="max-h-[300px]">
          <div className="p-2">
            {campaigns.map((campaign) => (
              <Button
                key={campaign.id}
                variant={selected?.id === campaign.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3 mb-1"
                onClick={() => handleCampaignSelect(campaign)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {campaign.isActive ? (
                      <Trophy className="h-4 w-4 text-green-500" />
                    ) : (
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{campaign.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {campaign.period}
                    </div>
                  </div>
                  {campaign.isActive && (
                    <div className="flex-shrink-0">
                      <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded">
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t bg-muted/30">
          <Button variant="outline" size="sm" className="w-full">
            Manage Campaigns
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}