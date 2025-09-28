"use client"

import type React from "react"

import { useState } from "react"
import { FormFieldGroup } from "@/components/molecules/form-field-group"
import { PasswordChangeSection } from "@/components/molecules/password-change-section"
import { PrimaryButton } from "@/components/atoms/primary-button"
import { ErrorPopup } from "@/components/atoms/error-popup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { AuthService, type ProfileData, type PasswordChangeData } from "@/services/auth-service"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "in", label: "India" },
]

const profileFields = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    required: false,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
    required: false,
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: false,
  },
  {
    id: "country",
    label: "Country",
    placeholder: "Select your country",
    required: false,
    options: countries,
  },
]

export function ProfileForm() {
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)

  const { backendError, networkError, showBackendError, showNetworkError, clearErrors, hasPopupError } =
    useErrorHandler()

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearErrors()

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      const profileData: Partial<ProfileData> = {}

      const username = formData.get("username") as string
      const email = formData.get("email") as string
      const dateOfBirth = formData.get("dateOfBirth") as string
      const country = formData.get("country") as string

      if (username?.trim()) profileData.username = username.trim()
      if (email?.trim()) profileData.email = email.trim()
      if (dateOfBirth?.trim()) profileData.dateOfBirth = dateOfBirth.trim()
      if (country?.trim()) profileData.country = country.trim()

      const response = await AuthService.updateProfile(profileData as ProfileData)

      if (response.success) {
        console.log("Profile updated successfully:", response.user)
        // TODO: Show success message or redirect
      }
    } catch (error) {
      const errorMessage = AuthService.handleApiError(error)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        showNetworkError("Unable to connect to the server. Please check your internet connection and try again.")
      } else {
        showBackendError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordChange = async (data: PasswordChangeData) => {
    clearErrors()
    setIsPasswordSubmitting(true)

    try {
      const response = await AuthService.changePassword(data)

      if (response.success) {
        console.log("Password changed successfully")
        // TODO: Show success message
      }
    } catch (error) {
      const errorMessage = AuthService.handleApiError(error)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        showNetworkError("Unable to connect to the server. Please check your internet connection and try again.")
      } else {
        showBackendError(errorMessage)
      }
    } finally {
      setIsPasswordSubmitting(false)
    }
  }

  const getCurrentError = () => {
    if (backendError) return backendError
    if (networkError) return networkError
    return null
  }

  const currentError = getCurrentError()

  return (
    <>
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* Profile Information Section */}
        <Card className="w-full shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Profile Information
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <FormFieldGroup fields={profileFields} onEmailValidationChange={setIsEmailValid} />

              <div className="pt-4">
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating Profile..." : "Update Profile"}
                </PrimaryButton>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Password Change Section */}
        <PasswordChangeSection onPasswordChange={handlePasswordChange} isSubmitting={isPasswordSubmitting} />
      </div>

      {/* Error Popup */}
      <ErrorPopup
        isOpen={hasPopupError}
        message={currentError?.message || ""}
        onClose={clearErrors}
        title={networkError ? "Connection Error" : "Error"}
      />
    </>
  )
}
