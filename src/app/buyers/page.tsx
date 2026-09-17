import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { ServiceSteps } from "@/components/ServiceSteps";
import { SITE_URL, LISTINGS_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/buyers" },
  title:
    "Buying a Home in Northern Westchester, NY | Michael Winter",
  description:
    "Michael Winter guides buyers across Northern Westchester, NY: from needs analysis and financing to touring, negotiation, and closing.",
  openGraph: {
    title: "Buying a Home in Northern Westchester, NY",
    description:
      "How Michael Winter guides buyers from search to closing across Northern Westchester.",
    url: `${SITE_URL}/buyers`,
  },
  twitter: {
    title: "Buying a Home in Northern Westchester, NY",
    description:
      "How Michael Winter guides buyers from search to closing across Northern Westchester.",
  },
};

const steps = [
  {
    title: "Consultation & needs analysis",
    body: "We start with a conversation about your priorities: budget, timeline, must-haves, school districts, and commute. Michael translates that into a clear, focused search so you spend time only on homes that genuinely fit.",
  },
  {
    title: "Financing & pre-approval guidance",
    body: "Before you tour, Michael connects you with trusted local lenders and helps you secure a pre-approval. In Northern Westchester's competitive markets, a strong, verified offer is what gets your bid taken seriously.",
  },
  {
    title: "Curated home search across CT & NY",
    body: "Licensed in both New York and Connecticut, Michael searches the full market (Bedford, Katonah, and Chappaqua through Pound Ridge, North Salem, and South Salem) including quietly marketed listings you won't find on the portals.",
  },
  {
    title: "Touring & evaluation",
    body: "Michael tours homes with you and gives candid, experienced assessments (layout, condition, renovation potential, and resale considerations) so you understand what you're really buying, not just what the listing says.",
  },
  {
    title: "Offer & negotiation",
    body: "With an executive career's worth of negotiating experience and sharp local pricing knowledge, Michael structures an offer that protects your interests and negotiates terms, contingencies, and price to win the home without overpaying.",
  },
  {
    title: "Inspections to closing",
    body: "From inspection and appraisal through attorney review and final walkthrough, Michael manages the details and keeps every party moving so you reach the closing table calmly and on schedule.",
  },
];

const faqs = [
  {
    q: "Should I get pre-approved before searching?",
    a: "Yes. A mortgage pre-approval tells you exactly what you can afford and signals to sellers that your offer is serious. In Northern Westchester's competitive markets, buyers without a pre-approval are often passed over. Michael can connect you with trusted local lenders before you begin touring.",
  },
  {
    q: "Can Michael help me buy in both Connecticut and New York?",
    a: "Yes. Michael is licensed in both New York and Connecticut. His home market is Northern Westchester (Bedford, Katonah, Chappaqua, Pound Ridge, and the surrounding towns) and the CT licensure helps buyers weighing towns on either side of the border.",
  },
  {
    q: "Do you work with first-time buyers and investors?",
    a: "Yes. Michael works with first-time buyers, move-up buyers, relocating families, and renters. He tailors his approach to your experience level and goals: from starter homes to luxury properties.",
  },
  {
    q: "How much does it cost to work with a buyer's agent?",
    a: "Michael will walk you through how buyer representation and compensation work for your specific situation during your initial consultation, so there are no surprises. The goal is straightforward: experienced advocacy that helps you buy the right home on the best possible terms.",
  },
];

export default function BuyersPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Buyers", url: `${SITE_URL}/buyers` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Buyer's agent / real estate services",
    provider: { "@id": `${SITE_URL}/#realestateagent` },
    areaServed: [
            { "@type": "AdministrativeArea", name: "Westchester County, New York" },
    ],
    url: `${SITE_URL}/buyers`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageJsonLd breadcrumbs={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
          <Overline className="mb-4">For Buyers</Overline>
          <h1 className="font-display text-display text-charcoal max-w-3xl">
            Buy with confidence in Northern Westchester
          </h1>
          <p className="mt-6 text-subheading text-charcoal-light font-light leading-relaxed max-w-2xl">
            Michael Winter helps buyers find and secure the right home across
            Northern Westchester, NY. Licensed in New York and Connecticut, he
            guides you through every step: needs analysis, financing, a
            curated search, touring, negotiation, and closing.
          </p>
        </Section>

        {/* How Michael guides buyers */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <Overline className="mb-3">The Process</Overline>
          <h2 className="font-display text-heading text-charcoal mb-12 max-w-2xl">
            How Michael guides buyers
          </h2>
          <ServiceSteps steps={steps} />
        </Section>

        {/* Why work with Michael */}
        <Section padding="py-20 md:py-28" className="bg-cream">
          <Overline className="mb-3">The Difference</Overline>
          <h2 className="font-display text-heading text-charcoal mb-12 max-w-2xl">
            Why work with Michael
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl">
            <div>
              <h3 className="font-display text-xl text-charcoal mb-2">
                The Westchester Guy knows the towns
              </h3>
              <p className="text-body text-charcoal-light leading-relaxed">
                Michael walks these towns on camera every week (the schools,
                the Main Streets, the micro-markets from Bedford and Katonah to
                Pound Ridge and South Salem) so you can compare neighborhoods
                with confidence.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-charcoal mb-2">
                An executive&apos;s negotiating instinct
              </h3>
              <p className="text-body text-charcoal-light leading-relaxed">
                A senior career at Ralph Lauren, Nautica, and Brand-Aid gives
                Michael the negotiating instinct and discipline to keep complex
                transactions on track.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-charcoal mb-2">
                Luxury, new construction & investment
              </h3>
              <p className="text-body text-charcoal-light leading-relaxed">
                Whether you're buying a first home, a luxury property, new
                construction, or an investment, Michael brings specialized
                experience and the global reach of Sotheby's International Realty.
              </p>
            </div>
          </div>
        </Section>

        {/* Search homes CTA */}
        <Section padding="py-20 md:py-28" className="bg-navy">
          <div className="max-w-2xl">
            <Overline tone="light" className="mb-3">
              Start Your Search
            </Overline>
            <h2 className="font-display text-heading text-white mb-5">
              Find your next home
            </h2>
            <p className="text-body text-white/70 leading-relaxed mb-8">
              Browse current listings, or reach out to Michael to begin a
              curated, personal search built around what matters most to you.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={LISTINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-navy text-small uppercase tracking-[0.08em] font-medium rounded-sm hover:bg-cream transition-colors"
              >
                Browse Listings
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-light hover:text-white font-medium transition-colors group"
              >
                Start your search
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <Overline className="mb-3">Questions</Overline>
          <h2 className="font-display text-heading text-charcoal mb-12 max-w-2xl">
            Buyer FAQs
          </h2>
          <div className="max-w-3xl space-y-8">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border pb-8 last:border-0">
                <h3 className="font-display text-xl text-charcoal mb-3">{f.q}</h3>
                <p className="text-body text-charcoal-light leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
