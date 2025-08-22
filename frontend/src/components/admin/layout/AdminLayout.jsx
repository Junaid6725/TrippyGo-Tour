import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
