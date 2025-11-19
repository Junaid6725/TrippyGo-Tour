import Destination from "./../models/destinationModel.js";

export const getDestinations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const totalDestinations = await Destination.countDocuments();
    const destinations = await Destination.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalDestinations / limit);

    return res.status(200).json({
      success: true,
      destinations,
      currentPage: page,
      totalPages,
      totalDestinations,
      count: destinations.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    const { name } = req.body;
    const destinationImg = req.file?.path;
    if (!name || !destinationImg) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, image) are required.",
      });
    }
    const existing = await Destination.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Destination already exists" });
    }

    const destination = new Destination({ name, destinationImg });
    await destination.save();
    res.status(201).json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const removeDestination = await Destination.findByIdAndDelete(id);
    if (!removeDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Destination successfully deleted!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete destination!" });
  }
};

export const getAdminDestinations = async (req, res) => {
  try {
   
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

   
    const search = req.query.search || "";
    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } } // assumes 'name' is your field
      : {};

    
    const total = await Destination.countDocuments(searchQuery);

    
    const allDestinations = await Destination.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

  
    return res.status(200).json({
      success: true,
      message: "Destinations fetched successfully!",
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalDestinations: total,
      results: allDestinations.length,
      destinations: allDestinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch destinations!",
    });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    if (!destinations || destinations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No destinations found",
      });
    }

    res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching destinations",
    });
  }
};
