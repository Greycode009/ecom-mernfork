import Product from "../models/Product.js";

// GET /api/products
// Public – list all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
// Admin only – create product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      price,
      pricingPlans,
      image,
      images,
      category,
      brand,
      countInStock,
      tags,
      requiredFields,
      isFeatured,
      isHotDeal,
      originalPrice,
      features,
    } = req.body;

    // Require either price or pricingPlans
    const hasPlans = pricingPlans && pricingPlans.length > 0;
    if (!title || !slug || !description || (!price && !hasPlans)) {
      return res.status(400).json({ message: "Required fields missing (title, slug, description, and either price or pricingPlans)" });
    }

    const exists = await Product.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: "Product slug already exists" });
    }

    // Handle image field - convert single image to images array
    let productImages = images || [];
    if (image && !productImages.includes(image)) {
      productImages = [image, ...productImages];
    }

    // Enforce max 3 hot deals for new products
    if (isHotDeal) {
      const hotDealCount = await Product.countDocuments({ isHotDeal: true });
      if (hotDealCount >= 3) {
        return res.status(400).json({
          message: "Maximum 3 products can be marked as Hot Deal. Please remove one first."
        });
      }
    }

    // Validate and sanitize pricing plans
    let sanitizedPlans = [];
    if (hasPlans) {
      const validPlanIds = ["monthly", "3months", "6months", "yearly"];
      sanitizedPlans = pricingPlans
        .filter((p) => validPlanIds.includes(p.planId) && p.price > 0)
        .map((p) => ({
          planId: p.planId,
          label: p.label || p.planId,
          durationInDays: p.durationInDays || 30,
          price: Number(p.price),
          originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
          isRecommended: Boolean(p.isRecommended),
          isActive: p.isActive !== false,
        }));
    }

    const product = await Product.create({
      title,
      slug,
      description,
      price: price || (sanitizedPlans.length > 0 ? sanitizedPlans[0].price : 0),
      pricingPlans: sanitizedPlans,
      images: productImages,
      category: category || "Digital Services",
      brand,
      countInStock: countInStock || 999999,
      tags: tags || [],
      requiredFields: requiredFields || [],
      isFeatured: isFeatured || false,
      isHotDeal: isHotDeal || false,
      originalPrice,
      features: features || { instant: true, verified: true, support: true },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
// Admin only - get product by ID for editing
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/slug/:slug
// Public – get product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/products/:id
// Admin only – update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "title",
      "slug",
      "description",
      "price",
      "pricingPlans",
      "image",
      "images",
      "category",
      "brand",
      "countInStock",
      "isFeatured",
      "isHotDeal",
      "originalPrice",
      "tags",
      "requiredFields",
      "features",
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    // Handle single image field -> convert to images array
    if (updates.image && !updates.images) {
      updates.images = [updates.image];
      delete updates.image;
    }

    // Sanitize arrays
    if (updates.tags) {
      updates.tags = Array.isArray(updates.tags)
        ? updates.tags.map((t) => String(t).trim()).filter(Boolean)
        : [];
    }

    if (updates.requiredFields) {
      const allowedReq = ["email", "phone", "username", "uid", "profile_link"];
      updates.requiredFields = Array.isArray(updates.requiredFields)
        ? updates.requiredFields
          .map((f) => String(f).trim())
          .filter((f) => allowedReq.includes(f))
        : [];
    }

    // Enforce max 3 hot deals
    if (updates.isHotDeal === true) {
      const currentProduct = await Product.findById(id);
      // Only check if product is being newly marked as hot deal
      if (!currentProduct?.isHotDeal) {
        const hotDealCount = await Product.countDocuments({ isHotDeal: true });
        if (hotDealCount >= 3) {
          return res.status(400).json({
            message: "Maximum 3 products can be marked as Hot Deal. Please remove one first."
          });
        }
      }
    }

    // Slug uniqueness check (if changing slug)
    if (updates.slug) {
      const exists = await Product.findOne({ slug: updates.slug, _id: { $ne: id } });
      if (exists) return res.status(409).json({ message: "Product slug already exists" });
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id
// Admin only – delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
