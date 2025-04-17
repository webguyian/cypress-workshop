import {
  Select,
  SelectContent,
  SelectItem,
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
  onValueChange?: (value: string) => void;
};

export const DataSelect = ({
  className,
  defaultValue,
  id,
  options,
  placeholder,
  onValueChange
}: DataSelectProps) => {
  return (
    <Select name={id} defaultValue={defaultValue} onValueChange={onValueChange}>
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
