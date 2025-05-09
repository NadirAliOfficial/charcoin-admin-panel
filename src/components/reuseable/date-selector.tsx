"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Sort } from "@mynaui/icons-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type DateSelectorProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  formatType?: string;
  onFormatChange?: (format: string) => void;
};

const dateFormats = [
  { label: "MMMM yyyy", value: "MMMM yyyy" }, // February 2024
  { label: "MMM yyyy", value: "MMM yyyy" }, // Feb 2024
  { label: "dd/MM/yyyy", value: "dd/MM/yyyy" }, // 11/02/2024
  { label: "MM/dd/yyyy", value: "MM/dd/yyyy" }, // 02/11/2024
  { label: "yyyy-MM-dd HH:mm:ss", value: "yyyy-MM-dd HH:mm:ss" }, // 2024-02-11 14:30:00
  { label: "EEEE, MMMM do yyyy", value: "EEEE, MMMM do yyyy" }, // Sunday, February 11th 2024
];

const DateSelector: React.FC<DateSelectorProps> = ({
  date,
  setDate,
  formatType = dateFormats[0].value,
  onFormatChange,
}) => {
  const [selectedFormat, setSelectedFormat] = React.useState(formatType);

  const handleFormatChange = (newFormat: string) => {
    setSelectedFormat(newFormat);
    onFormatChange?.(newFormat); // Call external function if provided
  };

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="newly_secondary"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            Display Date: {date ? format(date, selectedFormat) : "Pick a date"}
            <Sort className="!w-6 !h-6 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
  );
};

export { DateSelector };
