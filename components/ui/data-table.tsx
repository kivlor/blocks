import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableFilterOption = {
  label: string;
  value: string;
};

type DataTableFilter = {
  column: string;
  label: string;
  options: DataTableFilterOption[];
  allLabel?: string;
};

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchBy?: string;
  searchPlaceholder?: string;
  paginate?: boolean;
  filter?: DataTableFilter;
  action?: React.ReactNode;
  showToolbar?: boolean;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  editHandler?: (row: TData) => void;
  removeHandler?: (row: TData) => void;
};

const allFilterValue = "__all__";
const pageSizeOptions = [10, 25, 50, 100];
const stickyActionsHeaderClassName = "sticky right-0 z-20 bg-muted";
const stickyActionsCellClassName =
  "sticky right-0 z-10 bg-background group-hover:bg-muted/50";

type PaginationItem = number | "ellipsis";

function getPaginationItems(currentPage: number, pageCount: number) {
  const items: PaginationItem[] = [];

  if (pageCount <= 7) {
    for (let page = 1; page <= pageCount; page += 1) {
      items.push(page);
    }

    return items;
  }

  items.push(1);

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(pageCount - 1, currentPage + 1);

  if (startPage > 2) {
    items.push("ellipsis");
  }

  for (let page = startPage; page <= endPage; page += 1) {
    items.push(page);
  }

  if (endPage < pageCount - 1) {
    items.push("ellipsis");
  }

  items.push(pageCount);

  return items;
}

export function DataTable<TData>({
  columns,
  data,
  searchBy,
  searchPlaceholder = "Search...",
  paginate = true,
  filter,
  action,
  showToolbar = true,
  columnFilters,
  onColumnFiltersChange,
  editHandler,
  removeHandler,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const activeColumnFilters = columnFilters ?? internalColumnFilters;
  const setActiveColumnFilters =
    onColumnFiltersChange ?? setInternalColumnFilters;
  const actionColumn = React.useMemo<ColumnDef<TData>>(
    () => ({
      id: "actions",
      header: () => <div className="flex justify-end">Actions</div>,
      cell: ({ row }) => {
        const { id: rowId } = row.original as { id?: number | string };

        if (!rowId) {
          return null;
        }

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 p-0" size="icon-sm" variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {editHandler ? (
                    <DropdownMenuItem onClick={() => editHandler(row.original)}>
                      Edit
                    </DropdownMenuItem>
                  ) : null}
                  {removeHandler ? (
                    <DropdownMenuItem
                      onClick={() => removeHandler(row.original)}
                      variant="destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableHiding: false,
      enableSorting: false,
    }),
    [editHandler, removeHandler],
  );

  const allColumns = React.useMemo(
    () => [...columns, ...(editHandler || removeHandler ? [actionColumn] : [])],
    [actionColumn, columns, editHandler, removeHandler],
  );

  const table = useReactTable({
    data,
    columns: allColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setActiveColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters: activeColumnFilters,
    },
  });

  const filterColumn = filter ? table.getColumn(filter.column) : undefined;
  const filterValue =
    (filterColumn?.getFilterValue() as string | undefined) ?? allFilterValue;
  const searchColumn = searchBy ? table.getColumn(searchBy) : undefined;
  const pageCount = table.getPageCount();
  const { pageIndex, pageSize } = table.getState().pagination;
  const currentPage = pageCount > 0 ? pageIndex + 1 : 1;
  const totalRecords = table.getFilteredRowModel().rows.length;
  const firstRecord = totalRecords === 0 ? 0 : pageIndex * pageSize + 1;
  const lastRecord = Math.min((pageIndex + 1) * pageSize, totalRecords);
  const paginationItems = getPaginationItems(currentPage, pageCount);

  return (
    <div className="flex flex-col gap-4">
      {showToolbar && (filter || searchColumn || action) ? (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {filter && filterColumn ? (
              <label className="flex items-center gap-2 text-sm text-zinc-700">
                <span>{filter.label}:</span>
                <Select
                  value={filterValue}
                  onValueChange={(value) => {
                    filterColumn.setFilterValue(
                      value === allFilterValue ? undefined : value,
                    );
                  }}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={allFilterValue}>
                      {filter.allLabel ?? "All"}
                    </SelectItem>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            ) : null}

            {searchColumn ? (
              <label className="relative block w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder={searchPlaceholder}
                  value={(searchColumn.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    searchColumn.setFilterValue(event.target.value)
                  }
                />
              </label>
            ) : null}
          </div>

          {action ? action : null}
        </div>
      ) : null}

      <div className="rounded-md border bg-background">
        <Table className="min-w-[720px]">
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();

                  return (
                    <TableHead
                      className={cn(
                        canSort && "cursor-pointer select-none hover:bg-muted/80",
                        header.column.id === "actions" &&
                          stickyActionsHeaderClassName,
                      )}
                      key={header.id}
                      onClick={
                        canSort
                          ? (event) =>
                              header.column.getToggleSortingHandler()?.(event)
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {sortDirection === "asc" ? (
                          <span aria-hidden="true">↑</span>
                        ) : null}
                        {sortDirection === "desc" ? (
                          <span aria-hidden="true">↓</span>
                        ) : null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id === "actions" &&
                          stickyActionsCellClassName,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={allColumns.length}
                  className="h-16 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginate ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            <Button
              aria-label="Go to first page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
              size="icon-sm"
              variant="ghost"
            >
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              aria-label="Go to previous page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size="icon-sm"
              variant="ghost"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  className="flex size-8 items-center justify-center text-sm text-muted-foreground"
                  key={`ellipsis-${index}`}
                >
                  ...
                </span>
              ) : (
                <Button
                  aria-current={item === currentPage ? "page" : undefined}
                  key={item}
                  onClick={() => table.setPageIndex(item - 1)}
                  size="icon-sm"
                  variant={item === currentPage ? "default" : "ghost"}
                >
                  {item}
                </Button>
              ),
            )}

            <Button
              aria-label="Go to next page"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size="icon-sm"
              variant="ghost"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              aria-label="Go to last page"
              disabled={!table.getCanNextPage()}
              onClick={() => table.lastPage()}
              size="icon-sm"
              variant="ghost"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Select
              value={String(pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>
              Displaying {firstRecord} - {lastRecord} of {totalRecords} records
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
