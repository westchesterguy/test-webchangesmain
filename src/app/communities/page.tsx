import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { CommunityCard } from "@/components/CommunityCard";
import { SITE_URL } from "@/lib/site";
import { communities, nyCommunities } from "@/data/communities";

export const metadata: Metadata = {
  alternates: { canonical: "/communities" },
  title: "Communities | Northern Westchester County, NY",
  description:
    "Local real estate guides to the Northern Westchester towns Michael Winter serves: Bedford, Bedford Hills, Katonah, Chappaqua, Mount Kisco, Pound Ridge, North Salem, South Salem, and Armonk.",
  openGraph: {
    title: "Communities | Northern Westchester County, NY",
    description:
      "Local real estate expertise across Northern Westchester County, NY.",
    url: `${SITE_URL}/communities`,
  },
  twitter: {
    title: "Communities | Northern Westchester County, NY",
    description:
      "Local real estate expertise across Northern Westchester County, NY.",
  },
};

export default function CommunitiesPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Communities", url: `${SITE_URL}/communities` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Communities served by Michael Winter",
            itemListElement: communities.map((c, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${c.name}, ${c.state}`,
              url: `${SITE_URL}/communities/${c.slug}`,
            })),
          }),
        }}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
          <Overline className="mb-4">Communities</Overline>
          <h1 className="font-display text-display text-charcoal mb-8">
            Communities
          </h1>
          <p className="text-subheading text-charcoal-light font-light leading-relaxed max-w-3xl">
            Michael Winter serves buyers and sellers across Northern
            Westchester County, New York: Bedford, Bedford Hills, Katonah,
            Chappaqua, Mount Kisco, Pound Ridge, North Salem, South Salem, and
            Armonk. Explore each town below for what it&apos;s like to live
            there, the local commute, and the kinds of homes you&apos;ll find.
          </p>
        </Section>

        {/* New York */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
          <FadeIn>
            <Overline className="mb-4">New York</Overline>
            <h2 className="font-display text-heading text-charcoal mb-12">
              Northern Westchester County, New York
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nyCommunities.map((c) => (
              <FadeIn key={c.slug}>
                <CommunityCard community={c} />
              </FadeIn>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
