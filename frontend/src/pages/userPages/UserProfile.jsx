import React, { useState } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiMail,
  FiPhone,
  FiGlobe,
  FiCheckCircle,
} from "react-icons/fi";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const userData = {
    name: "Alex Johnson",
    title: "Adventure Traveler",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    details: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "Joined January 2020",
    },
    upcomingTours: [
      { id: 1, place: "Hunza Valley", date: "Oct 25, 2025", status: "Booked" },
      { id: 2, place: "Skardu", date: "Nov 15, 2025", status: "Planned" },
    ],
    pastTours: [
      { id: 1, place: "Fairy Meadows", date: "July 2025" },
      { id: 2, place: "Murree Hills", date: "March 2025" },
    ],
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left Info Card */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center h-full">
              <img
                src={userData.avatar}
                alt="Traveler"
                className="h-28 w-28 mx-auto rounded-full border-4 border-white shadow-lg"
              />

              <h2 className="text-xl font-bold text-gray-900 mt-4">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-600">{userData.title}</p>

              {/* Details */}
              <div className="mt-6 space-y-3 text-gray-600 text-sm text-left">
                <div className="flex items-center">
                  <FiMail className="mr-3 text-blue-500" />
                  {userData.details.email}
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-3 text-blue-500" />
                  {userData.details.phone}
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-3 text-blue-500" />
                  {userData.details.location}
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-3 text-blue-500" />
                  {userData.details.joinDate}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Tabs & Content */}
          <section className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
              {/* Tabs */}
              <nav className="flex border-b text-sm font-medium justify-center">
                {["overview", "upcoming", "past"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>

              {/* Tab Content */}
              <div className="p-6 flex-1 text-center">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                      About Traveler
                    </h3>
                    <p className="text-gray-600 max-w-lg mx-auto">
                      Passionate traveler who loves exploring mountains, seas,
                      and historical landmarks. Always looking for the next
                      adventure to create lifelong memories.
                    </p>
                  </div>
                )}

                {activeTab === "upcoming" && (
                  <div className="h-full">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                      Upcoming Tours
                    </h3>
                    <ul className="space-y-3 max-w-lg mx-auto">
                      {userData.upcomingTours.map((tour) => (
                        <li
                          key={tour.id}
                          className="flex flex-col sm:flex-row sm:justify-between items-center bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition"
                        >
                          <span className="flex items-center space-x-2">
                            <FiGlobe className="text-blue-600" />
                            <span>{tour.place}</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            {tour.date} –{" "}
                            <span className="font-medium text-blue-700">
                              {tour.status}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "past" && (
                  <div className="h-full">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                      Past Tours
                    </h3>
                    <ul className="space-y-3 max-w-lg mx-auto">
                      {userData.pastTours.map((tour) => (
                        <li
                          key={tour.id}
                          className="flex flex-col sm:flex-row items-center justify-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
                        >
                          <FiCheckCircle className="text-blue-600 mr-2" />
                          {tour.place} – {tour.date}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
