import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/**
 * Helper: ensure user has a cart document
 */
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

/**
 * GET /api/cart
 * Protected – get current user's cart (with product details)
 */
export const getMyCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);

    const populated = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "title slug price images category brand countInStock",
    });

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/cart/merge
 * Protected – merge guest cart into user cart
 * Body: { items: [{ productId, qty }] }
 */
export const mergeGuestCart = async (req, res) => {
  try {
    const guestItems = Array.isArray(req.body.items) ? req.body.items : [];

    // Validate input shape quickly
    for (const it of guestItems) {
      if (!it?.productId || !Number.isFinite(Number(it.qty)) || Number(it.qty) < 1) {
        return res.status(400).json({ message: "Invalid cart items payload" });
      }
    }

    const cart = await getOrCreateCart(req.user._id);

    // Build a map of current cart quantities
    const qtyMap = new Map(); // productId -> qty
    for (const item of cart.items) {
      qtyMap.set(String(item.product), item.qty);
    }

    // Merge: add guest qty into existing qty
    for (const gi of guestItems) {
      const pid = String(gi.productId);
      const addQty = Number(gi.qty);

      // Ensure product exists
      const product = await Product.findById(pid).select("countInStock");
      if (!product) continue; // skip missing products

      const current = qtyMap.get(pid) || 0;
      const merged = current + addQty;

      // Cap by stock (so cart can't exceed available)
      const finalQty = Math.max(1, Math.min(merged, product.countInStock || 0));

      // If out of stock, remove it from cart
      if ((product.countInStock || 0) <= 0) {
        qtyMap.delete(pid);
      } else {
        qtyMap.set(pid, finalQty);
      }
    }

    // Write back to cart.items
    cart.items = Array.from(qtyMap.entries()).map(([productId, qty]) => ({
      product: productId,
      qty,
    }));

    await cart.save();

    const populated = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "title slug price images category brand countInStock",
    });

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/cart/item
 * Protected – set qty for a product in cart (add if missing)
 * Body: { productId, qty, planId?, planLabel?, durationInDays?, price? }
 */
export const setCartItemQty = async (req, res) => {
  try {
    const { productId, qty, planId, planLabel, durationInDays, price } = req.body;

    if (!productId || !Number.isFinite(Number(qty)) || Number(qty) < 1) {
      return res.status(400).json({ message: "productId and qty (>=1) are required" });
    }

    const product = await Product.findById(productId).select("countInStock price pricingPlans");
    if (!product) return res.status(404).json({ message: "Product not found" });
    if ((product.countInStock || 0) <= 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    const finalQty = Math.min(Number(qty), product.countInStock);

    // Determine price - use provided price or find from pricingPlans or use product.price
    let itemPrice = price;
    if (!itemPrice && planId && product.pricingPlans?.length > 0) {
      const plan = product.pricingPlans.find(p => p.planId === planId);
      itemPrice = plan?.price || product.price || 0;
    } else if (!itemPrice) {
      itemPrice = product.price || 0;
    }

    const cart = await getOrCreateCart(req.user._id);

    const idx = cart.items.findIndex((it) => String(it.product) === String(productId));
    if (idx >= 0) {
      cart.items[idx].qty = finalQty;
      cart.items[idx].planId = planId || cart.items[idx].planId || "monthly";
      cart.items[idx].planLabel = planLabel || cart.items[idx].planLabel || "1 Month";
      cart.items[idx].durationInDays = durationInDays || cart.items[idx].durationInDays || 30;
      cart.items[idx].durationInDays = durationInDays || cart.items[idx].durationInDays || 30;
      cart.items[idx].price = itemPrice;
      if (req.body.variantLabel) cart.items[idx].variantLabel = req.body.variantLabel;
    } else {
      cart.items.push({
        product: productId,
        qty: finalQty,
        planId: planId || "monthly",
        planLabel: planLabel || "1 Month",
        durationInDays: durationInDays || 30,
        price: itemPrice,
        variantLabel: req.body.variantLabel,
      });
    }

    await cart.save();

    const populated = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "title slug price images category brand countInStock pricingPlans",
    });

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/cart/item/:productId
 * Protected – remove a product from cart
 */
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((it) => String(it.product) !== String(productId));
    await cart.save();

    const populated = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "title slug price images category brand countInStock",
    });

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/cart/clear
 * Protected – clear cart
 */
export const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
