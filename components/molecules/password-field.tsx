"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { validatePassword, getPasswordErrorMessage } from "@/lib/password-validation"

interface PasswordFieldProps {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export function PasswordField({ id, label, placeholder, required = false, onValidationChange }: PasswordFieldProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setTouched(true)

    const validation = validatePassword(value)

    if (value.length > 0 && !validation.isValid) {
      setError(getPasswordErrorMessage())
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
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className={cn(
            "border-gray-200 focus:border-turquoise-500 focus:ring-turquoise-500/20 pr-10",
            "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400",
            "dark:focus:border-turquoise-400 dark:focus:ring-turquoise-400/20",
            touched && error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </button>
      </div>
      {touched && error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
    </div>
  )
}
