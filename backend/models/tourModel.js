import mongoose, { Schema, Types } from "mongoose";

const tourSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
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
      type: Number,
      required: true,
    },
    distanceFrom: {
      type: String,
      required: true,
    },
    distanceKm: {
      type: Number,
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
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
