import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeSelector() {
  const [userPreference, setUserPreference] = useTheme();
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Appearance</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Choose how you want the interface to look. Select a theme that matches
          your preference or let the system decide based on your device
          settings.
        </p>

        <div className="space-y-2">
          <label className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-yellow-50/30 cursor-pointer transition-all duration-200 border border-transparent hover:border-yellow-200">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={userPreference === "light"}
              onChange={() => setUserPreference("light")}
              className="custom-radio radio-light mt-1 flex-shrink-0"
            />
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors flex-shrink-0">
                <Sun className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-gray-900">
                  Light
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Clean and bright interface for daytime use
                </span>
              </div>
            </div>
          </label>

          <label className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50/30 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-200">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={userPreference === "dark"}
              onChange={() => setUserPreference("dark")}
              className="custom-radio radio-dark mt-1 flex-shrink-0"
            />
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors flex-shrink-0">
                <Moon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-gray-900">
                  Dark
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Easy on the eyes for low-light environments
                </span>
              </div>
            </div>
          </label>

          <label className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50/30 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200">
            <input
              type="radio"
              name="theme"
              value="auto"
              checked={userPreference === "auto"}
              onChange={() => setUserPreference("auto")}
              className="custom-radio radio-system mt-1 flex-shrink-0"
            />
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors flex-shrink-0">
                <Monitor className="w-5 h-5 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-gray-900">
                  System
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Automatically matches your device preferences
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
