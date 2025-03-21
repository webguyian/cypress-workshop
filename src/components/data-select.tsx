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
  id: string;
  options: DataSelectOption[];
  placeholder?: string;
  value: string;
};

export const DataSelect = ({
  className,
  id,
  options,
  placeholder,
  value
}: DataSelectProps) => {
  return (
    <Select defaultValue={value}>
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
