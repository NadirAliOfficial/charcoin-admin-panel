import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageNumbers = getPageNumbers(pageIndex + 1, pageCount); // Generate page numbers

  return (
    <div className="flex items-center justify-between px-2">
      {/* Row Selection Info */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Rows per Page Selector */}
        <div className="flex items-center space-x-2 max-md:hidden">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div className="flex w-[100px] max-md:hidden items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center space-x-1">
          {/* First Page */}
          <Button
            variant="outline"
            className="  max-lg:hidden h-8 w-8 p-0 flex" 
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          {/* Previous Page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => (
            <Button
              key={index}
              variant={page === pageIndex + 1 ? "default" : "outline"}
              className="h-8 w-8 p-0"
              onClick={() =>
                typeof page === "number" && table.setPageIndex(page - 1)
              }
              disabled={page === "..."}
            >
              {page}
            </Button>
          ))}

          {/* Next Page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* Last Page */}
          <Button
            variant="outline"
            className="  max-lg:hidden h-8 w-8 p-0 flex" 
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Generates an array of page numbers with ellipsis (`...`) for large pagination.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<number | string>} Page numbers with ellipsis.
 */
function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: Array<number | string> = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    pages.push(1, 2, 3, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, "...", currentPage, "...", totalPages);
  }

  return pages;
}
