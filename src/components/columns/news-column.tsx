import { NewsArticle, NewsStatus } from "@/types/news";
import { PlayCircleSolid } from "@mynaui/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../table/tasks-table-column-header";
import Image from "next/image";

const columns: ColumnDef<NewsArticle>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "video_thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Video" />
    ),
    cell: ({ row }) => (
      <div className="relative flex justify-center items-center">
        <Image
          width={128}
          height={80}
          src={row.getValue("video_thumbnail")}
          alt="Video Thumbnail"
          className="h-24 w-20 rounded-md object-cover"
        />
        <PlayCircleSolid className="absolute " />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <span className="font-semibold block w-64 ">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "short_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Description" />
    ),
    cell: ({ row }) => (
      <span className="text-sm block w-72 text-gray-600">
        {row.getValue("short_description")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as NewsStatus;
      return (
        <span
          className={`px-2 py-1 rounded-md ${
            status === NewsStatus.Published ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
  {
    accessorKey: "posted_on",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted On" />
    ),
    cell: ({ row }) => <span>{row.getValue("posted_on")}</span>,
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => (
      <span className="text-lg">{(row.getValue("views") as number).toLocaleString()}</span>
    ),
  },
];

export { columns as NewsColumn };
