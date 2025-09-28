import Image from "next/image"
import { SignupForm } from "@/components/organisms/signup-form"
import { ThemeToggle } from "@/components/atoms/theme-toggle"

export function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <Image
                src="/logo-complete.png"
                alt="HOBBY CONNECT Logo"
                width={300}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  HOBBY CONNECT
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md transition-colors duration-300">
                Discover, share, and connect with people who share your passions. Join our vibrant community of
                hobbyists today!
              </p>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Mobile logo */}
              <div className="lg:hidden text-center mb-8">
                <Image
                  src="/logo-complete.png"
                  alt="HOBBY CONNECT Logo"
                  width={200}
                  height={133}
                  className="mx-auto object-contain"
                />
              </div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
