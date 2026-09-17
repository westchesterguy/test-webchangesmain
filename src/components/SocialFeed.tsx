"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MarkBadge } from "./Lockup";
import { ChevronIcon, InstagramIcon, platformIcons } from "./SocialIcons";
import { socialAccount, socialFeed, socialProfiles } from "@/data/social";

/**
 * The social feed that closes every page, shared with the other site.
 *
 * A carousel of post cards on a light ground: account row, square frame,
 * then a footer strip. Cards sit a card-width apart and the row is longer
 * than the frame, so the next one peeks in at the right edge and the arrows
 * have somewhere to go. Keep this file in step with the other site's copy;
 * only data/social.ts differs.
 *
 * The footer carries the platform and a link out, NOT a like count, a
 * comment count or a post age. Those are facts about live posts, they change
 * hourly, and they are not in this repo — a number typed in by hand would be
 * wrong within the day and would be wrong in public. Wire the Instagram Graph
 * API and the footer can carry real ones; until then it says what is true.
 */

const CARD = 300; // px, matched by the card width class below.
const GAP = 20;

export function SocialFeed() {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    // Move whole cards, and at least one, however narrow the frame is.
    const step = Math.max(1, Math.floor(el.clientWidth / (CARD + GAP))) * (CARD + GAP);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="border-t border-border bg-surface py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <p className="text-overline font-medium uppercase text-charcoal-muted">
              {socialAccount.name}
            </p>
            <h2
              id="social-feed-heading"
              className="mt-2 text-[2rem] uppercase leading-none tracking-tight text-charcoal md:text-[2.75rem]"
            >
              <span className="font-semibold">Social</span>{" "}
              <span className="font-light text-charcoal-light">Feed</span>
            </h2>
          </div>

          {/* Only the platforms that actually have a URL in site.ts. */}
          <ul className="flex items-center gap-3">
            {socialProfiles.map((profile) => {
              const Icon = platformIcons[profile.label];
              return (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${socialAccount.name} on ${profile.label}`}
                    className="flex h-11 w-11 items-center justify-center bg-navy text-white transition-colors hover:bg-navy-light"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative mt-8 md:mt-10">
        <ul
          ref={rail}
          onScroll={sync}
          className="flex gap-5 overflow-x-auto px-6 pb-2 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {socialFeed.map((post) => {
            const Tag = post.href ? "a" : "div";
            return (
              <li key={post.poster} className="w-[300px] shrink-0">
                <Tag
                  {...(post.href
                    ? { href: post.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group block h-full border border-border bg-warm-white transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-center gap-3 p-3">
                    <MarkBadge variant="white" className="h-9 w-9 bg-navy" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-caption font-semibold normal-case tracking-normal text-charcoal">
                        {socialAccount.name}
                      </span>
                      <span className="block truncate text-caption normal-case tracking-normal text-charcoal-muted">
                        {socialAccount.handle}
                      </span>
                    </span>
                    <InstagramIcon className="h-4 w-4 shrink-0 text-charcoal-muted" />
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-cream-dark">
                    <Image
                      src={post.poster}
                      alt={post.alt}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <span className="truncate text-caption normal-case tracking-normal text-charcoal-muted">
                      {post.title}
                    </span>
                    {post.href && (
                      <span className="shrink-0 text-caption font-medium uppercase text-navy transition-colors group-hover:text-navy-light">
                        View
                      </span>
                    )}
                  </div>
                </Tag>
              </li>
            );
          })}
        </ul>

        {/* Arrows sit over the frame edges, as in the reference. They are a
            convenience on top of native scrolling, so they hide from screen
            readers at the ends rather than trapping focus on a dead control. */}
        {[-1, 1].map((dir) => {
          const disabled = dir === -1 ? atStart : atEnd;
          return (
            <button
              key={dir}
              type="button"
              onClick={() => page(dir as 1 | -1)}
              disabled={disabled}
              aria-label={dir === -1 ? "Previous posts" : "Next posts"}
              className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-warm-white text-charcoal shadow-[var(--shadow-md)] transition-opacity hover:bg-cream md:flex ${
                dir === -1 ? "left-2" : "right-2"
              } ${disabled ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <ChevronIcon className={`h-5 w-5 ${dir === -1 ? "rotate-180" : ""}`} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
