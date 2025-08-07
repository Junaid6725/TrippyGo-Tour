import React from "react";

const UsersQuery = () => {
  const users = [
    {
      id: 1,
      fullName: "Mark 1",
      email: "mark1@example.com",
      phone: "+92 300 1234561",
    },
    {
      id: 2,
      fullName: "Mark 2",
      email: "mark2@example.com",
      phone: "+92 300 1234562",
    },
  ];
  const handleDelete = (id) => {
    alert(`Delete user with ID: ${id}`);
  };
  return (
    <>
      <main className="flex-1 px-2 py-6 space-y-4">
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-3 text-left">#</th>
                <th className="px-3 py-3 text-left">Full Name</th>
                <th className="px-3 py-3 text-left">Email</th>
                <th className="px-3 py-3 text-left">Phone</th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-3 py-3 font-medium">{index + 1}</td>
                  <td className="px-3 py-3">{user.fullName}</td>
                  <td className="px-3 py-3">{user.email}</td>
                  <td className="px-3 py-3">{user.phone}</td>
                  <td className="px-3 py-3 text-xl text-red-600 cursor-pointer">
                    <MdDelete onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 sm:hidden">
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
              <div className="mt-2 text-red-600 text-xl cursor-pointer">
                <MdDelete onClick={() => handleDelete(user.id)} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default UsersQuery;
