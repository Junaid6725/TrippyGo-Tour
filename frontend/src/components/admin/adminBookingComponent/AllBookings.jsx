import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-bookings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data.booking || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          No bookings found
        </div>) :
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {bookings.map((item) => {
              return (
                <div
                  className="bg-violet-700 rounded-lg shadow-xl px-6 py-3 text-white"
                  key={item._id}
                >
                  <h1 className="text-xl font-bold mb-2">Booking Summary</h1>

                  <p className="text-sm">
                    <span className="font-semibold">Full Name:</span>
                    {item.fullName}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Phone No:</span>{" "}
                    {item.phoneNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Guest Size:</span>{" "}
                    {item.totalMembers}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Booked At:</span> {new Date(item.createdAt).toDateString()}
                  </p>
                  <p className="text-sm mb-4">
                    <span className="font-semibold">Total Price:</span>{" "}
                    {item.bookingTotal}
                  </p>
                </div>
              );
            })}
          </div>)}
    </>
  );
};

export default AllBookings;
