import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phoneNumber: { type: String, required: true },

    password: { type: String, required: true },

    role: { type: String, enum: ["farmer", "consumer", "admin"], required: true },

    location: {
        state: String,
        city: String,
    },

    avatarUrl: String,

    refreshToken: { type: String, default: null },

    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
