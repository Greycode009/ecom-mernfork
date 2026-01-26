import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    // Plan details for subscription products
    planId: {
      type: String,
      default: "monthly",
    },
    planLabel: {
      type: String,
      default: "1 Month",
    },
    durationInDays: {
      type: Number,
      default: 30,
    },
    price: {
      type: Number,
      default: 0, // Price at time of adding to cart
    },
    variantLabel: {
      type: String, // e.g. "Full Family Control"
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

