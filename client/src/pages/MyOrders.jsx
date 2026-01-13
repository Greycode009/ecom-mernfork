import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Badge from "../components/Badge";
import Button from "../components/Button";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get("/orders/me");
            setOrders(data);
        } catch (err) {
            setError("Failed to load your orders");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                <p className="text-red-600 text-lg mb-6">{error}</p>
                <Button onClick={fetchOrders} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold text-neutral-900">
                        My Orders
                    </h1>
                    <Link to="/">
                        <Button variant="outline" size="sm">
                            Browse Store
                        </Button>
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-card p-12 text-center">
                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            🛍️
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 mb-2">
                            No orders yet
                        </h2>
                        <p className="text-neutral-600 mb-6">
                            You haven't placed any orders yet. Start shopping to see your
                            subscriptions here.
                        </p>
                        <Link to="/">
                            <Button variant="primary">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow text-neutral-700"
                            >
                                {/* Order Header */}
                                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-100 flex flex-wrap gap-4 items-center justify-between">
                                    <div className="flex gap-6 text-sm">
                                        <div>
                                            <p className="text-neutral-500 mb-1">Order Placed</p>
                                            <p className="font-medium text-neutral-900">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-neutral-500 mb-1">Total Amount</p>
                                            <p className="font-medium text-neutral-900">
                                                NPR {order.totalPrice.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-neutral-500 mb-1">Order ID</p>
                                            <p className="font-mono text-neutral-600">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Payment Status Badge */}
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${order.payment.status === "paid"
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                }`}
                                        >
                                            {order.payment.status === "paid"
                                                ? "Payment Verified"
                                                : "Payment Pending"}
                                        </span>

                                        {/* Order Status Badge */}
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${order.status === "fulfilled"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                                    : order.status === "cancelled"
                                                        ? "bg-red-50 text-red-700 border-red-200"
                                                        : "bg-neutral-100 text-neutral-700 border-neutral-200"
                                                }`}
                                        >
                                            {order.status.replace("_", " ")}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="w-20 h-20 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                    {/* We might not have the image URL in order items depending on schema, 
                              so we use a placeholder if missing. 
                              Note: In typical MERN, order items usually allow storing image. 
                          */}
                                                    <img
                                                        src={
                                                            item.image || "https://via.placeholder.com/150"
                                                        }
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-neutral-900 mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                                                        <span>Qty: {item.qty}</span>
                                                        <span>•</span>
                                                        <span>NPR {item.price.toLocaleString()}</span>
                                                    </div>
                                                    {/* If status is fulfilled, show activation details if available or instruction */}
                                                    {order.status === "fulfilled" && (
                                                        <div className="inline-block bg-green-50 px-3 py-2 rounded-lg mt-2">
                                                            <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                                Subscription Active
                                                            </p>
                                                            {/* If backend sends credentials in order, show them here. 
                                  Assuming for now it's manual activation via WhatsApp. */}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end gap-3">
                                        <Link to={`/order-success/${order._id}`}>
                                            <Button variant="ghost" size="sm">
                                                View Instructions
                                            </Button>
                                        </Link>
                                        <a
                                            href={`https://wa.me/9779800000000?text=Hello, I need help with order #${order._id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button variant="outline" size="sm">
                                                Need Help?
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
