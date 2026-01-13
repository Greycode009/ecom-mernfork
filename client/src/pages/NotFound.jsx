import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <h1 className="text-9xl font-display font-bold text-primary-600 mb-4">404</h1>
                    <div className="text-6xl mb-6">🔍</div>
                </div>

                {/* Message */}
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-neutral-600 text-lg mb-8">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link to="/">
                        <button className="btn-primary px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button className="btn-outline px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Contact Support
                        </button>
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="bg-white rounded-xl shadow-card p-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Quick Links
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            Home
                        </Link>
                        <Link to="/faq" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            FAQ
                        </Link>
                        <Link to="/contact" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            Contact
                        </Link>
                        <Link to="/about" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                            About Us
                        </Link>
                    </div>
                </div>

                {/* Support Info */}
                <div className="mt-8 text-neutral-500 text-sm">
                    <p>Need help? Contact us on WhatsApp at +977 9800000000</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
