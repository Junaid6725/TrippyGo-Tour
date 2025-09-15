import React from "react";

const UserBooking = () => {
  // Static bookings data
  const bookings = [
    {
      id: 1,
      fullName: "Ali Khan",
      email: "ali.khan@example.com",
      phoneNumber: "+923001234567",
      bookingDate: "2025-09-15",
      status: "Confirmed",
      totalMembers: 4,
    },
    {
      id: 2,
      fullName: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      phoneNumber: "+923004567890",
      bookingDate: "2025-09-20",
      status: "Pending",
      totalMembers: 2,
    },
    {
      id: 3,
      fullName: "Hamza Ali",
      email: "hamza.ali@example.com",
      phoneNumber: "+923008765432",
      bookingDate: "2025-10-01",
      status: "Cancelled",
      totalMembers: 3,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Bookings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <div
            key={item.id}
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
