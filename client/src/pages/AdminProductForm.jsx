import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

// Default plan templates
const PLAN_TEMPLATES = {
  monthly: { planId: "monthly", label: "1 Month", durationInDays: 30 },
  "3months": { planId: "3months", label: "3 Months", durationInDays: 90 },
  "6months": { planId: "6months", label: "6 Months", durationInDays: 180 },
  yearly: { planId: "yearly", label: "1 Year", durationInDays: 365 },
};

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    countInStock: 999999,
    tags: "",
    requiredFields: [],
    isFeatured: false,
    isHotDeal: false,
    originalPrice: "",
  });

  // Pricing plans state
  const [pricingPlans, setPricingPlans] = useState([]);
  const [usePricingPlans, setUsePricingPlans] = useState(false);
  const [singlePrice, setSinglePrice] = useState("");

  // Variants state
  const [useVariants, setUseVariants] = useState(false);
  const [variants, setVariants] = useState([]); // Array of { label, pricingPlans }

  const [hotDealCount, setHotDealCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Image upload state
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageInputMode, setImageInputMode] = useState("upload"); // "upload" or "url"

  // Fetch current hot deal count
  useEffect(() => {
    const fetchHotDealCount = async () => {
      try {
        const { data } = await api.get("/products");
        const count = data.filter((p) => p.isHotDeal).length;
        setHotDealCount(count);
      } catch (err) {
        // Silently fail
      }
    };
    fetchHotDealCount();
  }, []);

  // Load product data for editing
  useEffect(() => {
    if (!isEdit) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          image: data.images?.[0] || "",
          countInStock: data.countInStock ?? 999999,
          tags: (data.tags || []).join(", "),
          requiredFields: data.requiredFields || [],
          isFeatured: data.isFeatured || false,
          isHotDeal: data.isHotDeal || false,
          originalPrice: data.originalPrice || "",
        });

        // Load pricing plans or variants
        if (data.variants && data.variants.length > 0) {
          setUseVariants(true);
          setVariants(data.variants);
          setUsePricingPlans(true); // Implicitly true for variants
        } else if (data.pricingPlans && data.pricingPlans.length > 0) {
          setUsePricingPlans(true);
          setPricingPlans(data.pricingPlans);
        } else {
          setSinglePrice(data.price || "");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEdit]);

  const toggleField = (field) => {
    setForm((prev) => ({
      ...prev,
      requiredFields: prev.requiredFields.includes(field)
        ? prev.requiredFields.filter((f) => f !== field)
        : [...prev.requiredFields, field],
    }));
  };

  // Add a new pricing plan
  const addPlan = (planId) => {
    if (pricingPlans.find((p) => p.planId === planId)) return;
    const template = PLAN_TEMPLATES[planId];
    setPricingPlans([
      ...pricingPlans,
      { ...template, price: "", originalPrice: "", isRecommended: false, isActive: true },
    ]);
  };

  // Remove a pricing plan
  const removePlan = (planId) => {
    setPricingPlans(pricingPlans.filter((p) => p.planId !== planId));
  };

  // Update a pricing plan field
  const updatePlan = (planId, field, value) => {
    setPricingPlans(
      pricingPlans.map((p) =>
        p.planId === panId ? { ...p, [field]: value } : p
      )
    );
  };

  // Toggle recommended plan (only one can be recommended)
  const toggleRecommended = (planId) => {
    setPricingPlans(
      pricingPlans.map((p) => ({
        ...p,
        isRecommended: p.planId === planId ? !p.isRecommended : false,
      }))
    );
  };

  // --- Variant Handlers ---

  const addVariant = () => {
    setVariants([...variants, { label: "New Variant", pricingPlans: [] }]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const updateVariantLabel = (index, label) => {
    const newVariants = [...variants];
    newVariants[index].label = label;
    setVariants(newVariants);
  };

  // Helper to add a plan to a specific variant
  const addPlanToVariant = (variantIndex, planId) => {
    const template = PLAN_TEMPLATES[planId];
    const newVariants = [...variants];
    const currentPlans = newVariants[variantIndex].pricingPlans || [];

    if (currentPlans.find(p => p.planId === planId)) return;

    newVariants[variantIndex].pricingPlans = [
      ...currentPlans,
      { ...template, price: "", originalPrice: "", isRecommended: false, isActive: true }
    ];
    setVariants(newVariants);
  };

  // Helper to remove plan from variant
  const removePlanFromVariant = (variantIndex, planId) => {
    const newVariants = [...variants];
    newVariants[variantIndex].pricingPlans = newVariants[variantIndex].pricingPlans.filter(p => p.planId !== planId);
    setVariants(newVariants);
  };

  // Helper to update plan in variant
  const updateVariantPlan = (variantIndex, planId, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].pricingPlans = newVariants[variantIndex].pricingPlans.map(p =>
      p.planId === planId ? { ...p, [field]: value } : p
    );
    setVariants(newVariants);
  };

  // Helper to toggle recommended plan in variant
  const toggleVariantRecommended = (variantIndex, planId) => {
    const newVariants = [...variants];
    newVariants[variantIndex].pricingPlans = newVariants[variantIndex].pricingPlans.map(p => ({
      ...p,
      isRecommended: p.planId === planId ? !p.isRecommended : false
    }));
    setVariants(newVariants);
  };

  // Handle image file upload
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image file too large. Max size is 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Use the full URL for the uploaded image
      const imageUrl = `${window.location.protocol}//${window.location.hostname}:5001${data.url}`;
      setForm({ ...form, image: imageUrl });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
    };

    if (useVariants && variants.length > 0) {
      // Send variants
      payload.variants = variants.map(v => ({
        ...v,
        pricingPlans: v.pricingPlans.map(p => ({
          ...p,
          price: Number(p.price),
          originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined
        }))
      }));
      // Find absolute lowest price across all variants for display sorting
      const allPrices = payload.variants.flatMap(v => v.pricingPlans.map(p => Number(p.price) || 0));
      payload.price = allPrices.length > 0 ? Math.min(...allPrices) : 0;
      payload.pricingPlans = []; // clear standard plans
    } else if (usePricingPlans && pricingPlans.length > 0) {
      // Send pricing plans
      payload.pricingPlans = pricingPlans.map((p) => ({
        ...p,
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
      }));
      payload.price = Math.min(...pricingPlans.map((p) => Number(p.price) || 0));
      payload.variants = []; // clear variants
    } else {
      // Send single price
      payload.price = Number(singlePrice);
      payload.pricingPlans = [];
      payload.variants = [];
    }

    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit && !form.title) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const availablePlansToAdd = Object.keys(PLAN_TEMPLATES).filter(
    (planId) => !pricingPlans.find((p) => p.planId === planId)
  );

  return (
    <div className="min-h-screen bg-neutral-50 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900">
              {isEdit ? "Edit Product" : "Create New Product"}
            </h1>
            <p className="text-neutral-600 mt-1">
              Fill in the details below to {isEdit ? "update" : "add"} a digital product
            </p>
          </div>
          <Link to="/admin/products">
            <Button variant="outline" size="sm">Cancel & Go Back</Button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-8">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Netflix Premium"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Slug (URL Identifier)</label>
                <input
                  type="text"
                  placeholder="e.g. netflix-premium"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                  className="input font-mono text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                <textarea
                  placeholder="Detailed description of the product..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="entertainment, video, 4k"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Product Image</label>

              {/* Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setImageInputMode("upload")}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${imageInputMode === "upload"
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                >
                  📤 Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode("url")}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${imageInputMode === "url"
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                >
                  🔗 Paste URL
                </button>
              </div>

              {imageInputMode === "upload" ? (
                /* Drag and Drop Zone */
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-300 hover:border-primary-400 hover:bg-neutral-50"
                    } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <LoadingSpinner size="md" />
                      <p className="text-neutral-600">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-neutral-900">
                          {dragActive ? "Drop image here!" : "Drag & drop image here"}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">or click to browse</p>
                      </div>
                      <p className="text-xs text-neutral-400">PNG, JPG, GIF, WebP up to 5MB</p>
                    </div>
                  )}
                </div>
              ) : (
                /* URL Input */
                <input
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="input"
                />
              )}

              {/* Image Preview */}
              {form.image && (
                <div className="mt-4 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block">Preview</span>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <img src={form.image} alt="Preview" className="h-40 object-contain rounded bg-white shadow-sm" />
                  <p className="text-xs text-neutral-400 mt-2 truncate max-w-md">{form.image}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Plans Card */}
          <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">💰 Pricing</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm text-neutral-600">Variants (e.g. Family/Single)</span>
                  <input
                    type="checkbox"
                    checked={useVariants}
                    onChange={(e) => {
                      setUseVariants(e.target.checked);
                      if (e.target.checked) setUsePricingPlans(true); // Variants implies pricing plans
                    }}
                    className="w-5 h-5 text-purple-600 border-neutral-300 rounded focus:ring-purple-500"
                  />
                </label>
                {!useVariants && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm text-neutral-600">Multiple durations</span>
                    <input
                      type="checkbox"
                      checked={usePricingPlans}
                      onChange={(e) => setUsePricingPlans(e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                  </label>
                )}
              </div>
            </div>

            {useVariants ? (
              /* Variant Editor */
              <div className="space-y-6">
                {variants.map((variant, vIndex) => (
                  <div key={vIndex} className="p-4 border-2 border-purple-100 rounded-xl bg-purple-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 mr-4">
                        <label className="block text-xs font-bold text-purple-700 mb-1 uppercase tracking-wider">Variant Label</label>
                        <input
                          type="text"
                          value={variant.label}
                          onChange={(e) => updateVariantLabel(vIndex, e.target.value)}
                          placeholder="e.g. Full Family Control"
                          className="input border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <button type="button" onClick={() => removeVariant(vIndex)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Variant</button>
                    </div>

                    {/* Inner Pricing Plans for Variant */}
                    <div className="pl-4 border-l-2 border-purple-200">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium text-neutral-500">Add Plan:</span>
                        {Object.keys(PLAN_TEMPLATES).filter(pid => !variant.pricingPlans?.find(p => p.planId === pid)).map(planId => (
                          <button
                            key={planId}
                            type="button"
                            onClick={() => addPlanToVariant(vIndex, planId)}
                            className="px-2 py-1 text-xs bg-white border border-purple-200 text-purple-700 rounded hover:bg-purple-50 transition-colors"
                          >
                            + {PLAN_TEMPLATES[planId].label}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-3">
                        {variant.pricingPlans?.map(plan => (
                          <div key={plan.planId} className="p-3 bg-white rounded border border-neutral-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm text-neutral-700">{plan.label}</span>
                              <button type="button" onClick={() => removePlanFromVariant(vIndex, plan.planId)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <div>
                                <label className="block text-[10px] text-neutral-500">Price</label>
                                <input type="number" value={plan.price} onChange={(e) => updateVariantPlan(vIndex, plan.planId, 'price', e.target.value)} className="input py-1 text-sm bg-neutral-50" />
                              </div>
                              <div>
                                <label className="block text-[10px] text-neutral-500">Original</label>
                                <input type="number" value={plan.originalPrice || ""} onChange={(e) => updateVariantPlan(vIndex, plan.planId, 'originalPrice', e.target.value)} className="input py-1 text-sm bg-neutral-50" />
                              </div>
                              <div className="flex items-end">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="checkbox" checked={plan.isRecommended} onChange={() => toggleVariantRecommended(vIndex, plan.planId)} className="w-3 h-3 text-green-600" />
                                  <span className="text-xs">Recommend</span>
                                </label>
                              </div>
                              <div className="flex items-end">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="checkbox" checked={plan.isActive !== false} onChange={(e) => updateVariantPlan(vIndex, plan.planId, 'isActive', e.target.checked)} className="w-3 h-3 text-primary-600" />
                                  <span className="text-xs">Active</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addVariant}
                  className="w-full py-3 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 font-medium hover:bg-purple-50 hover:border-purple-400 transition-colors"
                >
                  + Add New Variant
                </button>
              </div>
            ) : !usePricingPlans ? (
              /* Single Price Mode */
              <div className="max-w-xs">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Price (NPR)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={singlePrice}
                  onChange={(e) => setSinglePrice(e.target.value)}
                  required={!usePricingPlans}
                  className="input text-xl font-bold"
                />
              </div>
            ) : (
              /* Multiple Pricing Plans Mode */
              <div className="space-y-4">
                {/* Add Plan Buttons */}
                {availablePlansToAdd.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm text-neutral-500">Add plan:</span>
                    {availablePlansToAdd.map((planId) => (
                      <button
                        key={planId}
                        type="button"
                        onClick={() => addPlan(planId)}
                        className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        + {PLAN_TEMPLATES[planId].label}
                      </button>
                    ))}
                  </div>
                )}

                {pricingPlans.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
                    Click a button above to add pricing plans
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {pricingPlans.map((plan) => (
                      <div
                        key={plan.planId}
                        className={`p-4 rounded-lg border-2 transition-all ${plan.isRecommended
                          ? "border-green-400 bg-green-50"
                          : "border-neutral-200 bg-neutral-50"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-neutral-900">{plan.label}</span>
                            <span className="text-xs text-neutral-500">({plan.durationInDays} days)</span>
                            {plan.isRecommended && (
                              <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                                🔥 RECOMMENDED
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removePlan(plan.planId)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ✕ Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-neutral-600 mb-1">Price (NPR)</label>
                            <input
                              type="number"
                              placeholder="0"
                              value={plan.price}
                              onChange={(e) =>
                                setPricingPlans(
                                  pricingPlans.map((p) =>
                                    p.planId === plan.planId ? { ...p, price: e.target.value } : p
                                  )
                                )
                              }
                              required
                              className="input text-lg font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-neutral-600 mb-1">Original Price</label>
                            <input
                              type="number"
                              placeholder="Optional"
                              value={plan.originalPrice || ""}
                              onChange={(e) =>
                                setPricingPlans(
                                  pricingPlans.map((p) =>
                                    p.planId === plan.planId ? { ...p, originalPrice: e.target.value } : p
                                  )
                                )
                              }
                              className="input"
                            />
                          </div>
                          <div className="flex items-end">
                            <label className="flex items-center gap-2 p-2 bg-white rounded border border-neutral-200 cursor-pointer hover:border-green-400 transition-colors">
                              <input
                                type="checkbox"
                                checked={plan.isRecommended}
                                onChange={() => toggleRecommended(plan.planId)}
                                className="w-4 h-4 text-green-600"
                              />
                              <span className="text-sm">Recommended</span>
                            </label>
                          </div>
                          <div className="flex items-end">
                            <label className="flex items-center gap-2 p-2 bg-white rounded border border-neutral-200 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={plan.isActive !== false}
                                onChange={(e) =>
                                  setPricingPlans(
                                    pricingPlans.map((p) =>
                                      p.planId === plan.planId ? { ...p, isActive: e.target.checked } : p
                                    )
                                  )
                                }
                                className="w-4 h-4 text-primary-600"
                              />
                              <span className="text-sm">Active</span>
                            </label>
                          </div>
                        </div>

                        {/* Show savings info for longer plans */}
                        {plan.planId !== "monthly" && pricingPlans.find((p) => p.planId === "monthly")?.price && plan.price && (
                          <div className="mt-2 text-sm text-green-700">
                            {(() => {
                              const monthlyPlan = pricingPlans.find((p) => p.planId === "monthly");
                              const monthlyPrice = Number(monthlyPlan?.price) || 0;
                              const months = plan.durationInDays / 30;
                              const equivalentMonthly = monthlyPrice * months;
                              const savings = equivalentMonthly - Number(plan.price);
                              if (savings > 0) {
                                return `💰 Saves NPR ${savings.toLocaleString()} vs monthly`;
                              }
                              return null;
                            })()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Promotion Settings */}
              <div className="bg-gradient-to-br from-orange-50 to-purple-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-medium text-neutral-900 mb-3">⭐ Promotion</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-2 bg-white rounded-md border border-neutral-200 cursor-pointer hover:border-purple-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm">⭐ Featured Product</span>
                  </label>

                  <label className={`flex items-center gap-3 p-2 bg-white rounded-md border cursor-pointer transition-colors ${!form.isHotDeal && hotDealCount >= 3 ? 'opacity-60 cursor-not-allowed' : 'hover:border-orange-500'
                    }`}>
                    <input
                      type="checkbox"
                      checked={form.isHotDeal}
                      onChange={(e) => {
                        if (!form.isHotDeal && hotDealCount >= 3) {
                          alert("Maximum 3 hot deals allowed");
                          return;
                        }
                        setForm({ ...form, isHotDeal: e.target.checked });
                      }}
                      disabled={!form.isHotDeal && hotDealCount >= 3}
                      className="w-4 h-4 text-orange-600"
                    />
                    <span className="text-sm">🔥 Hot Deal ({hotDealCount}/3)</span>
                  </label>

                  {form.isHotDeal && (
                    <input
                      type="number"
                      placeholder="Original price for discount display"
                      value={form.originalPrice}
                      onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      className="input text-sm"
                    />
                  )}
                </div>
              </div>

              {/* Required Fields */}
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <h4 className="font-medium text-neutral-900 mb-3">📋 Required Info</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["email", "phone", "username", "uid", "profile_link"].map((f) => (
                    <label key={f} className="flex items-center gap-2 p-2 bg-white rounded-md border border-neutral-200 cursor-pointer hover:border-primary-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={form.requiredFields.includes(f)}
                        onChange={() => toggleField(f)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-sm capitalize">{f.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Link to="/admin/products">
              <Button variant="ghost" type="button">Cancel</Button>
            </Link>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
