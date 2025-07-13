import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-bg-light dark:bg-black dark:text-text-light w-screen pt-32">
      <div className="header-section">
        <Header />
      </div>
      <div className="content-column px-8">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
