export interface CommunityValidation {
  isValid: boolean
  error?: string
}

export function validateCommunityName(name: string): CommunityValidation {
  if (name.length < 3) {
    return { isValid: false, error: "Community name must be at least 3 characters long" }
  }

  if (name.length > 25) {
    return { isValid: false, error: "Community name must be at most 25 characters long" }
  }

  return { isValid: true }
}

export function validateCommunityDescription(description: string): CommunityValidation {
  if (description.trim().length === 0) {
    return { isValid: false, error: "Community description is required" }
  }

  return { isValid: true }
}
