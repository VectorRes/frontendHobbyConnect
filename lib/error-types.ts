export enum ErrorType {
  VALIDATION = "validation",
  BACKEND = "backend",
  NETWORK = "network",
}

export interface ValidationError {
  type: ErrorType.VALIDATION
  field: string
  message: string
}

export interface BackendError {
  type: ErrorType.BACKEND
  message: string
  code?: string
}

export interface NetworkError {
  type: ErrorType.NETWORK
  message: string
}

export type AppError = ValidationError | BackendError | NetworkError

export interface FormValidationState {
  isEmailValid: boolean
  isPasswordValid: boolean
  errors: ValidationError[]
}
