import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments({ role: "user" });

    const users = await User.find({ role: "user" }).skip(skip).limit(limit);

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Users Not Found" });
    }

    return res.status(200).json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Tour not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User successfully deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete tour!" });
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
