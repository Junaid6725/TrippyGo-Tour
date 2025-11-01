import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folderName = "uploads";
    let formats = ["jpg", "jpeg", "png"];

    if (file.fieldname === "profileImage") {
      folderName = "profileImg";
      formats = ["png", "jpg"];
    } else if (file.fieldname === "tourImg") {
      folderName = "tourImg";
      formats = ["jpg", "jpeg", "png", "webp"];
    } else if (file.fieldname === "destinationImg") {
      folderName = "destinationImg";
      formats = ["jpg", "png"];
    }

    return {
      folder: folderName,
      allowed_formats: formats,
    };
  },
});

export { cloudinary, storage };
