import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    image: "",
    countInStock: 999999,
    tags: "",
    requiredFields: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          price: data.price || "",
          image: data.images?.[0] || "", // Extract first image from array
          countInStock: data.countInStock ?? 999999,
          tags: (data.tags || []).join(", "),
          requiredFields: data.requiredFields || [],
        });
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

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

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

  return (
    <div className="min-h-screen bg-neutral-50 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
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

        <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-card p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Core Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Netflix Premium (1 Month)"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Slug (URL Identifer)</label>
                <input
                  type="text"
                  placeholder="e.g. netflix-premium-1-month"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                  className="input font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price (NPR)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Stock Count</label>
                  <input
                    type="number"
                    placeholder="999"
                    value={form.countInStock}
                    onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="input"
                />
                <p className="text-xs text-neutral-500 mt-1">Paste a direct link to the product image</p>
              </div>

              {/* Image Preview */}
              {form.image && (
                <div className="mt-4 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block">Preview</span>
                  <img src={form.image} alt="Preview" className="w-full h-48 object-contain rounded bg-white shadow-sm" />
                </div>
              )}
            </div>

            {/* Right Column: Details & Settings */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                <textarea
                  placeholder="Detailed description of the product and what the user gets..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input min-h-[140px]"
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

              <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h4 className="font-medium text-neutral-900 mb-4">Required Activation Fields</h4>
                <p className="text-sm text-neutral-600 mb-4">Select the information you need from the customer to fulfill this order:</p>

                <div className="grid grid-cols-2 gap-3">
                  {["email", "phone", "username", "uid", "profile_link"].map((f) => (
                    <label key={f} className="flex items-center gap-3 p-3 bg-white rounded-md border border-neutral-200 cursor-pointer hover:border-primary-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={form.requiredFields.includes(f)}
                        onChange={() => toggleField(f)}
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-neutral-700 capitalize">{f.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end gap-3">
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

