import jwt from "jsonwebtoken";

export const generateAccessToken = payload => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error("JWT_ACCESS_SECRET is not defined in environment variables");
    return jwt.sign(payload, secret, { expiresIn: "15m" });
};
export const generateRefreshToken = payload => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
    return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyAccessToken = token => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error("JWT_ACCESS_SECRET is not defined in environment variables");
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Access token verification failed:", error.message);
        return null;
    }
};
export const verifyRefreshToken = token => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Refresh token verification failed:", error.message);
        return null;
    }
};
export const cookieOption = {
    httpOnly: true,
    sameSite: "Strict",
};
