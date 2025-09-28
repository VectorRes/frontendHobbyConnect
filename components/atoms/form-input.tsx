"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
  error?: string
  onChange?: (value: string) => void
}

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  className,
  error,
  onChange,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "border-gray-200 focus:border-turquoise-500 focus:ring-turquoise-500/20",
          "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400",
          "dark:focus:border-turquoise-400 dark:focus:ring-turquoise-400/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
    </div>
  )
}
