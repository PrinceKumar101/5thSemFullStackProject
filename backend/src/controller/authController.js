import User from "../models/users.js";
import { ApiError } from "#src/utils/AppError.js";
import z, { success } from "zod";
import { checkLoginIncomingData, checkRegisterUserSchema } from "#src/utils/zod.js";
import { asyncHandler } from "#src/utils/AsyncHandler.js";
import { generateAccessToken, generateRefreshToken, cookieOption, verifyRefreshToken } from "#src/utils/jwt.js";
import { hashPassword, comparePassword } from "#src/utils/hash.js";
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password, role, location } = req.body;
    const validatedData = checkRegisterUserSchema.safeParse({ name, email, phoneNumber, password, role, location });
    if (!validatedData.success) {
        const errors = z.flattenError(validatedData.error).fieldErrors;

        throw new ApiError(400, "Validation Error", errors);
    }
    const foundUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
    });
    if (foundUser) {
        if (foundUser.email === email) {
            throw new ApiError(400, "Email already registered");
        }
        if (foundUser.phoneNumber === phoneNumber) {
            throw new ApiError(400, "Phone number already registered");
        }
    }
    const hashedPassword = await hashPassword(password);
    const refreshToken = generateRefreshToken({ _id: new mongoose.Types.ObjectId() });

    const newUser = new User({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        location,
        refreshToken,
    });
    await newUser.save();
    const accessToken = generateAccessToken({ _id: newUser._id });
    const newRefreshToken = generateRefreshToken({ _id: newUser._id });

    await newUser.updateOne({ refreshToken: newRefreshToken });

    return res
        .status(201)
        .cookie("refreshToken", newRefreshToken, {  ...cookieOption, maxAge: 7 * 24 * 60 * 60 * 1000 })
        .cookie("accessToken", accessToken, { ...cookieOption, maxAge: 15 * 60 * 1000 })
        .json({ success: true, message: "User registered successfully" });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized: No refresh token provided");
    }
    const decoded = verifyRefreshToken(incomingRefreshToken);
    console.log("Decoded: ", decoded);

    if (!decoded) throw new ApiError(401, "Unauthorized: Invalid refresh token");

    const foundUser = await User.findById(decoded?._id);
    if (!foundUser || foundUser.refreshToken !== incomingRefreshToken)
        throw new ApiError(401, "Unauthorized: User or Invalid refresh token");

    const newAccessToken = generateAccessToken({ _id: foundUser?._id });
    const newRefreshToken = generateRefreshToken({ _id: foundUser?._id });

    if (!newAccessToken || !newRefreshToken) throw new Error("Token generation failed");

    await foundUser.updateOne({ refreshToken: newRefreshToken });
    res.status(200)
        .cookie("refreshToken", newRefreshToken, { ...cookieOption, maxAge: 7 * 24 * 60 * 60 * 1000 })
        .cookie("accessToken", newAccessToken, { ...cookieOption, maxAge: 15 * 60 * 1000 })
        .json({
            success: true,
            message: "Tokens refreshed successfully",
        });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const validatedData = checkLoginIncomingData.safeParse({ email, password });
    if (!validatedData.success) {
        const errors = z.flattenError(validatedData.error).fieldErrors;
        throw new ApiError(400, "Validation error", errors);
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new ApiError(401, "Invalid email or password");

    // Verify password before issuing tokens
    const isPasswordValid = await comparePassword(password, foundUser.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken({ _id: foundUser._id });
    const refreshToken = generateRefreshToken({ _id: foundUser._id });

    await foundUser.updateOne({ refreshToken });

    res.status(200)
        .cookie("accessToken", accessToken, { ...cookieOption, maxAge: 15 * 60 * 1000 })
        .cookie("refreshToken", refreshToken, { ...cookieOption, maxAge: 7 * 24 * 60 * 60 * 1000 })
        .json({
            success: true,
            message: "Logged In successfully.",
        });
});

export const logout = asyncHandler(async (req, res) => {
    const userId = req.userId; // from auth middleware
    if (!userId) throw new ApiError(401, "Unauthorized");

    // Clear refreshToken in DB
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res.status(200).clearCookie("accessToken", cookieOption).clearCookie("refreshToken", cookieOption).json({
        success: true,
        message: "Logged out successfully",
    });
});


