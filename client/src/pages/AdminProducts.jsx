import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import Badge from "../components/Badge";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search and filter
  useEffect(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tag
    if (filterTag && filterTag !== "All") {
      result = result.filter((p) => p.tags?.includes(filterTag));
    }

    setFilteredProducts(result);
  }, [searchQuery, filterTag, products]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeleteLoading(id);
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product: " + (err.response?.data?.message || err.message));
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleFeatured = async (id, currentValue) => {
    try {
      await api.put(`/products/${id}`, { isFeatured: !currentValue });
      setProducts(products.map((p) =>
        p._id === id ? { ...p, isFeatured: !currentValue } : p
      ));
    } catch (err) {
      alert("Failed to update: " + (err.response?.data?.message || err.message));
    }
  };

  const toggleHotDeal = async (id, currentValue) => {
    try {
      await api.put(`/products/${id}`, { isHotDeal: !currentValue });
      setProducts(products.map((p) =>
        p._id === id ? { ...p, isHotDeal: !currentValue } : p
      ));
    } catch (err) {
      alert("Failed to update: " + (err.response?.data?.message || err.message));
    }
  };

  // Bulk Actions
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p._id));
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedProducts.length} selected products?`)) return;

    setBulkActionLoading(true);
    try {
      await Promise.all(selectedProducts.map((id) => api.delete(`/products/${id}`)));
      setProducts(products.filter((p) => !selectedProducts.includes(p._id)));
      setSelectedProducts([]);
      alert("Products deleted successfully");
    } catch (err) {
      alert("Failed to delete some products: " + (err.response?.data?.message || err.message));
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkFeatured = async (value) => {
    setBulkActionLoading(true);
    try {
      await Promise.all(selectedProducts.map((id) => api.put(`/products/${id}`, { isFeatured: value })));
      setProducts(products.map((p) =>
        selectedProducts.includes(p._id) ? { ...p, isFeatured: value } : p
      ));
      setSelectedProducts([]);
      alert(`${selectedProducts.length} products marked as ${value ? 'featured' : 'not featured'}`);
    } catch (err) {
      alert("Failed to update some products: " + (err.response?.data?.message || err.message));
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkHotDeal = async (value) => {
    setBulkActionLoading(true);
    try {
      await Promise.all(selectedProducts.map((id) => api.put(`/products/${id}`, { isHotDeal: value })));
      setProducts(products.map((p) =>
        selectedProducts.includes(p._id) ? { ...p, isHotDeal: value } : p
      ));
      setSelectedProducts([]);
      alert(`${selectedProducts.length} products marked as ${value ? 'hot deal' : 'regular'}`);
    } catch (err) {
      alert("Failed to update some products: " + (err.response?.data?.message || err.message));
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Get unique tags
  const allTags = ["All", ...new Set(products.flatMap((p) => p.tags || []))];

  // Statistics
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.countInStock > 0).length,
    outOfStock: products.filter((p) => p.countInStock === 0).length,
    featured: products.filter((p) => p.isFeatured).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg mx-6 mt-6">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-neutral-900">
              Products
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage your digital inventory
            </p>
          </div>
          <Link to="/admin/products/new">
            <Button variant="primary" className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Product
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="text-sm text-neutral-600 mb-1">Total Products</div>
            <div className="text-3xl font-bold text-primary-700">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="text-sm text-neutral-600 mb-1">In Stock</div>
            <div className="text-3xl font-bold text-green-600">{stats.inStock}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="text-sm text-neutral-600 mb-1">Out of Stock</div>
            <div className="text-3xl font-bold text-red-600">{stats.outOfStock}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="text-sm text-neutral-600 mb-1">Featured</div>
            <div className="text-3xl font-bold text-purple-600">{stats.featured}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Tag Filter */}
            <div className="md:w-64">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === "All" ? "All Categories" : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-neutral-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedProducts.length > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-primary-900">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={() => setSelectedProducts([])}
                className="text-sm text-primary-700 hover:text-primary-900 font-medium"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkFeatured(true)}
                disabled={bulkActionLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                ⭐ Mark Featured
              </button>
              <button
                onClick={() => handleBulkHotDeal(true)}
                disabled={bulkActionLoading}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                🔥 Mark Hot Deal
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={bulkActionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {bulkActionLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Selected
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-6 py-4 w-12">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-600 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-700 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-neutral-500">
                      {searchQuery || filterTag !== "All"
                        ? "No products match your filters."
                        : "No products found. Create one to get started."}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p._id} className={`hover:bg-neutral-50 transition-colors ${selectedProducts.includes(p._id) ? 'bg-primary-50' : ''
                      }`}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(p._id)}
                          onChange={() => handleSelectProduct(p._id)}
                          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-50 to-purple-50 overflow-hidden flex-shrink-0 border border-neutral-200">
                            {p.images?.[0] ? (
                              <img src={p.images[0]} alt={p.title} className="w-full h-full object-contain p-2" />
                            ) : (
                              <div className="flex items-center justify-center h-full text-2xl">📦</div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-900">{p.title}</div>
                            <div className="text-xs text-neutral-500 mt-1">{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-primary-700">Rs {p.price.toLocaleString()}</div>
                        {p.originalPrice && (
                          <div className="text-xs text-neutral-400 line-through">Rs {p.originalPrice.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.countInStock > 10
                          ? "bg-green-100 text-green-800"
                          : p.countInStock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                          }`}>
                          {p.countInStock > 0 ? `${p.countInStock} in stock` : "Out of stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {p.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {p.tags?.length > 2 && (
                            <span className="text-xs text-neutral-500">+{p.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <button
                            onClick={() => toggleFeatured(p._id, p.isFeatured)}
                            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors ${p.isFeatured
                              ? "bg-purple-100 text-purple-700"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                              }`}
                          >
                            ⭐ {p.isFeatured ? "Featured" : "Not Featured"}
                          </button>
                          <button
                            onClick={() => toggleHotDeal(p._id, p.isHotDeal)}
                            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors ${p.isHotDeal
                              ? "bg-orange-100 text-orange-700"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                              }`}
                          >
                            🔥 {p.isHotDeal ? "Hot Deal" : "Regular"}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/products/${p._id}/edit`}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id, p.title)}
                            disabled={deleteLoading === p._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete product"
                          >
                            {deleteLoading === p._id ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AdminProducts;
