import Link from "next/link";
import { Overline } from "./Overline";
import { agent } from "@/lib/site";
import { Lockup } from "./Lockup";

/**
 * Full-viewport cinematic hero. Recovered 2023 Bedford footage under
 * viewport-scale serif — the 2023 site's dog-above-the-headline gesture,
 * rebuilt at fashion-campaign scale. Meta and CTAs sit on the baseline
 * like a runway caption bar.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy">
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

      {/* Pushed down with mt-auto, not justify-end on the section. They look
          the same while the content fits, but justify-end overflows out of
          the *top* of the flex container, so on a short viewport the lockup
          slid up under the fixed header and the dog disappeared. With
          mt-auto the section grows instead, and the pt keeps the mark
          clear of the header at every height. */}
      <div className="relative z-10 mt-auto w-full px-6 pb-10 pt-36 md:px-10 md:pb-12 md:pt-40">
        {/* The full lockup, the same mark and the same size the horse site
            runs. This was a lone 32px dog, which read as a different brand
            standing next to the other site's stacked mark. */}
        <Lockup
          variant="white"
          width={220}
          className="mb-6 h-auto w-28 animate-fade-in-up md:w-40"
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
