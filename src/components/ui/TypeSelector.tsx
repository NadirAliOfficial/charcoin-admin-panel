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
import { Check } from "@mynaui/icons-react";

export interface TypeOption {
  id: string;
  label: string;
  count?: number;
}

const defaultNFTTypes: TypeOption[] = [
  { id: "all", label: "All types", count: 1247 },
  { id: "art", label: "Art", count: 543 },
  { id: "collectibles", label: "Collectibles", count: 298 },
  { id: "gaming", label: "Gaming", count: 186 },
  { id: "music", label: "Music", count: 125 },
  { id: "photography", label: "Photography", count: 95 },
  { id: "sports", label: "Sports", count: 67 },
  { id: "utility", label: "Utility", count: 43 },
  { id: "virtual-worlds", label: "Virtual Worlds", count: 32 },
];

export function TypeSelector({
  selectedType,
  onTypeChange,
  types = defaultNFTTypes,
  size = "default",
  className,
  iconClassName = "",
  placeholder = "All types"
}: {
  selectedType?: TypeOption;
  onTypeChange?: (type: TypeOption) => void;
  types?: TypeOption[];
  size?: "lg" | "sm" | "default" | "icon" | "main_btn";
  className?: string;
  iconClassName?: string;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<TypeOption | undefined>(
    selectedType || types.find(t => t.id === "all")
  );

  const handleTypeSelect = (type: TypeOption) => {
    setSelected(type);
    onTypeChange?.(type);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="newly_darken"
          size={size}
          className={cn(
            "justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <span className="text-gray-400 font-medium">
            {selected?.label || placeholder}
          </span>
          <MenuIcon className={cn("ml-auto h-4 w-4", iconClassName)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-sm">Filter by Type</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Select type to filter results
          </p>
        </div>
        <ScrollArea className="max-h-[300px]">
          <div className="p-2">
            {types.map((type) => (
              <Button
                key={type.id}
                variant="ghost"
                className="w-full justify-between h-auto p-3 mb-1"
                onClick={() => handleTypeSelect(type)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{type.label}</div>
                  </div>
                  {type.count && (
                    <div className="text-xs text-muted-foreground">
                      {type.count.toLocaleString()}
                    </div>
                  )}
                </div>
                {selected?.id === type.id && (
                  <Check className="h-4 w-4 text-primary" />
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
            onClick={() => handleTypeSelect(types.find(t => t.id === "all") || types[0])}
          >
            Reset to All Types
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}