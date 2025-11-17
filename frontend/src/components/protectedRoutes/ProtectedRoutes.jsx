import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../api/axios";

const ProtectedRoutes = ({ role: requiredRole, children }) => {
  const token = useSelector((state) => state.auth?.token);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("denied");
      return;
    }

    const verify = async () => {
      try {
        const response = await api.get("/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userRole = response?.data?.user?.role;

        if (requiredRole && userRole !== requiredRole) {
          setStatus("denied");
        } else {
          setStatus("allowed");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setStatus("denied");
      }
    };

    verify();
  }, [token, requiredRole]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "denied") return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
