"use client"

import { useState } from "react"
import { FormInput } from "@/components/atoms/form-input"
import { validateCommunityName } from "@/lib/community-validation"

interface CommunityNameFieldProps {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export function CommunityNameField({
  id,
  label,
  placeholder,
  required = false,
  onValidationChange,
}: CommunityNameFieldProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  const handleNameChange = (value: string) => {
    setName(value)
    setTouched(true)

    const validation = validateCommunityName(value)

    if (value.length > 0 && !validation.isValid) {
      setError(validation.error || "")
    } else {
      setError("")
    }

    onValidationChange?.(validation.isValid || value.length === 0)
  }

  return (
    <FormInput
      id={id}
      label={label}
      type="text"
      placeholder={placeholder}
      required={required}
      error={touched && error ? error : undefined}
      onChange={handleNameChange}
    />
  )
}
