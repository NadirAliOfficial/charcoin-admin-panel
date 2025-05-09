import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type TransactionRecord = {
  username: string;
  wallet: string;
  hash: string;
  status: "Waiting campaign completion" | "Awarded";
  typeOfAward: "Campaign Winner" | "Direct Transfer";
  date: Date;
  preview: string;
};


const columns: ColumnDef<TransactionRecord>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      const { wallet, hash, username } = row.original;
      return (
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
            <Image
              src="https://picsum.photos/200/200"
              alt={row.getValue("username")}
              fill
              className="object-cover"
            />
          </div>
          <span className="flex flex-col text-sm">
            <span>{username}</span>
            <span className="text-primary whitespace-nowrap">
              <b className="text-muted-foreground">Wallet:</b> {wallet}
            </span>
            <span className="text-primary">
              <b className="text-muted-foreground">Hash:</b> {hash}
            </span>
          </span>{" "}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={cn("whitespace-nowrap text-xs", status == "Awarded" ? "text-custom-green": "text-muted-foreground")}
        >
          {status as string}
        </span>
      );
    },
  },
  {
    accessorKey: "typeOfAward",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type of Award" />
    ),
    cell: ({ row }) => {
      const typeOfAward = row.getValue("typeOfAward");
  
      
      return (
        <Badge
        className="whitespace-nowrap"
        variant={typeOfAward === "Campaign Winner" ? "pink" : "purple"}
        size={"lg"}
      >
        {typeOfAward as string}
      </Badge>    )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "preview",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preview" />
    ),
    cell: ({ row }) => (
      <Button>
        {row.getValue("preview")} {"->"}
      </Button>
    ),
  },
];

export { columns as nftsColumns };
