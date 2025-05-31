import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({
  id,
  label,
  description,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="mb-4 ">
      <Label htmlFor={id} className="block mb-1 mt-7 text-[14px] font-WFVisualSansRegular">
        {label}
      </Label>
      {description && (
        <p className="text-gray-400 text-xs  mb-5 font-WFVisualSansRegular">{description}</p>
      )}
      {children}
      {error && <p className="text-red-500 mt-1 text-sm font-WFVisualSansRegular">{error}</p>}
    </div>
  );
}
