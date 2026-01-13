import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCheckoutSummary = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = [];
    let itemsPrice = 0;
    const requiredSet = new Set();

    for (const ci of cart.items) {
      const p = await Product.findById(ci.product).select(
        "title slug price images tags requiredFields"
      );

      if (!p) continue;

      const qty = Math.max(1, Number(ci.qty || 1));
      itemsPrice += p.price * qty;

      if (Array.isArray(p.requiredFields)) {
        for (const f of p.requiredFields) requiredSet.add(f);
      }

      items.push({
        productId: p._id,
        title: p.title,
        slug: p.slug,
        price: p.price,
        image: p.images?.[0] || "", // Include first image for display
        qty,
        tags: p.tags || [],
        requiredFields: p.requiredFields || [],
      });
    }

    itemsPrice = Number(itemsPrice.toFixed(2));

    res.json({
      items,
      requiredFields: Array.from(requiredSet),
      itemsPrice,
      totalPrice: itemsPrice,
      currency: "NPR",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Order from "../models/Order.js";

export const getWhatsAppLinkForOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only owner (or admin later) can generate link
    if (String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const lines = [];

    lines.push("Hello CheapGPT 👋");
    lines.push("I placed an order and want activation.");
    lines.push("");
    lines.push(`Order ID: ${order._id}`);

    // Activation details (only include non-empty)
    if (order.activationDetails) {
      const { email, phone, username, uid } = order.activationDetails;
      lines.push("");
      lines.push("Activation details:");
      if (email) lines.push(`Email: ${email}`);
      if (phone) lines.push(`Phone: ${phone}`);
      if (username) lines.push(`Username: ${username}`);
      if (uid) lines.push(`UID: ${uid}`);
    }

    lines.push("");
    lines.push("Items:");
    for (const item of order.orderItems) {
      lines.push(`- ${item.title} x${item.qty}`);
    }

    lines.push(`Total: NPR ${order.totalPrice}`);
    lines.push("");
    lines.push(
      `Payment: ${order.payment?.method === "esewa_qr"
        ? "eSewa QR"
        : order.payment?.method || "Manual"
      }`
    );
    lines.push("(I have paid / will pay now)");

    const message = lines.join("\n");
    const encoded = encodeURIComponent(message);

    // 🔁 Your WhatsApp number (Nepal, no +, no spaces)
    const WHATSAPP_NUMBER = "9779827133449";

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    res.json({ whatsappUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
