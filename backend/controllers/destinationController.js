// GET /api/destinations
import Tour from "../models/tourModel.js";

// Unique destinations fetch karne ke liye
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Tour.distinct("location"); // sirf unique locations
    res.status(200).json({ success: true, destinations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destinations",
      error: error.message,
    });
  }
};

// GET /api/tours?location=XYZ
export const getToursByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    const tours = await Tour.find(filter);
    res.status(200).json({ success: true, tours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
