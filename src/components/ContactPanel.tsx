import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { Overline } from "./Overline";
import { agent } from "@/lib/site";

/**
 * The conversion element as brand statement: a full-black panel where the
 * phone number is the headline. One job — make calling feel inevitable.
 */
export function ContactPanel() {
  return (
    <section className="bg-[#0A0A0A] px-6 py-24 md:px-10 md:py-36">
      <FadeIn>
        <Overline className="mb-6 text-white/50">
          Buying, selling, renting, or just curious
        </Overline>
        <p className="font-display text-mega text-white">
          Call the
          <br />
          Westchester Guy<span className="text-white/40">.</span>
        </p>
        <div className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          <a
            href={`tel:${agent.phone}`}
            className="font-display text-3xl text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white md:text-4xl"
          >
            {agent.phoneDisplay}
          </a>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white px-7 py-3 text-small font-medium uppercase tracking-[0.08em] text-charcoal transition-transform hover:-translate-y-0.5"
            >
              Send a message
            </Link>
            <a
              href={agent.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small font-medium uppercase tracking-[0.08em] text-white/80 transition-colors hover:text-white"
            >
              @westchesternyhomes ↗
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
