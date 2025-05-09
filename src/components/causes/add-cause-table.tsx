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
import { CustomSheet } from "../reuseable/add-causes-sheet";
import { Fetching } from "../reuseable/fetching";
import { DataTablePagination } from "../table/tasks-table-pagination";
import { AddCauseForm } from "./add-cause";
import { CauseDetail } from "./cause-detail";
import useDialogStore from "@/stores/dialog-store";
import { EditCause } from "./edit-cause";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetching: boolean;
}

export function AddCauseTable<TData, TValue>({
  columns,
  data,
  fetching,
}: DataTableProps<TData, TValue>) {
  const [isAddCauseOpen, setIsAddCauseOpen] = React.useState(false);
  const {
    setCausesOpenAdd,
    setCausesOpenDetail,
    openDialog,
    setCausesOpenEdit,
  } = useDialogStore();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
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

  return (
    <div className="space-y-2 bg-background pb-1 rounded-xl">
      {/* <DataTableToolbar table={table} /> */}
      <div className="rounded-md border bg-background ">
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
                  onClick={() => {
                    console.log("Clicked");
                    setCausesOpenDetail(true);
                  }}
                  // row.original?._id! ??
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
      <div className="px-2">
        <DataTablePagination table={table} />
      </div>
      <CustomSheet
        isOpen={openDialog === "causes_add"}
        setIsOpen={(isOpen) => {
          setCausesOpenAdd(isOpen);
        }}
        title="Add Cause form"
        className="!p-0"
      >
        Add Form
      </CustomSheet>
      <CustomSheet
        isOpen={openDialog === "causes_detail"}
        setIsOpen={setCausesOpenDetail}
        title="See the Cause Detail"
        className="!p-0"
      >
        <CauseDetail />
      </CustomSheet>

      <CustomSheet
        isOpen={openDialog == "causes_edit"}
        setIsOpen={setCausesOpenEdit}
        title="Edit Cause form"
        className="pt-2 px-4"
      >
        <EditCause />
      </CustomSheet>
    </div>
  );
}
