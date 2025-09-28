"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { validateCommunityDescription } from "@/lib/community-validation"

interface CommunityDescriptionFieldProps {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export function CommunityDescriptionField({
  id,
  label,
  placeholder,
  required = false,
  onValidationChange,
}: CommunityDescriptionFieldProps) {
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    setTouched(true)

    const validation = validateCommunityDescription(value)

    if (value.length > 0 && !validation.isValid) {
      setError(validation.error || "")
    } else {
      setError("")
    }

    onValidationChange?.(validation.isValid || value.length === 0)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        className={cn(
          "min-h-[100px] border-gray-200 focus:border-turquoise-500 focus:ring-turquoise-500/20",
          "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400",
          "dark:focus:border-turquoise-400 dark:focus:ring-turquoise-400/20",
          touched && error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        )}
      />
      {touched && error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
    </div>
  )
}
