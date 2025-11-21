import cloudinary from "#src/config/cloudinary.js";
import fs from "fs";
// import cloudinary from "cloudinary"



export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
            folder: "Farm2Home/users/images",
        });
        console.log("File uploaded successfully", result);
        return result;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Error while uploading on cloudinary", error);
        return null;
    }
};


