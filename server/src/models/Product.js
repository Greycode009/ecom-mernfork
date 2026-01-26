import mongoose from "mongoose";

// Pricing plan sub-schema
const pricingPlanSchema = new mongoose.Schema(
  {
    planId: {
      type: String,
      required: true,
      enum: ["monthly", "3months", "6months", "yearly"],
    },
    label: {
      type: String,
      required: true, // e.g., "1 Month", "3 Months", "1 Year"
    },
    durationInDays: {
      type: Number,
      required: true, // e.g., 30, 90, 180, 365
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0, // For showing crossed-out price
    },
    isRecommended: {
      type: Boolean,
      default: false, // Highlight this plan (usually yearly)
    },
    isActive: {
      type: Boolean,
      default: true, // Enable/disable specific plans
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Backward compatible single price (used if no pricingPlans)
    price: {
      type: Number,
      min: 0,
    },
    // Multiple pricing plans for different durations
    pricingPlans: {
      type: [pricingPlanSchema],
      default: [],
    },
    // New: Variants for different entitlements (e.g. "Family" vs "Single")
    variants: [
      {
        label: { type: String, required: true }, // e.g., "Full Family Control"
        pricingPlans: { type: [pricingPlanSchema], default: [] },
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    requiredFields: {
      type: [String],
      default: [], // e.g. ["email"] or ["phone","uid"]
    },
    features: {
      instant: {
        type: Boolean,
        default: true,
      },
      verified: {
        type: Boolean,
        default: true,
      },
      support: {
        type: Boolean,
        default: true,
      },
    },
    isHotDeal: {
      type: Boolean,
      default: false,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to get the lowest active plan price (for display in listings)
productSchema.virtual("lowestPrice").get(function () {
  if (this.pricingPlans && this.pricingPlans.length > 0) {
    const activePlans = this.pricingPlans.filter((p) => p.isActive);
    if (activePlans.length > 0) {
      return Math.min(...activePlans.map((p) => p.price));
    }
  }
  return this.price || 0;
});

// Ensure virtuals are included in JSON
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

export default Product;

