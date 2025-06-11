import { ColumnDef } from "@tanstack/react-table";
import { Cause } from "@/types/causes";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import Image from "next/image";
import { Badge } from "../ui/badge";

const columns: ColumnDef<Cause>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className=" overflow-hidden">{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (info) => {
      const cause = info.row.original;
      return (
        <div className="flex min-w-64 items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
            <Image
              src={cause.image}
              alt={cause.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{cause.name}</span>
            <span className="text-xs text-muted-foreground">
              {cause.category}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "organization",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "campaign",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign" />
    ),
    cell: (info) => {
      const { startedOn, endsOn } = info.row.original;
      const startDate = new Date(startedOn);
      const endDate = new Date(endsOn);

      const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      const monthYear = startDate.toLocaleString('en-US', options);

      const dayOptions: Intl.DateTimeFormatOptions = { day: 'numeric' };
      const startDay = startDate.toLocaleString('en-US', dayOptions);
      const endDay = endDate.toLocaleString('en-US', dayOptions);

      return (
        <div className="flex flex-col">
          <span className="font-medium">{monthYear}</span>
          <span className="text-xs text-muted-foreground">
            {startedOn === "Not Started" && endsOn === "Not Set" ? "Not Set" : `${monthYear.split(" ")[0]} ${startDay} to ${monthYear.split(" ")[0]} ${endDay}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (info) => {
      const status = info.row.original?.status;

      // Determine badge variant based on status
      let variant: "default" | "secondary" | "destructive" | "outline" | "published" | "unpublished" | "completed" | "draft" = "default";

      if (status === "Published") {
        variant = "published";
      } else if (status === "Unpublished") {
        variant = "unpublished";
      } else if (status === "Completed") {
        variant = "completed";
      } else if (status === "Draft") {
        variant = "draft";
      }

      return (
        <Badge
          className="whitespace-nowrap"
          variant={variant}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: (info) => {
      const type = info.row.original?.type;

      return (
        <Badge
          className="whitespace-nowrap"
          variant={type?.split(" ").join("-").toLowerCase() as any}
        >
          {type}
        </Badge>
      );
    },
  },
];

export { columns as draftCauseColumns }; 