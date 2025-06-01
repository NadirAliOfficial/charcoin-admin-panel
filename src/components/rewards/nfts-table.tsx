import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { DataTableToolbar } from "../table/tasks-table-toolbar";
import { Fetching } from "../reuseable/fetching";
import { DataTablePagination } from "../table/tasks-table-pagination";
import useDialogStore from "@/stores/dialog-store";
import { NFTSRecord } from "@/types/rewards";
import { CustomSheet } from "@/components/reuseable/add-causes-sheet";
import { NftDetail } from "@/components/nfts/nft-detail";

interface NftsTableProps {
  data: NFTSRecord[];
  columns: any;
  fetching: boolean;
}

export function NftsTable({ data, columns, fetching }: NftsTableProps) {
  const { openDialog, setNftsDetail } = useDialogStore();
  const [selectedNft, setSelectedNft] = React.useState<NFTSRecord | null>(null);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleRowClick = (nft: NFTSRecord) => {
    setSelectedNft(nft);
    setNftsDetail(true);
  };

  return (
    <div className="space-y-4 bg-background pb-5 rounded-xl">
      {/* <DataTableToolbar table={table} /> */}
      <div className="rounded-md border bg-background">
        {/* <ScrollArea> */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original)}
                  className="cursor-pointer hover:bg-[#2A2931]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-4 px-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : fetching ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Fetching />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* </ScrollArea> */}
      </div>
      <div className="px-5">
        <DataTablePagination table={table} />
      </div>
      {selectedNft && (
        <CustomSheet
          isOpen={openDialog === "nfts_detail"}
          setIsOpen={setNftsDetail}
          title="NFT Details"
          className="pt-2 px-4"
        >
          <NftDetail nft={selectedNft} />
        </CustomSheet>
      )}
    </div>
  );
}
