import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setProfile(response.data.profile);
        reset({
          about: response.data.profile.about,
          location: response.data.profile.location,
          travelerType: response.data.profile.travelerType,
        });
      } else {
        setProfile(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setProfile(null);
      } else {
        console.error("Fetch profile error:", err);
      }
    }
    setLoading(false);
  };

  // Create or update profile
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("about", data.about);
      formData.append("location", data.location);
      formData.append("travelerType", data.travelerType);

      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const endpoint = profile ? "/update-profile" : "/create-profile";
      const method = profile ? "put" : "post";

      const response = await axios({
        url: `http://localhost:8000/api${endpoint}`,
        method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        setShowForm(false);
        fetchProfile();
      } else {
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit profile error:", error);
      alert(
        error.response?.data?.message || "Error saving profile. Check console."
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      {/* No profile yet */}
      {!profile && !showForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Profile Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            You haven’t completed your profile yet. Please create your profile.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Profile
          </button>
        </div>
      )}

      {/* Create / Update form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto"
        >
          <h2 className="text-xl font-bold mb-4">
            {profile ? "Update Profile" : "Create Profile"}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700">About</label>
            <textarea
              {...register("about", { required: true })}
              className="w-full border rounded px-3 py-2 mt-1"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              {...register("location", { required: true })}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Traveler Type</label>
            <input
              {...register("travelerType", { required: true })}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              {...register("profileImage")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {profile ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Profile exists */}
      {profile && !showForm && (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left sidebar */}
          <div className="md:w-2/5 flex flex-col items-center justify-center p-8 bg-blue-500">
            <img
              src={profile.profileImage}
              alt="Traveler"
              className="h-40 w-40 md:h-48 md:w-48 rounded-full border-4 border-white shadow-lg"
            />
            <h2 className="text-2xl font-bold text-white mt-6 text-center">
              {profile.user.name}
            </h2>
            <p className="text-blue-100 mt-2 text-center">
              {profile.user.email}
            </p>
            <div className="flex flex-col space-y-3 w-full mt-8">
              <div className="flex items-center text-white">
                <FiMapPin className="mr-3 flex-shrink-0" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-white">
                <FiCalendar className="mr-3 flex-shrink-0" />
                <span>
                  Joined {new Date(profile.user.createdAt).toDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="md:w-3/5 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-600 leading-relaxed">{profile.about}</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
