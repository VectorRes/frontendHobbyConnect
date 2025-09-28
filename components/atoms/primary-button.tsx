"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PrimaryButtonProps {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export function PrimaryButton({ children, type = "button", disabled = false, className, onClick }: PrimaryButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
        className,
      )}
    >
      {children}
    </Button>
  )
}
