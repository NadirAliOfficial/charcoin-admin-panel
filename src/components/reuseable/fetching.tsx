import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const Fetching = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 text-primary",
        className
      )}
    >
      <Loader className="w-4 h-4 animate-spin  " />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
};

export { Fetching };
