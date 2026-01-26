import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  createOrderFromCart,
  getMyOrders,
  getOrderById,
  updateOrderPayment,
  updateOrderStatus,
  listAllOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

// User routes - specific paths first
router.post("/", protect, createOrderFromCart);
router.get("/me", protect, getMyOrders);

// Admin routes - must come BEFORE /:id
router.get("/admin/list", protect, adminOnly, listAllOrders);
router.put("/:id/payment", protect, adminOnly, updateOrderPayment);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// Dynamic route last
router.get("/:id", protect, getOrderById);

export default router;
