import React from "react";
import { MdDelete } from "react-icons/md";

const UserDetails = () => {
  const users = [
    {
      id: 1,
      fullName: "Mark 1",
      email: "mark1@example.com",
      phone: "+92 300 1234561",
      status: "Active",
      role: "Admin",
    },
    {
      id: 2,
      fullName: "Mark 2",
      email: "mark2@example.com",
      phone: "+92 300 1234562",
      status: "Inactive",
      role: "User",
    },
    {
      id: 3,
      fullName: "Mark 3",
      email: "mark3@example.com",
      phone: "+92 300 1234563",
      status: "Active",
      role: "Admin",
    },
  ];
  const handleDelete = (id) => {
    alert(`Delete user with ID: ${id}`);
  };
  return (
    <>
      <main className="flex-1 px-4 py-6 space-y-4">
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      user.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3 text-center">
                    {" "}
                    <MdDelete onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 lg:hidden">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-lg shadow px-4 py-3"
            >
              <p className="text-sm font-medium text-gray-700">
                <span className="font-semibold">#{index + 1}</span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Full Name:</span>{" "}
                {user.fullName}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p
                className={`text-sm font-semibold ${
                  user.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {user.status}
              </p>
              <p className="text-sm text-gray-700 ">
                <span className="font-semibold">Role:</span> {user.role}
              </p>
              <p className="text-sm text-gray-700 text-center">
                <MdDelete onClick={() => handleDelete(user.id)} />
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default UserDetails;
