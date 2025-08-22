import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credential: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
