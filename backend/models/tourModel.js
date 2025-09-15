import mongoose, { Schema, Types } from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expenditure: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    included: {
      type: [String],
      default: [],
    },
    excluded: {
      type: [String],
      default: [],
    },
    groupSize: {
      type: Number,
      required: true,
      min: 1,
    },
    hotelDetail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
