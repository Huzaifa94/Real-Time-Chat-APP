import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();
// console.log({
//   CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
//   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
//   CLOUDINARY_API_KEY_SECRET: process.env.CLOUDINARY_API_KEY_SECRET,
// });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

export default cloudinary;
