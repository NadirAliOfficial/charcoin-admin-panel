import * as React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { updateTaskSchema, type UpdateTaskSchema } from "../_lib/validations";

interface UpdateTaskSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  task: any;
}

export function UpdateTaskSheet({ task, ...props }: UpdateTaskSheetProps) {
  const form = useForm({
    resolver: zodResolver(z.object({})),

    defaultValues: {
      title: task.title,
      label: task.label,
      status: task.status,
      priority: task.priority,
    },
  });

  function onSubmit(data: any) {

  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 overflow-auto sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
       
      </SheetContent>
    </Sheet>
  );
}
