import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSidebarHoverChange = (isHovered) => {
    setSidebarHovered(isHovered);
  };

  // Determinar el ancho efectivo de la sidebar
  const getEffectiveSidebarWidth = () => {
    if (!sidebarCollapsed) {
      return 'ml-64'; // Sidebar expandida
    } else if (sidebarHovered) {
      return 'ml-64'; // Sidebar colapsada pero con hover
    } else {
      return 'ml-16'; // Sidebar colapsada
    }
  };
  
  return (
    <div className="bg-bg-light dark:bg-bg-dark dark:text-text-light w-screen min-h-screen">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onHoverChange={handleSidebarHoverChange}
      />
      <div className={`transition-all duration-300 ease-in-out ${getEffectiveSidebarWidth()}`}>
        <Header 
          onToggleSidebar={handleToggleSidebar} 
          sidebarCollapsed={sidebarCollapsed}
          sidebarHovered={sidebarHovered}
        />
        <main className="p-8 pt-40">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;