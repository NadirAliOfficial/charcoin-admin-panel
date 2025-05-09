import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const switchVariants = cva(
  "relative inline-flex h-6 w-11 items-center rounded-full transition",
  {
    variants: {
      variant: {
        primary: "bg-primary focus:ring-primary",
        secondary: "bg-secondary focus:ring-secondary",
        outline: "bg-border focus:ring-accent",
        destructive: "bg-destructive focus:ring-destructive",
      },
      size: {
        sm: "h-5 w-10",
        md: "h-6 w-11",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

export interface SwitchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof switchVariants> {
  name: string;
  label?: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ name, label, variant, size, className }) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
            className={cn(switchVariants({ variant, size, className }))}
          />
        )}
      />
    </div>
  );
};

export { SwitchField, switchVariants };
