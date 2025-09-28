import Image from "next/image"
import { ProfileForm } from "@/components/organisms/profile-form"
import { ThemeToggle } from "@/components/atoms/theme-toggle"

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col items-center justify-center space-y-8 sticky top-8">
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
                Manage Your{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  HOBBY CONNECT
                </span>{" "}
                Profile
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md transition-colors duration-300">
                Keep your profile information up to date and secure. Update your details and change your password as
                needed.
              </p>
            </div>
          </div>

          {/* Right side - Profile Form */}
          <div className="flex items-center justify-center">
            <div className="w-full">
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
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
