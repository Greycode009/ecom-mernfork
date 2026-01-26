// server/src/controllers/order.controller.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/**
 * Helper: calculate totals + build snapshot items from cart (server-trusted)
 * Also returns requiredFields union from all products in cart.
 * Now uses cart item prices (selected plan prices) instead of product base price.
 */
const calculateTotalsFromCart = async (cart) => {
  const items = [];
  let itemsPrice = 0;

  const requiredSet = new Set();

  for (const ci of cart.items) {
    const p = await Product.findById(ci.product).select(
      "title slug price images tags countInStock requiredFields pricingPlans"
    );

    if (!p) continue; // product deleted

    // collect required fields for activation (union across all products)
    if (Array.isArray(p.requiredFields)) {
      for (const f of p.requiredFields) requiredSet.add(String(f));
    }

    // qty handling (cap by stock only if stock is managed)
    let qty = Number(ci.qty) || 1;
    qty = Math.max(1, qty);

    const stock = Number(p.countInStock ?? 0);
    if (Number.isFinite(stock) && stock > 0) {
      qty = Math.min(qty, stock);
    }

    const image =
      Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : "";

    // Use cart item price (selected plan) or find from pricingPlans or fallback to product.price
    let itemPrice = ci.price;
    if (!itemPrice && ci.planId && p.pricingPlans?.length > 0) {
      const plan = p.pricingPlans.find((pl) => pl.planId === ci.planId);
      itemPrice = plan?.price || p.price || 0;
    } else if (!itemPrice) {
      itemPrice = p.price || 0;
    }

    items.push({
      product: p._id,
      title: p.title,
      slug: p.slug,
      image,
      tags: Array.isArray(p.tags) ? p.tags : [],
      price: itemPrice,
      qty,
      // Include plan details for subscription tracking
      planId: ci.planId || "monthly",
      planLabel: ci.planLabel || "1 Month",
      durationInDays: ci.durationInDays || 30,
    });

    itemsPrice += Number(itemPrice) * qty;
  }

  itemsPrice = Number(itemsPrice.toFixed(2));
  const totalPrice = itemsPrice; // digital: no shipping/tax by default

  return {
    items,
    itemsPrice,
    totalPrice,
    requiredFields: Array.from(requiredSet),
  };
};

// POST /api/orders
// Protected - create order from current user's cart
export const createOrderFromCart = async (req, res) => {
  try {
    const { activationDetails, activationEmail, notes, paymentMethod } = req.body;

    // Backward compatibility:
    // If older clients send activationEmail only, convert it to activationDetails.email
    const details =
      activationDetails && typeof activationDetails === "object"
        ? activationDetails
        : { email: activationEmail || "" };

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { items, itemsPrice, totalPrice, requiredFields } =
      await calculateTotalsFromCart(cart);

    if (items.length === 0) {
      return res.status(400).json({ message: "No valid items to order" });
    }

    // Validate required activation fields for all products in cart
    const missing = [];
    for (const f of requiredFields) {
      const v = details?.[f];
      if (!v || String(v).trim() === "") missing.push(f);
    }
    if (missing.length > 0) {
      return res.status(400).json({
        message: "Missing required activation details",
        missing,
      });
    }

    // Optional: enforce stock availability if you manage digital stock
    for (const it of items) {
      const p = await Product.findById(it.product).select("countInStock title");
      if (!p) continue;

      const stock = Number(p.countInStock ?? 0);
      if (Number.isFinite(stock) && stock > 0 && it.qty > stock) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${p.title}` });
      }
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems: items,

      activationDetails: {
        email: details.email ? String(details.email) : "",
        phone: details.phone ? String(details.phone) : "",
        username: details.username ? String(details.username) : "",
        uid: details.uid ? String(details.uid) : "",
        notes: details.notes ? String(details.notes) : "",
      },

      // Keep this field if your Order model still has activationEmail (backward compatibility)
      activationEmail: details.email ? String(details.email) : "",

      notes: notes || "",

      itemsPrice,
      totalPrice,

      payment: {
        method: paymentMethod || "esewa_qr", // later: esewa_api / khalti_api
        status: "unpaid",
        reference: "",
      },

      status: "pending_payment",
    });

    // Decrement stock (ONLY if you track digital stock)
    // If you don't want to decrement, remove this block.
    for (const it of items) {
      const p = await Product.findById(it.product).select("countInStock");
      if (!p) continue;

      const stock = Number(p.countInStock ?? 0);
      if (Number.isFinite(stock) && stock > 0) {
        await Product.updateOne(
          { _id: it.product, countInStock: { $gte: it.qty } },
          { $inc: { countInStock: -it.qty } }
        );
      }
    }

    // Clear cart after order creation
    cart.items = [];
    await cart.save();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/me
// Protected - get my orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id
// Protected - get order details (owner or admin)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email role"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = String(order.user?._id) === String(req.user._id);
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id/payment
// Admin - mark payment as paid/unpaid/rejected + add reference
export const updateOrderPayment = async (req, res) => {
  try {
    const { status, reference, method } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!["unpaid", "paid", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    if (
      method &&
      !["esewa_qr", "khalti_qr", "manual", "esewa_api", "khalti_api"].includes(
        method
      )
    ) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    order.payment.status = status;
    if (method) order.payment.method = method;
    if (typeof reference === "string") order.payment.reference = reference;

    order.payment.verifiedBy = req.user._id;
    order.payment.verifiedAt = new Date();

    // sync overall order status
    if (status === "paid") {
      if (order.status === "pending_payment") order.status = "paid";
    } else {
      order.status = "pending_payment";
    }

    await order.save();
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id/status
// Admin - update fulfillment status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["pending_payment", "paid", "processing", "fulfilled", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const previousStatus = order.status;
    order.status = status;
    await order.save();

    // When order becomes fulfilled, create subscriptions for each item
    if (status === "fulfilled" && previousStatus !== "fulfilled") {
      await createSubscriptionsFromOrder(order);
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Helper: Create subscriptions from fulfilled order
const createSubscriptionsFromOrder = async (order) => {
  try {
    const Subscription = (await import("../models/Subscription.js")).default;
    const { sendEmail } = await import("../services/emailService.js");
    const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5174";

    for (const item of order.orderItems) {
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + (item.durationInDays || 30) * 24 * 60 * 60 * 1000);

      // Create subscription record
      const subscription = await Subscription.create({
        user: order.user._id || order.user,
        order: order._id,
        product: item.product,
        productTitle: item.title,
        productImage: item.image || "",
        planId: item.planId || "monthly",
        planLabel: item.planLabel || "1 Month",
        durationInDays: item.durationInDays || 30,
        price: item.price,
        startDate,
        endDate,
        status: "active",
        activationDetails: {
          email: order.activationDetails?.email || "",
          phone: order.activationDetails?.phone || "",
          username: order.activationDetails?.username || "",
          uid: order.activationDetails?.uid || "",
        },
      });

      console.log(`✅ Created subscription for ${item.title} (expires: ${endDate.toDateString()})`);

      // Send activation email
      const userEmail = order.user?.email || order.activationDetails?.email;
      if (userEmail) {
        await sendEmail(userEmail, "subscriptionActivated", {
          userName: order.user?.name || "Customer",
          productTitle: item.title,
          planLabel: item.planLabel || "1 Month",
          startDate: startDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          endDate: endDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          siteUrl: CLIENT_URL,
        });
      }
    }
  } catch (error) {
    console.error("❌ Error creating subscriptions:", error.message);
  }
};

// GET /api/orders (admin list)
export const listAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
