import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { Overline } from "./Overline";
import { agent } from "@/lib/site";

/**
 * About teaser — portrait as a full editorial column, story beside it.
 * The B&W treatment keeps the monochrome frame; his words carry it.
 */
export function AboutTeaser() {
  return (
    <section className="border-t border-border bg-cream">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[70svh] lg:min-h-0">
          <Image
            src={agent.headshot}
            alt={`${agent.fullName}, ${agent.title}`}
            fill
            className="object-cover object-top grayscale"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:px-14 md:py-28">
          <FadeIn>
            <Overline className="mb-6">About Michael</Overline>
            <h2 className="font-display text-heading text-charcoal">
              Ralph Lauren taught him brands.
              <br />
              Westchester taught him home.
            </h2>
            <p className="mt-8 max-w-xl text-body leading-relaxed text-charcoal-light">
              A former CEO and senior executive at Brand-Aid, Nautica, and
              Ralph Lauren, Michael brings fashion-house marketing to Northern
              Westchester real estate. Around here you may know him from the
              videos: the town walks, the local spotlights, the Ask Michael
              answers.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-[0.08em] text-accent-dark transition-colors hover:text-charcoal group"
              >
                His story
                <svg className="h-4 w-4 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={agent.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small font-medium uppercase tracking-[0.08em] text-charcoal-muted transition-colors hover:text-charcoal"
              >
                22.3k follow along ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
