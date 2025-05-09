import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary/10 text-primary focus:ring-primary",
        secondary:
          "border-secondary bg-secondary/10 text-secondary focus:ring-secondary",
        outline: "border-border bg-accent hover:bg-accent focus:ring-accent",
        destructive:
          "border-destructive bg-destructive/10 text-destructive focus:ring-destructive",
        newly_secondary: "!bg-accent !border-none",
      },
      inputSize: {
        // Renamed 'size' to 'inputSize'
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
      inputSize: "md",
      rounded: "normal",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, // Exclude default 'size' property
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, rounded, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, inputSize, rounded, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
