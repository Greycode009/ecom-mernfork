import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const { data } = await api.get("/cart");
            // Transform populated items into flat format for UI
            const items = (data.items || []).map((item) => ({
                productId: item.product?._id || item.product,
                title: item.product?.title || "Unknown Product",
                slug: item.product?.slug || "",
                // Use cart item price (selected plan price) or fallback to product price
                price: item.price || item.product?.price || 0,
                image: item.product?.images?.[0] || "",
                qty: item.qty || 1,
                // Plan info
                planId: item.planId || "monthly",
                planLabel: item.planLabel || "1 Month",
                durationInDays: item.durationInDays || 30,
            }));
            setCart(items);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load cart");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQty) => {
        if (newQty < 1) return;

        try {
            await api.put("/cart/item", { productId, qty: newQty });
            await fetchCart();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update quantity");
        }
    };

    const removeItem = async (productId) => {
        try {
            await api.delete(`/cart/item/${productId}`);
            await fetchCart();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to remove item");
        }
    };

    const clearCart = async () => {
        if (!confirm("Are you sure you want to clear your cart?")) return;

        try {
            await api.delete("/cart/clear");
            setCart([]);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to clear cart");
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4">
                <div className="text-neutral-300 text-8xl mb-6">🛒</div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-3">Your cart is empty</h2>
                <p className="text-neutral-600 mb-8 text-center max-w-md">
                    Looks like you haven't added any products yet. Browse our products and find something you love!
                </p>
                <Button onClick={() => navigate("/")} size="lg">
                    Browse Products
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Shopping Cart</h1>
                        <p className="text-neutral-600">
                            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>
                    {cart.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.productId} className="bg-white rounded-xl shadow-card p-6">
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image || "https://via.placeholder.com/200"}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <Link
                                                    to={`/product/${item.slug}`}
                                                    className="text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                                <p className="text-sm text-primary-600 font-medium mt-0.5">
                                                    {item.planLabel} plan
                                                </p>
                                                <p className="text-sm text-neutral-600 mt-1">
                                                    NPR {item.price.toLocaleString()} each
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="text-red-500 hover:text-red-600 transition-colors p-2"
                                                title="Remove item"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 mt-4">
                                            <span className="text-sm font-medium text-neutral-700">Quantity:</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.qty - 1)}
                                                    className="w-8 h-8 rounded-lg border-2 border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-600 font-semibold transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center font-semibold text-lg">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.qty + 1)}
                                                    className="w-8 h-8 rounded-lg border-2 border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-600 font-semibold transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="mt-4 pt-4 border-t border-neutral-200">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-600">Subtotal:</span>
                                                <span className="text-xl font-bold text-primary-600">
                                                    NPR {(item.price * item.qty).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-card p-6 sticky top-6">
                            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-neutral-700">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>NPR {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-700">
                                    <span>Delivery</span>
                                    <span className="text-green-600 font-medium">Digital</span>
                                </div>
                                <div className="pt-3 border-t border-neutral-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-neutral-900">Total</span>
                                        <span className="text-2xl font-bold text-primary-600">
                                            NPR {totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => navigate("/checkout")}
                                className="w-full mb-3"
                            >
                                Proceed to Checkout
                            </Button>

                            <Link
                                to="/"
                                className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                Continue Shopping
                            </Link>

                            {/* Info Box */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-xs text-blue-800">
                                    <strong>Note:</strong> All products are digitally activated. You'll need to provide activation details during checkout.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
