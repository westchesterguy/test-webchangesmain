import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "Privacy policy for Michael Winter's website. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Michael Winter",
    description:
      "Privacy policy for Michael Winter's website. Learn how we collect, use, and protect your personal information.",
    url: `${SITE_URL}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-32 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <Overline className="mb-4">Legal</Overline>
            <h1 className="font-display text-display text-charcoal">
              Privacy Policy
            </h1>
        </Section>

        {/* Content */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="max-w-3xl prose-custom space-y-10 text-body text-charcoal-light leading-relaxed">
              <p className="text-small text-charcoal-muted">
                Effective date: May 29, 2026
              </p>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Overview
                </h2>
                <p>
                  This privacy policy describes how this website
                  (&ldquo;Site&rdquo;) collects, uses, and protects information
                  when you visit the Site or submit information through it. This
                  Site is the professional website of Michael Winter, a
                  Licensed Real Estate Salesperson, and is not a commercial
                  e-commerce platform. For the purposes of this policy, Michael
                  Winter is the data controller responsible for information
                  you submit.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Information We Collect
                </h2>
                <h3 className="text-subheading font-medium text-charcoal">
                  Information you provide
                </h3>
                <p>
                  When you use the contact form on this Site, you voluntarily
                  provide your name, email address, and message content. This
                  information is used solely to respond to your inquiry.
                </p>
                <h3 className="text-subheading font-medium text-charcoal">
                  Automatically collected information
                </h3>
                <p>
                  This Site uses{" "}
                  <a
                    href="https://vercel.com/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                  >
                    Vercel Analytics
                  </a>
                  , a privacy-focused analytics service that collects aggregated,
                  anonymous usage data. Vercel Analytics does not use cookies,
                  does not track users across sites, and does not collect
                  personally identifiable information. Data collected includes
                  page views, referral sources, browser type, and geographic
                  region at an aggregate level.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  How We Use Your Information
                </h2>
                <p>Information submitted through the contact form is used to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Respond to your inquiry or message</li>
                  <li>Follow up on professional or media requests</li>
                </ul>
                <p>
                  Your contact information is not sold, rented, or shared with
                  third parties for marketing purposes.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Contact Form and Communications
                </h2>
                <p>
                  When you submit the contact form, we collect the information
                  you provide: your name, email address, subject, message, and,
                  if you choose to provide it, a phone number. We use this
                  information to respond to your inquiry and, where appropriate,
                  to follow up about it. We use a hosting provider (Vercel) and
                  Resend to receive and route these messages. We do not sell or
                  rent your information.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  SMS / Text Messaging
                </h2>
                <p>
                  If you provide a mobile number and check the consent box on the
                  contact form, you agree to receive text messages from Michael
                  Winter related to your inquiry, such as replies, scheduling,
                  and follow-up. Message frequency varies. Message and data rates may
                  apply. Reply STOP to opt out at any time, or HELP for help.
                  Consent to receive texts is not a condition of any service or
                  transaction.
                </p>
                <p>
                  We do not sell, rent, or share mobile numbers or SMS consent
                  and opt-in data with any third parties or affiliates for any
                  purpose, including marketing.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Third-Party Services
                </h2>
                <p>This Site uses the following third-party services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Vercel</strong> for hosting and analytics
                  </li>
                  <li>
                    <strong>Resend</strong> for delivering contact form
                    submissions via email
                  </li>
                  <li>
                    <strong>Adobe Fonts (Typekit)</strong> for web typography
                  </li>
                </ul>
                <p>
                  Each of these services has its own privacy policy governing
                  data they may collect through their platforms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Data Retention
                </h2>
                <p>
                  Contact form submissions are delivered via email and retained
                  only as long as necessary to respond to your inquiry. No
                  contact form data is stored in a database on this Site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Your Rights
                </h2>
                <p>
                  If you are a resident of California, the European Economic
                  Area, or another jurisdiction with applicable data protection
                  laws, you may have the right to request access to, correction
                  of, or deletion of personal information you have provided. To
                  make such a request, please use the{" "}
                  <a
                    href="/contact"
                    className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                  >
                    contact form
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Security
                </h2>
                <p>
                  This Site is served over HTTPS with TLS encryption. Security
                  headers including Strict-Transport-Security (HSTS) are
                  enforced. While no method of transmission over the internet is
                  100% secure, we take reasonable measures to protect information
                  submitted through this Site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Changes to This Policy
                </h2>
                <p>
                  This privacy policy may be updated from time to time. Changes
                  will be reflected on this page with an updated effective date.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Contact
                </h2>
                <p>
                  If you have questions about this privacy policy, please reach
                  out via the{" "}
                  <a
                    href="/contact"
                    className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                  >
                    contact page
                  </a>
                  .
                </p>
              </div>
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
