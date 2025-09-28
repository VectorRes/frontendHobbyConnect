"use client"

import { useState } from "react"
import { FormInput } from "@/components/atoms/form-input"
import { validateEmail, getEmailErrorMessage } from "@/lib/email-validation"

interface EmailFieldProps {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export function EmailField({ id, label, placeholder, required = false, onValidationChange }: EmailFieldProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setTouched(true)

    const validation = validateEmail(value)

    if (value.length > 0 && !validation.isValid) {
      setError(getEmailErrorMessage())
    } else {
      setError("")
    }

    onValidationChange?.(validation.isValid || value.length === 0)
  }

  return (
    <FormInput
      id={id}
      label={label}
      type="email"
      placeholder={placeholder}
      required={required}
      error={touched && error ? error : undefined}
      onChange={handleEmailChange}
    />
  )
}
