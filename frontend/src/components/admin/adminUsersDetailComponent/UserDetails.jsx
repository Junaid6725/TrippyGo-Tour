import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MdDelete,
  MdSearch,
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreVert,
} from "react-icons/md";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMobileActions, setShowMobileActions] = useState(false);

  const usersPerPage = 5;
  const token = useSelector((state) => state.auth.token);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user._id !== id)); // _id from MongoDB
    }
  };

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Columns configuration
  const columns = [
    { key: "index", label: "#" },
    { key: "user", label: "User" },
    { key: "email", label: "Email", hidden: "sm" },
    { key: "phone", label: "Phone", hidden: "md" },
    { key: "actions", label: "Actions" },
  ];

  // Mobile action menu handler
  const handleMobileAction = (user, action) => {
    if (action === "delete") handleDelete(user._id);
    setShowMobileActions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your users and their information
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap ${
                        col.hidden ? `hidden ${col.hidden}:table-cell` : ""
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      {columns.map((col) => {
                        if (col.key === "index") {
                          return (
                            <td
                              key={col.key}
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                            >
                              {indexOfFirstUser + index + 1}
                            </td>
                          );
                        }
                        if (col.key === "user") {
                          return (
                            <td
                              key={col.key}
                              className="px-4 py-3 whitespace-nowrap"
                            >
                              <div className="flex items-center">
                                <div className="h-8 w-8 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                                  {user.fullName.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {user.fullName}
                                  </div>
                                  <div className="text-xs text-gray-500 sm:hidden">
                                    {user.email}
                                  </div>
                                  <div className="text-xs text-gray-500 sm:hidden mt-1">
                                    {user.phoneNumber}
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        }
                        if (col.key === "email") {
                          return (
                            <td
                              key={col.key}
                              className="px-4 py-3 text-gray-700 whitespace-nowrap hidden sm:table-cell"
                            >
                              {user.email}
                            </td>
                          );
                        }
                        if (col.key === "phone") {
                          return (
                            <td
                              key={col.key}
                              className="px-4 py-3 text-gray-700 whitespace-nowrap hidden md:table-cell"
                            >
                              {user.phoneNumber}
                            </td>
                          );
                        }
                        if (col.key === "actions") {
                          return (
                            <td
                              key={col.key}
                              className="px-4 py-3 whitespace-nowrap"
                            >
                              <div className="flex space-x-2">
                                <button
                                  className="p-1.5 text-red-500 hover:bg-red-100 rounded-full transition-colors hidden sm:block"
                                  onClick={() => handleDelete(user._id)}
                                  title="Delete user"
                                >
                                  <MdDelete size={16} />
                                </button>
                                <button
                                  className="p-1 sm:hidden text-gray-500 hover:bg-gray-100 rounded-full"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowMobileActions(true);
                                  }}
                                >
                                  <MdMoreVert size={18} />
                                </button>
                              </div>
                            </td>
                          );
                        }
                        return null;
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
