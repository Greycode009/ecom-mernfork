import { Link } from "react-router-dom";
import Button from "../components/Button";

const Terms = () => {
    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-neutral-600">
                        Last updated: January 9, 2026
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-card p-8 md:p-12 space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            1. Agreement to Terms
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            By accessing and using CheapGPT ("the Service"), you agree to be bound by these Terms and Conditions.
                            If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            2. Service Description
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            CheapGPT provides access to digital products for various services including but not limited to
                            entertainment platforms, AI tools, and educational resources. Our services include:
                        </p>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                            <li>Resale of digital product access</li>
                            <li>Manual account activation within 1-6 hours after payment verification</li>
                            <li>Customer support via WhatsApp</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            3. Manual Activation Process
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            All orders require manual activation by our team:
                        </p>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                            <li><strong>Payment Verification:</strong> You must complete payment via eSewa or Khalti and send proof via WhatsApp</li>
                            <li><strong>Activation Time:</strong> 1-6 hours during business hours (9 AM - 9 PM NPT)</li>
                            <li><strong>Required Information:</strong> You must provide accurate activation details as requested</li>
                            <li><strong>No Refunds:</strong> Once credentials are shared, no refunds will be issued</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            4. Payment Terms
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            All prices are listed in Nepalese Rupees (NPR). Payment must be made through our designated eSewa or Khalti
                            accounts. Orders are confirmed only after payment verification. We reserve the right to cancel orders
                            if payment verification fails.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            5. User Responsibilities
                        </h2>
                        <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                            <li>Provide accurate and complete activation information</li>
                            <li>Do not share credentials received with third parties</li>
                            <li>Use products in accordance with the original service provider's terms</li>
                            <li>Contact support immediately if you experience issues</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            6. Limitation of Liability
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            CheapGPT acts as a reseller and is not responsible for service interruptions or changes made by
                            the original service providers. We are not liable for any indirect, incidental, or consequential
                            damages arising from the use of our services.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            7. Cancellation & Refunds
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            Due to the digital nature of our products, all sales are final once credentials are provided.
                            Refunds may be considered only if we are unable to fulfill the order within the promised timeframe.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            8. Account Security
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account credentials. Any activity
                            under your account is your responsibility. Notify us immediately of any unauthorized use.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            9. Changes to Terms
                        </h2>
                        <p className="text-neutral-700 leading-relaxed">
                            We reserve the right to modify these terms at any time. Continued use of the service after
                            changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            10. Contact Information
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-3">
                            For questions about these terms, please contact us:
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

export default Terms;
