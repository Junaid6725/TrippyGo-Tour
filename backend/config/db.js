import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connectionDB.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
