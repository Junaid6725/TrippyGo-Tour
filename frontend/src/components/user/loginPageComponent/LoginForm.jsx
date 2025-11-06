import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "./../../../reduxToolkit/slices/authSlices/authSlices.js";
import { motion } from "framer-motion";
import { loginUser } from "../../../services/authService";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitData = async (data) => {
    try {
      const response = await loginUser(data);

      dispatch(
        login({ token: response.data.token, role: response.data.user.role })
      );

      Swal.fire({
        icon: "success",
        iconColor: "#2563EB", // blue
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonColor: "#2563EB",
      }).then(() => {
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard/user-profile");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || error.message,
        confirmButtonColor: "#DC2626",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-blue-100 relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
            <img
              src="/logo1.jpg"
              alt="Logo"
              className="w-8 h-8 object-cover rounded"
            />
          </div>
          <h2 className="text-2xl font-bold mt-3 text-gray-800">Login</h2>
        </motion.div>

        <form className="mt-6" onSubmit={handleSubmit(submitData)}>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Email address"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 12,
                  message: "Password must not exceed 12 characters",
                },
              })}
              placeholder="Password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 text-lg"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <motion.input
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md font-semibold cursor-pointer shadow-md hover:shadow-lg transition"
            value="Login"
          />
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
