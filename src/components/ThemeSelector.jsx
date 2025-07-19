import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { toast } from "sonner";
import useTheme from "../hooks/useTheme";

export default function ThemeSelector() {
  const [userPreference, setUserPreference] = useTheme();

  const handleThemeChange = (theme) => {
    setUserPreference(theme);
    
    // Mostrar notificación según el tema seleccionado
    switch (theme) {
      case "light":
        toast.success("Light theme activated", {
          description: "Easy on the eyes for low-light environments",
          icon: "☀️",
        });
        break;
      case "dark":
        toast.success("Dark theme activated", {
          description: "Diseño suave para ambientes con poca luz",
          icon: "🌙",
        });
        break;
      case "auto":
        toast.success("System preference activated", {
          description: "Automatically matches your device preferences",
          icon: "🖥️",
        });
        break;
      default:
        toast.success("Tema cambiado exitosamente");
    }
  };

  return (
    <>
      <div className="bg-element-light dark:bg-element-dark rounded-2xl p-6 shadow-lg w-full h-full mx-auto">
        <h2 className="text-2xl font-light text-text-dark dark:text-text-light mb-2">Appearance</h2>
        <p className="text-text-dark dark:text-text-light text-sm mb-6 leading-relaxed">
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
              onChange={() => handleThemeChange("light")}
              className="custom-radio radio-light mt-1 flex-shrink-0"
            />
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors flex-shrink-0">
                <Sun className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-text-dark dark:text-text-light">
                  Light
                </span>
                <span className="block text-xs text-text-dark dark:text-text-light mt-0.5">
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
              onChange={() => handleThemeChange("dark")}
              className="custom-radio radio-dark mt-1 flex-shrink-0"
            />
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors flex-shrink-0">
                <Moon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-text-dark dark:text-text-light">
                  Dark
                </span>
                <span className="block text-xs text-text-dark dark:text-text-light mt-0.5">
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
              onChange={() => handleThemeChange("auto")}
              className="custom-radio radio-system mt-1 flex-shrink-0"
            />
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors flex-shrink-0">
                <Monitor className="w-5 h-5 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-text-dark dark:text-text-light">
                  System
                </span>
                <span className="block text-xs text-text-dark dark:text-text-light mt-0.5">
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