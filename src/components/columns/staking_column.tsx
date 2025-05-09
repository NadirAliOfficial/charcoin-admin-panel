import { StakingEntry } from "@/types/staking";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const StatusCell = ({ row }: { row: any }) => {
  const [newStatus, setNewStatus] = useState<string>(row.getValue("status") as string);

  return (
    <Select defaultValue={newStatus} onValueChange={setNewStatus}>
      <SelectTrigger
        variant={"newly_secondary"}
        className={clsx({
          "text-[#6df56d] !ring-[#6df56d]": newStatus === "Active",
          "text-primary !ring-primary": newStatus === "Completed",
          "text-[#ff6d6d] !ring-[#ff6d6d]": newStatus === "Stopped",
        })}
      >
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
        <SelectItem value="Stopped">Stopped</SelectItem>
      </SelectContent>
    </Select>
  );
};




export const stakingColumns: ColumnDef<StakingEntry>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ row }) => {
      const { wallet, staking_id, username } = row.original;
      return (
        <div className="flex flex-col text-sm">
          <span>{username}</span>
          <span className="text-primary whitespace-nowrap">
            <b className="text-muted-foreground">Wallet:</b> {wallet}
          </span>
          <span className="text-primary">
            <b className="text-muted-foreground">Staking ID:</b> {staking_id}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "staked_amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Staked Amount" />,
    cell: ({ row }) => `${(row.getValue("staked_amount") as number).toLocaleString()} tokens`,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => new Date(row.getValue("start_date")).toLocaleDateString(),
  },
  {
    accessorKey: "expiration_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expiration Date" />,
    cell: ({ row }) => new Date(row.getValue("expiration_date")).toLocaleDateString(),
  },
  {
    accessorKey: "staking_duration",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Staking Duration" />,
    cell: ({ row }) => `${row.getValue("staking_duration")} days`,
  },
  {
    accessorKey: "voting_power",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Voting Power" />,
    cell: ({ row }) => `${row.getValue("voting_power")} votes per staked token`,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusCell row={row} />, 

  },
  
];
