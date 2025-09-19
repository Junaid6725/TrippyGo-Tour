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

export const userProfile = async (req, res) => {
  try {
    const { about, location, travelerType } = req.body;
    let profileUrl;
    if (req.file) {
      profileUrl = req.file.path;
    }
    let userId = req.user._id;
    let profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "email"
    );
    if (!profile) {
      profile = new Profile({
        user: userId,
        profileImage: profileUrl,
        about,
        location,
        travelerType,
      });
      await profile.save();
      res
        .status(201)
        .json({ success: true, message: "Profile saved", profile });
    }
  } catch (error) {
    res.status(500).json({ error: "Error saving profile" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing from request",
      });
    }

    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
