import { refreshAccessToken, registerUser, login, logout } from "#src/controller/authController.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "User route is working!" });
});

router.post("/register", registerUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/login", login);
router.post("/logout", logout);

export default router;
