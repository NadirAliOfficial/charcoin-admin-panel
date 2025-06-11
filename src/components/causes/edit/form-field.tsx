import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function FormField({
  id,
  label,
  description,
  error,
  children,
  className
}: FormFieldProps) {
  return (
    <div className={cn("mb-4 ", className)}>
      <Label htmlFor={id} className="block mb-1 mt-7 text-[14px] font-WFVisualSansRegular">
        {label}
      </Label>
      {description && (
        <span className="text-gray-400 text-xs inline-block  mb-5 font-WFVisualSansRegular">{description}</span>
      )}
      {children}
      {error && <p className="text-red-500 mt-1 text-sm font-WFVisualSansRegular">{error}</p>}
    </div>
  );
}
