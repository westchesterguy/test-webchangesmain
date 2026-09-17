# michaelwinterrealestate.com

Personal site for Michael Winter, Licensed Real Estate Salesperson with Julia B.
Fee Sotheby's International Realty, Bedford NY ("The Westchester Guy").

Read `NOTICE.md` first: this codebase is a work product of William Pitt Real
Estate LLC / JBF Holdings, LLC, licensed to Michael for his own use only. Do not
share or distribute it.

## Rules

1. **Run `npm run build` before every push.** A branch once shipped without a
   build and would have broken the deploy. A green build is the gate.
2. **Never invent facts about Michael** — no sales volumes, awards, years of
   experience, designations, or client names unless already in the code or
   supplied by him. Ask; don't fill in a plausible placeholder. Fabricated
   credentials in real estate marketing carry regulatory risk.
3. **Never edit quote text in `src/data/testimonials.ts`.** Verbatim client
   reviews, syndicated from Zillow via his Sotheby's agent page, driving Review
   schema. `rating` is deliberately unset so no AggregateRating is fabricated.
4. **Small, targeted commits.** Don't rewrite or refactor anything not asked about.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind 4 · Resend
for form email · BotID for spam · Vercel Analytics + Speed Insights.

## Where things live

- `src/data/` — content: `profile.ts`, `testimonials.ts` (rule 3), `insights.ts`,
  `communities.ts`, `nav.ts`, `commands.ts`
- `src/lib/site.ts` — **single source of truth** for contact facts, social links,
  and `SITE_URL`. Everything needing an absolute URL or contact fact reads it.
- `src/components/JsonLd.tsx` — Person / WebSite structured data
- `src/app/contact/actions.ts` — server actions for both lead forms
- `src/app/insights/[slug]/posts/` — individual post bodies (TSX)

## Deploy

Vercel team `the-westchester-guy`, project `michaelwinterrealestate`.
**Push to `main` = production deploy.** No staging branch.

`michaelwinterrealestate.com` is primary and canonical; `www` plus 13 other owned
domains 308-redirect to it. `SITE_URL` must match the apex — canonical tags,
sitemap, robots, and llms.txt all derive from it.

Env vars live in Vercel, never in the repo. `RESEND_API_KEY` is required for the
contact and valuation forms; without it both fail silently and leads are lost.

## Local

```
npm ci && npm run build   # verify
npm run dev               # http://localhost:3000
```

Node 24 is at `~/.local/opt/node`; `git` comes from `~/.local/opt/gitenv`
(conda-forge) via `~/.local/bin/git`, because Xcode Command Line Tools are not
installed on this machine.
