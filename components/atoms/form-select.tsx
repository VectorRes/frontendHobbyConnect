import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FormSelectProps {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  options: { value: string; label: string }[]
}

export function FormSelect({
  id,
  label,
  placeholder = "Select an option",
  required = false,
  options,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </Label>
      <Select name={id} required={required}>
        <SelectTrigger className="border-gray-200 focus:border-turquoise-500 focus:ring-turquoise-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-turquoise-400 dark:focus:ring-turquoise-400/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="dark:text-white dark:focus:bg-gray-700">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
