// src/components/auth/LoginForm.jsx
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "./../../../reduxToolkit/slices/authSlices/authSlices.js";

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
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );

    
      dispatch(
        login({ token: response.data.token, role: response.data.user.role })
      );

      Swal.fire({
        icon: "success",
        iconColor: "#4F46E5",
        title: "Login Successful",
        text: "Welcome back!",
      }).then(() => {
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || error.message,
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200 relative overflow-hidden">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
            <img
              src="/logo1.jpg"
              alt="Logo"
              className="w-8 h-8 object-cover rounded"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-2">Login</h2>
        </div>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit(submitData)}>
          {/* Email */}
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
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password */}
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
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 text-2xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input
            type="submit"
            className="mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-md text-center font-semibold cursor-pointer"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
