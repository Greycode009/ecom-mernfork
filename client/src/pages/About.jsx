import { Link } from "react-router-dom";
import Button from "../components/Button";

const About = () => {
    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <div className="bg-gradient-hero text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-display font-bold mb-6">
                        About CheapGPT
                    </h1>
                    <p className="text-xl opacity-90">
                        Making premium digital subscriptions affordable for everyone in Nepal
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Our Story */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-card p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Our Story
                        </h2>
                        <div className="prose prose-lg max-w-none text-neutral-700 space-y-4">
                            <p>
                                CheapGPT was founded with a simple mission: to make premium digital services accessible
                                to everyone in Nepal at affordable prices. We understand that international subscription
                                services can be expensive when converted to NPR, and that's where we come in.
                            </p>
                            <p>
                                We bridge the gap between global digital services and local customers by offering
                                competitive pricing, local payment methods (eSewa & Khalti), and personalized
                                WhatsApp support that speaks your language.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white rounded-xl shadow-card p-8 text-center">
                            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                Browse & Order
                            </h3>
                            <p className="text-neutral-600">
                                Choose from our wide selection of digital subscriptions and add them to your cart.
                                Checkout is quick and easy.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-xl shadow-card p-8 text-center">
                            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                Pay Locally
                            </h3>
                            <p className="text-neutral-600">
                                Pay using eSewa or Khalti (supports NPR). Send payment screenshot to our WhatsApp
                                for instant verification.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-xl shadow-card p-8 text-center">
                            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                Get Activated
                            </h3>
                            <p className="text-neutral-600">
                                Receive your subscription credentials within 1-6 hours via WhatsApp. Start enjoying
                                your premium service immediately!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-16">
                    <div className="bg-gradient-primary text-white rounded-xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Why Choose CheapGPT?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    💰
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Unbeatable Prices</h3>
                                    <p className="opacity-90">
                                        Up to 70% cheaper than buying directly. Affordable premium subscriptions for the Nepal market.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    ⚡
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Quick Activation</h3>
                                    <p className="opacity-90">
                                        Manual activation within 1-6 hours during business hours. Fast, reliable service.
                                    </p>
                                </div>
                            </div>

                            <div className="flex itemsstart gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    🇳🇵
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Local Payment</h3>
                                    <p className="opacity-90">
                                        Accept eSewa and Khalti. No credit card required. Pay in NPR with methods you trust.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    💬
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">WhatsApp Support</h3>
                                    <p className="opacity-90">
                                        24/7 customer support via WhatsApp. Get help whenever you need it in your language.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    🔒
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Secure & Trusted</h3>
                                    <p className="opacity-90">
                                        Your payment and personal information is handled with utmost security and confidentiality.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    🎯
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Wide Selection</h3>
                                    <p className="opacity-90">
                                        100+ digital subscriptions including AI tools, entertainment, education, and productivity apps.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <div className="bg-white rounded-xl shadow-card p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-neutral-600 mb-8 text-lg">
                            Join thousands of happy customers enjoying premium subscriptions at affordable prices
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/">
                                <Button variant="primary" className="px-8 py-3">
                                    Browse Products
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" className="px-8 py-3">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
