"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MarkBadge } from "./Lockup";
import { openLiveChat } from "@/lib/liveChat";
import { ASK_MICHAEL_URL, CURRENT_BRAND, brands, navLinks } from "@/data/nav";

/**
 * Two-tier masthead, shared with the horse site.
 *
 * Tier one names the site you are on, loudly, and offers the other one as a
 * way out. The two are not peers any more: the site you are on is set large
 * in white with a rule under it, and the other is a small muted "Visit"
 * link with an outbound arrow. A visitor should never have to work out which
 * address they are at, and two equal-weight tabs made them do exactly that.
 * The current site is rendered first, next to the mark, whichever site this
 * is — its own name leads.
 *
 * Both bands run the full width of the window with a small gutter, so the
 * mark sits near the edge rather than indented to the text column. Keep this
 * file in step with the other site's copy; only the config differs.
 *
 * Tier two is the near-black band carrying this site's own navigation. It is
 * the only part of the chrome that differs between the two codebases.
 *
 * Heights are load-bearing: 64 + 48 = 112px below md, 80 + 48 = 128px at md
 * and up. Page heros reserve pt-36 md:pt-40 against those.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const here = brands.find((b) => b.label === CURRENT_BRAND) ?? brands[0];
  const there = brands.find((b) => b.label !== CURRENT_BRAND);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-2 top-2 z-60 px-4 py-2 bg-masthead text-white text-sm rounded outline-2 outline-accent outline-offset-2 -translate-y-full opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all"
      >
        Skip to content
      </a>
      <header
      className={`on-navy fixed inset-x-0 top-0 z-50 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      {/* Tier one — the shared band. */}
      <div className="bg-masthead">
        <div className="flex h-16 items-center gap-4 px-4 md:h-20 md:gap-7 md:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={`${here.label}, home`}
            className="shrink-0 rounded-full transition-opacity hover:opacity-80"
          >
            <MarkBadge variant="white" className="h-9 w-9 md:h-11 md:w-11" />
          </Link>

          <nav
            aria-label="Michael Winter sites"
            className="flex h-full min-w-0 flex-1 items-stretch gap-4 md:gap-7"
          >
            {/* Where you are. The rule sits on the band's bottom edge.
                Set in the hero's serif, lowercase, because that face is the
                brand's voice and an address is read, not shouted. The way-out
                link below stays in the sans on purpose — the contrast is what
                separates the name from the navigation. */}
            <Link
              href="/"
              aria-current="true"
              className="relative flex h-full shrink-0 items-center whitespace-nowrap font-display font-semibold lowercase leading-none tracking-[-0.015em] text-white text-[0.95rem] sm:text-[1.3rem] lg:text-[1.75rem] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-white"
            >
              <span className="sm:hidden">{here.short}</span>
              <span className="hidden sm:inline">{here.label}</span>
            </Link>

            {/* Where you could go. A different origin, so a plain anchor. */}
            {there && (
              <a
                href={there.href}
                className="group flex shrink items-center gap-1.5 self-center overflow-hidden whitespace-nowrap font-medium uppercase tracking-[0.1em] text-white/50 transition-colors hover:text-white text-[0.55rem] sm:text-[0.62rem] lg:text-[0.72rem]"
              >
                <span className="hidden text-white/40 transition-colors group-hover:text-white/70 sm:inline">
                  Visit
                </span>
                <span className="truncate border-b border-white/25 pb-0.5 transition-colors group-hover:border-white/70">
                  <span className="sm:hidden">{there.short}</span>
                  <span className="hidden sm:inline">{there.label}</span>
                </span>
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
          </nav>

          {/* Below sm the row is full, so Ask Michael moves to the end of
              tier two. Both copies raise the Tawk widget and fall back to
              their href when the embed has not loaded or was blocked. */}
          <Link
            href={ASK_MICHAEL_URL}
            onClick={(e) => {
              if (openLiveChat()) e.preventDefault();
            }}
            className="hidden shrink-0 border border-white px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-white hover:text-masthead sm:block md:px-6 md:py-2.5 md:text-[0.72rem] md:tracking-[0.12em]"
          >
            Ask Michael
          </Link>
        </div>
      </div>

      {/* Tier two — this site's own navigation. Scrolls sideways on small
          screens rather than collapsing into a menu, so the chrome keeps the
          same two-band shape at every width. */}
      <div className="bg-masthead-sub">
        <div className="flex h-12 items-center px-4 md:px-6 lg:px-8">
          <div className="relative min-w-0 flex-1">
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-6 overflow-x-auto [scrollbar-width:none] sm:overflow-visible md:gap-8 [&::-webkit-scrollbar]:hidden"
            >
              {navLinks.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 text-small transition-colors ${
                      active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            {/* Scroll affordance for the row above; decorative only. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-masthead-sub to-transparent sm:hidden"
            />
          </div>

          <Link
            href={ASK_MICHAEL_URL}
            onClick={(e) => {
              if (openLiveChat()) e.preventDefault();
            }}
            className="ml-3 shrink-0 border border-white px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-white hover:text-masthead-sub sm:hidden"
          >
            Ask Michael
          </Link>
        </div>
      </div>
    </header>
    </>
  );
}
