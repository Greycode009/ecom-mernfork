import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const OrderSuccess = () => {
  const { id } = useParams();
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const { data } = await api.get(`/checkout/whatsapp/${id}`);
        setWhatsappUrl(data.whatsappUrl);
      } catch (err) {
        setError("Failed to load WhatsApp link");
      } finally {
        setLoading(false);
      }
    };

    fetchWhatsApp();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-lg text-neutral-600">
            Your order has been received and is being processed
          </p>
        </div>

        {/* Order ID Card */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Order ID</p>
              <p className="text-lg font-mono font-semibold text-neutral-900">{id}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(id)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-xl shadow-card p-8 mb-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4 text-center">
            Complete Your Payment
          </h2>
          <p className="text-neutral-600 text-center mb-6">
            Scan the QR code below with eSewa or Khalti to complete your payment
          </p>

          {/* QR Code Placeholder */}
          <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl p-8 mb-6 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/esewa-qr.png"
                alt="eSewa QR Code"
                className="w-64 h-64 object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/256x256?text=QR+Code";
                }}
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> After completing payment, please message us on WhatsApp with your payment screenshot.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button variant="secondary" size="lg" className="w-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send Payment Confirmation on WhatsApp
            </Button>
          </a>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-card p-8 mb-6">
          <h3 className="text-xl font-display font-bold text-neutral-900 mb-6">Next Steps</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Complete Payment</h4>
                <p className="text-sm text-neutral-600">Scan the QR code above with eSewa or Khalti</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Send Confirmation</h4>
                <p className="text-sm text-neutral-600">Click the WhatsApp button and send your payment screenshot</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Get Activated</h4>
                <p className="text-sm text-neutral-600">We'll activate your subscription within 1-6 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/orders" className="flex-1">
            <Button variant="ghost" className="w-full">
              View My Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

