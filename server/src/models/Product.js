import mongoose from "mongoose";

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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
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

const Product = mongoose.model("Product", productSchema);

export default Product;
