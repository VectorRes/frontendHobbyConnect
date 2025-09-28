"use client"

import type React from "react"
import { useState } from "react"

import { FormFieldGroup } from "@/components/molecules/form-field-group"
import { PrimaryButton } from "@/components/atoms/primary-button"
import { ErrorPopup } from "@/components/atoms/error-popup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { AuthService } from "@/services/auth-service"
import type { SignupData } from "@/services/auth-service"

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

const formFields = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a secure password",
    required: true,
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    id: "country",
    label: "Country",
    placeholder: "Select your country",
    required: true,
    options: countries,
  },
]

export function SignupForm() {
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { backendError, networkError, showBackendError, showNetworkError, clearErrors, hasPopupError } =
    useErrorHandler()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Clear any previous errors
    clearErrors()

    // Client-side validation
    if (!isEmailValid) {
      return // Email validation error will show inline
    }

    if (!isPasswordValid) {
      return // Password validation error will show inline
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const signupData: SignupData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        dateOfBirth: formData.get("dateOfBirth") as string,
        country: formData.get("country") as string,
      }

      const response = await AuthService.signup(signupData)

      if (response.success) {
        // Handle successful signup
        console.log("Signup successful:", response.user)
        // You can redirect or show success message here
      }
    } catch (error) {
      // Handle backend errors - these will show in popup
      const errorMessage = AuthService.handleApiError(error)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        // Network error
        showNetworkError("Unable to connect to the server. Please check your internet connection and try again.")
      } else {
        // Backend error
        showBackendError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
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
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Join HOBBY CONNECT
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Create your account to connect with fellow hobbyists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormFieldGroup
              fields={formFields}
              onPasswordValidationChange={setIsPasswordValid}
              onEmailValidationChange={setIsEmailValid}
            />

            <div className="pt-4">
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </PrimaryButton>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-turquoise-600 hover:text-turquoise-700 dark:text-turquoise-400 dark:hover:text-turquoise-300 font-medium"
              >
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

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
