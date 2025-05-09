

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputWithTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rootClassName?: string;
}

const InputWithText: React.FC<InputWithTextProps> = ({ label, id, rootClassName,  className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-3 mb-2 bg-accent rounded-lg focus-within:ring-offset-2 focus-within:ring-2 ring-offset-custom-slate ring-primary", rootClassName)}>
       <label htmlFor={id} className="text-gray-400 whitespace-nowrap px-4">{label}</label>
      <Input
      variant={"newly_secondary"}
        id={id}
        {...props}
        className={`flex-1 focus:!ring-0 focus:!ring-offset-0 bg-gray-700 text-white ${className}`}
      />
    </div>
  );
};

export default InputWithText;
