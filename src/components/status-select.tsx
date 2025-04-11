import { useCallback } from 'react'
import { DataSelect } from "@/components/data-select"


const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Review", value: "review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Completed", value: "completed" },
]

export type StatusSelectProps = {
  value: string
  onChange: (value: string) => void
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const handleChange = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue === "all" ? "" : selectedValue)
    },
    [onChange]
  )

  return (
    <DataSelect
      id="status-filter"
      defaultValue={value || "all"}
      options={STATUS_OPTIONS}
      placeholder="Select status"
      className="w-full"
      onValueChange={handleChange}
    />
  )
} 