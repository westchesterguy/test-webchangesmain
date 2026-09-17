import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { Section } from "./Section";
import { Overline } from "./Overline";
import { agent } from "@/lib/site";

/**
 * "Watch the videos" is the payoff to the About teaser's line about the town
 * walks, spotlights, and Ask Michael answers. Reel-style 9:16 cards from his
 * real @westchesternyhomes posts, each linking to the specific reel.
 *
 * Posters are the reels' own thumbnails (Ask Michael is a hi-res still from a
 * post capture; the rest come from Instagram's og:image). Self-hosted, no
 * third-party script. TODO: drop in a muted autoplay mp4 per card if Michael
 * provides the source files.
 */

const FOLLOWERS = "22.3K";

interface Reel {
  poster: string;
  /** Permalink to the specific reel on Instagram. */
  href: string;
  title: string;
  meta: string;
  /** Alt text describing the reel for screen readers. */
  alt: string;
}

const reels: Reel[] = [
  {
    poster: "/images/reels/reel-ask-michael.jpg",
    href: "https://www.instagram.com/reel/Danl7dZOqrX/",
    title: "Ask Michael",
    meta: "#thewestchesterguy",
    alt: "Ask Michael reel: Michael Winter on a Times Square billboard",
  },
  {
    poster: "/images/reels/reel-now-jbf.jpg",
    href: "https://www.instagram.com/reel/DYmzeokukNP/",
    title: "Now at Julia B. Fee Sotheby's",
    meta: "Bedford, NY",
    alt: "Michael Winter at the Julia B. Fee Sotheby's office in Bedford",
  },
  {
    poster: "/images/reels/reel-spotlight.jpg",
    href: "https://www.instagram.com/reel/DaeXRx0ML89/",
    title: "Local business spotlight",
    meta: "Northern Westchester",
    alt: "Michael Winter spotlighting a local Northern Westchester business",
  },
  {
    poster: "/images/reels/reel-moving.jpg",
    href: "https://www.instagram.com/reel/DYUc9T_OdE_/",
    title: "Making the move",
    meta: "Bedford, NY",
    alt: "Michael Winter beside a moving truck in Bedford",
  },
];

function PlayIcon() {
  return (
    <span
      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-black/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    >
      <svg className="ml-0.5 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

export function InstagramReels() {
  return (
    <Section className="border-t border-border bg-warm-white">
      <FadeIn>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Overline className="mb-4">On Instagram</Overline>
            <h2 className="font-display text-heading text-charcoal">
              You&apos;ve probably seen the videos.
            </h2>
          </div>
          <a
            href={agent.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 text-small font-medium uppercase tracking-[0.08em] text-accent-dark transition-colors hover:text-charcoal"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>
              @westchesternyhomes
              <span className="ml-2 text-charcoal-muted">{FOLLOWERS} followers</span>
            </span>
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>
          </a>
        </div>
      </FadeIn>

      <FadeIn>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {reels.map((reel) => (
            <li key={reel.poster}>
              <a
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${reel.title}: watch on Instagram (opens in a new tab)`}
                className="group relative block aspect-[9/16] overflow-hidden rounded-sm bg-charcoal shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <Image
                  src={reel.poster}
                  alt={reel.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Legibility scrim + centered play affordance */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" aria-hidden="true" />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <PlayIcon />
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-base leading-tight text-white">
                    {reel.title}
                  </p>
                  <p className="mt-1 text-caption uppercase tracking-[0.08em] text-white/70">
                    {reel.meta}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* Mobile follow CTA — the header link sits inline with the heading on
          desktop but reads better as a full-width action on small screens. */}
      <FadeIn>
        <a
          href={agent.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-small font-medium uppercase tracking-[0.08em] text-accent-dark transition-colors hover:text-charcoal md:hidden"
        >
          Follow @westchesternyhomes
          <span aria-hidden="true">↗</span>
        </a>
      </FadeIn>
    </Section>
  );
}
