import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div className="header-section">
        <Header />
      </div>
      <div className="content-columns">
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
