export interface EmailValidation {
  isValid: boolean
  error?: string
}

export function validateEmail(email: string): EmailValidation {
  // Check for spaces
  if (email.includes(" ")) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Check for exactly one "@" symbol
  const atCount = (email.match(/@/g) || []).length
  if (atCount !== 1) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Split into local and domain parts
  const [localPart, domainPart] = email.split("@")

  // Check if both parts exist
  if (!localPart || !domainPart) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Validate local part (before @)
  // Valid characters: letters, numbers, and some special characters
  const localPartRegex = /^[a-zA-Z0-9._-]+$/
  if (!localPartRegex.test(localPart)) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Check if domain part contains at least one period
  if (!domainPart.includes(".")) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Check if domain part starts with a period
  if (domainPart.startsWith(".")) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Check for consecutive periods in domain part
  if (domainPart.includes("..")) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Validate domain part characters
  const domainPartRegex = /^[a-zA-Z0-9.-]+$/
  if (!domainPartRegex.test(domainPart)) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Check top-level domain (TLD) - must be at least 2 characters
  const domainParts = domainPart.split(".")
  const tld = domainParts[domainParts.length - 1]
  if (!tld || tld.length < 2) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Check that TLD contains only letters
  const tldRegex = /^[a-zA-Z]+$/
  if (!tldRegex.test(tld)) {
    return { isValid: false, error: "Invalid email format" }
  }

  return { isValid: true }
}

export function getEmailErrorMessage(): string {
  return "Invalid email format"
}
