import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDb from "#src/config/dbConfig.js";
import route from "#src/routes/userRoutes.js";
import { ApiError } from "#src/utils/AppError.js";
import { initializeCloudinary } from "./config/cloudinary.js";

// Load environment variables from `.env` into process.env
dotenv.config();


const app = express();

//  Body parsing
// Parse incoming JSON payloads and URL-encoded form data so handlers can read
// them via req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS so the frontend can talk to this API during development/production
app.use(cors());

app.use(helmet());

// Compress response bodies for better network performance
app.use(compression());

// Log HTTP requests to the console in 'dev' format (method, url, status, time)
app.use(morgan("dev")); //Developer personal choice to keep it

// Parse cookies into req.cookies (useful for sessions, auth, etc.)
app.use(cookieParser());

// function to handle the Db connections
connectDb();

// Initialize Cloudinary configuration
initializeCloudinary();


// Routes that are mounted with baseurl /api/*
app.use("/api", route);

// Basic error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: err.data,
        });
    }
    console.error("Unexpected Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
