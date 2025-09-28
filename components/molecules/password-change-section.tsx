"use client"

import type React from "react"

import { useState } from "react"
import { PasswordField } from "@/components/molecules/password-field"
import { FormInput } from "@/components/atoms/form-input"
import { PrimaryButton } from "@/components/atoms/primary-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PasswordChangeSectionProps {
  onPasswordChange?: (data: { currentPassword: string; newPassword: string }) => void
  isSubmitting?: boolean
}

export function PasswordChangeSection({ onPasswordChange, isSubmitting = false }: PasswordChangeSectionProps) {
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [confirmError, setConfirmError] = useState("")

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (value && newPassword && value !== newPassword) {
      setConfirmError("Passwords do not match")
    } else {
      setConfirmError("")
    }
  }

  const handleNewPasswordValidation = (isValid: boolean) => {
    setIsNewPasswordValid(isValid)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isNewPasswordValid && !confirmError && currentPassword && newPassword === confirmPassword) {
      onPasswordChange?.({ currentPassword, newPassword })
    }
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="currentPassword"
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            required
            onChange={setCurrentPassword}
          />

          <div className="space-y-2">
            <PasswordField
              id="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              required
              onValidationChange={handleNewPasswordValidation}
            />
          </div>

          <FormInput
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            required
            error={confirmError}
            onChange={handleConfirmPasswordChange}
          />

          <div className="pt-4">
            <PrimaryButton
              type="submit"
              disabled={
                !isNewPasswordValid ||
                !!confirmError ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                isSubmitting
              }
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </PrimaryButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
