import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { mockPresenters } from '../../src/const/mocks/presenters.js';
import { columns } from '../../src/components/presenter-table-columns.js';

export const useTestTableInstance = () => {
  return useReactTable({
    data: mockPresenters,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
}; 