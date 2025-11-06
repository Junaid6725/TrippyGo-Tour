import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { sendContactMessage } from "../../../services/contactService";

const ContactForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1, backgroundColor: "#2563eb" },
    hover: {
      scale: 1.02,
      backgroundColor: "#1d4ed8",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  const submitData = async (data) => {
    try {
      const res = await sendContactMessage(data).then(() => {
        Swal.fire({
          icon: "success",
          title: "Query Sent",
          text: "Your Query Sent to Admin!",
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Ok",
        });
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="w-full lg:w-1/3 bg-white flex flex-col p-8 rounded-lg shadow md:w-2/4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-gray-900 text-3xl mb-2 font-semibold"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Feel Free To Contact Us!
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit(submitData)}
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mt-4 mb-4">
          <label htmlFor="name" className="text-lg text-gray-600">
            Full Name
          </label>
          <motion.input
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
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:border-2 text-base"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          {errors.fullName && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-lg text-gray-600">
            Email
          </label>
          <motion.input
            {...register("email", {
              required: "Email Is Required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Email"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:border-2 text-base"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          {errors.email && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNo" className="text-lg text-gray-600">
            Phone Number
          </label>
          <motion.input
            {...register("phoneNumber", {
              required: "Phone Number Is Required",
              pattern: {
                value: /^(03[0-9]{9}|\+923[0-9]{9})$/,
                message: "Please enter a valid phone number!",
              },
            })}
            placeholder="Phone Number"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:border-2 text-base"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          {errors.phoneNumber && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.phoneNumber.message}
            </motion.p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="text-lg text-gray-600">
            Message
          </label>
          <motion.textarea
            {...register("message", {
              required: "Message Is Required",
            })}
            placeholder="Enter Your Query!"
            rows="4"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:border-blue-600 focus:border-2 outline-0 text-base resize-none"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          {errors.message && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.message.message}
            </motion.p>
          )}
        </div>

        <motion.input
          type="submit"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg py-2 w-full transition-colors hover:cursor-pointer"
        />
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;
