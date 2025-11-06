import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiMapPin,
  FiCalendar,
  FiEdit,
  FiUser,
  FiGlobe,
  FiCamera,
  FiAward,
  FiCompass,
  FiNavigation,
  FiStar,
  FiLock,
  FiRefreshCw,
  FiX,
  FiMail,
  FiPhone,
  FiBook,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  changePasswordService,
  createProfileService,
  getProfileService,
  updateProfileService,
} from "../../services/profileService";

const UserProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userData, setUserData] = useState(null);

  const { register, handleSubmit, reset, watch, resetField, control } =
    useForm();
  const profileImage = watch("profileImage");

  const getInitial = () => {
    if (profile?.user?.fullName) {
      return profile?.user?.fullName.charAt(0).toUpperCase();
    } else {
      return profile?.user?.email.charAt(0).toUpperCase();
    }
    return "?";
  };

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

  const getColorFromName = (name = "Traveler") => {
    const colors = [
      "from-purple-500 to-purple-700",
      "from-pink-500 to-pink-700",
      "from-green-500 to-green-700",
      "from-yellow-500 to-orange-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const res = await getProfileService(token);

      if (res?.success) {
        if (res?.profile) {
          // Profile exists - dono data set karo
          setProfile(res?.profile);
          setUserData(res?.user);

          // Form ko reset karo with existing data
          reset({
            about: res?.profile.about || "",
            location: res?.profile.location || "",
            travelerType: res?.profile.travelerType || "",
            fullName: res?.user?.fullName || "",
            email: res?.user?.email || "",
            phoneNumber: res?.user?.phoneNumber || "",
          });
        } else {
          // Profile doesn't exist, but user data is available
          setProfile(null);
          setUserData(res?.user);

          // Form ko reset karo with user data only
          reset({
            about: "",
            location: "",
            travelerType: "",
            fullName: res?.user?.fullName || "",
            email: res?.user?.email || "",
            phoneNumber: res?.user?.phoneNumber || "",
          });
        }
      } else {
        setProfile(null);
        setUserData(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setProfile(null);
        setUserData(null);
      } else {
        console.error("Fetch profile error:", err);
      }
    }
    setLoading(false);
  };

  // Jab form show ho tab automatically data fill karo
  useEffect(() => {
    if (showForm) {
      if (profile && userData) {
        // Existing profile hai
        reset({
          about: profile.about || "",
          location: profile.location || "",
          travelerType: profile.travelerType || "",
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
        });
      } else if (userData) {
        // Profile nahi hai, lekin user data hai
        reset({
          about: "",
          location: "",
          travelerType: "",
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
        });
      }
    }
  }, [showForm, profile, userData, reset]);

  // Create or update profile
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("about", data.about);
      formData.append("location", data.location);
      formData.append("travelerType", data.travelerType);

      if (data.fullName) formData.append("fullName", data.fullName);
      if (data.email) formData.append("email", data.email);
      if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);

      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      let res;
      if (profile) {
        res = await updateProfileService(formData, token);
      } else {
        res = await createProfileService(formData, token);
      }

      if (res.success) {
        alert(res.message);
        setShowForm(false);
        setImagePreview(null);
        fetchProfile();
      } else {
        alert(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit profile error:", error);
      alert(error.res?.data?.message || "Error saving profile. Check console.");
    }
  };

  // Change password function
  const handleChangePassword = async (passwordData) => {
    try {
      const res = await changePasswordService(passwordData, token);

      if (res?.success) {
        alert("Password changed successfully!");
        setShowChangePassword(false);

        resetField("currentPassword");
        resetField("newPassword");
        resetField("confirmPassword");
      } else {
        alert(res?.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Change password error:", error);
      alert(
        error.response?.data?.message ||
          "Error changing password. Check console."
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-800 text-base sm:text-lg font-medium">
            Loading your journey...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {/* No profile yet */}
          {!profile && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl mx-auto space-y-6 sm:space-y-8 py-8 sm:py-12 px-2"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto shadow-xl sm:shadow-2xl shadow-blue-500/30"
              >
                <FiNavigation className="text-2xl xs:text-3xl sm:text-5xl text-white" />
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  Welcome Traveler!
                </h1>
                <p className="text-blue-700 text-sm xs:text-base sm:text-lg leading-relaxed max-w-md mx-auto px-2">
                  Begin your adventure by creating a profile. Share your travel
                  style, connect with fellow explorers, and unlock personalized
                  journey recommendations.
                </p>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center pt-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 xs:px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm xs:text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                >
                  <FiUser className="text-base xs:text-lg sm:text-xl" />
                  Create Your Profile
                </motion.button>
              </div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-3 xs:gap-4 sm:gap-6 pt-6 sm:pt-8 opacity-70">
                {[FiMapPin, FiGlobe, FiAward, FiStar].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 0 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <Icon className="text-blue-500 text-lg xs:text-xl sm:text-2xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Create / Update form */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-4xl mx-auto space-y-4 xs:space-y-6 sm:space-y-8 bg-white/90 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl shadow-blue-500/20 border border-blue-100"
            >
              <div className="text-center space-y-2 sm:space-y-3">
                <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  {profile ? "Update Your Journey" : "Begin Your Journey"}
                </h2>
                <p className="text-blue-600 text-sm xs:text-base sm:text-lg font-medium">
                  Share your travel personality with the world
                </p>
              </div>

              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl sm:shadow-2xl shadow-blue-500/30">
                    {imagePreview || profile?.profileImage ? (
                      <img
                        src={imagePreview || profile.profileImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-blue-400" />
                    )}
                  </div>
                  <label className="absolute bottom-1 xs:bottom-2 sm:bottom-3 right-1 xs:right-2 sm:right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-1 xs:p-2 sm:p-3 rounded-full cursor-pointer hover:shadow-lg transition-all duration-300 shadow-lg shadow-blue-500/40 text-xs xs:text-sm sm:text-base">
                    <FiCamera className="text-sm xs:text-base sm:text-lg lg:text-xl" />
                    <input
                      type="file"
                      {...register("profileImage")}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                {/* Left Column - 4 Fields */}
                <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                  {/* Full Name Field */}
                  <motion.div
                    className="bg-white/80 backdrop-blur rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-blue-200 shadow-lg"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <label className="text-sm xs:text-base sm:text-lg font-semibold text-blue-800 mb-2 xs:mb-3 flex items-center">
                      <FiUser className="inline mr-2 xs:mr-3 text-blue-600 text-base xs:text-lg sm:text-xl" />
                      Full Name
                    </label>
                    <input
                      {...register("fullName", { required: true })}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 border border-blue-300/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 xs:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300 text-sm xs:text-base"
                      placeholder="Enter your full name"
                      defaultValue={profile?.user?.fullName || ""}
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="bg-white/80 backdrop-blur rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-blue-200 shadow-lg"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <label className="text-sm xs:text-base sm:text-lg font-semibold text-blue-800 mb-2 xs:mb-3 flex items-center">
                      <FiMail className="inline mr-2 xs:mr-3 text-blue-600 text-base xs:text-lg sm:text-xl" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 border border-blue-300/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 xs:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300 text-sm xs:text-base"
                      placeholder="Enter your email address"
                      defaultValue={profile?.user?.email || ""}
                    />
                  </motion.div>

                  {/* Phone Number Field */}
                  <motion.div
                    className="bg-white/80 backdrop-blur rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-blue-200 shadow-lg"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <label className="text-sm xs:text-base sm:text-lg font-semibold text-blue-800 mb-2 xs:mb-3 flex items-center">
                      <FiPhone className="inline mr-2 xs:mr-3 text-blue-600 text-base xs:text-lg sm:text-xl" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phoneNumber")}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 border border-blue-300/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 xs:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300 text-sm xs:text-base"
                      placeholder="Enter your phone number"
                      defaultValue={profile?.user?.phoneNumber || ""}
                    />
                  </motion.div>

                  {/* Location Field */}
                  <motion.div
                    className="bg-white/80 backdrop-blur rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-blue-200 shadow-lg"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <label className="text-sm xs:text-base sm:text-lg font-semibold text-blue-800 mb-2 xs:mb-3 flex items-center">
                      <FiMapPin className="inline mr-2 xs:mr-3 text-blue-600 text-base xs:text-lg sm:text-xl" />
                      Location
                    </label>
                    <input
                      {...register("location", { required: true })}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 border border-blue-300/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 xs:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300 text-sm xs:text-base"
                      placeholder="Where does your journey begin?"
                    />
                  </motion.div>
                </div>

                {/* Right Column - 2 Fields */}
                <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                  {/* Traveler Type Field */}
                  <motion.div
                    className="bg-white/80 backdrop-blur rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-blue-200 shadow-lg"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <label className="text-sm xs:text-base sm:text-lg font-semibold text-blue-800 mb-2 xs:mb-3 flex items-center">
                      <FiGlobe className="inline mr-2 xs:mr-3 text-blue-600 text-base xs:text-lg sm:text-xl" />
                      Traveler Type
                    </label>
                    <select
                      {...register("travelerType", { required: true })}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 border border-blue-300/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 xs:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300 appearance-none text-sm xs:text-base"
                    >
                      <option value="">Choose your adventure style</option>
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
                  </motion.div>

                  {/* Travel Story Field */}
                  <motion.div
                    className="bg-white/80 backdrop-blur rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-blue-200 shadow-lg"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <label className="text-sm xs:text-base sm:text-lg font-semibold text-blue-800 mb-2 xs:mb-3 flex items-center">
                      <FiBook className="inline mr-2 xs:mr-3 text-blue-600 text-base xs:text-lg sm:text-xl" />
                      Your Travel Story
                    </label>
                    <textarea
                      {...register("about", { required: true })}
                      className="w-full h-48 xs:h-52 sm:h-56 lg:h-96 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 border border-blue-300/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 xs:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white resize-none transition-all duration-300 text-sm xs:text-base"
                      placeholder="Share your most memorable travel experiences, favorite destinations, and what you're seeking in your next adventure..."
                      rows="6"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center items-stretch pt-3 sm:pt-4">
                {/* Primary Button */}
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.5)",
                  }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  className="relative bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center group overflow-hidden flex-1 min-w-0"
                >
                  {/* Animated background shine */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:animate-shine group-hover:duration-1000" />
                  </div>

                  {/* Button content */}
                  <span className="relative z-10 flex items-center">
                    {profile ? (
                      <>
                        <FiRefreshCw className="mr-3 text-base group-hover:rotate-180 transition-transform duration-500" />
                        Update Journey
                      </>
                    ) : (
                      <>
                        <FiCompass className="mr-3 text-base group-hover:scale-110 transition-transform duration-300" />
                        Begin Journey
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    backgroundColor: "#f8fafc",
                    borderColor: "#3b82f6",
                  }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  onClick={() => {
                    setShowForm(false);
                    setImagePreview(null);
                  }}
                  className="bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center justify-center group flex-1 min-w-0"
                >
                  <FiX className="mr-3 text-base group-hover:scale-110 transition-transform duration-300" />
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
              className="space-y-4 xs:space-y-6 sm:space-y-8"
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl shadow-blue-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-900/20"></div>
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full border-4 border-white/90 shadow-xl sm:shadow-2xl shadow-blue-500/50 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                      {profile?.profileImage ? (
                        <img
                          src={profile.profileImage}
                          alt="Traveler"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${getColorFromName(
                            profile?.user?.fullName
                          )} text-white text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold`}
                        >
                          {getInitial()}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowForm(true)}
                      className="absolute bottom-1 xs:bottom-2 right-1 xs:right-2 bg-white/20 backdrop-blur-sm text-white p-1 xs:p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg text-xs xs:text-sm sm:text-base"
                    >
                      <FiEdit className="text-sm xs:text-base sm:text-lg lg:text-xl" />
                    </motion.button>
                  </motion.div>

                  <div className="text-center lg:text-left text-white flex-1">
                    <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 xs:mb-3 drop-shadow-lg">
                      {profile.user.fullName}
                    </h1>
                    <p className="text-blue-100 text-xs xs:text-sm sm:text-base lg:text-lg mb-3 xs:mb-4 sm:mb-6 font-medium">
                      {profile.user.email}
                    </p>

                    <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4 justify-center lg:justify-start">
                      <motion.div
                        className="flex items-center bg-white/20 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/30 text-xs xs:text-sm sm:text-base"
                        whileHover={{ y: -2 }}
                      >
                        <FiMapPin className="mr-1 xs:mr-2 sm:mr-3 text-sm xs:text-base sm:text-lg lg:text-xl" />
                        <span className="font-semibold">
                          {profile.location}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center bg-white/20 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/30 text-xs xs:text-sm sm:text-base"
                        whileHover={{ y: -2 }}
                      >
                        <FiGlobe className="mr-1 xs:mr-2 sm:mr-3 text-sm xs:text-base sm:text-lg lg:text-xl" />
                        <span className="font-semibold">
                          {profile.travelerType}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center bg-white/20 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/30 text-xs xs:text-sm sm:text-base"
                        whileHover={{ y: -2 }}
                      >
                        <FiCalendar className="mr-1 xs:mr-2 sm:mr-3 text-sm xs:text-base sm:text-lg lg:text-xl" />
                        <span className="font-semibold">
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
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Change Password Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChangePassword(true)}
                  className="absolute top-2 xs:top-3 sm:top-4 lg:top-6 right-2 xs:right-3 sm:right-4 lg:right-6 bg-white/20 backdrop-blur-sm text-white px-2 xs:px-3 sm:px-4 lg:px-6 py-1 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg flex items-center gap-1 xs:gap-2 text-xs xs:text-sm sm:text-base"
                >
                  <FiLock className="text-xs xs:text-sm sm:text-lg" />
                  Change Password
                </motion.button>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full -translate-y-6 xs:-translate-y-8 sm:-translate-y-10 lg:-translate-y-16 translate-x-6 xs:translate-x-8 sm:translate-x-10 lg:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-full translate-y-4 xs:translate-y-6 sm:translate-y-8 lg:translate-y-12 -translate-x-4 xs:-translate-x-6 sm:-translate-x-8 lg:-translate-x-12"></div>
              </div>

              {/* Content Section */}
              <div className="grid lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                {/* About Section */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm p-3 xs:p-4 sm:p-6 lg:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-blue-100 shadow-xl sm:shadow-2xl shadow-blue-500/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-3 xs:mb-4 sm:mb-6 flex items-center">
                      <FiCompass className="mr-2 xs:mr-3 sm:mr-4 text-blue-600 text-base xs:text-lg sm:text-xl lg:text-2xl" />
                      My Travel Story
                    </h3>
                    <p className="text-blue-900 leading-relaxed text-xs xs:text-sm sm:text-base lg:text-lg bg-blue-50/50 p-3 xs:p-4 sm:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl border border-blue-200">
                      {profile.about}
                    </p>
                  </motion.div>
                </div>

                {/* Stats Sidebar */}
                <motion.div
                  className="space-y-3 xs:space-y-4 sm:space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-500/30 text-center">
                    <FiAward className="text-xl xs:text-2xl sm:text-3xl mx-auto mb-2 xs:mb-3" />
                    <div className="text-lg xs:text-xl sm:text-2xl font-bold">
                      {profile.travelerType}
                    </div>
                    <div className="text-blue-100 font-medium text-xs xs:text-sm sm:text-base">
                      Travel Style
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Change Password Modal */}
        <AnimatePresence>
          {showChangePassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 max-w-xs xs:max-w-sm sm:max-w-md w-full shadow-2xl mx-2"
              >
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-800 mb-3 xs:mb-4 sm:mb-6 text-center">
                  Change Password
                </h3>
                <form
                  onSubmit={handleSubmit(handleChangePassword)}
                  className="space-y-2 xs:space-y-3 sm:space-y-4"
                >
                  <div>
                    <label className="block text-blue-700 font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base">
                      Current Password
                    </label>
                    <input
                      type="password"
                      {...register("currentPassword", { required: true })}
                      className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 border border-blue-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-700 font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base">
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register("newPassword", { required: true })}
                      className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 border border-blue-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-700 font-medium mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", { required: true })}
                      className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 border border-blue-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex gap-2 xs:gap-3 sm:gap-4 pt-2 xs:pt-3 sm:pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl font-semibold shadow-lg shadow-blue-500/30 text-xs xs:text-sm sm:text-base"
                    >
                      Change Password
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowChangePassword(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-1 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm sm:text-base"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
