import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitData = (data) => {
    console.log(data);
    navigate("/");
  };
  const [showPassword, setShowPassword] = useState(false);

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
            <h2 className="text-2xl font-semibold mt-2">Login</h2>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(submitData)}>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email Is Required",
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
            <div className="flex items-center justify-start mt-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
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

export default LoginForm;
