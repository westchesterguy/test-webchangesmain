import Link from "next/link";
import { Overline } from "./Overline";
import { agent } from "@/lib/site";

/**
 * Full-viewport cinematic hero. Recovered 2023 Bedford footage under
 * viewport-scale serif — the 2023 site's dog-above-the-headline gesture,
 * rebuilt at fashion-campaign scale. Meta and CTAs sit on the baseline
 * like a runway caption bar.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/bed-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/videos/bed.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/videos/bed-poster.jpg"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
      </div>

      <div className="relative z-10 w-full px-6 pb-10 md:px-10 md:pb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mw-dog-light.png"
          alt=""
          className="mb-4 h-8 w-auto animate-fade-in-up"
          aria-hidden="true"
        />
        <h1 className="font-display text-mega text-white animate-fade-in-up">
          The Westchester
          <br />
          Guy.
        </h1>

        {/* Baseline caption bar */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/25 pt-6 md:flex-row md:items-center md:justify-between animate-fade-in-up animate-delay-200">
          <div>
            <Overline className="text-white/60">
              Michael Winter · Julia B. Fee Sotheby&apos;s International Realty · Bedford, NY
            </Overline>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href="/communities"
              className="inline-flex items-center gap-2 bg-white px-7 py-3 text-small font-medium uppercase tracking-[0.08em] text-charcoal transition-transform hover:-translate-y-0.5"
            >
              Explore the towns
            </Link>
            <a
              href={`tel:${agent.phone}`}
              className="text-small font-medium uppercase tracking-[0.08em] text-white/90 underline decoration-white/40 underline-offset-8 transition-colors hover:text-white hover:decoration-white"
            >
              Call the Westchester Guy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
