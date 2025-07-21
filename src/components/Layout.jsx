import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";


function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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

  const handleToggleSidebar = () => {
    // Si es móvil, toggle sidebar móvil, si no, toggle collapse desktop
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSidebarHoverChange = (isHovered) => {
    setSidebarHovered(isHovered);
  };

  // Determinar el ancho efectivo de la sidebar
  const getEffectiveSidebarWidth = () => {
    // En móvil, no aplicar margen porque sidebar es overlay
    if (isMobile) {
      return "ml-0";
    }
    
    // En desktop, aplicar margen según estado de sidebar
    if (!sidebarCollapsed) {
      return "ml-64"; // Sidebar expandida
    } else if (sidebarHovered) {
      return "ml-64"; // Sidebar colapsada pero con hover
    } else {
      return "ml-16"; // Sidebar colapsada
    }
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark dark:text-text-light w-screen min-h-screen">  
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onHoverChange={setSidebarHovered}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <div
        className={`transition-all duration-300 ease-in-out ${getEffectiveSidebarWidth()}`}
      >
        <Header
          onToggleSidebar={handleToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          sidebarHovered={sidebarHovered}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />
        <main className="p-0 md:px-8 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;