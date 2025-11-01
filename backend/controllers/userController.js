import User from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || " ";

    const searchQuery = {
      role: "user",
      ...(search && {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const total = await User.countDocuments(searchQuery);

    const users = await User.find(searchQuery).skip(skip).limit(limit);

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


