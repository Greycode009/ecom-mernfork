import express from "express";
import { protect, adminOnly as admin } from "../middleware/auth.js";
import {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    handleUploadError,
} from "../controllers/upload.controller.js";

const router = express.Router();

// POST /api/upload - Upload single image (admin only)
router.post("/", protect, admin, uploadImage, handleUploadError);

// POST /api/upload/multiple - Upload multiple images (admin only)
router.post("/multiple", protect, admin, uploadMultipleImages, handleUploadError);

// DELETE /api/upload/:filename - Delete an image (admin only)
router.delete("/:filename", protect, admin, deleteImage);

export default router;
