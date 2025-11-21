import { v2 as cloudinary } from "cloudinary";

// Load environment variables from `.env` into process.env

// Validate Cloudinary credentials
if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn("⚠️  Warning: Cloudinary cloud name is missing. Image uploads will fail.");
    console.warn("Make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in .env");
}
if (!process.env.CLOUDINARY_API_KEY) {
    console.warn("⚠️  Warning: Cloudinary API key is missing. Image uploads will fail.");
    console.warn("Make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in .env");
}
if (!process.env.CLOUDINARY_API_SECRET) {
    console.warn("⚠️  Warning: Cloudinary API secret is missing. Image uploads will fail.");
    console.warn("Make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in .env");
}



export const initializeCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

export default cloudinary;
