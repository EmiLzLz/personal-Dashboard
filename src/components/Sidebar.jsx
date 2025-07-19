import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const Sidebar = ({
  isCollapsed = false,
  onHoverChange,
  isMobileOpen,
  onCloseMobile,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar tamaño pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isExpanded = !isCollapsed || isHovered;

  // Manejar hover
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      onHoverChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      onHoverChange?.(false);
    }
  };

  // Manejar navegación
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onCloseMobile?.();
    }
  };

  // Manejar logout
  const handleLogout = () => {
    // Aquí puedes agregar lógica de logout
    console.log("Logout");
    navigate("/");
  };

  const menuItems = [
    { icon: BarChart3, label: "Analytics", path: "/" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: FileText, label: "Create Note", path: "/create-note" },
    { icon: StickyNote, label: "Notes", path: "/notes" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Overlay semi-transparente solo visible en móvil cuando sidebar está abierta */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onCloseMobile}
        />
      )}

      <div
        className={`
          bg-element-light dark:bg-element-dark border-gray-200 h-screen fixed top-0 left-0 rounded-xl
          transition-all duration-300 ease-in-out
          ${
            isMobile
              ? `z-50 w-64 transform ${
                  isMobileOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : `m-3 ${isExpanded ? "w-64" : "w-16"} z-50`
          }
        `}
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
              <span className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                My Dashboard
              </span>
            )}
          </div>

          {/* Profile Section */}
          <div className="p-4 ">
            <div className="relative">
              <div
                className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg py-2 px-0 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                {isExpanded && (
                  <>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center px-1 py-1 text-sm font-medium rounded-full transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      <item.icon size={20} className="flex-shrink-0" />
                      {isExpanded && <span className="ml-3">{item.label}</span>}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;