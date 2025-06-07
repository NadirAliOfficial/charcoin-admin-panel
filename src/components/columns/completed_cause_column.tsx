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
              // src={cause.image || "https://picsum.photos/200/200"}
              src={"https://picsum.photos/200/200"}
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
    accessorKey: "currentlyWinning",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: (info) => {
      const { amount, position } = info.row.original?.currentlyWinning;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{amount}</span>
          <span className="text-xs text-muted-foreground">
            Position {position}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "campaign",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign" />
    ),
    cell: (info) => {
      const { startedOn } = info.row.original;
      const startDate = new Date(startedOn);

      const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      const monthYear = startDate.toLocaleString('en-US', options);

      return (
        <div className="flex flex-col">
          <span className="font-medium">{monthYear}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "updates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updates" />
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "benefactors",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Benefactors" />
    ),
    cell: (info) => info.row.original?.benefactors.toLocaleString(),
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
    cell: (info) => {
      const { count } = info.row.original?.points;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{count.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">Points</span>
        </div>
      );
    },
  },
  {
    accessorKey: "impact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Impact" />
    ),
    cell: (info) => {
      const { amount, payouts, status } = info.row.original?.impact;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{amount}</span>
          <span className="text-xs text-muted-foreground">
            {payouts} payouts
          </span>
          {status && (
            <span className="text-xs text-red-500 font-medium">
              {status}
            </span>
          )}
        </div>
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

export { columns as completedCauseColumns }; 