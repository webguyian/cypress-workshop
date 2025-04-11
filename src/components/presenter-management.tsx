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
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/presenter-table-columns';
import { DataTablePagination } from '@/components/data-table-pagination';
import { PresenterTableFilters } from '@/components/presenter-table-filters';
import type { Presenter } from '@/types';

interface PresenterManagementProps {
  data: Presenter[];
}

export function PresenterManagement({ data }: PresenterManagementProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
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
          <div className="w-80 border-r">
            <PresenterTableFilters table={table} />
          </div>
          <div className="flex-1 overflow-x-auto max-w-5xl p-6 space-y-4 mx-auto my-10">
            <div className="rounded-md border">
              <DataTable columns={columns} table={table} />
            </div>
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
    </div>
  );
}
