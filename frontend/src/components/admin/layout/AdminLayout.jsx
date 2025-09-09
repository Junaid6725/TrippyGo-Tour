import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 p-4 sm:p-6 bg-gray-100 ">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
    </>
  );
};

export default AdminLayout;
