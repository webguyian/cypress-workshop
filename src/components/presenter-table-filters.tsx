import { useState } from 'react';
import { Table } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  DateRangePicker,
  DurationSlider,
  DurationRange,
  StatusSelect
} from '@/components';
import { cn } from '@/lib/utils';

interface PresenterTableFiltersProps<TData> {
  table: Table<TData>;
  showFilters: boolean;
}

export function PresenterTableFilters<TData>({
  table,
  showFilters
}: PresenterTableFiltersProps<TData>) {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [durationRange, setDurationRange] = useState<DurationRange | null>(
    null
  );
  const [statusValue, setStatusValue] = useState<string>('');

  const columns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter());

  const handleFilter = (columnId: string, value: string) => {
    table.getColumn(columnId)?.setFilterValue(value);
  };

  const handleDateRangeChange = (range: DateRange | null) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      table.getColumn('date')?.setFilterValue({
        from: range.from,
        to: range.to
      });
    } else {
      table.getColumn('date')?.setFilterValue(null);
    }
  };

  const handleDurationChange = (range: DurationRange | null) => {
    setDurationRange(range);
    if (range) {
      table.getColumn('duration')?.setFilterValue({
        min: range.min,
        max: range.max
      });
    } else {
      table.getColumn('duration')?.setFilterValue(null);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatusValue(value);
    table.getColumn('status')?.setFilterValue(value || null);
  };

  const handleReset = () => {
    table.resetColumnFilters();
    setDateRange(null);
    setDurationRange(null);
    setStatusValue('');
  };

  return (
    <div
      className={cn('h-full bg-background border-r', !showFilters && 'hidden')}
    >
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="space-y-6">
          {columns.map((column) => {
            if (column.id === 'date') {
              return (
                <div key={column.id} className="space-y-2">
                  <Label>Date Range</Label>
                  <DateRangePicker
                    id="date-range"
                    initialDateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                  />
                </div>
              );
            } else if (column.id === 'duration') {
              return (
                <div key={column.id} className="space-y-2">
                  <Label>Duration</Label>
                  <DurationSlider
                    value={durationRange}
                    onChange={handleDurationChange}
                  />
                </div>
              );
            } else if (column.id === 'status') {
              const statusLabelId = 'status-label';
              return (
                <div key={column.id} className="space-y-2">
                  <Label id={statusLabelId}>Status</Label>
                  <StatusSelect
                    value={statusValue}
                    onChange={handleStatusChange}
                    ariaLabelledBy={statusLabelId}
                  />
                </div>
              );
            } else {
              const inputId = `${column.id}-filter-input`;
              return (
                <div key={column.id} className="space-y-2">
                  <Label htmlFor={inputId}>
                    {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                  </Label>
                  <Input
                    id={inputId}
                    value={(column.getFilterValue() as string) ?? ''}
                    onChange={(e) => handleFilter(column.id, e.target.value)}
                    placeholder={`Filter ${column.id}...`}
                    className="w-full"
                  />
                </div>
              );
            }
          })}
          <Button variant="outline" onClick={handleReset} className="w-full">
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  );
}