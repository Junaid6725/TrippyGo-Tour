import React from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = (data) => {
    console.log(data);
    navigate("/contact");
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
              Name
            </label>
            <input
              {...register("name", {
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
                  value: 20,
                  message: "Name must be at most 20 characters long",
                },
              })}
              id="name"
              name="name"
              placeholder="Full Name"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="text-lg text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter Your Query!"
              rows="4"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2   focus:border-purple-900 focus:border-2 outline-0 text-base resize-none"
            />
          </div>

          <input
            type="submit"
            className="text-white bg-purple-900 hover:bg-orange-600 rounded-md text-lg py-2 w-full transition-colors hover:cursor-pointer "
          />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
