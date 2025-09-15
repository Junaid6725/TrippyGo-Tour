import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaHourglassStart, FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [tour, setTour] = useState(null);
  const [members, setMembers] = useState(1);
  const { id } = useParams();
  // const serviceCharges=
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = useSelector((state) => state.auth.token);

  const getTourById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-tour/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTour(response.data.singleTour || null);
      console.log(tour);
    } catch (error) {
      console.log("Error fetching tour:", error);
    }
  };

  useEffect(() => {
    getTourById();
  }, [id]);
  const handleBooking = async (data) => {
    try {
      const response = await axios
        .post(`http://localhost:8000/api/booking-tour/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            iconColor: "green",
            title: "Booking Tour",
            text: "You Book Tour Successfully!",
            button: "green",
          });
          navigate("/user-dashboard");
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response?.data?.message || "Something Went Wrong",
        button: "red",
      });
    }
  };
  return (
    <>
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            <img
              src={tour?.imgUrl}
              alt={tour?.imgAlt}
              className="rounded-2xl w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />

            <div className="bg-white shadow mt-6 rounded-xl p-6">
              <h2 className="text-2xl font-bold">{tour?.title}</h2>
              <div className="flex gap-4 mt-2 text-gray-600">
                <span className="flex justify-center items-center gap-1">
                  <FaStar className="text-xl text-yellow-400 " /> Not rated
                </span>
                <span className="flex justify-center items-center gap-1">
                  <FaHourglassStart className="text-lg text-gray-700" />{" "}
                  {tour?.duration}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span className="flex justify-center items-center gap-1">
                  <IoLocation className="text-xl text-gray-700" />{" "}
                  {tour?.location}
                </span>
                <span className="flex justify-center items-center gap-1">
                  <MdOutlineAttachMoney className="text-xl text-gray-700" />
                  {tour?.expenditure} / per person
                </span>
                <span className="flex justify-center items-center gap-1">
                  <FaUsers className="text-xl text-gray-700" />
                  {tour?.groupSize} people
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-3xl font-semibold text-center">
              Book Your Tour!
            </h3>

            <form
              className="space-y-4 mt-6"
              onSubmit={handleSubmit(handleBooking)}
            >
              <input
                {...register("fullName", {
                  required: "Full name is required!",
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                    message:
                      "Please enter your full name (first and last name)",
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
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required!",
                  pattern: {
                    value: /^(03[0-9]{9}|\+923[0-9]{9})$/,
                    message: "Please enter a valid phone number!",
                  },
                })}
                type="tel"
                placeholder="Phone No"
                className="w-full p-2 border rounded"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
              <input
                {...register("bookingDate", {
                  required: "Booking date is required!",
                })}
                type="date"
                className="w-full p-2 border rounded"
              />
              {errors.bookingDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bookingDate.message}
                </p>
              )}
              <input
                {...register("totalMembers", {
                  required: "Total member is required!",
                })}
                type="number"
                placeholder="Total Members"
                className="w-full p-2 border rounded"
                onChange={(e) => setMembers(Number(e.target.value))}
              />
              {errors.totalMembers && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.totalMembers.message}
                </p>
              )}

              <div className="text-sm text-gray-600">
                <div className="flex justify-between mt-2">
                  <span>
                    {tour?.expenditure} × {members} person
                  </span>
                  <span>{tour?.expenditure}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Service Charge</span>
                  <span>$50</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>
                  ${" "}
                  {tour?.expenditure * members === 0
                    ? null
                    : tour?.expenditure * members}
                </span>
              </div>
              <div className="flex  justify-end">
                <button
                  type="submit"
                  className="w-full text-lg  transition-colors hover:cursor-pointer py-3 px-8 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl shadow-md transform hover:scale-105 duration-300 text-center"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
