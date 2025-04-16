import { ColumnDef } from '@tanstack/react-table';
import { format, isWithinInterval } from 'date-fns';
import { Drawer } from '@/components/drawer';
import { DetailsForm } from '@/components/details-form';
import { Badge } from '@/components/ui/badge';
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
      return format(new Date(row.getValue('date')), 'PPP');
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
          pending:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          approved:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          completed:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          review:
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
        }[status] ||
        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';

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
    cell: ({ row }) => {
      const presenter = row.original;
      return (
        <Drawer>
          <DetailsForm data={presenter} />
        </Drawer>
      );
    }
  }
];
