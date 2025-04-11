import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';

export type DurationRange = {
  min: number;
  max: number;
};

export type DurationSliderProps = {
  value: DurationRange | null;
  onChange: (range: DurationRange | null) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function DurationSlider({
  value,
  onChange,
  min = 0,
  max = 120,
  step = 5
}: DurationSliderProps) {
  const [localValue, setLocalValue] = useState<number[]>([
    value?.min ?? min,
    value?.max ?? max
  ]);

  useEffect(() => {
    if (value) {
      setLocalValue([value.min, value.max]);
    } else {
      setLocalValue([min, max]);
    }
  }, [value, min, max]);

  const handleValueChange = (newValue: number[]) => {
    setLocalValue(newValue);
    if (newValue[0] === min && newValue[1] === max) {
      onChange(null);
    } else {
      onChange({ min: newValue[0], max: newValue[1] });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{localValue[0]} minutes</span>
        <span>{localValue[1]} minutes</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handleValueChange}
        className="w-full"
      />
    </div>
  );
}
