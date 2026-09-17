import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/tos" },
  title: "Terms of Service",
  description:
    "Terms of service for Michael Winter's website, including the site's SMS / text message notification program and opt-out information.",
  openGraph: {
    title: "Terms of Service | Michael Winter",
    description:
      "Terms of service for Michael Winter's website, including the site's SMS / text message notification program and opt-out information.",
    url: `${SITE_URL}/tos`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Michael Winter",
    description:
      "Terms of service for Michael Winter's website, including the site's SMS / text message notification program and opt-out information.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Terms of Service", url: `${SITE_URL}/tos` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <Overline className="mb-4">Legal</Overline>
            <h1 className="font-display text-display text-charcoal">
              Terms of Service
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
                  This site is the professional website of Michael Winter, a
                  Licensed Real Estate Salesperson affiliated with William Pitt
                  Julia B.
                  Fee Sotheby&apos;s International Realty (Bedford, NY). By using
                  this site you agree to these terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Contact and Communications
                </h2>
                <p>
                  You may contact the site owner through the form at{" "}
                  <a
                    href="/contact"
                    className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                  >
                    the contact form
                  </a>
                  . By submitting the form you consent to be contacted in
                  response to your inquiry. If you provide a phone number and
                  check the consent box, you also consent to receive text
                  messages about your inquiry as described in the{" "}
                  <a
                    href="/privacy"
                    className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  SMS / Text Message Program
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Who:</strong> individuals who submit the contact
                    form, provide a mobile number, and check the consent box.
                  </li>
                  <li>
                    <strong>Message types:</strong> replies to your inquiry,
                    scheduling, and follow-up. No marketing.
                  </li>
                  <li>
                    <strong>Frequency:</strong> varies based on your
                    conversation.
                  </li>
                  <li>
                    <strong>Cost:</strong> message and data rates may apply.
                  </li>
                  <li>
                    <strong>Opt-out:</strong> reply STOP to unsubscribe at any
                    time. Reply HELP for help.
                  </li>
                  <li>
                    <strong>Consent:</strong> opting in to texts is not a
                    condition of any service.
                  </li>
                  <li>
                    <strong>Data:</strong> mobile numbers and SMS opt-in data are
                    never shared or sold to third parties. See the{" "}
                    <a
                      href="/privacy"
                      className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Disclaimer
                </h2>
                <p>
                  Content on this site is provided for informational purposes
                  and is subject to change without notice.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Changes
                </h2>
                <p>
                  These terms may be updated from time to time, with changes
                  reflected on this page and a revised effective date.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Contact
                </h2>
                <p>
                  Questions about these terms may be sent via the{" "}
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
