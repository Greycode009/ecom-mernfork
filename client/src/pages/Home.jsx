import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [featureFilters, setFeatureFilters] = useState({
    instant: false,
    verified: false,
    support: false,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const tags = ["All", "AI", "Entertainment", "Education", "VPN", "Productivity", "Cloud Services"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tag
    if (activeTag && activeTag !== "All") {
      result = result.filter((p) => p.tags?.includes(activeTag));
    }

    // Price range filter
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    // Feature filters
    if (featureFilters.instant) {
      result = result.filter((p) => p.features?.instant !== false);
    }
    if (featureFilters.verified) {
      result = result.filter((p) => p.features?.verified !== false);
    }
    if (featureFilters.support) {
      result = result.filter((p) => p.features?.support !== false);
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFiltered(result);
  }, [activeTag, sortBy, products, searchQuery, priceRange, featureFilters]);

  // Dynamic hottest deals - get products marked as hot deals from database
  const hottestDeals = products
    .filter((p) => p.isHotDeal && p.originalPrice && p.price < p.originalPrice)
    .sort((a, b) => {
      const savingsA = a.originalPrice - a.price;
      const savingsB = b.originalPrice - b.price;
      return savingsB - savingsA; // Sort by biggest savings first
    })
    .slice(0, 3); // Take top 3

  const isSearchPage = location.pathname === '/search';

  const scrollToProducts = () => {
    document.getElementById('all-products')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const clearAllFilters = () => {
    setActiveTag("All");
    setSortBy("featured");
    setPriceRange({ min: 0, max: 10000 });
    setFeatureFilters({ instant: false, verified: false, support: false });
    if (searchQuery) {
      window.history.pushState({}, '', isSearchPage ? '/search' : '/');
      window.location.reload();
    }
  };

  const hasActiveFilters = activeTag !== "All" ||
    priceRange.min > 0 ||
    priceRange.max < 10000 ||
    featureFilters.instant ||
    featureFilters.verified ||
    featureFilters.support;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-purple-50/30">
      {/* Premium Hero Section - Only show on home page */}
      {!isSearchPage && (
        <section className="relative bg-primary-700 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-white">Trusted by 10,000+ Customers in Nepal</span>
                </div>

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white">
                  Premium Digital<br />
                  <span className="text-yellow-400">
                    Products
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white leading-relaxed max-w-xl">
                  Get Netflix, Spotify, ChatGPT, Adobe & more at <span className="font-bold text-yellow-400">unbeatable prices</span> in Nepal
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 max-w-lg">
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="text-3xl font-black text-yellow-400">1-6h</div>
                    <div className="text-sm mt-1 text-white">Quick Activation</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="text-3xl font-black text-green-400">24/7</div>
                    <div className="text-sm mt-1 text-white">WhatsApp Support</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="text-3xl font-black text-blue-400">100%</div>
                    <div className="text-sm mt-1 text-white">Verified</div>
                  </div>
                </div>

                {/* CTA - Single Button */}
                <div className="relative z-10">
                  <button
                    onClick={scrollToProducts}
                    className="px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    Browse Deals
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Column - Featured Deals Cards */}
              <div className="relative">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-6 text-white">🔥 Hottest Deals Right Now</h3>
                  <div className="grid gap-4">
                    {hottestDeals.map((product, index) => (
                      <a
                        key={product._id}
                        href={`/product/${product.slug}`}
                        className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-500 border border-white/50"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl overflow-hidden">
                            <img
                              src={product.images?.[0] || 'https://via.placeholder.com/100'}
                              alt={product.title}
                              className="w-full h-full object-contain p-2"
                            />
                            {index === 0 && (
                              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                #1
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-neutral-900 text-lg mb-1 truncate group-hover:text-primary-700 transition-colors">
                              {product.title}
                            </h4>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black bg-gradient-to-r from-primary-700 to-purple-600 bg-clip-text text-transparent">
                                Rs {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-neutral-400 line-through">
                                  Rs {product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <svg className="w-6 h-6 text-neutral-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-neutral-50" />
            </svg>
          </div>
        </section>
      )}

      {/* All Products Section with Sidebar Filters */}
      <section id="all-products" className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Header with Filter Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-neutral-900 mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : activeTag === "All" ? "All Products" : `${activeTag} Products`}
            </h2>
            <p className="text-xl text-neutral-600">
              {filtered.length} premium {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </button>
        </div>

        {/* Grid Layout: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'
            }`}>
            <div className="lg:sticky lg:top-24 space-y-6 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="text-lg font-bold text-neutral-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sort - MOVED TO TOP FOR PROMINENCE */}
              <div className="space-y-3 pb-6 border-b border-neutral-200">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200 rounded-lg text-sm font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700 cursor-pointer hover:border-primary-300 transition-all"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-700"
                    />
                    <span className="text-neutral-500">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-700"
                    />
                  </div>
                  <div className="text-xs text-neutral-500">Rs {priceRange.min} - Rs {priceRange.max}</div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Categories</h3>
                <div className="space-y-1">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTag === tag
                        ? "bg-primary-700 text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Filters */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Features</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={featureFilters.instant}
                      onChange={(e) => setFeatureFilters({ ...featureFilters, instant: e.target.checked })}
                      className="w-4 h-4 text-green-500 border-neutral-300 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm text-neutral-700 group-hover:text-neutral-900">⚡ Instant Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={featureFilters.verified}
                      onChange={(e) => setFeatureFilters({ ...featureFilters, verified: e.target.checked })}
                      className="w-4 h-4 text-blue-500 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-neutral-700 group-hover:text-neutral-900">✓ Verified Product</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={featureFilters.support}
                      onChange={(e) => setFeatureFilters({ ...featureFilters, support: e.target.checked })}
                      className="w-4 h-4 text-purple-500 border-neutral-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-neutral-700 group-hover:text-neutral-900">🎧 24/7 Support</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-neutral-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-neutral-300 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                  No products found
                </h3>
                <p className="text-neutral-500 mb-6">
                  {searchQuery ? `No results for "${searchQuery}"` : "Try selecting a different category"}
                </p>
                <button
                  onClick={() => {
                    setActiveTag("All");
                    setSortBy("featured");
                    window.history.pushState({}, '', '/');
                  }}
                  className="btn btn-primary"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">10K+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">50+</div>
              <div className="text-white/80">Premium Services</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">100%</div>
              <div className="text-white/80">Verified Deals</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
