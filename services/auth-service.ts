export interface SignupData {
  username: string
  email: string
  password: string
  dateOfBirth: string
  country: string
}

export interface SignupResponse {
  success: boolean
  message?: string
  user?: {
    id: string
    username: string
    email: string
  }
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  user?: {
    id: string
    email: string
  }
}

export interface ProfileData {
  username: string
  email: string
  dateOfBirth: string
  country: string
}

export interface ProfileResponse {
  success: boolean
  message?: string
  user?: ProfileData
}

export interface PasswordChangeData {
  currentPassword: string
  newPassword: string
}

export interface PasswordChangeResponse {
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export class AuthService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"

  static async signup(data: SignupData): Promise<SignupResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Signup failed")
      }

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  static async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Login failed")
      }

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  static async updateProfile(data: ProfileData): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Profile update failed")
      }

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  static async changePassword(data: PasswordChangeData): Promise<PasswordChangeResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Password change failed")
      }

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  static handleApiError(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }
    return "An unexpected error occurred. Please try again."
  }
}

export const authService = new AuthService()
