"use client";

import Image from "next/image";
import { useRef } from "react";
import { InstagramIcon } from "./SocialIcons";
import { socialFeed, socialLanes } from "@/data/social";

/**
 * The social rail that closes every page, shared with the other site.
 *
 * One row, not a grid of lanes. Every tile shares a single height and takes
 * whatever width its own aspect asks for — 9:16 reels come out narrow, 16:9
 * films come out wide — so the row reads as a strip of film rather than a
 * page of thumbnails, and neither format gets cropped into the other's box.
 * The row is wider than any viewport on purpose: it runs off the right edge
 * and scrolls, which is what makes it read as a feed instead of a section.
 *
 * It bleeds the full width of the window while the first tile still lines up
 * with the page's text column, via the leading spacer below. No scroll
 * snapping: mandatory snap ignores that spacer and yanks the rail flush to
 * the first tile on load, and snap points fight the reader on a row of
 * mixed widths anyway. Keep this file in step with the other site's copy;
 * only data/social.ts differs.
 *
 * Nothing here states a follower count, a view count or a post date — those
 * are facts, and they are not in this repo. A tile without an `href` renders
 * as a plain tile rather than a dead link.
 */

/* The lead spacer is a real rule in globals.css (.social-rail-lead) rather
   than an arbitrary Tailwind width: the value needs both a comma and a
   division, and Tailwind reads the slash as an opacity modifier and drops
   the class silently. */

function useHoverPreview() {
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  const canPreview = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return {
    register: (id: string) => (el: HTMLVideoElement | null) => {
      refs.current[id] = el;
    },
    enter: (id: string) => {
      if (!canPreview()) return;
      // play() rejects if the element is torn down mid-gesture; nothing to do.
      refs.current[id]?.play().catch(() => {});
    },
    leave: (id: string) => {
      const v = refs.current[id];
      if (!v) return;
      v.pause();
      v.currentTime = 0;
    },
  };
}

export function SocialFeed() {
  const preview = useHoverPreview();

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="on-navy overflow-hidden bg-masthead text-white"
    >
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-14 md:px-10 md:pb-10 md:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 id="social-feed-heading" className="font-display text-heading">
            The work, as it happens
            <span className="text-white/40">.</span>
          </h2>

          <a
            href={socialLanes.instagram.profile}
            className="group inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="border-b border-white/30 pb-1 transition-colors group-hover:border-white">
              {socialLanes.instagram.handle}
            </span>
          </a>
        </div>
      </div>

      {/* The rail. Native horizontal scroll, no custom drag handling — it
          keeps the keyboard and trackpad behaviour the browser already has. */}
      <ul className="flex items-stretch overflow-x-auto pb-12 md:pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li aria-hidden className="social-rail-lead shrink-0" />

        {socialFeed.map((post) => {
          const id = post.poster;
          const Tag = post.href ? "a" : "div";
          const reel = post.lane === "instagram";

          return (
            <li
              key={id}
              className={`mr-2 h-[320px] shrink-0 md:mr-3 md:h-[440px] ${
                reel ? "aspect-[9/16]" : "aspect-video"
              }`}
            >
              <Tag
                {...(post.href
                  ? {
                      href: post.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className="group relative block h-full w-full overflow-hidden bg-white/5"
                onMouseEnter={() => preview.enter(id)}
                onMouseLeave={() => preview.leave(id)}
              >
                <Image
                  src={post.poster}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 70vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                {post.clip && (
                  <video
                    ref={preview.register(id)}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={post.poster}
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
                  >
                    <source src={post.clip} type="video/mp4" />
                  </video>
                )}

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                />

                {/* Small and in the corner: the tile is the subject, not the
                    control. It grows on hover so it still reads as playable. */}
                <span
                  aria-hidden
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-masthead md:right-4 md:top-4 md:h-8 md:w-8"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="line-clamp-2 text-small font-medium leading-snug">
                    {post.title}
                  </p>
                  <p className="mt-1 truncate text-[0.7rem] uppercase tracking-[0.08em] text-white/55">
                    {post.meta}
                  </p>
                </div>
              </Tag>
            </li>
          );
        })}

        {/* Trailing breath so the last tile can clear the right edge. */}
        <li aria-hidden className="w-6 shrink-0 md:w-10" />
      </ul>
    </section>
  );
}
