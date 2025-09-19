import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FiMapPin, FiCalendar, FiMail, FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.message === "Profile not created") {
        setProfile(null);
      } else {
        setProfile(res.data);
        reset({
          about: res.data.about || "",
          location: res.data.location || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    const form = new FormData();
    form.append("about", data.about);
    form.append("location", data.location);
    if (data.profileImage && data.profileImage[0]) {
      form.append("profileImage", data.profileImage[0]);
    }

    try {
      const res = await axios.post("/api/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setProfile(res.data);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {profile && !showForm ? (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
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

          <div className="md:w-3/5 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-600 leading-relaxed">{profile.about}</p>
          </div>
        </div>
      ) : null}

      {!profile && !showForm && (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Create Profile
          </button>
        </div>
      )}

      {(!profile && showForm) || (profile && showForm) ? (
        <div className="bg-white shadow-md rounded p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">
            {profile ? "Update Profile" : "Create Your Profile"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="file"
              {...register("profileImage")}
              className="block w-full"
            />

            <input
              type="text"
              placeholder="Your Location"
              {...register("location", { required: "Location is required" })}
              className="border w-full p-2"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}

            <textarea
              placeholder="About You"
              {...register("about", {
                required: "About section is required",
                minLength: {
                  value: 10,
                  message: "About must be at least 10 characters",
                },
              })}
              className="border w-full p-2"
            />
            {errors.about && (
              <p className="text-red-500 text-sm">{errors.about.message}</p>
            )}

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
                className="bg-gray-400 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
