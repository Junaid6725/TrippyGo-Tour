import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ContactForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = async (data) => {
    try {
      const response = await axios
        .post("http://localhost:8000/api/contact", data)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Query Send",
            text: "Your Query Send to Admin!",
            confirmButtonColor: "purple",
            confirmButtonText: "Ok",
          });
        });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full lg:w-1/3 bg-white flex flex-col p-8 rounded-lg shadow md:w-2/4">
        <h2 className="text-gray-900 text-3xl mb-2 font-semibold ">
          Feel Free To Contact Us!
        </h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="mt-4 mb-4">
            <label htmlFor="name" className="text-lg text-gray-600">
              Full Name
            </label>
            <input
              {...register("fullName", {
                required: "Full Name Is Required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                  message: "Please enter your full name (first and last name)",
                },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 25,
                  message: "Name must be at most 25 characters long",
                },
              })}
              placeholder="Full Name"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-900 focus:border-2  text-base"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-lg text-gray-600">
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
              placeholder="Email"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-900 focus:border-2 text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="text-lg text-gray-600">
              Phone Number
            </label>
            <input
              {...register("phoneNumber", {
                required: "Phone Number Is Required",
                pattern: {
                  value: /^(03[0-9]{9}|\+923[0-9]{9})$/,
                  message: "Please enter a valid phone number!",
                },
              })}
              placeholder="Phone Number"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-purple-900 focus:border-2 text-base"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="text-lg text-gray-600">
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message Is Required",
              })}
              placeholder="Enter Your Query!"
              rows="4"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2   focus:border-purple-900 focus:border-2 outline-0 text-base resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 rounded-md text-lg py-2 w-full transition-colors hover:cursor-pointer "
          />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
