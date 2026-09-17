"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { navLinks } from "@/data/nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu: close on Escape and return focus to the toggle.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    // Move focus into the menu when it opens.
    mobileMenuRef.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-2 top-2 z-60 px-4 py-2 bg-navy text-white text-sm rounded outline-2 outline-accent outline-offset-2 -translate-y-full opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all"
      >
        Skip to content
      </a>
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-navy ${
        scrolled ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-20 md:h-24">
        {/* Logo / Name */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap font-serif text-xl md:text-2xl font-medium text-white tracking-tight hover:text-accent-light transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mw-lockup.png"
            alt=""
            className="h-9 w-9 rounded-full object-cover invert md:h-10 md:w-10"
            aria-hidden="true"
          />
          Michael Winter
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small uppercase tracking-[0.08em] text-white/80 hover:text-white transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center">
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8h16M4 16h16"
              />
            )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" ref={mobileMenuRef} className="md:hidden bg-navy-light border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-small uppercase tracking-[0.08em] text-white/80 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
    </>
  );
}
