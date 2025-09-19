import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    travelerType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
