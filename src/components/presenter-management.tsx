import { useState } from 'react';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import {
  columns,
  DataTable,
  DataTablePagination,
  PresenterTableFilters,
  StatCards
} from '@/components';
import usePresenterData from '@/hooks/use-presenter-data';
import { cn } from '@/lib/utils';

export function PresenterManagement() {
  const [presenterData, updatePresenter] = usePresenterData();
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showFilters, setShowFilters] = useState(false);

  const table = useReactTable({
    data: presenterData,
    columns,
    meta: {
      updateRow: updatePresenter
    },
    state: {
      sorting,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="w-full">
      <div className="flex flex-col min-h-[100vh]">
        <div className="border-b">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-center">
              Presenter Management
            </h1>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className={cn(
            "transition-all duration-200 ease-in-out overflow-hidden",
            showFilters ? "w-80" : "w-0"
          )}>
            <PresenterTableFilters 
              table={table} 
              showFilters={showFilters}
              toggleFilters={setShowFilters}
            />
          </div>
          <div className={cn(
            "flex-1 overflow-x-auto p-6 space-y-4 transition-all duration-200 ease-in-out",
            showFilters ? "ml-0" : "ml-0"
          )}>
            <div className="max-w-5xl mx-auto space-y-4">
              <StatCards data={presenterData} />
              <div className="rounded-md border">
                <DataTable columns={columns} table={table} />
              </div>
              <DataTablePagination table={table} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
