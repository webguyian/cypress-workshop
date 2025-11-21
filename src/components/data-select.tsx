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
  ariaLabelledBy: string;
};

export const DataSelect = ({
  className,
  defaultValue,
  id,
  options,
  placeholder,
  onValueChange,
  ariaLabelledBy
}: DataSelectProps) => {
  return (
    <Select name={id} defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger 
        id={id} 
        className={cn('w-full', className)}
        aria-labelledby={ariaLabelledBy}
      >
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
