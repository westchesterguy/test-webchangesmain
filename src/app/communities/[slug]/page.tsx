import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { FadeIn } from "@/components/FadeIn";
import { AccentLine } from "@/components/AccentLine";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL, agent, LISTINGS_URL } from "@/lib/site";
import {
  getCommunityBySlug,
  getAllCommunitySlugs,
} from "@/data/communities";

export function generateStaticParams() {
  return getAllCommunitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return {};

  const { name, state, intro } = community;
  const title = `${name}, ${state} Real Estate & Homes | Michael Winter`;
  const description =
    intro.length > 160 ? `${intro.slice(0, 157).trimEnd()}…` : intro;
  const url = `${SITE_URL}/communities/${slug}`;

  return {
    alternates: { canonical: `/communities/${slug}` },
    title,
    description,
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  const { name, state, county, intro, living, highlights, faqs, neighboring } =
    community;
  const url = `${SITE_URL}/communities/${slug}`;
  const nearby = neighboring
    .map((s) => getCommunityBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Communities", url: `${SITE_URL}/communities` },
          { name, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: `${name}, ${state}`,
            description: intro,
            url,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: county,
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: name,
              addressRegion: state,
              addressCountry: "US",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": `${SITE_URL}/#realestateagent`,
            name: agent.fullName,
            areaServed: {
              "@type": "City",
              name: `${name}, ${state}`,
            },
          }),
        }}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-32 md:pt-40 pb-16 md:pb-20" className="bg-cream">
          <Overline className="mb-4">
            {county} &middot; {state}
          </Overline>
          <h1 className="font-display text-display text-charcoal mb-8">
            {name} Real Estate
          </h1>
          <p className="text-subheading text-charcoal-light font-light leading-relaxed max-w-3xl">
            {intro}
          </p>
        </Section>

        {/* Living in {name} */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <FadeIn>
            <Overline className="mb-4">Lifestyle</Overline>
            <h2 className="font-display text-heading text-charcoal mb-3">
              Living in {name}
            </h2>
            <AccentLine className="mb-10" />
          </FadeIn>
          <ul className="max-w-3xl space-y-4">
            {living.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <li className="flex gap-4 text-body text-charcoal-light leading-relaxed">
                  <span
                    className="mt-2.5 h-px w-5 flex-none bg-accent/60"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </Section>

        {/* Highlights */}
        <Section padding="py-20 md:py-28" className="bg-cream">
          <FadeIn>
            <Overline className="mb-4">Local highlights</Overline>
            <h2 className="font-display text-heading text-charcoal mb-3">
              Highlights
            </h2>
            <AccentLine className="mb-10" />
          </FadeIn>
          <FadeIn>
            <ul className="flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="rounded-full border border-border bg-warm-white px-4 py-2 text-small text-charcoal-light"
                >
                  {h}
                </li>
              ))}
            </ul>
          </FadeIn>
        </Section>

        {/* FAQ */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <FadeIn>
            <Overline className="mb-4">Good to know</Overline>
            <h2 className="font-display text-heading text-charcoal mb-3">
              Frequently Asked Questions
            </h2>
            <AccentLine className="mb-10" />
          </FadeIn>
          <div className="max-w-3xl space-y-10">
            {faqs.map((f, i) => (
              <FadeIn key={i}>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {f.q}
                </h3>
                <p className="text-body text-charcoal-light leading-relaxed">
                  {f.a}
                </p>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* Nearby Communities */}
        {nearby.length > 0 && (
          <Section padding="py-20 md:py-28" className="bg-cream">
            <FadeIn>
              <Overline className="mb-4">Explore the area</Overline>
              <h2 className="font-display text-heading text-charcoal mb-3">
                Nearby Communities
              </h2>
              <AccentLine className="mb-10" />
            </FadeIn>
            <FadeIn>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {nearby.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/communities/${c.slug}`}
                      className="group inline-flex items-center gap-1.5 text-body text-charcoal-light hover:text-accent-dark transition-colors"
                    >
                      <span
                        className="h-px w-3 bg-accent/50 group-hover:w-5 transition-all"
                        aria-hidden="true"
                      />
                      {c.name}, {c.state}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </Section>
        )}

        {/* CTA */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <FadeIn>
            <div className="max-w-3xl">
              <Overline className="mb-4">Work with Michael</Overline>
              <h2 className="font-display text-heading text-charcoal mb-6">
                Thinking about {name}?
              </h2>
              <p className="text-body text-charcoal-light leading-relaxed mb-10">
                Whether you&apos;re buying or selling in {name}, Michael brings
                local knowledge, seasoned judgment, and Sotheby&apos;s
                International Realty&apos;s reach. Browse current listings or
                start a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={LISTINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-7 py-3.5 text-small uppercase tracking-[0.08em] text-white font-medium transition-colors hover:bg-navy/90"
                >
                  Browse Listings with Michael
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-7 py-3.5 text-small uppercase tracking-[0.08em] text-accent-dark font-medium transition-colors hover:border-accent hover:text-charcoal"
                >
                  Ask Michael about {name}
                </Link>
              </div>
            </div>
          </FadeIn>
        </Section>
      </main>
      <Footer />
    </>
  );
}
