"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MarkBadge } from "./Lockup";
import { ASK_MICHAEL_URL, CURRENT_BRAND, brands, navLinks } from "@/data/nav";

/**
 * Two-tier masthead, shared with westchesterhorseproperties.
 *
 * Tier one is the band both sites run: the mark, then a tab per site, then
 * Ask Michael. The tabs do not change between domains — the same two labels
 * in the same order, with only the underline and the white/muted treatment
 * moving — so crossing from one site to the other reads as switching
 * sections, not leaving for another brokerage. Keep this markup in step with
 * the horse site's copy; only the config in data/nav.ts differs.
 *
 * Tier two is the near-black band carrying whichever site you are on. It is
 * the only part of the chrome that differs between the two codebases.
 *
 * Heights are load-bearing: 64 + 48 = 112px below md, 80 + 48 = 128px at md
 * and up. Page heros reserve pt-36 md:pt-40 (144px, 160px) against those.
 * Change a tier height and that padding has to move with it.
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

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-2 top-2 z-60 px-4 py-2 bg-masthead text-white text-sm rounded outline-2 outline-accent outline-offset-2 -translate-y-full opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white transition-shadow duration-300 ${
          scrolled ? "shadow-[var(--shadow-md)]" : ""
        }`}
      >
        {/* Tier one — the shared band. Identical on both sites. */}
        <div className="bg-masthead">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 md:h-20 md:gap-6 md:px-10">
            <Link
              href="/"
              aria-label="The Westchester Guy, home"
              className="shrink-0 rounded-full transition-opacity hover:opacity-80"
            >
              <MarkBadge variant="white" className="h-9 w-9 md:h-11 md:w-11" />
            </Link>

            <nav
              aria-label="Michael Winter sites"
              className="flex h-full min-w-0 flex-1 items-stretch gap-4 md:gap-9"
            >
              {brands.map((brand) => {
                const current = brand.label === CURRENT_BRAND;
                const className = [
                  "relative flex h-full items-center whitespace-nowrap font-medium uppercase",
                  "text-[0.62rem] tracking-[0.06em] sm:text-[0.7rem] sm:tracking-[0.07em] md:text-[0.9rem]",
                  "transition-colors",
                  current
                    ? "text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-white"
                    : "text-white/45 hover:text-white/85",
                ].join(" ");

                const label = (
                  <>
                    <span className="sm:hidden">{brand.short}</span>
                    <span className="hidden sm:inline">{brand.label}</span>
                  </>
                );

                // The other site is a different origin, so it cannot be a Next
                // link. aria-current marks the tab you are already on.
                return brand.external ? (
                  <a key={brand.label} href={brand.href} className={className}>
                    {label}
                  </a>
                ) : (
                  <Link
                    key={brand.label}
                    href={brand.href}
                    aria-current={current ? "true" : undefined}
                    className={className}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Below sm the two tabs already fill the row, so Ask Michael
                moves to the end of tier two rather than overlapping them. */}
            <Link
              href={ASK_MICHAEL_URL}
              className="hidden shrink-0 border border-white px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-white hover:text-masthead sm:block md:px-6 md:py-2.5 md:text-[0.72rem] md:tracking-[0.12em]"
            >
              Ask Michael
            </Link>
          </div>
        </div>

        {/* Tier two — this site's own navigation. Scrolls sideways on small
            screens rather than collapsing into a menu, so the chrome keeps
            the same two-band shape at every width. */}
        <div className="bg-masthead-sub">
          <div className="mx-auto flex h-12 max-w-6xl items-center px-5 md:px-10">
            <div className="relative min-w-0 flex-1">
              <nav
                aria-label="Main navigation"
                className="flex items-center gap-6 overflow-x-auto [scrollbar-width:none] sm:overflow-visible md:gap-8 [&::-webkit-scrollbar]:hidden"
              >
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`shrink-0 text-small transition-colors ${
                        active ? "text-white" : "text-white/65 hover:text-white"
                      }`}
                    >
                      {link.label}
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
