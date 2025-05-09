import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Cause } from "@/types/causes";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import Image from "next/image";
import { Badge } from "../ui/badge";

const columns: ColumnDef<Cause>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
      <DataTableColumnHeader column={column} title="Currently Winning" />
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
    accessorKey: "startedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Started On" />
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "endsOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ends On" />
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
      const { count, label } = info.row.original?.points;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{count.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
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

export { columns as runningCauseColumns };
