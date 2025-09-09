import Tour from "./../models/tourModel.js";

export const createTour = async (req, res) => {
  const {
    title,
    location,
    expenditure,
    description,
    groupSize,
    hotelDetail,
    distance,
    imgAlt,
    duration,
    included,
    excluded,
  } = req.body;

  const imgUrl = req.file?.path;

  try {
    if (
      !title ||
      !location ||
      !expenditure ||
      !description ||
      !groupSize ||
      !hotelDetail ||
      !distance ||
      !imgUrl ||
      !imgAlt ||
      !duration ||
      !included ||
      !excluded
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const newTour = new Tour({
      title,
      imgUrl,
      imgAlt,
      description,
      expenditure,
      duration,
      distance,
      location,
      included,
      excluded,
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
    location,
    expenditure,
    description,
    groupSize,
    hotelDetail,
    distance,
    imgAlt,
    duration,
    included,
    excluded,
  } = req.body;
  const imgUrl = req.file?.path;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        title,
        location,
        expenditure,
        description,
        groupSize,
        hotelDetail,
        distance,
        imgUrl,
        imgAlt,
        duration,
        included,
        excluded,
      },
      { new: true }
    );
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
  const allTours = await Tour.find();
  try {
    if (!allTours || allTours.length === 0) {
      return res.status(404).json({ message: "Tours Not Found" });
    }
    return res.status(200).json({ success: true, tours: allTours });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tours" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;

  try {
    const singleTour = await Tour.findById(id);
    if (!singleTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    return res.status(200).json({ success: true, singleTour });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tour" });
  }
};
