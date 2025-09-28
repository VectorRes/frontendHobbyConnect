import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock authentication logic - replace with your actual authentication
    if (email === "test@example.com" && password === "password123") {
      return NextResponse.json({
        message: "Login successful",
        user: { email, id: "1" },
      })
    }

    if (email === "admin@hobbyconnect.com") {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Default success for demo
    return NextResponse.json({
      message: "Login successful",
      user: { email, id: "demo" },
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
