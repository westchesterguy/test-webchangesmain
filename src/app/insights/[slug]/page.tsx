import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL, agent } from "@/lib/site";
import { getPostBySlug, getAllSlugs, insightPosts } from "@/data/insights";

// Import post content components
import { IntroducingTheWestchesterGuy } from "./posts/introducing-the-westchester-guy";
import { MovingFromNycToNorthernWestchester } from "./posts/moving-from-nyc-to-northern-westchester";
import { BedfordBedfordHillsKatonahExplained } from "./posts/bedford-bedford-hills-katonah-explained";
import { WhyVideoSellsHomes } from "./posts/why-video-sells-homes";

const postComponents: Record<string, React.ComponentType> = {
  "introducing-the-westchester-guy": IntroducingTheWestchesterGuy,
  "moving-from-nyc-to-northern-westchester": MovingFromNycToNorthernWestchester,
  "bedford-bedford-hills-katonah-explained": BedfordBedfordHillsKatonahExplained,
  "why-video-sells-homes": WhyVideoSellsHomes,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/insights/${post.slug}`;

  return {
    alternates: { canonical: `/insights/${post.slug}` },
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.dateISO,
      authors: [agent.fullName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const PostContent = postComponents[slug];
  if (!PostContent) notFound();

  // Find adjacent posts for navigation
  const currentIndex = insightPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? insightPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < insightPosts.length - 1
      ? insightPosts[currentIndex + 1]
      : null;

  const url = `${SITE_URL}/insights/${post.slug}`;

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateModifiedISO,
    image: `${SITE_URL}/insights/${post.slug}/opengraph-image`,
    author: {
      "@type": ["Person", "RealEstateAgent"],
      "@id": `${SITE_URL}/#realestateagent`,
      name: agent.fullName,
      url: SITE_URL,
    },
    publisher: {
      "@type": ["Person", "RealEstateAgent"],
      "@id": `${SITE_URL}/#realestateagent`,
      name: agent.fullName,
    },
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };

  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Insights", url: `${SITE_URL}/insights` },
          {
            name: post.title,
            url,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Overline>{post.topic}</Overline>
                <span className="text-charcoal-muted/30">&middot;</span>
                <span className="text-small text-charcoal-muted">
                  {post.date}
                </span>
                <span className="text-charcoal-muted/30">&middot;</span>
                <span className="text-small text-charcoal-muted">
                  {post.readTime}
                </span>
              </div>
              <h1 className="font-display text-display text-charcoal leading-tight">
                {post.title}
              </h1>
            </div>
        </Section>

        {/* Author Byline */}
        <Section padding="pt-12 md:pt-16" className="bg-warm-white">
            <div className="max-w-3xl">
              <Link href="/about" className="inline-flex items-center gap-4 group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={agent.headshot}
                    alt={agent.fullName}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-body text-charcoal font-medium group-hover:text-accent-dark transition-colors">
                    {agent.name}
                  </p>
                  <p className="text-small text-charcoal-muted">
                    {agent.title}, Julia B. Fee Sotheby&apos;s International Realty
                  </p>
                </div>
              </Link>
            </div>
        </Section>

        {/* Content */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="max-w-3xl">
              <div className="prose-custom space-y-7 text-body text-charcoal-light leading-relaxed">
                <PostContent />
              </div>
            </div>
        </Section>

        {/* Post Navigation */}
        <Section padding="py-14" className="bg-cream border-t border-border-light">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {prevPost ? (
                <Link
                  href={`/insights/${prevPost.slug}`}
                  className="group flex items-center gap-3 text-charcoal hover:text-accent-dark transition-colors"
                >
                  <svg
                    className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <div>
                    <Overline tone="muted">Previous</Overline>
                    <p className="text-small font-medium">{prevPost.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href="/insights"
                className="text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors"
              >
                All Insights
              </Link>

              {nextPost ? (
                <Link
                  href={`/insights/${nextPost.slug}`}
                  className="group flex items-center gap-3 text-charcoal hover:text-accent-dark transition-colors text-right"
                >
                  <div>
                    <Overline tone="muted">Next</Overline>
                    <p className="text-small font-medium">{nextPost.title}</p>
                  </div>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
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
              ) : (
                <div />
              )}
            </div>
        </Section>

        {/* CTA */}
        <Section padding="py-16 md:py-20" className="bg-warm-white border-t border-border-light" containerClassName="text-center">
            <Overline className="mb-3">Let&apos;s Talk</Overline>
            <p className="text-body text-charcoal-light mb-6 max-w-xl mx-auto">
              Thinking about buying or selling in Northern Westchester?
              Call the Westchester Guy. He&apos;d be glad to help you think it
              through.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white text-small uppercase tracking-[0.08em] font-medium rounded-sm hover:bg-navy-light transition-colors group"
            >
              Get in touch
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
        </Section>
      </main>
      <Footer />
    </>
  );
}
