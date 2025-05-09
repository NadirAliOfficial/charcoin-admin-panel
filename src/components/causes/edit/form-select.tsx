import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary/10 text-primary focus:ring-primary",
        secondary:
          "border-secondary bg-secondary/10 text-secondary focus:ring-secondary",
        outline:
          "border-border bg-background hover:bg-accent focus:ring-accent",
        destructive:
          "border-destructive bg-destructive/10 text-destructive focus:ring-destructive",
        newly_secondary:
          "!bg-accent border-none focus:ring-primary  focus:ring-offset-2 focus:ring-2",
      },
      selectSize: {
        sm: "h-8 text-sm px-2 py-1",
        md: "h-10 text-base px-3 py-2",
        lg: "h-12 text-lg px-4 py-2",
      },
      rounded: {
        normal: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      selectSize: "md",
      rounded: "normal",
    },
  }
);

export interface SelectFieldProps extends VariantProps<typeof selectVariants> {
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string ;
  onValueChange: (value: string ) => void;
  className?: string;
  triggerIcon?: React.ReactNode
}

const SelectField: React.FC<SelectFieldProps> = ({
  className,
  variant,
  selectSize,
  rounded,
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  triggerIcon,
}) => {

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          selectVariants({ variant, selectSize, rounded, className })
        )}
        customIcon={triggerIcon}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


export { SelectField, selectVariants };
