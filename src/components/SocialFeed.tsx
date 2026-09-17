"use client";

import Image from "next/image";
import { useRef } from "react";
import { InstagramIcon, YouTubeIcon } from "./SocialIcons";
import { socialFeed, socialLanes } from "@/data/social";

/**
 * The social band that closes every page, shared with the other site.
 *
 * It sits on the masthead blue so the page is bookended by the same ground
 * the header stands on — blue at the top, blue at the bottom, the editorial
 * middle in between. Keep this file in step with the other site's copy; only
 * data/social.ts differs.
 *
 * Two lanes, because the two formats are shaped differently and cropping one
 * into the other wastes both: 9:16 for reels, 16:9 for long-form. Each card
 * previews its own footage on hover and falls back to its poster when there
 * is no clip, when the pointer is coarse, or when the visitor asked for
 * reduced motion.
 *
 * A card without an `href` renders as a plain tile rather than a dead link.
 * Nothing here states a follower count, a view count or a post date — those
 * are facts, and they are not in this repo.
 */

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
      const v = refs.current[id];
      // play() rejects if the element is torn down mid-gesture; nothing to do.
      v?.play().catch(() => {});
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
      className="on-navy bg-masthead text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-6 border-b border-white/20 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-overline font-medium uppercase text-white/55">
              Follow along
            </p>
            <h2
              id="social-feed-heading"
              className="mt-3 font-display text-heading"
            >
              The work, as it happens
              <span className="text-white/40">.</span>
            </h2>
          </div>

          <a
            href={socialLanes.instagram.profile}
            className="group inline-flex shrink-0 items-center gap-3 self-start border border-white/70 px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-masthead md:self-auto"
          >
            <InstagramIcon className="h-4 w-4" />
            {socialLanes.instagram.handle}
          </a>
        </div>

        {socialLanes.order.map((laneKey) => {
          const lane = socialLanes[laneKey];
          const posts = socialFeed.filter((p) => p.lane === laneKey);
          if (posts.length === 0) return null;
          const reel = laneKey === "instagram";

          return (
            <div key={laneKey} className="mt-12 md:mt-16">
              <div className="mb-5 flex items-center gap-3">
                {reel ? (
                  <InstagramIcon className="h-4 w-4 text-white/70" />
                ) : (
                  <YouTubeIcon className="h-4 w-4 text-white/70" />
                )}
                <p className="text-caption font-medium uppercase text-white/70">
                  {lane.label}
                </p>
                <span aria-hidden className="h-px flex-1 bg-white/15" />
              </div>

              {/* Scrolls sideways on small screens rather than stacking into a
                  column — a feed reads as a feed when it runs horizontally. */}
              <ul
                className={`flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:gap-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden ${
                  reel ? "md:grid-cols-4" : "md:grid-cols-3"
                }`}
              >
                {posts.map((post) => {
                  const id = post.poster;
                  const Tag = post.href ? "a" : "div";
                  return (
                    <li
                      key={id}
                      className={`shrink-0 ${
                        reel ? "w-[58vw] sm:w-[38vw]" : "w-[78vw] sm:w-[46vw]"
                      } md:w-auto`}
                    >
                      <Tag
                        {...(post.href
                          ? {
                              href: post.href,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                        className="group block"
                        onMouseEnter={() => preview.enter(id)}
                        onMouseLeave={() => preview.leave(id)}
                      >
                        <div
                          className={`relative overflow-hidden bg-white/5 ${
                            reel ? "aspect-[9/16]" : "aspect-video"
                          }`}
                        >
                          <Image
                            src={post.poster}
                            alt={post.alt}
                            fill
                            sizes="(min-width: 768px) 25vw, 60vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                          />

                          <span
                            aria-hidden
                            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="ml-0.5 h-4 w-4"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>

                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <p className="text-small font-medium leading-snug">
                              {post.title}
                            </p>
                            <p className="mt-1 text-caption uppercase text-white/60">
                              {post.meta}
                            </p>
                          </div>
                        </div>
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
