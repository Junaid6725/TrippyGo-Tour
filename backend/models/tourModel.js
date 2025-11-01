import mongoose, { Schema, Types } from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tourImg: {
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
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination is required for every tour"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
