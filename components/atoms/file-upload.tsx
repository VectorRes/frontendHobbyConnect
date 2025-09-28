"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  id: string
  label: string
  accept?: string
  required?: boolean
  onFileChange?: (file: File | null) => void
}

export function FileUpload({ id, label, accept = "image/*", required = false, onFileChange }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
    onFileChange?.(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileChange(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </Label>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          "border-gray-200 dark:border-gray-700",
          "hover:border-turquoise-400 dark:hover:border-turquoise-500",
          dragActive && "border-turquoise-500 bg-turquoise-50 dark:bg-turquoise-900/20",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-turquoise-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => handleFileChange(null)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 text-gray-400 mx-auto" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <label htmlFor={id} className="cursor-pointer text-turquoise-600 hover:text-turquoise-700 font-medium">
                Click to upload
              </label>
              {" or drag and drop"}
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}

        <input
          id={id}
          name={id}
          type="file"
          accept={accept}
          required={required}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  )
}
