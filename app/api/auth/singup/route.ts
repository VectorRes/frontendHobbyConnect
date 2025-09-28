import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, dateOfBirth, country } = body

    // Simulate different backend error scenarios for testing
    // Remove this in production and replace with your actual backend logic

    // Example: Username already exists
    if (username === "testuser") {
      return NextResponse.json(
        { message: "Username already exists. Please choose a different username." },
        { status: 409 },
      )
    }

    // Example: Email already registered
    if (email === "test@example.com") {
      return NextResponse.json({ message: "An account with this email address already exists." }, { status: 409 })
    }

    // Example: Server error
    if (username === "servererror") {
      return NextResponse.json({ message: "Internal server error. Please try again later." }, { status: 500 })
    }

    // Simulate successful signup
    const user = {
      id: "123",
      username,
      email,
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
      user,
    })
  } catch (error) {
    return NextResponse.json({ message: "Invalid request data." }, { status: 400 })
  }
}
