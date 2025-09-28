"use client"

import { useState, useCallback } from "react"
import type { BackendError, NetworkError } from "@/lib/error-types"
import { ErrorType } from "@/lib/error-types"

interface UseErrorHandlerReturn {
  backendError: BackendError | null
  networkError: NetworkError | null
  showBackendError: (message: string, code?: string) => void
  showNetworkError: (message: string) => void
  clearErrors: () => void
  hasPopupError: boolean
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [backendError, setBackendError] = useState<BackendError | null>(null)
  const [networkError, setNetworkError] = useState<NetworkError | null>(null)

  const showBackendError = useCallback((message: string, code?: string) => {
    setBackendError({
      type: ErrorType.BACKEND,
      message,
      code,
    })
  }, [])

  const showNetworkError = useCallback((message: string) => {
    setNetworkError({
      type: ErrorType.NETWORK,
      message,
    })
  }, [])

  const clearErrors = useCallback(() => {
    setBackendError(null)
    setNetworkError(null)
  }, [])

  const hasPopupError = backendError !== null || networkError !== null

  return {
    backendError,
    networkError,
    showBackendError,
    showNetworkError,
    clearErrors,
    hasPopupError,
  }
}
