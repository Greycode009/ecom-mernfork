import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How does manual activation work?",
            answer: "After placing your order and making payment via eSewa or Khalti, send us the payment screenshot on WhatsApp. Our team will verify your payment and activate your product within 1-6 hours during business hours (9 AM - 9 PM NPT). You'll receive your credentials via WhatsApp once activated."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept payments through eSewa and Khalti. After placing your order, you'll receive a QR code on the order success page. Simply scan and pay, then send the screenshot to our WhatsApp number for verification."
        },
        {
            question: "How long does activation take?",
            answer: "Activation typically takes 1-6 hours during our business hours (9 AM - 9 PM NPT). Orders placed outside business hours will be processed the next business day. We'll send you a WhatsApp message as soon as your product is ready."
        },
        {
            question: "What information do I need to provide?",
            answer: "Depending on the product, you may need to provide: email address, phone number, username, UID, or profile link. These details are required for us to set up your product. We'll show you exactly what's needed when you checkout."
        },
        {
            question: "Can I get a refund?",
            answer: "Due to the digital nature of our products, all sales are final once credentials are provided. However, if we're unable to fulfill your order within the promised timeframe, we'll issue a full refund. Contact us on WhatsApp if you have any concerns."
        },
        {
            question: "What if I don't receive my product?",
            answer: "If you haven't received your credentials within 6 hours during business hours, please contact us immediately on WhatsApp at +977 9800000000. We'll investigate and resolve the issue promptly."
        },
        {
            question: "Are the products shared with other users?",
            answer: "It depends on the service provider's terms and the product you purchase. Some products are private accounts, while others may be shared family plans. Product descriptions will clearly indicate the type of access provided."
        },
        {
            question: "Can I change my product details after ordering?",
            answer: "If you need to change activation details (email, username, etc.) before we process your order, contact us immediately on WhatsApp. Once the product is activated, changes may not be possible depending on the service provider."
        },
        {
            question: "Do you offer bulk discounts?",
            answer: "Yes! If you're interested in purchasing multiple products or becoming a reseller, contact us on WhatsApp to discuss custom pricing and volume discounts."
        },
        {
            question: "How do I track my order?",
            answer: "You can view all your orders by logging in and going to 'My Orders' from the profile menu. You'll see the payment status and order status (Pending, Processing, Fulfilled) for each order."
        },
        {
            question: "What happens if my product expires?",
            answer: "When your product is nearing expiration, you can place a new order for renewal. We don't have automatic renewal yet, so you'll need to manually purchase again through our website."
        },
        {
            question: "Is my payment information secure?",
            answer: "Yes! We use secure payment gateways (eSewa and Khalti) which are trusted payment processors in Nepal. We never store your payment card details. Your payment screenshot is only used for verification and is handled confidentially."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-neutral-600 text-lg">
                        Find answers to common questions about our service
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="bg-white rounded-xl shadow-card p-8 mb-8">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between text-left py-3 hover:text-primary-600 transition-colors"
                                >
                                    <span className="font-semibold text-neutral-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 flex-shrink-0 text-primary-600 transition-transform ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {openIndex === index && (
                                    <div className="mt-2 text-neutral-700 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Still have questions? */}
                <div className="bg-gradient-primary text-white rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                    <p className="mb-6 opacity-90">
                        Our support team is here to help you 24/7
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/9779800000000"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button variant="secondary" className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp Support
                            </Button>
                        </a>
                        <Link to="/contact">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
