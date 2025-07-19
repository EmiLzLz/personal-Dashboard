import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, User, Settings } from "lucide-react";

function Header({ onToggleSidebar, sidebarCollapsed, sidebarHovered, isMobileSidebarOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Mapeo de rutas a nombres de páginas
  const pageNames = {
    "/": "Dashboard",
    "/profile": "Profile",
    "/notes": "Notes",
    "/settings": "Settings",
    "/create-note": "Create Note",
  };

  // Obtener el nombre de la página actual
  const getCurrentPageName = () => {
    return pageNames[location.pathname] || "Page";
  };

  // Detectar si es móvil y actualizar cuando cambie el tamaño
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar al montar el componente
    checkIsMobile();
    
    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Detectar scroll para aplicar efecto glass
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  const handleUserClick = () => {
    console.log("User icon clicked");
  };

  const handleSettingsClick = () => {
    console.log("Settings icon clicked");
  };

  // Determinar la posición izquierda del header
  const getHeaderLeftPosition = () => {
    // En móvil, siempre usar left-0 porque sidebar es overlay
    if (isMobile) {
      return "left-0";
    }
    
    // En desktop, aplicar posición según estado de sidebar
    if (!sidebarCollapsed) {
      return "left-64"; // Sidebar expandida desktop
    } else if (sidebarHovered) {
      return "left-64"; // Sidebar colapsada con hover desktop
    } else {
      return "left-16"; // Sidebar colapsada desktop
    }
  };

  return (
    <header
      className={`fixed top-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 bg-transparent transition-all duration-300 ${getHeaderLeftPosition()} right-0`}
    >
      <div
        className={`flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-lg border border-gray-200/20 dark:border-gray-700/20"
            : "bg-transparent"
        }`}
      >
        {/* Lado izquierdo: Toggle Menu + Breadcrumbs */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Page</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {getCurrentPageName()}
            </span>
          </div>
        </div>

        {/* Lado derecho: Iconos de Usuario y Ajustes */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUserClick}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            aria-label="User profile"
          >
            <User className="w-6 h-6" />
          </button>

          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;