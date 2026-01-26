import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },

    // snapshot fields (so order doesn't change if product changes later)
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: "" },
    tags: { type: [String], default: [] },

    // Plan details for subscription tracking
    planId: { type: String, default: "monthly" }, // "monthly", "3months", "yearly"
    planLabel: { type: String, default: "1 Month" }, // Display label
    durationInDays: { type: Number, default: 30 }, // Duration for subscription

    price: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    orderItems: { type: [orderItemSchema], required: true },

    activationDetails: {
      email: { type: String, default: "", lowercase: true, trim: true },
      phone: { type: String, default: "", trim: true },
      username: { type: String, default: "", trim: true },
      uid: { type: String, default: "", trim: true },
      notes: { type: String, default: "", trim: true },
    },

    // digital fulfillment info
    activationEmail: { type: String, required: true, lowercase: true, trim: true },
    notes: { type: String, default: "" },

    currency: { type: String, default: "NPR" },

    // pricing (keep simple; you can add discounts later)
    itemsPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    status: {
      type: String,
      enum: ["pending_payment", "paid", "processing", "fulfilled", "cancelled"],
      default: "pending_payment",
    },

    payment: {
      method: {
        type: String,
        enum: ["esewa_qr", "khalti_qr", "manual", "esewa_api", "khalti_api"],
        default: "esewa_qr",
      },
      status: {
        type: String,
        enum: ["unpaid", "paid", "rejected"],
        default: "unpaid",
      },
      reference: { type: String, default: "" }, // admin enters eSewa/khalti txn id later
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      verifiedAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
