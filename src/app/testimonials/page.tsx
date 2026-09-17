import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { TestimonialCard } from "@/components/TestimonialCard";
import { testimonials, aggregateRating } from "@/data/testimonials";
import { SITE_URL } from "@/lib/site";

// NOTE: The testimonials rendered here come from src/data/testimonials.ts,
// which holds real, attributable client reviews — verbatim, as syndicated from
// Zillow via Michael's Sotheby's agent page. This also drives Review schema
// below, so the quote text must not be edited: accuracy is a compliance matter.

export const metadata: Metadata = {
  alternates: { canonical: "/testimonials" },
  title: "Client Testimonials | Michael Winter",
  description:
    "What buyers and sellers across Northern Westchester, NY say about working with Michael Winter of Julia B. Fee Sotheby's International Realty.",
  openGraph: {
    title: "Client Testimonials | Michael Winter",
    description:
      "What Michael Winter's clients say about buying and selling across CT and NY.",
    url: `${SITE_URL}/testimonials`,
  },
  twitter: {
    title: "Client Testimonials | Michael Winter",
    description:
      "What Michael Winter's clients say about buying and selling across CT and NY.",
  },
};

export default function TestimonialsPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Testimonials", url: `${SITE_URL}/testimonials` },
  ];

  const reviewSchema = testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: t.quote,
    author: { "@type": "Person", name: t.author },
    itemReviewed: { "@id": `${SITE_URL}/#realestateagent` },
    ...(typeof t.rating === "number"
      ? {
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  }));

  const agg = aggregateRating();
  const agentSchema = agg
    ? {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#realestateagent`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: agg.value,
          reviewCount: agg.count,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : null;

  return (
    <>
      <PageJsonLd breadcrumbs={breadcrumbs} />
      {reviewSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {agentSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agentSchema) }}
        />
      )}
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-32 md:pt-40 pb-16 md:pb-20" className="bg-cream">
          <Overline className="mb-4">Testimonials</Overline>
          <h1 className="font-display text-display text-charcoal max-w-3xl">
            What clients say
          </h1>
          <p className="mt-6 text-subheading text-charcoal-light font-light leading-relaxed max-w-2xl">
            Buyers and sellers across Northern Westchester, NY on what
            it&apos;s like to work with Michael Winter: straight guidance,
            sharp negotiation, and marketing that makes listings stand out.
          </p>
        </Section>

        {/* Testimonials grid */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 60}>
                <TestimonialCard testimonial={t} />
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section padding="py-20 md:py-28" className="bg-navy">
          <div className="max-w-2xl">
            <Overline tone="light" className="mb-3">
              Let&apos;s Talk
            </Overline>
            <h2 className="font-display text-heading text-white mb-5">
              Ready to start your move?
            </h2>
            <p className="text-body text-white/70 leading-relaxed mb-8">
              Whether you&apos;re buying, selling, or simply weighing your
              options, Michael would be glad to help. Reach out for a
              no-pressure conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-navy text-small uppercase tracking-[0.08em] font-medium rounded-sm hover:bg-cream transition-colors"
            >
              Get in touch
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
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
