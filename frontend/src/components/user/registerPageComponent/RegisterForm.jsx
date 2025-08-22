import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const submitData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        data
      );
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
        text: "You can now login!",
        confirmButtonColor: "#4F46E5",
        iconColor: "#4F46E5",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log("Error", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#DC2626",
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");
  return (
    <>
      <div className="flex items-center justify-center min-h-screen  mt-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-l from-blue-500 to-purple-500" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <img
                src="/logo1.jpg"
                alt="Logo"
                className="w-8 h-8 object-cover rounded"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-2">Register</h2>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(submitData)}>
            <label className="block text-sm font-medium text-gray-700 ">
              Name
            </label>
            <input
              {...register("fullName", {
                required: "Full name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                  message: "Please enter your full name (first and last name)",
                },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters long",
                },
              })}
              placeholder="Full name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
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
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Email address"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            <label className="block text-sm font-medium text-gray-700 mt-2">
              Phone No
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^(03\d{9}|\+923\d{9})$/,
                  message:
                    "Enter a valid Pakistani phone number starting with 03 or +92",
                },
                minLength: {
                  value: 11,
                  message: "Phone number is too short",
                },
                maxLength: {
                  value: 13,
                  message: "Phone number is too long",
                },
              })}
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
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none"
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
            <label className="block text-sm font-medium text-gray-700 mt-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must not exceed 12 characters",
                  },
                  validate: (value) => {
                    return value === password || "Passwords do not match";
                  },
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500 text-2xl"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              type="submit"
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-center font-semibold hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
