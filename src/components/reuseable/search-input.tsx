import { Search } from "@mynaui/icons-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  rootClassName?: string;

}

const SearchInput = ({ placeholder, value, onChange, rootClassName }: SearchInputProps) => {
  return (
    <div className={cn("relative  w-80", rootClassName)}>
      <Input
      variant={"newly_secondary"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground !bg-accent" />
    </div>
  );
};

export { SearchInput};