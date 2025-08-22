import mongoose from "mongoose";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      fullName: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      phoneNumber: process.env.ADMIN_PHONE,
      password: adminPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin Created Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
