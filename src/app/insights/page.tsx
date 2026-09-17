import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL, agent } from "@/lib/site";
import { insightPosts } from "@/data/insights";

export const metadata: Metadata = {
  alternates: { canonical: "/insights" },
  title:
    "Insights | Local Market & Buyer/Seller Guidance | Michael Winter",
  description:
    "Local market insight and buyer/seller guidance for Northern Westchester County, NY: town guides, market perspectives, and answers to the questions buyers and sellers actually ask.",
  openGraph: {
    title: "Insights | Michael Winter",
    description:
      "Local market insight and buyer/seller guidance for Northern Westchester County, NY.",
    url: `${SITE_URL}/insights`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Michael Winter",
    description:
      "Local market insight and buyer/seller guidance for Northern Westchester County, NY.",
  },
};

export default function InsightsPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Insights", url: `${SITE_URL}/insights` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Insights by ${agent.fullName}`,
          itemListElement: insightPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: post.title,
            url: `${SITE_URL}/insights/${post.slug}`,
          })),
        }) }}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-32 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <Overline className="mb-4">Insights</Overline>
            <h1 className="font-display text-display text-charcoal mb-6">
              Local Market &amp; Lifestyle Insight
            </h1>
            <p className="text-subheading text-charcoal-light font-light max-w-2xl leading-relaxed">
              Town guides, market perspectives, and practical guidance for
              buyers and sellers across Northern Westchester County, NY.
            </p>
        </Section>

        {/* Posts */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="max-w-3xl mb-14">
              <div className="w-12 h-px bg-[image:var(--gradient-accent)] mb-10" />
              <p className="text-body text-charcoal-light leading-relaxed">
                Written from the towns themselves (the same walks, Main
                Streets, and train platforms you&apos;ll see in my videos),
                these articles cover what makes each town different and what
                buyers and sellers should know before they make a move.
              </p>
            </div>
            <div className="space-y-0">
              {insightPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className={`block group py-10 ${
                    index < insightPosts.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Topic + Date */}
                    <div className="md:col-span-3">
                      <Overline>{post.topic}</Overline>
                      <p className="text-small text-charcoal-muted mt-1">
                        {post.date} &middot; {post.readTime}
                      </p>
                    </div>

                    {/* Title + Description */}
                    <div className="md:col-span-8">
                      <h2 className="font-display text-xl md:text-2xl text-charcoal group-hover:text-accent-dark transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-body text-charcoal-light mt-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-1 hidden md:flex items-start justify-end pt-2">
                      <svg
                        className="w-5 h-5 text-charcoal-muted/40 group-hover:text-accent-dark group-hover:translate-x-0.5 transition-all"
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
