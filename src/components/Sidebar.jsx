import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  User,
  FileText,
  StickyNote,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isCollapsed = false, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isExpanded = !isCollapsed || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHoverChange) {
      onHoverChange(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHoverChange) {
      onHoverChange(false);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    { icon: BarChart3, label: "Analytics", path: "/" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: FileText, label: "Create Note", path: "/create-note" },
    { icon: StickyNote, label: "Notes", path: "/notes" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`bg-element-light dark:bg-element-dark border-gray-200 h-screen fixed m-3 rounded-xl left-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center p-4 ">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          {isExpanded && (
            <span className="ml-3 text-lg font-semibold text-gray-800">
              My Dashboard
            </span>
          )}
        </div>

        {/* Profile Section */}
        <div className="p-4 ">
          <div className="relative">
            <div
              className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              {isExpanded && (
                <>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      Brooklyn Alice
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && isExpanded && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pages Section */}
        <div className="flex-1 p-4">
          <div className="mb-4">
            {isExpanded && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                PAGES
              </h3>
            )}
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors"
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {isExpanded && <span className="ml-3">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
