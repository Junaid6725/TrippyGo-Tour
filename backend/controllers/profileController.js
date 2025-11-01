import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import bcrypt from "bcryptjs";

export const createProfile = async (req, res) => {
  try {
    const user = req.user.id;
    const { about, location, travelerType } = req.body;

    let profileImageUrl = null;
    if (req.file) {
      profileImageUrl = req.file.path;
    }

    const profile = new Profile({
      user: user,
      about,
      location,
      travelerType,
      profileImage: profileImageUrl,
    });

    await profile.save();

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating profile",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "fullName email phoneNumber createdAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "fullName email phoneNumber createdAt"
    );

    if (!profile) {
      return res.status(200).json({
        success: true,
        profile: null,
        user: user,
      });
    }

    res.status(200).json({
      success: true,
      profile: profile,
      user: user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { about, location, travelerType, fullName, email, phone } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);

    if (!profile || !user)
      return res
        .status(404)
        .json({ success: false, message: "Profile or user not found" });

    profile.about = about || profile.about;
    profile.location = location || profile.location;
    profile.travelerType = travelerType || profile.travelerType;
    if (req.file?.path) profile.profileImage = req.file.path;

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await profile.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile and user details updated successfully",
      profile,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
