"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { commands, type Command } from "@/data/commands";
import { social } from "@/data/nav";
import { fuzzyRank } from "@/lib/fuzzy";

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

const ICON_PATHS: Record<string, string> = {
  "nav-home": "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10",
  "nav-/about": "M16 14a4 4 0 10-8 0M12 7a3 3 0 100 6 3 3 0 000-6zM4 21a8 8 0 0116 0",
  "nav-/innovation": "M13 2L3 14h7l-1 8 10-12h-7l1-8z",
  "nav-/insights": "M4 5h11M4 10h11M4 15h7M17 14l3 3-3 3",
  "nav-/company": "M4 21V5a1 1 0 011-1h7a1 1 0 011 1v16M13 9h6a1 1 0 011 1v11M7 8h2M7 12h2M7 16h2",
  "nav-/press": "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h9a2 2 0 012 2v12a2 2 0 002 2zm0 0a2 2 0 002-2v-7h-5M7 8h6M7 12h6M7 16h3",
  "nav-/contact": "M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9-4 9 4",
  "action-theme": "M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M3 12h2m14 0h2M12 8a4 4 0 100 8 4 4 0 000-8z",
  "action-copy-email": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "action-rss": "M5 19a1 1 0 100-2 1 1 0 000 2zM4 11a9 9 0 019 9M4 5a15 15 0 0115 15",
};

const GROUP_FALLBACK: Record<string, string> = {
  Navigation: "M9 5l7 7-7 7",
  Actions: "M13 10V3L4 14h7v7l9-11h-7z",
  Connect: "M13.5 6H18a2 2 0 012 2v8a2 2 0 01-2 2h-4.5M10.5 6H6a2 2 0 00-2 2v8a2 2 0 002 2h4.5M8 12h8",
};

function CmdIcon({ command }: { command: Command }) {
  const d = ICON_PATHS[command.id] ?? GROUP_FALLBACK[command.group];
  return (
    <svg
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={d} />
    </svg>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const visible = useMemo<Command[]>(
    () => (query.trim() ? fuzzyRank(query, commands) : commands),
    [query]
  );

  const close = useCallback(() => setOpen(false), []);

  const openPalette = useCallback(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  // Global shortcuts: ⌘K / Ctrl+K anywhere, "/" when not already typing.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            restoreFocusRef.current = document.activeElement as HTMLElement | null;
            setQuery("");
            setActiveIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape" && open) {
        // Close on Escape regardless of where focus currently sits.
        e.preventDefault();
        close();
      } else if (e.key === "/" && !open && !isTypingTarget(e.target)) {
        e.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    // Allow other components (e.g. the Header hint pill) to open the palette.
    const onOpenEvent = () => openPalette();
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, [open, openPalette, close]);

  // Focus the input on open; restore focus on close.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      restoreFocusRef.current?.focus?.();
    }
  }, [open]);

  // Keep active item in range as the list shrinks/grows.
  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, visible.length - 1)));
  }, [visible.length]);

  const execute = useCallback(
    (cmd: Command | undefined) => {
      if (!cmd) return;
      close();
      if (cmd.action === "copy-email") {
        navigator.clipboard?.writeText(social.email).catch(() => {});
      } else if (cmd.external) {
        window.open(cmd.external, "_blank", "noopener,noreferrer");
      } else if (cmd.href) {
        router.push(cmd.href);
      }
    },
    [close, router]
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(visible.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(visible[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Focus trap: input is the only focusable element in the dialog.
      e.preventDefault();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(visible.length - 1);
    }
  };

  // Scroll the active option into view.
  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(`cmd-opt-${activeIndex}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  if (!open) return null;

  const showGroups = !query.trim();
  let lastGroup: string | null = null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="cmd-backdrop absolute inset-0 backdrop-blur-md" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="cmd-panel relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-warm-white shadow-[var(--shadow-lg)]"
      >
        {/* Signature accent bar */}
        <div
          className="h-[3px] w-full bg-[image:var(--gradient-accent)]"
          aria-hidden="true"
        />

        <div className="flex items-center gap-3 border-b border-border px-5">
          <svg
            className="h-5 w-5 shrink-0 text-accent-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-listbox"
            aria-activedescendant={
              visible.length ? `cmd-opt-${activeIndex}` : undefined
            }
            aria-autocomplete="list"
            placeholder="Jump to a page or run a command…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            className="w-full bg-transparent py-5 text-lg text-charcoal placeholder:text-charcoal-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close command palette"
            className="shrink-0 rounded-md border border-border bg-cream px-2 py-1 font-sans text-caption text-charcoal-muted transition-colors hover:border-accent hover:text-charcoal"
          >
            Esc
          </button>
        </div>

        <ul
          id="command-listbox"
          role="listbox"
          aria-label="Commands"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {visible.length === 0 && (
            <li className="px-4 py-10 text-center text-small text-charcoal-muted">
              No results for &ldquo;{query}&rdquo;
            </li>
          )}
          {visible.map((cmd, i) => {
            const headerNeeded = showGroups && cmd.group !== lastGroup;
            if (showGroups) lastGroup = cmd.group;
            const isActive = i === activeIndex;
            return (
              <li key={cmd.id} role="presentation">
                {headerNeeded && (
                  <div
                    className="px-3 pb-1.5 pt-4 text-overline uppercase text-charcoal-muted/80 first:pt-1.5"
                    role="presentation"
                  >
                    {cmd.group}
                  </div>
                )}
                <div
                  id={`cmd-opt-${i}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    execute(cmd);
                  }}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-body transition-colors ${
                    isActive
                      ? "bg-cream-dark text-charcoal"
                      : "text-charcoal-light"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 h-6 -translate-y-1/2 rounded-full w-[3px] bg-[image:var(--gradient-accent)]"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-accent/15 text-accent-dark"
                        : "bg-cream-dark/60 text-charcoal-muted"
                    }`}
                  >
                    <CmdIcon command={cmd} />
                  </span>
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {cmd.external && (
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-charcoal-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14 5h5v5M19 5l-7 7M12 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5"
                      />
                    </svg>
                  )}
                  {isActive && (
                    <kbd className="hidden shrink-0 items-center rounded-md border border-border bg-warm-white px-1.5 py-0.5 font-sans text-caption text-charcoal-muted sm:inline-flex">
                      ↵
                    </kbd>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Hint footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-caption text-charcoal-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-cream px-1.5 py-0.5 font-sans">↑</kbd>
              <kbd className="rounded border border-border bg-cream px-1.5 py-0.5 font-sans">↓</kbd>
              <span className="hidden sm:inline">navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-cream px-1.5 py-0.5 font-sans">↵</kbd>
              <span className="hidden sm:inline">select</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-medium tracking-[0.08em] text-accent-dark">
            <kbd className="rounded border border-border bg-cream px-1.5 py-0.5 font-sans text-charcoal-muted">⌘K</kbd>
            Michael Winter
          </span>
        </div>
      </div>
    </div>
  );
}
