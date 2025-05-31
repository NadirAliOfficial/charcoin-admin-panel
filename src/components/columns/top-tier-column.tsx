import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import { TransactionRecord } from "@/types/rewards";
import { getOrdinalSuffix } from "@/lib/helper";
import { usePathname } from "next/navigation";


const columns: ColumnDef<TransactionRecord>[] = [
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Position"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => (
      <span className="px-4 flex font-WFVisualSansRegular">
        <p className="text-xl font-WFVisualSansRegular">
          {row.getValue("position") as number}
        </p>
        <span className="font-WFVisualSansRegular">
          {getOrdinalSuffix(row.getValue("position") as number)}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Username / Wallet / Hash"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => {
      const { username, wallet, hash } = row.original; // Fetch from original data
      const path = usePathname();
      return (
        <span className="flex flex-col text-sm font-WFVisualSansRegular">
          <span className="font-WFVisualSansRegular">{username}</span>
          <span className="text-primary whitespace-nowrap font-WFVisualSansRegular">
            <b className="text-muted-foreground text-[#8c8c8c] font-WFVisualSansRegular">
              Wallet:
            </b>{" "}
            {wallet}
          </span>
          {path !=="/rewards/top-tiers" && <span className="text-primary font-WFVisualSansRegular">
            <b className="text-muted-foreground text-[#8c8c8c] font-WFVisualSansRegular">
              Hash:
            </b>{" "}
            {hash}
          </span>}
        </span>
      );
    },
  },
  {
    accessorKey: "transactions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Transactions"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => (
      <span className="font-WFVisualSansRegular">
        {row.getValue("transactions") as number}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount ($)"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => (
      <span className="font-WFVisualSansRegular">
        ${row.getValue("amount") as number}
      </span>
    ),
  },
  {
    accessorKey: "registration",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Registration Date"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => (
      <span className="font-WFVisualSansRegular">
        {(row.getValue("registration") as Date).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "lastTransaction",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Transaction"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => (
      <span className="font-WFVisualSansRegular">
        {(row.getValue("lastTransaction") as Date).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "awarded",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Awarded ($)"
        className="font-WFVisualSansRegular"
      />
    ),
    cell: ({ row }) => (
      <span className="font-WFVisualSansRegular">
        ${(row.getValue("awarded") as number).toLocaleString()}
      </span>
    ),
  },
];

export { columns as TopTierColumn };
