export interface PasswordValidation {
  isValid: boolean
  errors: string[]
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = []

  // Check minimum length
  if (password.length < 8) {
    errors.push("at least 8 characters long")
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("at least one uppercase letter")
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("at least one lowercase letter")
  }

  // Check for number
  if (!/[0-9]/.test(password)) {
    errors.push("at least one number")
  }

  // Check for special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)) {
    errors.push("at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function getPasswordErrorMessage(): string {
  return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
}
