import { upload } from "#src/config/multer.js";
import { refreshAccessToken, registerUser, login, logout } from "#src/controller/authController.js";
import { updateProfilePicture, viewUserprofile } from "#src/controller/userProfileController.js";
import { checkIfLoggedIn } from "#src/middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "User route is working!" });
});

router.post("/register", registerUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", checkIfLoggedIn, viewUserprofile);

router.post("/profile/update-image", checkIfLoggedIn, upload.single("profilePicture"), updateProfilePicture);

export default router;
