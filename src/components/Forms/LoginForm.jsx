import React from "react";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../../assets/login.webp";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-transparent p-4 overflow-hidden">
      <div className="w-full h-full max-h-[calc(100vh-2rem)] bg-element-light dark:bg-element-dark rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - Image section */}
          <div className="lg:w-1/2 h-64 lg:h-full relative flex-shrink-0">
            {/* Background image that covers the entire section */}
            <img
              src={loginImg}
              alt="Log In Image"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Logo */}
            <div className="absolute top-6 left-6 z-10">
              <div className="text-white font-bold text-2xl">My Company</div>
            </div>

            {/* Lorem Ipsum at bottom */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-white/90 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>

          {/* Right side - Form section */}
          <div className="lg:w-1/2 flex-1 overflow-y-auto">
            <div className="p-8 lg:p-12 flex flex-col justify-center min-h-full">
              <div className="w-full max-w-sm mx-auto">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-2">
                  ¡Welcome back!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Sign in to your account to continue
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-element-light dark:bg-element-dark text-text-light dark:text-text-light rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 bg-element-light dark:bg-element-dark text-text-light dark:text-text-light rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Forgot password */}
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      ¿Forgot your password?
                    </a>
                  </div>

                  {/* Login button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-6"
                  >
                    Login
                  </button>

                  {/* Continue with Google */}
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  {/* Create account link */}
                  <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create account
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
