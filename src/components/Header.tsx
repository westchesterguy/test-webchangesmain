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
 * Tier one is three zones: the site you are on at the left beside the mark,
 * Ask Michael in the middle, the other site at the right. Both names are set
 * in the same face at the same size and sit on the same line, so the pair
 * reads as two addresses under one roof — the rule under the left one is the
 * only thing that says which you are at, and it appears only on the site you
 * are on. The current site always takes the left, whichever site this is.
 *
 * From lg the grid is 1fr auto 1fr, so the side columns are equal and the
 * middle sits on the window's centre line however much longer one domain is
 * than the other. Below lg the columns size to content instead: equal halves
 * give the left exactly half the row, and "westchesterhorseproperties.com" is
 * two-thirds longer than the name opposite it, so it was the one that got
 * cut. The button moves to tier two there for the same reason.
 *
 * Both names carry min-w-0 and truncate their own span. Without it the links
 * refuse to shrink below their text and the two names run straight into each
 * other on a phone, which is what a nowrap on the link itself caused.
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
/**
 * Typography shared by both site names, so "same face, same size" cannot
 * drift between them. The steps are set by the tightest fit: at each width
 * the two domains, the mark and the button have to sit on one row without
 * meeting.
 */
const SITE_NAME =
  "min-w-0 font-display font-semibold lowercase leading-none tracking-[-0.015em] text-[0.8rem] sm:text-[0.95rem] lg:text-[1.2rem] xl:text-[1.6rem]";

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
        {/* 1fr auto 1fr keeps Ask Michael on the window's centre line however
            the two domains differ in length. Below sm the middle cell is
            empty — the button lives in tier two there — and the two side
            columns simply split the row. */}
        <div className="grid h-16 grid-cols-[minmax(0,auto)_auto_minmax(0,1fr)] items-center gap-3 px-4 md:h-20 md:gap-6 md:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <div className="flex h-full min-w-0 items-center gap-3 md:gap-5">
            <Link
              href="/"
              aria-label={`${here.label}, home`}
              className="shrink-0 rounded-full transition-opacity hover:opacity-80"
            >
              <MarkBadge variant="white" className="h-9 w-9 md:h-11 md:w-11" />
            </Link>

            {/* Where you are. The rule sits on the band's bottom edge. Set in
                the hero's serif, lowercase, because that face is the brand's
                voice and an address is read, not shouted. */}
            <Link
              href="/"
              aria-current="true"
              className={`${SITE_NAME} relative flex h-full items-center text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-white`}
            >
              <span className="block truncate whitespace-nowrap sm:hidden">{here.short}</span>
              <span className="hidden truncate whitespace-nowrap sm:block">{here.label}</span>
            </Link>
          </div>

          {/* Ask Michael sits in the centre cell from lg up. Below that it
              moves to tier two: the centre column costs the row a third of
              its width, and "westchesterhorseproperties.com" does not
              survive that on a tablet. Both copies raise the Tawk widget and
              fall back to their href when the embed has not loaded or was
              blocked. */}
          <Link
            href={ASK_MICHAEL_URL}
            onClick={(e) => {
              if (openLiveChat()) e.preventDefault();
            }}
            className="hidden shrink-0 border border-white px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-white hover:text-masthead lg:block lg:px-6 lg:py-2.5 lg:text-[0.72rem] lg:tracking-[0.12em]"
          >
            Ask Michael
          </Link>

          {/* Where you could go. Same face and same size as the name on the
              left, and no rule under it — the rule means "you are here", so
              it belongs to one of the two at a time. A different origin, so a
              plain anchor rather than a Next link. */}
          {there ? (
            <a
              href={there.href}
              className={`${SITE_NAME} group flex min-w-0 items-center justify-end gap-2 text-white/45 transition-colors hover:text-white/85`}
            >
              <span className="block truncate whitespace-nowrap sm:hidden">{there.short}</span>
              <span className="hidden truncate whitespace-nowrap sm:block">{there.label}</span>
              <svg
                viewBox="0 0 12 12"
                aria-hidden
                className="h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 9L9 3M9 3H4.5M9 3v4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          ) : (
            <span />
          )}
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
            className="ml-3 shrink-0 border border-white px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-white hover:text-masthead-sub lg:hidden"
          >
            Ask Michael
          </Link>
        </div>
      </div>
    </header>
    </>
  );
}
