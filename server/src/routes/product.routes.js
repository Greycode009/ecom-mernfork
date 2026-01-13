import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug); // Slug route BEFORE :id

// Admin routes - protected
router.post("/", protect, adminOnly, createProduct);
router.get("/:id", protect, adminOnly, getProductById); // Get by ID for editing
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
