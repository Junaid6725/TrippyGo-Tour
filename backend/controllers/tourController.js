import Tour from "./../models/tourModel.js";

export const createTour = async (req, res) => {
  const {
    title,
    location,
    destinationId,
    expenditure,
    description,
    groupSize,
    hotelDetail,
    distance,
    duration,
    included,
    excluded,
  } = req.body;

  const tourImg = req.file?.path;

  try {
    if (
      !title ||
      !destinationId ||
      !location ||
      !expenditure ||
      !description ||
      !groupSize ||
      !hotelDetail ||
      !distance ||
      !tourImg ||
      !duration ||
      !included ||
      !excluded
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const parsedIncluded = JSON.parse(included || "[]");
    const parsedExcluded = JSON.parse(excluded || "[]");

    const newTour = new Tour({
      title,
      tourImg,
      destinationId,
      description,
      expenditure,
      duration,
      distance,
      location,
      included: parsedIncluded,
      excluded: parsedExcluded,
      groupSize,
      hotelDetail,
    });

    await newTour.save();
    return res.status(201).json({ success: true, newTour });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create tour" });
  }
};

export const updatedTour = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    destinationId,
    location,
    expenditure,
    description,
    groupSize,
    hotelDetail,
    distance,
    duration,
  } = req.body;

  const included = req.body.included ? JSON.parse(req.body.included) : [];
  const excluded = req.body.excluded ? JSON.parse(req.body.excluded) : [];

  let tourImg;
  if (req.file) {
    tourImg = req.file.path;
  }

  try {
    const updateData = {
      title,
      destinationId,
      location,
      expenditure,
      description,
      groupSize,
      hotelDetail,
      distance,
      duration,
      included,
      excluded,
    };

    if (tourImg) updateData.tourImg = tourImg;

    const updateTour = await Tour.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(201).json({
      success: true,
      message: "Tour successfully updated!",
      updateTour,
    });
  } catch (error) {
    return res.status(400).json({ message: "Failed to update tour" });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Tour successfully deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete tour!" });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Tour.countDocuments(searchQuery);
    const allTours = await Tour.find(searchQuery).skip(skip).limit(limit);

    if (!allTours || allTours.length === 0) {
      return res.status(404).json({ message: "Tours Not Found" });
    }
    return res.status(200).json({
      success: true,
      tours: allTours,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tours" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;

  try {
    const singleTour = await Tour.findById(id).populate("destinationId");
    if (!singleTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    return res.status(200).json({ success: true, singleTour });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tour" });
  }
};

export const searchTour = async (req, res) => {
  try {
    const { location, maxPrice, minPrice, groupSize } = req.query;

    if (!location && !minPrice && !maxPrice && !groupSize) {
      return res.status(400).json({ message: "No filters provided." });
    }

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (minPrice || maxPrice) {
      query.expenditure = {};
      if (minPrice) query.expenditure.$gte = Number(minPrice);
      if (maxPrice) query.expenditure.$lte = Number(maxPrice);
    }
    if (groupSize) {
      query.groupSize = { $gte: Number(groupSize) };
    }
    const tours = await Tour.find(query);
    res.json({ success: true, tours });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getToursByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    // Basic validation
    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "Destination ID is required",
      });
    }

    // Fetch tours with destination populated
    const tours = await Tour.find({ destinationId })
      .populate("destinationId", "name image")
      .sort({ createdAt: -1 });

    if (!tours.length) {
      return res.status(404).json({
        success: false,
        message: "No tours found for this destination",
      });
    }

    return res.status(200).json({
      success: true,
      count: tours.length,
      tours,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
