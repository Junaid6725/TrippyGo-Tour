import React, { useState } from "react";

const UserHome = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "UX Designer and photography enthusiast. Love to travel and explore new cultures.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    cover:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  });

  const [stats] = useState([
    { label: "Bookings", value: 24 },
    { label: "Reviews", value: 4.8 },
    { label: "Wishlist", value: 12 },
    { label: "Days Active", value: 128 },
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: "booking",
      title: "Luxury Beach Resort",
      date: "2 days ago",
    },
    { id: 2, type: "review", title: "Posted a review", date: "5 days ago" },
    { id: 3, type: "payment", title: "Payment processed", date: "1 week ago" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div
            className="relative h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${userData.cover})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-75"></div>
          </div>

          <div className="px-6 pb-6 relative -mt-16">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
              <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                  src={userData.avatar}
                  alt={userData.name}
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userData.name}
                  </h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-500 mt-1">{userData.location}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Message
                </button>
                <button className="px-4 py-2 bg-purple-600 border border-transparent rounded-lg text-white hover:bg-purple-700">
                  Follow
                </button>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{userData.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <div className="text-3xl font-bold text-purple-600">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {["profile", "activity", "settings", "bookings"].map(
                    (tab) => (
                      <button
                        key={tab}
                        className={`py-4 px-6 text-center font-medium text-sm flex-1 ${
                          activeTab === tab
                            ? "text-purple-600 border-b-2 border-purple-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "profile" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-1/3 text-gray-500">Full Name</div>
                        <div className="w-2/3">{userData.name}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3 text-gray-500">Email Address</div>
                        <div className="w-2/3">{userData.email}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3 text-gray-500">Phone Number</div>
                        <div className="w-2/3">{userData.phone}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3 text-gray-500">Location</div>
                        <div className="w-2/3">{userData.location}</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "activity" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600">
                              {activity.type === "booking"
                                ? "📅"
                                : activity.type === "review"
                                ? "⭐"
                                : "💳"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Upcoming Bookings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">🏨</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Mountain Resort</p>
                    <p className="text-sm text-gray-500">
                      Jun 12 - Jun 15, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">🏖️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Beach Villa</p>
                    <p className="text-sm text-gray-500">
                      Jul 3 - Jul 10, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Connected Accounts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">f</span>
                    </div>
                    <span className="ml-3 text-gray-700">Facebook</span>
                  </div>
                  <span className="text-green-600 text-sm">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600">G</span>
                    </div>
                    <span className="ml-3 text-gray-700">Google</span>
                  </div>
                  <span className="text-green-600 text-sm">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
