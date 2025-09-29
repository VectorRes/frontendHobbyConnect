export interface SignupData {
  username: string
  email: string
  password: string
  dateOfBirth: string
  country: string
  biography?: string
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
  token?: string
}

export interface ProfileData {
  username: string
  email: string
  dateOfBirth: string
  country: string
  biography?: string
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
  private static baseUrl = "https://backend-gestion-usuarios-hobby-connect.onrender.com"

  static async signup(data: SignupData): Promise<SignupResponse> {
    try {
      // Map frontend data to backend DTO structure
      const backendData = {
        username: data.username,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
        biography: data.biography || "" // Optional field
      }

      console.log("🚀 Attempting to signup with data:", { ...backendData, password: '[HIDDEN]' })
      console.log("🌐 Request URL:", `${this.baseUrl}/users`)

      const response = await fetch(`${this.baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(backendData),
      })

      console.log("📡 Response status:", response.status)
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

      // Handle different response scenarios
      if (!response.ok) {
        let errorMessage = "Signup failed"
        
        try {
          const errorData = await response.json()
          console.log("❌ Error response data:", errorData)
          
          // Handle validation errors from NestJS
          if (errorData.message && Array.isArray(errorData.message)) {
            errorMessage = errorData.message.join(", ")
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          // If parsing JSON fails, try to get text
          console.log("❌ Failed to parse error JSON:", parseError)
          try {
            const errorText = await response.text()
            console.log("❌ Error response text:", errorText)
            errorMessage = errorText || `Signup failed with status ${response.status}`
          } catch {
            errorMessage = `Signup failed with status ${response.status}`
          }
        }
        
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log("✅ Signup successful, response:", result)

      // Transform backend response to frontend format
      return {
        success: true,
        message: "User created successfully",
        user: {
          id: result.id || result._id, // Handle both MongoDB and other DB IDs
          username: result.username,
          email: result.email
        }
      }
    } catch (error) {
      console.log("❌ Signup error:", error)
      
      // Check if it's a network error (fetch fails completely)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log("🔌 Network error detected")
        throw new Error("Unable to connect to the server. Please check your internet connection and try again.")
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred during signup")
    }
  }

  static async login(data: LoginData): Promise<LoginResponse> {
    try {
      console.log("🚀 Attempting to login with email:", data.email)
      console.log("🌐 Request URL:", `${this.baseUrl}/auth/login`)

      // Note: This endpoint doesn't exist yet in your backend
      // You'll need to create an authentication endpoint
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log("📡 Login response status:", response.status)

      if (!response.ok) {
        let errorMessage = "Login failed"
        
        try {
          const errorData = await response.json()
          console.log("❌ Login error response:", errorData)
          if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch {
          errorMessage = `Login failed with status ${response.status}`
        }
        
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log("✅ Login successful")

      return {
        success: true,
        message: "Login successful",
        user: {
          id: result.user?.id || result.id,
          email: result.user?.email || result.email
        },
        token: result.token || result.accessToken
      }
    } catch (error) {
      console.log("❌ Login error:", error)
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("Unable to connect to the server. Please check your internet connection and try again.")
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred during login")
    }
  }

  static async updateProfile(data: ProfileData): Promise<ProfileResponse> {
    try {
      // Note: You'll need to implement user update endpoint
      // This would typically be PATCH /users/:id
      const userId = localStorage.getItem('userId') // You'll need to store this after login
      
      if (!userId) {
        throw new Error("User not authenticated")
      }

      const response = await fetch(`${this.baseUrl}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Add authorization header if you implement JWT
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let errorMessage = "Profile update failed"
        
        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch {
          errorMessage = `Update failed with status ${response.status}`
        }
        
        throw new Error(errorMessage)
      }

      const result = await response.json()

      return {
        success: true,
        message: "Profile updated successfully",
        user: result
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("Unable to connect to the server. Please check your internet connection and try again.")
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred during profile update")
    }
  }

  static async changePassword(data: PasswordChangeData): Promise<PasswordChangeResponse> {
    try {
      // Note: You'll need to implement password change endpoint
      const userId = localStorage.getItem('userId')
      
      if (!userId) {
        throw new Error("User not authenticated")
      }

      const response = await fetch(`${this.baseUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Add authorization header if you implement JWT
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          ...data
        }),
      })

      if (!response.ok) {
        let errorMessage = "Password change failed"
        
        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch {
          errorMessage = `Password change failed with status ${response.status}`
        }
        
        throw new Error(errorMessage)
      }

      const result = await response.json()

      return {
        success: true,
        message: result.message || "Password changed successfully"
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("Unable to connect to the server. Please check your internet connection and try again.")
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred during password change")
    }
  }

  static handleApiError(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }
    return "An unexpected error occurred. Please try again."
  }

  // Helper method to check if user exists (using your existing endpoint)
  static async verifyUserExists(userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/exists`)
      
      if (!response.ok) {
        return false
      }
      
      const result = await response.json()
      return result.exists
    } catch {
      return false
    }
  }

  // Helper method to get all users (if needed for admin purposes)
  static async getAllUsers() {
    try {
      const response = await fetch(`${this.baseUrl}/users`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      
      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred while fetching users")
    }
  }

  // Test connection method
  static async testConnection(): Promise<boolean> {
    try {
      console.log("🔍 Testing connection to:", `${this.baseUrl}/users`)
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      })
      
      console.log("🔍 Test connection status:", response.status)
      console.log("🔍 Test connection headers:", Object.fromEntries(response.headers.entries()))
      
      return response.status < 500 // Consider it working if not a server error
    } catch (error) {
      console.log("🔍 Test connection failed:", error)
      return false
    }
  }
}

export const authService = new AuthService()