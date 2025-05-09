import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import { UserWallet } from "@/types/user-and-wallet";
import { Lock, LockOpen, LockOpenSolid, LockSolid } from "@mynaui/icons-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/helper";

const columns: ColumnDef<UserWallet>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username / Wallet" />
    ),
    cell: ({ row }) => {
      const { wallet, username } = row.original;
      return (
        <div>
          <span className="font-semibold">{row.getValue("username")}</span>
          <br />
          <span className="text-xs text-primary whitespace-nowrap">
            <p className="text-muted-foreground">Wallet:</p> {wallet}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transactions" />
    ),
    cell: ({ row }) => <span>{row.getValue("transactions")}</span>,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      const { tokens } = row.original;
      return (
        <span className="font-semibold">
          ${(row.getValue("balance") as number).toLocaleString()}
          <br />
          <span className="text-muted-foreground">{tokens}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "registration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration" />
    ),
    cell: ({ row }) => (
      <span>{formatDate(new Date(row.getValue("registration")))}</span>
    ),
  },
  {
    accessorKey: "lastTransaction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Transaction" />
    ),
    cell: ({ row }) => (
      <span>{formatDate(new Date(row.getValue("lastTransaction")))}</span>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isBlocked = row.getValue("status") === "Blocked";
      return (
        <span
          className={`flex items-center gap-4 font-semibold ${
            isBlocked ? "text-red-600" : "text-green-600"
          }`}
        >
          <Button
            variant="newly_secondary"
            className={cn(isBlocked ? "text-red-600" : "text-green-600")}
            size={"icon"}
          >
            {isBlocked ? (
              <LockSolid className="mr-1 !w-5 !h-5" />
            ) : (
              <LockOpenSolid className="mr-1 !w-5 !h-5" />
            )}
          </Button>
          {row.getValue("status")}
        </span>
      );
    },
  },
];

export { columns as UserWalletColumns };
