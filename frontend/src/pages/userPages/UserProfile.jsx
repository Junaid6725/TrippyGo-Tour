import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiMapPin,
  FiCalendar,
  FiEdit,
  FiUser,
  FiGlobe,
  FiCamera,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const UserProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();
  const profileImage = watch("profileImage");

  // Handle image preview
  useEffect(() => {
    if (profileImage && profileImage[0]) {
      const file = profileImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [profileImage]);

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
        setImagePreview(null);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {/* No profile yet */}
          {!profile && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-md mx-auto space-y-6"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <FiUser className="text-4xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome Traveler!
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Complete your profile to share your travel personality with
                other adventurers and get personalized recommendations.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold"
              >
                Create Your Profile
              </motion.button>
            </motion.div>
          )}

          {/* Create / Update form */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {profile ? "Update Your Profile" : "Create Your Profile"}
                </h2>
                <p className="text-gray-600 mt-2">
                  Tell us about your travel style
                </p>
              </div>

              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white">
                    {imagePreview || profile?.profileImage ? (
                      <img
                        src={imagePreview || profile.profileImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-4xl text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <FiCamera className="text-lg" />
                    <input
                      type="file"
                      {...register("profileImage")}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiMapPin className="inline mr-2" />
                      Location
                    </label>
                    <input
                      {...register("location", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Where are you from?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiGlobe className="inline mr-2" />
                      Traveler Type
                    </label>
                    <select
                      {...register("travelerType", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your style</option>
                      <option value="Adventure Seeker">Adventure Seeker</option>
                      <option value="Cultural Explorer">
                        Cultural Explorer
                      </option>
                      <option value="Luxury Traveler">Luxury Traveler</option>
                      <option value="Budget Backpacker">
                        Budget Backpacker
                      </option>
                      <option value="Family Vacationer">
                        Family Vacationer
                      </option>
                      <option value="Business Traveler">
                        Business Traveler
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    About You
                  </label>
                  <textarea
                    {...register("about", { required: true })}
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your travel experiences and preferences..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  {profile ? "Update Profile" : "Create Profile"}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowForm(false);
                    setImagePreview(null);
                  }}
                  className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* Profile exists */}
          {profile && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header Section */}
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <img
                      src={profile.profileImage}
                      alt="Traveler"
                      className="w-32 h-32 rounded-full border-4 border-white"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowForm(true)}
                      className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <FiEdit className="text-lg" />
                    </motion.button>
                  </div>

                  <div className="text-center md:text-left text-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {profile.user.name}
                    </h1>
                    <p className="text-blue-100 mb-4">{profile.user.email}</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center">
                        <FiMapPin className="mr-2" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center">
                        <FiGlobe className="mr-2" />
                        <span>{profile.travelerType}</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" />
                        <span>
                          Joined{" "}
                          {new Date(profile.user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* About Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <FiUser className="mr-2 text-blue-500" />
                      About Me
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {profile.about}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
