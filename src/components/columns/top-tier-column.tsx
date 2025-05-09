import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import { TransactionRecord } from "@/types/rewards";
import { getOrdinalSuffix } from "@/lib/helper";

const columns: ColumnDef<TransactionRecord>[] = [
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <span className="px-4 flex font-normal">
        <p className="text-xl">{row.getValue("position") as number}</p>
        {getOrdinalSuffix(row.getValue("position") as number)}
      </span>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username / Wallet / Hash" />
    ),
    cell: ({ row }) => {
      const { username, wallet, hash } = row.original; // Fetch from original data
      return (
        <span className="flex flex-col text-sm">
          <span>{username}</span>
          <span className="text-primary whitespace-nowrap">
            <b className="text-muted-foreground">Wallet:</b> {wallet}
          </span>
          <span className="text-primary">
            <b className="text-muted-foreground">Hash:</b> {hash}
          </span>
        </span>
      );
    },
  },

  {
    accessorKey: "transactions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transactions" />
    ),
    cell: ({ row }) => <span>{row.getValue("transactions") as number}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount ($)" />
    ),
    cell: ({ row }) => <span>${row.getValue("amount") as number}</span>,
  },
  {
    accessorKey: "registration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration Date" />
    ),
    cell: ({ row }) => (
      <span>{(row.getValue("registration") as Date).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "lastTransaction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Transaction" />
    ),
    cell: ({ row }) => (
      <span>
        {(row.getValue("lastTransaction") as Date).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "awarded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Awarded ($)" />
    ),
    cell: ({ row }) => (
      <span>${(row.getValue("awarded") as number).toLocaleString()}</span>
    ),
  },
];

export { columns as TopTierColumn };
