import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { ServiceSteps } from "@/components/ServiceSteps";
import { SITE_URL, HOME_VALUATION_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/sellers" },
  title:
    "Selling Your Home in CT & NY | Free Home Valuation | Michael Winter",
  description:
    "Sell your home with Michael Winter: strategic pricing, Sotheby's International Realty global marketing, and expert negotiation across CT and NY. Request a free home valuation.",
  openGraph: {
    title: "Selling Your Home in CT & NY | Free Home Valuation",
    description:
      "Strategic pricing, global marketing, and expert negotiation from Michael Winter. Request your complimentary home valuation.",
    url: `${SITE_URL}/sellers`,
  },
  twitter: {
    title: "Selling Your Home in CT & NY | Free Home Valuation",
    description:
      "Strategic pricing, global marketing, and expert negotiation from Michael Winter. Request your complimentary home valuation.",
  },
};

const steps = [
  {
    title: "Strategic pricing & market analysis",
    body: "Michael prepares a detailed comparative market analysis of your home and your local sub-market, then sets a pricing strategy designed to attract serious buyers and maximize your net proceeds, not just to win the listing.",
  },
  {
    title: "Preparation & staging guidance",
    body: "Small, well-chosen improvements drive outsized returns. Michael advises on repairs, decluttering, and staging, and coordinates trusted local vendors so your home shows at its best from day one.",
  },
  {
    title: "Sotheby's global marketing & professional media",
    body: "Your home is presented with professional photography, video, and copy, then distributed through the Sotheby's International Realty global network and its marketing partners, reaching qualified buyers locally, nationally, and abroad.",
  },
  {
    title: "Buyer targeting & showings",
    body: "Michael markets directly to active buyers and agents across Northern Westchester, manages showings and open houses, and gathers feedback to keep your strategy sharp.",
  },
  {
    title: "Negotiation",
    body: "When offers arrive, Michael's negotiating experience and sharp local pricing knowledge protect your position, negotiating price, terms, and contingencies to secure the strongest possible outcome.",
  },
  {
    title: "Closing management",
    body: "From accepted offer through inspection, appraisal, attorney review, and the final walkthrough, Michael manages every detail and every party so your sale closes smoothly and on time.",
  },
];

const faqs = [
  {
    q: "How do you price my home?",
    a: "Michael prepares a comparative market analysis using recent comparable sales, current competing listings, and the specific characteristics of your home and neighborhood. The goal is a data-driven price that attracts serious buyers quickly while protecting your net proceeds, not an inflated number that leads to price cuts later.",
  },
  {
    q: "What does it cost to sell my home?",
    a: "Selling costs typically include the real estate commission and standard closing costs such as attorney fees and conveyance taxes, which vary between Connecticut and New York. Michael will walk you through a clear, personalized net-sheet estimate up front so you know exactly what to expect before you list.",
  },
  {
    q: "How long will it take to sell?",
    a: "Time on market depends on price, condition, location, and current demand in your specific town. A well-priced, well-presented home in Northern Westchester often moves quickly. Michael will give you a realistic timeline based on live data for your sub-market during your consultation.",
  },
  {
    q: "Why list with a Sotheby's International Realty agent?",
    a: "Sotheby's International Realty pairs trusted local expertise with a global marketing platform, exposing your home to qualified, high-intent buyers well beyond the local MLS. Combined with Michael's pricing discipline and brand-level presentation, that reach helps your home sell for the best price the market will support.",
  },
];

export default function SellersPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Sellers", url: `${SITE_URL}/sellers` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Listing agent / seller representation",
    provider: { "@id": `${SITE_URL}/#realestateagent` },
    areaServed: [
            { "@type": "AdministrativeArea", name: "Westchester County, New York" },
    ],
    url: `${SITE_URL}/sellers`,
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
          <Overline className="mb-4">For Sellers</Overline>
          <h1 className="font-display text-display text-charcoal max-w-3xl">
            Sell for what your home is truly worth
          </h1>
          <p className="mt-6 text-subheading text-charcoal-light font-light leading-relaxed max-w-2xl">
            Michael Winter combines disciplined pricing, the global
            marketing reach of Sotheby&apos;s International Realty, and a
            fashion executive&apos;s eye for presentation to sell homes across
            Northern Westchester, NY. Start with a complimentary, no-pressure
            valuation of your home.
          </p>
        </Section>

        {/* How Michael sells homes */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <Overline className="mb-3">The Process</Overline>
          <h2 className="font-display text-heading text-charcoal mb-12 max-w-2xl">
            How Michael sells homes
          </h2>
          <ServiceSteps steps={steps} />
        </Section>

        {/* What's My Home Worth? — lead magnet */}
        <Section padding="py-20 md:py-28" className="bg-cream">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Overline className="mb-3">Complimentary Valuation</Overline>
              <h2 className="font-display text-heading text-charcoal mb-5">
                What&apos;s my home worth?
              </h2>
              <p className="text-body text-charcoal-light leading-relaxed mb-4">
                Start with a data-driven estimate of your home&apos;s current
                market value through Sotheby&apos;s International Realty. From
                there, Michael follows up personally, weighing comparable sales,
                live competing listings, and the details that make your home
                unique.
              </p>
              <p className="text-body text-charcoal-light leading-relaxed">
                There&apos;s no obligation and no pressure. Whether you&apos;re
                ready to list or simply curious, you&apos;ll get a clear, honest
                read on where your home stands today.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-sm border border-border bg-warm-white p-8 md:p-10 shadow-[var(--shadow-lg)]">
                <h3 className="font-display text-xl text-charcoal mb-3">
                  Get your home&apos;s value
                </h3>
                <p className="text-body text-charcoal-light leading-relaxed mb-8">
                  Enter your address for an estimate through Michael&apos;s
                  Sotheby&apos;s International Realty tools, and he&apos;ll
                  reach out with a considered read on your home and your local
                  market.
                </p>
                <a
                  href={HOME_VALUATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3 text-small font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-navy-light"
                >
                  Get my home value
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Why list with Michael */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <Overline className="mb-3">The Difference</Overline>
          <h2 className="font-display text-heading text-charcoal mb-12 max-w-2xl">
            Why list with Michael
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-5xl">
            <div>
              <h3 className="font-display text-xl text-charcoal mb-2">
                Sotheby&apos;s International Realty reach
              </h3>
              <p className="text-body text-charcoal-light leading-relaxed">
                Your home is marketed through one of the most recognized luxury
                brands in real estate, putting it in front of qualified buyers
                locally, nationally, and around the world.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-charcoal mb-2">
                Local pricing expertise
              </h3>
              <p className="text-body text-charcoal-light leading-relaxed">
                Licensed in NY and CT, Michael reads each town&apos;s
                micro-market precisely, pricing your home to attract serious
                buyers and capture full value.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-charcoal mb-2">
                Marketing that stands out
              </h3>
              <p className="text-body text-charcoal-light leading-relaxed">
                A senior career at Ralph Lauren and Nautica taught Michael how
                brands sell: photography, film, and presentation that make
                your listing impossible to scroll past.
              </p>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section padding="py-20 md:py-28" className="bg-cream">
          <Overline className="mb-3">Questions</Overline>
          <h2 className="font-display text-heading text-charcoal mb-12 max-w-2xl">
            Seller FAQs
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
