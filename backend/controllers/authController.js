import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    if (!fullName || !email || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: "user",
    });

    await createUser.save();

    res
      .status(201)
      .json({ success: true, message: "User Successfully Register!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials " });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login Successfully!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
