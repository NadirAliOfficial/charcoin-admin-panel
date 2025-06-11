"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter as MenuIcon } from "@mynaui/icons-react";
import { AlignLeft } from "lucide-react";

export function DisplayDatePicker({
  date,
  setDate,
  size = "default",
  className,
  iconClassName = "",
  showTime = false,
  displayLabel = "Display data:"
}: {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  size?: "lg" | "sm" | "default" | "icon" | "main_btn";
  className?: string;
  iconClassName?: string;
  showTime?: boolean;
  displayLabel?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setIsOpen(false);
    }
  };

  const formatDisplayDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    
    if (showTime) {
      return format(date, "MMMM yyyy 'at' hh:mm aa");
    }
    return format(date, "MMMM yyyy");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="newly_darken"
          size={size}
          className={cn(
            "justify-start text-left font-normal min-w-[200px]",
            !date && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{displayLabel}</span>
            {date ? (
              <span className=" font-medium">
                {formatDisplayDate(date)}
              </span>
            ) : (
              <span className="text-muted-foreground">Select date</span>
            )}
          </div>
          <AlignLeft className={cn("ml-auto h-4 w-4", iconClassName)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-sm">Select Display Period</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Choose a date period to display data for
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          className="rounded-md"
        />
        <div className="p-3 border-t bg-muted/30">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                setDate(new Date());
                setIsOpen(false);
              }}
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                setDate(lastMonth);
                setIsOpen(false);
              }}
            >
              Last Month
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}