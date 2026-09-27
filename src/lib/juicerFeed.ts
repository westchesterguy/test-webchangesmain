import { toCaption } from "./caption";
import type { SocialPost } from "@/data/social";

/**
 * The Juicer rail: TikTok, and anything else wired into the same Juicer feed.
 *
 * Juicer is an aggregator in the same role Behold plays for Instagram. It
 * holds the platform credentials, absorbs each platform's API changes, and
 * hands back one normalised list. That is the whole reason to pay for it:
 * TikTok's own Display API would mean an app review and a refresh token
 * somebody has to keep alive, and a token that dies quietly takes the rail
 * down with it.
 *
 * ── UNVERIFIED FIELD MAPPING ──────────────────────────────────────────────
 * The field names below have NOT been checked against a real response. This
 * container's proxy blocks juicer.io, so the shape here is written from
 * Juicer's documented public feed endpoint and deliberately tolerates
 * several spellings of the same field rather than betting on one. Paste one
 * real response and this narrows to exactly what the feed sends.
 *
 * Until then the behaviour on a wrong guess is a rail that does not render,
 * never a broken page and never a broken image: every field is optional,
 * every failure returns empty, and a post missing an image or a link is
 * dropped rather than shown.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The image rule is the one carried over from the Instagram loader, and it
 * is the rule that decides whether this works at all. Only images Juicer
 * re-hosts on its own domain are used. A raw tiktokcdn or cdninstagram URL
 * is signed and expires within hours, so a card built on one goes blank a
 * day later on a page nobody is watching. Those are skipped on purpose.
 */

/**
 * The feed to read, by its Juicer name. Overridable per deployment so the
 * horse site can point at its own feed without a second copy of this file.
 */
const FEED_NAME = process.env.JUICER_FEED_NAME ?? "michael-winter082";

/**
 * Where to read it from.
 *
 * Juicer documents two ways in: this public per-feed endpoint, which needs
 * no credential, and a keyed API at api.juicer.io/v1 using a bearer token.
 * The public one is the default because a URL that carries no secret can
 * live in the repo, and because an endpoint with nothing to rotate cannot
 * quietly expire. JUICER_API_URL and JUICER_API_KEY switch to the keyed one
 * without a code change if the public endpoint is ever withdrawn or gated.
 */
const API_URL =
  process.env.JUICER_API_URL ??
  `https://www.juicer.io/api/feeds/${encodeURIComponent(FEED_NAME)}`;

/** Only sent when set. Absent on the public endpoint, which wants no auth. */
const API_KEY = process.env.JUICER_API_KEY;

/** Matches the Instagram loader: see the note on REVALIDATE there. */
const REVALIDATE = 1800;

/** Enough to fill the rail and scroll, without pulling the whole history. */
const PER_PAGE = 20;

/**
 * Image hosts this rail will render.
 *
 * An allowlist rather than a blocklist, because the failure being prevented
 * is silent: a passed-through platform CDN URL renders perfectly today and
 * is a dead card by the weekend. Anything not on this list is treated as
 * not-re-hosted and the post is skipped.
 *
 * next.config.ts must list the same hosts under images.remotePatterns, or
 * next/image refuses them at render time. Keep the two in step.
 */
const REHOSTED_HOSTS = [
  "juicer.io",
  "www.juicer.io",
  "cdn.juicer.io",
  "images.juicer.io",
  "assets.juicer.io",
];

function isRehosted(url: string): boolean {
  try {
    const { hostname, protocol } = new URL(url);
    if (protocol !== "https:") return false;
    return REHOSTED_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/** Juicer names its platforms in prose; the cards need one of our glyphs. */
function toPlatform(source: string | undefined): SocialPost["platform"] {
  switch ((source ?? "").trim().toLowerCase()) {
    case "instagram":
      return "instagram";
    case "linkedin":
      return "linkedin";
    case "tiktok":
    case "tik tok":
      return "tiktok";
    default:
      // A platform we have no glyph for still gets a card; it simply shows
      // the rail's default mark rather than a wrong logo.
      return undefined;
  }
}

/**
 * One post, as Juicer might spell it.
 *
 * Every field is optional and several appear under more than one name. That
 * is not defensive padding: it is what lets an unverified mapping fail by
 * showing fewer cards instead of by crashing a page that five routes render.
 */
interface JuicerItem {
  id?: string | number;
  image?: string;
  unformatted_message?: string;
  message?: string;
  full_url?: string;
  external_url?: string;
  source?: { source?: string } | string;
  poster_name?: string;
  poster_image?: string;
  poster_url?: string;
}

interface JuicerResponse {
  posts?: { items?: JuicerItem[] } | JuicerItem[];
}

export interface JuicerFeed {
  posts: SocialPost[];
  /** False when nothing usable came back, so the caller can omit the rail. */
  live: boolean;
}

/** Both shapes the endpoint is documented to return, flattened to one. */
function itemsOf(data: JuicerResponse): JuicerItem[] {
  const posts = data.posts;
  if (Array.isArray(posts)) return posts;
  if (posts && Array.isArray(posts.items)) return posts.items;
  return [];
}

function sourceName(item: JuicerItem): string | undefined {
  if (typeof item.source === "string") return item.source;
  return item.source?.source;
}

function toPost(item: JuicerItem): SocialPost | null {
  const poster = item.image;
  const href = item.full_url ?? item.external_url;
  if (!poster || !href) return null;

  // The rule this rail lives or dies by. See REHOSTED_HOSTS above.
  if (!isRehosted(poster)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[juicer] skipped a post: image is not on a Juicer host (${poster}). ` +
          `If Juicer has simply moved domains, add it to REHOSTED_HOSTS in ` +
          `src/lib/juicerFeed.ts and to remotePatterns in next.config.ts.`,
      );
    }
    return null;
  }

  const platform = toPlatform(sourceName(item));
  return {
    poster,
    href,
    title: toCaption(item.unformatted_message ?? item.message, "View post"),
    alt: "",
    platform,
  };
}

export async function getJuicerFeed(): Promise<JuicerFeed> {
  const empty: JuicerFeed = { posts: [], live: false };

  try {
    const url = new URL(API_URL);
    url.searchParams.set("per", String(PER_PAGE));

    const res = await fetch(url, {
      headers: API_KEY ? { Authorization: `Bearer ${API_KEY}` } : undefined,
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return empty;

    const posts = itemsOf((await res.json()) as JuicerResponse)
      .map(toPost)
      .filter((p): p is SocialPost => p !== null);

    // Unlike the Instagram rail there is no committed fallback here: these
    // are TikTok posts nobody has curated by hand, so an empty result means
    // the rail is simply not rendered. A band with two rails is fine; a rail
    // of stand-in content pretending to be TikTok is not.
    return posts.length > 0 ? { posts, live: true } : empty;
  } catch {
    return empty;
  }
}
