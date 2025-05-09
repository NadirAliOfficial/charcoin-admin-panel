import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import { TransactionRecord } from "@/types/rewards";
import { getOrdinalSuffix } from "@/lib/helper";
import { NewsArticle, NewsStatus } from "@/types/news";
import { PlayCircle, PlayCircleSolid } from "@mynaui/icons-react";
import { Administration } from "@/types/administration";

const columns: ColumnDef<Administration>[] = [
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
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <span>{row.getValue("username")}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <span>{row.getValue("phone")}</span>,
  },

  {
    accessorKey: "otp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="OTP Auth Application" />
    ),
    cell: ({ row }) => <span>{row.getValue("otp")}</span>,
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permissions" />
    ),
    cell: ({ row }) => <span>{row.getValue("permissions")}</span>,
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (

      <DataTableColumnHeader column={column} title="Last login" />
    ),
    cell: ({ row }) => {
      const {ip} = row.original;
      return <span>{row.getValue("lastLogin")} <br /><span className="text-muted-foreground whitespace-nowrap">IP: {ip}</span></span>;
    },
  },
];

export { columns as AdminstrationColumn };
