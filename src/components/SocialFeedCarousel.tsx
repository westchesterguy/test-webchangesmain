"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MarkBadge } from "./Lockup";
import {
  ChevronIcon,
  InstagramIcon,
  LinkedInIcon,
  PlayIcon,
  TikTokIcon,
} from "./SocialIcons";
import { socialAccount, type SocialPost, type SocialProfile } from "@/data/social";

/**
 * The social band: one heading, a platform filter, one rail of post cards.
 *
 * It was one rail per platform, stacked. Three of them ran to 1,496px on a
 * desktop and close to three screens on a phone, all of it before the call to
 * action, and adding a fourth platform would have made it worse. One rail
 * says the same thing once.
 *
 * Client-side because the rail tracks its own scroll position for the arrows,
 * and now because the filter is interactive. Filtering only hides: every post
 * is in the server-rendered markup and the default tab is All, so a crawler
 * and a reader with no JavaScript both get the whole feed. Nothing is fetched
 * when a tab is pressed.
 *
 * A card names its own author, handle, picture and platform. On a mixed rail
 * it has to: a TikTok post and an Instagram post cannot sit under one label,
 * and this site knows Michael's Instagram handle, not his handle everywhere
 * else. The rail's own settings are only the fallback.
 *
 * The footer carries the caption and a link out, NOT a like count, a comment
 * count or a post age. Those change hourly, and a rail of two-digit view
 * counts argues against the work rather than for it.
 */

const CARD = 300; // px, matched by the card width class below.
const GAP = 20;

type Platform = NonNullable<SocialPost["platform"]>;

const GLYPHS = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
} as const;

/** Tab order, fixed rather than derived, so it does not reshuffle when a feed
 *  goes quiet. Platforms with no posts are dropped, not shown empty. */
const TAB_ORDER: { key: Platform; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "tiktok", label: "TikTok" },
];

export function SocialFeedCarousel({
  posts,
  profiles,
}: {
  posts: SocialPost[];
  profiles: SocialProfile[];
}) {
  const [active, setActive] = useState<Platform | "all">("all");
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const tabs = useMemo(
    () => TAB_ORDER.filter((t) => posts.some((p) => p.platform === t.key)),
    [posts],
  );

  const shown = useMemo(
    () => (active === "all" ? posts : posts.filter((p) => p.platform === active)),
    [posts, active],
  );

  /**
   * The account the follow link points at.
   *
   * It tracks the tab, so it offers the account whose posts are on screen.
   * On All it falls back to Instagram, which is the primary account and the
   * one the heading's overline names; if that has no confirmed URL in
   * site.ts, the first profile that does. Absent entirely rather than
   * guessed when none is configured.
   */
  const follow = useMemo(() => {
    const byPlatform = (key: string) =>
      profiles.find((p) => p.label.toLowerCase() === key);
    if (active !== "all") return byPlatform(active);
    return byPlatform("instagram") ?? profiles[0];
  }, [profiles, active]);

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

  // A filter change replaces the row, so the old scroll offset is meaningless
  // and the arrows would be reporting on a rail that no longer exists.
  useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
    sync();
  }, [active, sync]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    // Move whole cards, and at least one, however narrow the frame is.
    const step = Math.max(1, Math.floor(el.clientWidth / (CARD + GAP))) * (CARD + GAP);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="pt-14 md:pt-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div>
            <p className="text-overline font-medium uppercase text-charcoal-muted">
              {socialAccount.name}
            </p>
            <h2
              id="social-feed-heading"
              className="mt-3 text-balance font-display leading-[1.08] tracking-[-0.015em] text-charcoal text-[2rem] sm:text-[2.5rem] md:text-[3.25rem]"
            >
              {socialAccount.heading.map((part, i) => (
                <span
                  key={part.text}
                  className={
                    part.weight === "strong"
                      ? "font-semibold"
                      : "font-normal text-charcoal-muted"
                  }
                >
                  {i > 0 ? " " : ""}
                  {part.text}
                </span>
              ))}
            </h2>
          </div>

        {/* Filters on the left, one follow link on the right.
            The row used to carry all three account links, which printed the
            same three platform names twice within sixty pixels — a doubled
            menu, even though the tabs narrow what is shown and the links
            leave the site. One link says it once, and it follows the tab, so
            it offers the account whose posts you are actually looking at.
            The full set still sits in the footer two sections below. */}
        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-border">
          {/* Only worth showing when there is more than one platform to choose
              between. A single tab reading "All" is furniture. */}
          {tabs.length > 1 && (
            <div
              role="tablist"
              aria-label="Filter posts by platform"
              className="-mb-px flex gap-7 overflow-x-auto md:gap-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {[{ key: "all" as const, label: "All" }, ...tabs].map((tab) => {
                const on = active === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(tab.key)}
                    className={`shrink-0 whitespace-nowrap border-b-2 pb-3 text-caption uppercase tracking-[0.17em] transition-colors ${
                      on
                        ? "border-masthead font-semibold text-masthead"
                        : "border-transparent text-charcoal-muted hover:text-charcoal"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {follow && (
            <a
              href={follow.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 pb-3 text-caption uppercase tracking-[0.2em] text-charcoal-muted transition-colors hover:text-charcoal"
            >
              <span className="border-b border-charcoal/20 pb-1 transition-colors group-hover:border-charcoal">
                Follow on {follow.label}
              </span>
              <svg
                viewBox="0 0 12 12"
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
              >
                <path
                  d="M3 9L9 3M9 3H4.5M9 3v4.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="relative mt-8 md:mt-10">
        <ul
          ref={rail}
          onScroll={sync}
          className="flex gap-5 overflow-x-auto px-6 pb-2 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((post) => {
            const Tag = post.href ? "a" : "div";
            const Glyph = GLYPHS[post.platform ?? "instagram"];
            return (
              <li key={post.poster} className="w-[300px] shrink-0">
                <Tag
                  {...(post.href
                    ? { href: post.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group block h-full border border-border bg-warm-white transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-center gap-3 p-3">
                    {post.authorAvatar ? (
                      <Image
                        src={post.authorAvatar}
                        alt=""
                        aria-hidden
                        width={144}
                        height={144}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <MarkBadge variant="white" className="h-9 w-9 bg-navy" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-caption font-semibold normal-case tracking-normal text-charcoal">
                        {post.authorName ?? socialAccount.name}
                      </span>
                      {/* Omitted rather than guessed: this site knows the
                          Instagram handle, not the handle on every other
                          platform, and a handle that did not arrive with the
                          post would be a false statement. */}
                      {post.authorHandle && (
                        <span className="block truncate text-caption normal-case tracking-normal text-charcoal-muted">
                          {post.authorHandle}
                        </span>
                      )}
                    </span>
                    <Glyph className="h-4 w-4 shrink-0 text-charcoal-muted" />
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-cream-dark">
                    <Image
                      src={post.poster}
                      alt={post.alt}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Small and in the corner rather than centred over the
                        picture: it has to say the frame plays, not compete
                        with the photograph it sits on. Decorative — the
                        caption already tells a screen reader what this is. */}
                    {post.video && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-navy/55 backdrop-blur-[2px]"
                      >
                        <PlayIcon className="h-3 w-3 translate-x-[1px] text-white" />
                      </span>
                    )}
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

        {/* Arrows sit over the frame edges. They are a convenience on top of
            native scrolling, so they hide from screen readers at the ends
            rather than trapping focus on a dead control. */}
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
    </div>
  );
}
