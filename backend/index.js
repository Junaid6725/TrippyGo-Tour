import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import cors from "cors";
import { autoCompleteBookings } from "./cron/autoCompleteBookings.js";

dotenv.config();
const app = express();
// const PORT = process.env.PORT;
await connectDB();

const corsOptions = {
  origin: "https://trippy-go-tour.vercel.app",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

autoCompleteBookings();

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", tourRoutes);
app.use("/api", contactRoutes);
app.use("/api", bookingRoutes);
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", destinationRoutes);
app.use("/api", reviewRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import serverless from "serverless-http";
export const handler = serverless(app);

export default app;
