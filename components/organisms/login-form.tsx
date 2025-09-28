"use client"

import type React from "react"

import { useState } from "react"
import { FormInput } from "@/components/atoms/form-input"
import { PasswordField } from "@/components/molecules/password-field"
import { PrimaryButton } from "@/components/atoms/primary-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { ErrorPopup } from "@/components/atoms/error-popup"
import { validateEmail } from "@/lib/email-validation"
import { authService } from "@/services/auth-service"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { error, showError, clearError } = useErrorHandler()

  const handleEmailChange = (value: string) => {
    if (value.length > 0) {
      const validation = validateEmail(value)
      setEmailError(validation.isValid ? "" : validation.error || "")
    } else {
      setEmailError("")
    }
  }

  const handlePasswordChange = (isValid: boolean) => {
    // For login, we don't need strict password validation
    // Just check if password is not empty
    setPasswordError("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Basic validation
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "")
      setIsLoading(false)
      return
    }

    if (!password) {
      setPasswordError("Password is required")
      setIsLoading(false)
      return
    }

    try {
      await authService.login({ email, password })
      // Handle successful login (redirect, etc.)
      console.log("Login successful!")
    } catch (err) {
      showError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Sign in to your HOBBY CONNECT account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
              error={emailError}
              onChange={handleEmailChange}
            />

            <PasswordField
              id="password"
              label="Password"
              placeholder="Enter your password"
              required
              onValidationChange={handlePasswordChange}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-turquoise-500 focus:ring-turquoise-500/20"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-turquoise-600 hover:text-turquoise-700 dark:text-turquoise-400 dark:hover:text-turquoise-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <PrimaryButton type="submit" disabled={isLoading || !!emailError} className="w-full">
              {isLoading ? "Signing In..." : "Sign In"}
            </PrimaryButton>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/"
                className="text-turquoise-600 hover:text-turquoise-700 dark:text-turquoise-400 dark:hover:text-turquoise-300 font-medium transition-colors"
              >
                Sign up here
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

      <ErrorPopup
        isOpen={!!error}
        onClose={clearError}
        title="Login Error"
        message={error?.message || "An unexpected error occurred"}
      />
    </>
  )
}
