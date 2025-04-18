import { ColumnDef } from '@tanstack/react-table';
import { format, isWithinInterval } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ActionCell } from '@/components';
import type { Presenter } from '@/types';

export const columns: ColumnDef<Presenter>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'topic',
    header: 'Topic'
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return format(new Date(`${row.getValue('date')}T00:00:00`), 'PPP');
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const date = new Date(row.getValue(columnId));
      const { from, to } = filterValue;
      return isWithinInterval(date, { start: from, end: to });
    }
  },
  {
    accessorKey: 'duration',
    header: 'Duration (min)',
    filterFn: (
      row,
      columnId,
      filterValue: { min: number; max: number } | null
    ) => {
      if (!filterValue) return true;
      const duration = row.getValue(columnId) as number;
      return duration >= filterValue.min && duration <= filterValue.max;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusStyles =
        {
          pending: 'bg-yellow-100 text-yellow-800',
          approved: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
          completed: 'bg-blue-100 text-blue-800',
          review: 'bg-purple-100 text-purple-800'
        }[status] || 'bg-gray-100 text-gray-800';

      return (
        <Badge variant="outline" className={`capitalize ${statusStyles}`}>
          {status}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue: string | null) => {
      if (!filterValue) return true;
      const status = row.getValue(columnId) as string;
      return status === filterValue;
    }
  },
  {
    id: 'actions',
    cell: (props) => <ActionCell {...props} />
  }
];
