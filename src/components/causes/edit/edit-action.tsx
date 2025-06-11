import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

export default function FormActions() {
  return (
    <div className="flex justify-between mt-8">
      <Button
        size={"lg"}
        type="submit"
        endIcon={Save}
      >
        Save
      </Button>
      <Button
        type="button"
        size={"lg"}
        variant="destructive"
        className="bg-red-300 text-black"
        endIcon={Trash2}
      >
        Delete
      </Button>
    </div>
  );
}
