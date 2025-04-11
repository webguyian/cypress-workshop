import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type DateRangePickerProps = {
  className?: string
  id: string
  initialDateRange?: DateRange | null
  onDateRangeChange?: (range: DateRange | null) => void
}

export function DateRangePicker({
  className,
  id,
  initialDateRange,
  onDateRangeChange
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange | null>(initialDateRange || null)

  useEffect(() => {
    if (initialDateRange !== undefined) {
      setDateRange(initialDateRange)
    }
  }, [initialDateRange])

  const handleDateRangeSelect = (selectedRange: DateRange | undefined) => {
    setDateRange(selectedRange || null)
    if (onDateRangeChange) {
      onDateRangeChange(selectedRange || null)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
              id={id}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from || undefined}
            selected={dateRange || undefined}
            onSelect={handleDateRangeSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
} 