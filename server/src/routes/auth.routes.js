import express from "express";
import { register, login, me, googleAuth, googleAuthCallback } from "../controllers/auth.controller.js";
import { getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// Google OAuth routes
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);

export default router;

