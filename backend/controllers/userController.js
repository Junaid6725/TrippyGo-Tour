import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Users Not Found" });
    }

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

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
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name email createdAt"
    );

    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not created yet" });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { about, location, travelerType } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });

    profile.about = about || profile.about;
    profile.location = location || profile.location;
    profile.travelerType = travelerType || profile.travelerType;
    if (req.file?.path) profile.profileImage = req.file.path;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};
