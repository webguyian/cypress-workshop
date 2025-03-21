import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type DataSelectOption = {
  label: string;
  value: string;
};

type DataSelectProps = {
  className?: string;
  defaultValue: string;
  id: string;
  options: DataSelectOption[];
  placeholder?: string;
};

export const DataSelect = ({
  className,
  defaultValue,
  id,
  options,
  placeholder
}: DataSelectProps) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger id={id} className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
