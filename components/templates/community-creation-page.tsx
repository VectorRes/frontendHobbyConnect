"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CommunityNameField } from "@/components/molecules/community-name-field"
import { CommunityDescriptionField } from "@/components/molecules/community-description-field"
import { FileUpload } from "@/components/atoms/file-upload"
import { ErrorPopup } from "@/components/atoms/error-popup"
import { useErrorHandler } from "@/hooks/use-error-handler"

interface CommunityData {
  name: string
  description: string
  image?: File
}

export function CommunityCreationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isNameValid, setIsNameValid] = useState(false)
  const [isDescriptionValid, setIsDescriptionValid] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { backendError, networkError, showBackendError, showNetworkError, clearErrors, hasPopupError } =
    useErrorHandler()

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const canProceedFromStep1 = isNameValid
  const canProceedFromStep2 = isDescriptionValid
  const canSubmit = isNameValid && isDescriptionValid

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!canSubmit) return

    clearErrors()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const communityData: CommunityData = {
        name: formData.get("communityName") as string,
        description: formData.get("communityDescription") as string,
        image: selectedImage || undefined,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Community created:", communityData)
      // Handle successful creation - redirect or show success message
    } catch (error) {
      showBackendError("Failed to create community. Please try again.")
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
            Create Community
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Step {currentStep} of {totalSteps}
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Community Name */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    What's your community name?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Choose a unique name that represents your community (3-25 characters)
                  </p>
                </div>

                <CommunityNameField
                  id="communityName"
                  label="Community Name"
                  placeholder="Enter community name"
                  required
                  onValidationChange={setIsNameValid}
                />

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceedFromStep1}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Community Description */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Describe your community</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Tell people what your community is about and what they can expect
                  </p>
                </div>

                <CommunityDescriptionField
                  id="communityDescription"
                  label="Community Description"
                  placeholder="Describe your community, its purpose, and what members can expect..."
                  required
                  onValidationChange={setIsDescriptionValid}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" onClick={handlePrevious} variant="outline">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceedFromStep2}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Community Image */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Add a community image</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Upload an image to represent your community (optional)
                  </p>
                </div>

                <FileUpload
                  id="communityImage"
                  label="Community Image"
                  accept="image/*"
                  required={false}
                  onFileChange={setSelectedImage}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" onClick={handlePrevious} variant="outline">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? "Creating Community..." : "Create Community"}
                  </Button>
                </div>
              </div>
            )}
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
