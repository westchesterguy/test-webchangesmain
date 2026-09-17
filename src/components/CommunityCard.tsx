import Link from "next/link";
import type { Community } from "@/data/communities";

export function CommunityCard({ community }: { community: Community }) {
  return (
    <Link
      href={`/communities/${community.slug}`}
      className="group block rounded-sm border border-border bg-warm-white p-6 transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-xl text-charcoal group-hover:text-accent-dark transition-colors">
          {community.name}
        </h3>
        <span className="text-caption uppercase tracking-[0.08em] text-charcoal-muted border border-border rounded-full px-2 py-0.5">
          {community.state}
        </span>
      </div>
      <p className="text-small text-charcoal-muted mb-4">{community.county}</p>
      <p className="text-body text-charcoal-light leading-relaxed line-clamp-3">
        {community.intro}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-small uppercase tracking-[0.08em] text-accent-dark font-medium">
        Explore {community.name}
        <svg
          className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  );
}
