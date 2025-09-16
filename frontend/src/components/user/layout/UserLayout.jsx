import React from "react";
import UserDashboard from "../../../pages/userPages/UserDashboard";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <>
      <div className="flex ">
        <UserDashboard />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
