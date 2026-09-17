import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/sop" },
  title: "Standard Operating Procedure Notice",
  description:
    "New York State Department of State Standard Operating Procedure disclosure for William Pitt Sotheby's International Realty and Julia B. Fee Sotheby's International Realty.",
  openGraph: {
    title: "Standard Operating Procedure Notice | Michael Winter",
    description:
      "New York State Department of State Standard Operating Procedure disclosure regarding agency relationships in real estate transactions.",
    url: `${SITE_URL}/sop`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SopPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          {
            name: "Standard Operating Procedure",
            url: `${SITE_URL}/sop`,
          },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <Overline className="mb-4">Legal</Overline>
            <h1 className="font-display text-display text-charcoal">
              Standard Operating Procedure
            </h1>
        </Section>

        {/* Content */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="max-w-3xl prose-custom space-y-10 text-body text-charcoal-light leading-relaxed">
              <div className="space-y-4">
                <p>
                  All agents affiliated with William Pitt Sotheby&apos;s
                  International Realty, and Julia B. Fee Sotheby&apos;s
                  International Realty (collectively referred to as
                  &ldquo;Broker&rdquo;) are required by New York State Law to
                  uniformly apply their Brokerage&apos;s Standard Operating
                  Procedure (SOP) when qualifying Buyers:
                </p>
                <p>
                  Broker abides by all Federal, State and Local Fair Housing
                  Laws to protect individuals from housing discrimination and
                  pursuant to New York Real Property Law &sect;442-H has adopted
                  the following Standard Operating Procedures:
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Prospective Client&apos;s Identification
                </h2>
                <p>
                  Buyer(s) who are unaccompanied and/or accompanied by their
                  agent are not required to provide identification before
                  entering a property or making an offer.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Exclusive Broker Agreement
                </h2>
                <p>
                  Prospective home buyers are required to sign an exclusive
                  buyer representation agreement prior to receiving
                  representation services from Broker and its real estate
                  agents.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Pre-Approval / Proof of Funds
                </h2>
                <p>
                  Broker does not require buyer(s) to provide proof of funds or
                  a mortgage pre-approval as a condition to begin working with
                  one of its agents. Proof of funds, or a mortgage
                  pre-approval when an offer includes financing, may be required
                  before making an offer to purchase.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  Notwithstanding the foregoing procedures, a seller of real
                  property may require buyer to provide identification, and/or
                  proof of funds prior to showing the property and/or as part of
                  any purchase offer. All criteria established by sellers of
                  real property must be in writing in advance of soliciting
                  buyers and must be uniformly applied to all buyers.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Licensing Information
                </h2>
                <p>
                  William Pitt Real Estate LLC operates as William Pitt
                  Sotheby&apos;s International Realty. New York License:
                  10991203997.
                </p>
                <p>
                  JBF Holdings LLC operates as Julia B. Fee Sotheby&apos;s
                  International Realty. New York License: 10991204036.
                </p>
                <p>
                  Each office is Independently owned and operated.
                  Sotheby&apos;s International Realty and the Sotheby&apos;s
                  International Realty logo are service marks licensed to
                  Sotheby&apos;s International Realty Affiliates LLC and used
                  with permission.
                </p>
              </div>
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
