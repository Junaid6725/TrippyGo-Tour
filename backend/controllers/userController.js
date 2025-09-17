import User from "../models/userModel.js";

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
