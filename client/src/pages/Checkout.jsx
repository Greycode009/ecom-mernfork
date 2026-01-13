import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const Checkout = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const [items, setItems] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [activationDetails, setActivationDetails] = useState({
    email: "",
    phone: "",
    username: "",
    uid: "",
  });

  // Load checkout summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get("/checkout/summary");
        setItems(data.items);
        setRequiredFields(data.requiredFields || []);
        setTotalPrice(data.totalPrice);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load checkout");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const handleChange = (field, value) => {
    setActivationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);

    try {
      const { data } = await api.post("/orders", {
        activationDetails,
        paymentMethod: "esewa_qr",
      });

      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-600 text-lg mb-6">{error}</p>
        <Button onClick={() => navigate("/cart")}>Back to Cart</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Checkout</h1>
          <p className="text-neutral-600">Complete your order and get activated within hours</p>
        </div>

        <form onSubmit={placeOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Activation Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activation Details */}
              <div className="bg-white rounded-xl shadow-card p-8">
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Activation Details
                </h2>
                <p className="text-neutral-600 mb-6">
                  Please provide the required information for subscription activation
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requiredFields.includes("email") && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={activationDetails.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  )}

                  {requiredFields.includes("phone") && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={activationDetails.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="input"
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>
                  )}

                  {requiredFields.includes("username") && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={activationDetails.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        className="input"
                        placeholder="Your username"
                      />
                    </div>
                  )}

                  {requiredFields.includes("uid") && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        UID / User ID
                      </label>
                      <input
                        type="text"
                        value={activationDetails.uid}
                        onChange={(e) => handleChange("uid", e.target.value)}
                        className="input"
                        placeholder="Your unique ID"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-8">
                <h3 className="text-xl font-display font-bold text-primary-900 mb-4">
                  📱 Payment Instructions
                </h3>
                <div className="space-y-3 text-primary-800">
                  <p className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">1.</span>
                    <span>Complete your order by clicking "Place Order" below</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">2.</span>
                    <span>Scan the eSewa/Khalti QR code on the next page</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">3.</span>
                    <span>Click the WhatsApp button to send payment confirmation</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">4.</span>
                    <span>We'll activate your subscription within 1-6 hours</span>
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-card p-6 sticky top-6">
                <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image || "https://via.placeholder.com/100"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 text-sm truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Qty: {item.qty} × NPR {item.price.toLocaleString()}
                        </p>
                        <p className="text-sm font-semibold text-primary-600 mt-1">
                          NPR {(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-neutral-200 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-700">Subtotal</span>
                    <span className="font-semibold">NPR {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      NPR {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={placing}
                  className="w-full"
                >
                  {placing ? "Placing Order..." : "Place Order →"}
                </Button>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Activation within 1-6 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>WhatsApp support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Trusted by thousands</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

