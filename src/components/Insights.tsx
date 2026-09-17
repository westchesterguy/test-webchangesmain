import Link from "next/link";
import { insightPosts } from "@/data/insights";
import { FadeIn } from "./FadeIn";
import { Section } from "./Section";
import { Overline } from "./Overline";

export function Insights() {
  const previewPosts = insightPosts.slice(0, 3);

  return (
    <Section className="bg-warm-white">
        <FadeIn>
        {/* Section Label */}
        <Overline className="mb-4">Insights</Overline>

        <h2 className="font-display text-heading text-charcoal mb-14">
          Recent perspectives.
        </h2>
        </FadeIn>

        <div className="space-y-0">
          {previewPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className={`block group py-8 transition-all duration-300 hover:pl-4 ${
                index < previewPosts.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start">
                <div className="md:col-span-3">
                  <Overline>{post.topic}</Overline>
                  <p className="text-small text-charcoal-muted mt-1">
                    {post.date}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <h3 className="font-display text-xl text-charcoal group-hover:text-accent-dark transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>
                <div className="md:col-span-1 hidden md:flex items-start justify-end pt-1">
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

        <div className="mt-10">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors group"
          >
            View all insights
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
    </Section>
  );
}
