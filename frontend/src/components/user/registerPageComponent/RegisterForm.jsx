import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { registerUser } from "../../../services/authService";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  const submitData = async (data) => {
    try {
      const res = await registerUser(data);
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
        text: "You can now login!",
        confirmButtonColor: "#2563EB",
        iconColor: "#2563EB",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#DC2626",
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
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <img
                src="/logo1.jpg"
                alt="Logo"
                className="w-8 h-8 object-cover rounded"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-3 text-gray-800">Register</h2>
        </motion.div>

        <form className="mt-6" onSubmit={handleSubmit(submitData)}>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("fullName", {
              required: "Full name is required",
              pattern: {
                value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                message: "Enter first and last name",
              },
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
            placeholder="Full name"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-2">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter valid email",
              },
            })}
            placeholder="Email address"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-2">
            Phone No
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^(03\d{9}|\+923\d{9})$/,
                message: "Valid PK number (03xxx / +923xxx)",
              },
            })}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
                maxLength: { value: 12, message: "Max 12 characters" },
              })}
              placeholder="Password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 text-lg"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 text-lg"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}

          <motion.input
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            value="Register"
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md font-semibold cursor-pointer shadow-md hover:shadow-lg transition"
          />
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
