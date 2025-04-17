import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { SelectSingleEventHandler } from 'react-day-picker';

type DatePickerProps = {
  className?: string;
  id: string;
  initialDate?: Date;
};

export const DatePicker = ({ className, id, initialDate }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleOnSelect: SelectSingleEventHandler = (date) => {
    setDate(date);
    setIsPopoverOpen(false);
  };

  return (
    <Popover modal open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger
        className={cn(!date && 'text-muted-foreground', className)}
        id={id}
      >
        <input type="hidden" name={id} value={date?.toLocaleDateString()} />
        <div className="flex gap-2 text-sm items-center text-foreground border rounded-md p-2">
          <CalendarIcon color="currentColor" size={20} />
          {date ? format(date, 'PPP') : <span>Choose a date</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
