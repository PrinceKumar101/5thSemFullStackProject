import User from "#src/models/users.js";
import { ApiError } from "#src/utils/AppError.js";
import { asyncHandler } from "#src/utils/AsyncHandler.js";
import { uploadOnCloudinary } from "#src/utils/uploadImage.js";
import fs from "fs";

export const viewUserprofile = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const foundUser = await User.findById(userId).select("-password -refreshToken -__v");

    if (!foundUser) throw new ApiError(404, "User not found");

    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: foundUser,
    });
});

export const updateProfilePicture = asyncHandler(async (req, res) => {
    const userId = req.userId;

    if (!req.file) {
        throw new ApiError(400, "No image file provided");
    }

    const image = req.file;
    console.log("Uploading image:", image);

    try {
        const uploadedImageResult = await uploadOnCloudinary(image.path);
        if (!uploadedImageResult) {
            throw new ApiError(500, "Image upload failed");
        }
        fs.unlinkSync(image.path);

        console.log("Upload result:", uploadedImageResult);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatarUrl: uploadedImageResult.secure_url },
            { new: true }
        ).select("-password -refreshToken");

        res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            data: {
                avatarUrl: updatedUser.avatarUrl,
            },
        });
    } catch (error) {
        console.error("Image upload failed:", error);
        throw new ApiError(500, "Failed to upload image: " + error.message);
    }
});
