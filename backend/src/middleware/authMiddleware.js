import { ApiError } from "#src/utils/AppError.js";
import { asyncHandler } from "#src/utils/AsyncHandler.js";
import { verifyAccessToken } from "#src/utils/jwt.js";

export const checkIfLoggedIn = asyncHandler((req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new ApiError(401, "Unauthrized: No access token provided");


    const userId = verifyAccessToken(accessToken);
    if (!userId) throw new ApiError(401, "Unauthorized: Invalid access token");

    req.userId = userId._id;
    next();
});

