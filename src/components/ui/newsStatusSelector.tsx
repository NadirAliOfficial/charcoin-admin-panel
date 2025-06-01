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
import { Filter as MenuIcon } from "@mynaui/icons-react";
import { Check, Circle, CheckCircle } from "@mynaui/icons-react";
import { AlertCircle } from "lucide-react";
import { NewsStatus } from "@/types/news";

// Status Options Interface
interface StatusOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  color?: string;
}

const defaultStatusOptions: StatusOption[] = [
  { 
    id: "all", 
    label: "All status", 
    count: 145,
    icon: <Circle className="h-4 w-4" />,
    color: "text-gray-400"
  },
  { 
    id: "published", 
    label: "Published", 
    count: 87,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-green-500"
  },
  { 
    id: "unpublished", 
    label: "Unpublished", 
    count: 58,
    icon: <AlertCircle className="h-4 w-4" />,
    color: "text-red-500"
  }
];

export const statusOptions: NewsStatusOption[] = [
  { label: "All", value: NewsStatus.All },
  { label: "Published", value: NewsStatus.Published },
  { label: "Unpublished", value: NewsStatus.Unpublished }
];

// Status Selector Component
export function NewsStatusSelector({
  selectedStatus,
  onStatusChange,
  statuses = defaultStatusOptions,
  size = "default",
  className,
  iconClassName = ""
}: {
  selectedStatus?: StatusOption;
  onStatusChange?: (status: StatusOption) => void;
  statuses?: StatusOption[];
  size?: "lg" | "sm" | "default" | "icon" | "main_btn";
  className?: string;
  iconClassName?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<StatusOption | undefined>(
    selectedStatus || statuses.find(s => s.id === "all")
  );

  const handleStatusSelect = (status: StatusOption) => {
    setSelected(status);
    onStatusChange?.(status);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="newly_darken"
          size={size}
          className={cn(
            "justify-start text-left font-normal bg-[#3d3c44] w-fit hover:bg-gray-600/50 border-gray-600",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <span className="text-white font-medium">
            {selected?.label || "All status"}
          </span>
          <MenuIcon className={cn("ml-auto h-4 w-4 text-gray-400", iconClassName)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-sm">Filter by Status</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Select status to filter news articles
          </p>
        </div>
        <ScrollArea className="max-h-[300px]">
          <div className="p-2">
            {statuses.map((status) => (
              <Button
                key={status.id}
                variant="ghost"
                className="w-full justify-between h-auto p-3 mb-1 hover:bg-gray-100/10"
                onClick={() => handleStatusSelect(status)}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn("flex-shrink-0", status.color)}>
                    {status.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{status.label}</div>
                  </div>
                  {status.count && (
                    <div className="text-xs text-muted-foreground">
                      {status.count.toLocaleString()}
                    </div>
                  )}
                </div>
                {selected?.id === status.id && (
                  <Check className="h-4 w-4 text-primary ml-2" />
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t bg-muted/30">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleStatusSelect(statuses.find(s => s.id === "all") || statuses[0])}
          >
            Reset to All Status
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}