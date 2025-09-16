import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserBooking = () => {
  const [userBookings, setUserBookings] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserBookings(response.data.booking);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserBookings();
  }, []);



  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-6 text-gray-800">
        All Bookings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userBookings.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-purple-700 mb-2">
              {item.fullName}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {item.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {item.phoneNumber}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Booking Date:</span>{" "}
              {new Date(item.bookingDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  item.status === "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Total Members:</span>{" "}
              {item.totalMembers}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooking;
