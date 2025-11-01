import Destination from "./../models/destinationModel.js";

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    if (!destinations.length) {
      return res
        .status(404)
        .json({ success: false, message: "Destinations not found" });
    }
    return res
      .status(200)
      .json({ success: true, destinations, count: destinations.length });
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
