import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function Header() {
  const [storedUser] = useLocalStorage("Users", { name: "", job: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/notes", label: "Notes", icon: "📝" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  const isActiveRoute = (path) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-2xl">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo/Title */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors duration-200"
              aria-label="Go to dashboard home"
            >
              My Dashboard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                  isActiveRoute(item.path)
                    ? "bg-emerald-100 text-emerald-700 shadow-sm"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                aria-current={isActiveRoute(item.path) ? "page" : undefined}
              >
                <span className="mr-2" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Info & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {storedUser.name || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {storedUser.job || "No job title"}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="hidden lg:block text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              THE CURRENT DATE
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm rounded-b-2xl"
          >
            <nav
              className="space-y-2 px-6"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={isActiveRoute(item.path) ? "page" : undefined}
                >
                  <span className="mr-3" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile User Info */}
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200/50 px-6">
              <div className="flex items-center px-4 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {storedUser.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {storedUser.job || "No job title"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
