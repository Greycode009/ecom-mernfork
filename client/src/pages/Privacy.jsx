import { Link } from "react-router-dom";
import Button from "../components/Button";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-neutral-600">
                        Last updated: January 9, 2026
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-card p-8 md:p-12 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            Introduction
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            CheapGPT ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                            explains how we collect, use, disclose, and safeguard your information when you use our digital
                            subscription marketplace service.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            1. Information We Collect
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                    Personal Information
                                </h3>
                                <p className="text-neutral-700 leading-relaxed mb-2">
                                    We collect information that you provide directly to us:
                                </p>
                                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                                    <li>Name and email address (for account creation)</li>
                                    <li>Phone number (for WhatsApp support and order fulfillment)</li>
                                    <li>Activation details (email, username, UID as required by products)</li>
                                    <li>Payment confirmation screenshots</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                    Order Information
                                </h3>
                                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                                    <li>Products purchased and order history</li>
                                    <li>Payment method and transaction details</li>
                                    <li>Order status and fulfillment information</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                    Technical Information
                                </h3>
                                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                                    <li>IP address and browser type</li>
                                    <li>Device information and operating system</li>
                                    <li>Usage data and browsing patterns</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                            <li>Process and fulfill your orders</li>
                            <li>Provide customer support via email and WhatsApp</li>
                            <li>Send order confirmations and updates</li>
                            <li>Improve our services and user experience</li>
                            <li>Prevent fraud and maintain security</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            3. Information Sharing and Disclosure
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            We do not sell your personal information. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                            <li><strong>Service Providers:</strong> With third-party service providers who assist in operating our business (e.g., payment processors)</li>
                            <li><strong>Subscription Providers:</strong> Necessary activation details are shared with the original service providers to fulfill your order</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            4. Data Security
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal
                            information from unauthorized access, alteration, disclosure, or destruction. However, no method
                            of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            5. Data Retention
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in
                            this Privacy Policy, unless a longer retention period is required by law. Order history and
                            transaction records are maintained for accounting and legal compliance purposes.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            6. Your Rights
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            You have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                            <li><strong>Objection:</strong> Object to the processing of your personal information</li>
                        </ul>
                        <p className="text-neutral-700 leading-relaxed mt-3">
                            To exercise these rights, please contact us via WhatsApp or email.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            7. Cookies
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            Our website uses cookies to enhance your browsing experience. Cookies are small text files stored
                            on your device that help us recognize you and remember your preferences. You can control cookies
                            through your browser settings.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            8. Third-Party Links
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            Our website may contain links to third-party websites. We are not responsible for the privacy
                            practices of these external sites. We encourage you to review their privacy policies.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            9. Children's Privacy
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect
                            personal information from children. If you believe we have collected information from a child,
                            please contact us immediately.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            10. Changes to This Policy
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. The updated version will be indicated by the
                            "Last updated" date at the top of this page. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            11. Contact Us
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            If you have questions or concerns about this Privacy Policy, please contact us:
                        </p>
                        <div className="bg-neutral-50 p-4 rounded-lg">
                            <p className="text-neutral-700">
                                <strong>WhatsApp:</strong> +977 9800000000
                            </p>
                            <p className="text-neutral-700">
                                <strong>Email:</strong> support@cheapgpt.com
                            </p>
                        </div>
                    </section>
                </div>

                {/* Back to home button */}
                <div className="text-center mt-8">
                    <Link to="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
