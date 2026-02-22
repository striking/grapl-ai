import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Grapl",
  description: "Privacy policy for Grapl and associated applications.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-400 mb-6">Last updated: February 17, 2026</p>

      <section className="space-y-6 text-gray-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
          <p>
            This Privacy Policy describes how Grapl (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated by
            Leva Solutions Pty Ltd (ABN pending), collects, uses, and protects information when you
            use our websites, applications, and services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Contact information (name, email address) when you sign up for waitlists or services</li>
            <li>Usage data and analytics (page views, interactions) via privacy-respecting analytics</li>
            <li>Technical data (browser type, device info, IP address) for service operation</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about products, updates, and support</li>
            <li>Analyse usage patterns to improve user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">4. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with trusted third-party
            service providers (e.g., hosting, analytics, email delivery) who assist in operating our
            services, subject to confidentiality obligations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">5. Data Security</h2>
          <p>
            We implement reasonable technical and organisational measures to protect your information
            against unauthorised access, alteration, disclosure, or destruction.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">6. Your Rights</h2>
          <p>
            Under applicable privacy laws (including the Australian Privacy Act 1988), you have the
            right to access, correct, or delete your personal information. Contact us at{" "}
            <a href="mailto:chris@levasolutions.com.au" className="text-blue-400 underline">
              chris@levasolutions.com.au
            </a>{" "}
            to exercise these rights.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">7. Third-Party Services</h2>
          <p>
            Our applications may integrate with third-party platforms including Meta (Facebook/Instagram),
            Google, and other services. Use of these integrations is subject to their respective privacy
            policies. We access third-party APIs solely to provide our services and do not store
            unnecessary third-party user data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">9. Contact</h2>
          <p>
            For questions about this Privacy Policy, contact us at:{" "}
            <a href="mailto:chris@levasolutions.com.au" className="text-blue-400 underline">
              chris@levasolutions.com.au
            </a>
          </p>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
        <p>© 2026 Leva Solutions Pty Ltd. All rights reserved.</p>
      </footer>
    </main>
  );
}
