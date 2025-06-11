import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { inputVariants } from "./input"; // adjust path if needed

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, inputSize, rounded, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputVariants({ variant, inputSize, rounded, className }),
          "min-h-[60px]" // Additional textarea-specific styling
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
