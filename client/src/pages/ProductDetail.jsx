import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Badge from "../components/Badge";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/slug/${slug}`);
                setProduct(data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const addToCart = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        setAddingToCart(true);
        try {
            await api.put("/cart/item", {
                productId: product._id,
                qty: quantity,
            });
            alert(`Added ${quantity} x ${product.title} to cart!`);
            navigate("/cart");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add to cart");
        } finally {
            setAddingToCart(false);
        }
    };

    const getTagVariant = (tag) => {
        const tagLower = tag.toLowerCase();
        if (tagLower === "ai") return "ai";
        if (tagLower === "entertainment") return "entertainment";
        if (tagLower === "education") return "education";
        if (tagLower === "vpn") return "vpn";
        if (tagLower === "productivity") return "productivity";
        return "default";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="xl" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Product Not Found</h2>
                <p className="text-neutral-600 mb-6">{error}</p>
                <Button onClick={() => navigate("/")}>Back to Home</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-8 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                        <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-12">
                            <img
                                src={product.image || "https://via.placeholder.com/600?text=No+Image"}
                                alt={product.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Title & Tags */}
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.tags?.map((tag) => (
                                    <Badge key={tag} variant={getTagVariant(tag)}>
                                        {tag}
                                    </Badge>
                                ))}
                                {product.isFeatured && <Badge variant="accent">Featured</Badge>}
                            </div>
                            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
                                {product.title}
                            </h1>
                            <p className="text-5xl font-bold text-primary-600 mb-4">
                                NPR {product.price?.toLocaleString()}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-3">About this subscription</h2>
                            <p className="text-neutral-700 leading-relaxed">
                                {product.description || "Premium digital subscription with instant activation."}
                            </p>
                        </div>

                        {/* Required Fields Info */}
                        {product.requiredFields && product.requiredFields.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Activation Information Required
                                </h3>
                                <p className="text-sm text-blue-800 mb-2">
                                    You'll need to provide the following during checkout:
                                </p>
                                <ul className="space-y-1">
                                    {product.requiredFields.map((field) => (
                                        <li key={field} className="text-sm text-blue-900 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Delivery Info */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Delivery Timeline
                            </h3>
                            <p className="text-sm text-green-800">
                                ✓ Manual activation within <strong>1-6 hours</strong> after payment verification
                            </p>
                            <p className="text-sm text-green-800 mt-1">
                                ✓ WhatsApp support available
                            </p>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="bg-white rounded-xl shadow-card p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-neutral-700 mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg border-2 border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-600 font-semibold transition-colors"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-20 text-center text-lg font-semibold border-2 border-neutral-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-lg border-2 border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-600 font-semibold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-neutral-700">Total:</span>
                                    <span className="text-2xl font-bold text-primary-600">
                                        NPR {(product.price * quantity).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={addToCart}
                                disabled={addingToCart || product.countInStock === 0}
                                className="w-full"
                            >
                                {addingToCart ? "Adding..." : product.countInStock === 0 ? "Out of Stock" : "Add to Cart 🛒"}
                            </Button>

                            {!user && (
                                <p className="text-sm text-neutral-500 text-center mt-3">
                                    You'll be redirected to login
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
