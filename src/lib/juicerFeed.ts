import { toCaption } from "./caption";
import type { SocialPost } from "@/data/social";

/**
 * The aggregated rail, read from Juicer. Today that is TikTok; the same feed
 * takes other platforms without a change here.
 *
 * Juicer plays the role Behold plays for Instagram. It holds the platform
 * credentials and absorbs each platform's API changes, which is the whole
 * reason to pay for it: TikTok's own Display API would mean an app review
 * and a refresh token somebody has to keep alive, and a token that dies
 * quietly takes the rail down with it.
 *
 * Mapped against a real response from feed michael-winter082, read
 * 2026-09-27. Three things in that payload decided the shape of this file.
 *
 * First, Juicer re-hosts. Every image came back on www.juicer.io rather than
 * as a passed-through tiktokcdn link, so the cards do not inherit TikTok's
 * signed URLs, which expire within hours. That is the difference between a
 * rail that holds up and one that goes blank on a page nobody is watching,
 * so it is enforced rather than assumed: see REHOSTED_HOSTS.
 *
 * Second, the posts carry no captions. Every item came back with an empty
 * `unformatted_message` and a `message` of "<p></p>", because these are
 * TikToks posted without a description. A row of cards all reading the same
 * placeholder would be worse than no text, so a caption-less post falls back
 * to its own date, which is a fact the payload actually contains. Posts that
 * do have captions still use them, which matters the moment another platform
 * joins the feed.
 *
 * Third, each post names its own author, handle and picture. Those are used
 * per card rather than the rail's, because the feed can be mixed and because
 * this site knows Michael's Instagram handle, not his handle everywhere
 * else. A handle that arrives with the post is a fact; one inferred from
 * config would be a guess printed in public.
 */

/**
 * The feed to read, by its Juicer name. Overridable per deployment so each
 * site can point at its own feed without a second copy of this file.
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

/**
 * How long a cached copy is served before Next refetches, in seconds.
 *
 * The feed reports its own sync cadence as `update_frequency`, which read 60
 * minutes on the trial plan. Half of that, for the same reason the Instagram
 * loader sits under Behold's pull: the two waits stack, and a cache slower
 * than its source adds delay that buys nothing.
 */
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
const REHOSTED_HOSTS = ["juicer.io"];

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
      return "tiktok";
    default:
      // A platform we have no glyph for still gets a card; it simply shows
      // the rail's default mark rather than a wrong logo.
      return undefined;
  }
}

/**
 * What a caption-less post says instead.
 *
 * The date the post went up, which is in the payload and is therefore true.
 * Written out on the server so the client component is handed a finished
 * string and cannot disagree with it over a locale or a timezone.
 */
function toDateLabel(iso: string | undefined): string {
  if (!iso) return "View on TikTok";
  const at = new Date(iso);
  if (Number.isNaN(at.getTime())) return "View on TikTok";
  return at.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

/** One post, as the feed returns it. Optional throughout: a reshaped payload
 *  should cost cards, never the five routes this band renders on. */
interface JuicerItem {
  image?: string;
  full_url?: string;
  external_created_at?: string;
  unformatted_message?: string;
  message?: string;
  poster_name?: string;
  poster_display_name?: string;
  poster_image?: string;
  source?: { source?: string };
  media?: { type?: string }[];
}

interface JuicerResponse {
  posts?: { items?: JuicerItem[] };
}

export interface JuicerFeed {
  posts: SocialPost[];
  /** False when nothing usable came back, so the caller can omit the rail. */
  live: boolean;
}

function toPost(item: JuicerItem): SocialPost | null {
  const poster = item.image;
  const href = item.full_url;
  if (!poster || !href) return null;

  // The rule this rail lives or dies by. See REHOSTED_HOSTS above.
  if (!isRehosted(poster)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[juicer] skipped a post: image is not on a Juicer host (${poster}). ` +
          `If Juicer has moved domains, add it to REHOSTED_HOSTS in ` +
          `src/lib/juicerFeed.ts and to remotePatterns in next.config.ts.`,
      );
    }
    return null;
  }

  return {
    poster,
    href,
    title: toCaption(
      item.unformatted_message ?? item.message,
      toDateLabel(item.external_created_at),
    ),
    alt: "",
    platform: toPlatform(item.source?.source),
    authorName: item.poster_name,
    authorHandle: item.poster_display_name,
    // Held to the same rule as the post image: a picture we cannot vouch for
    // the lifetime of is left off, and the card falls back to the brand mark.
    authorAvatar:
      item.poster_image && isRehosted(item.poster_image) ? item.poster_image : undefined,
    // Read from the post, not assumed from the platform: this feed takes
    // photo platforms too, and a play badge on a photograph is a lie.
    video: (item.media ?? []).some((m) => (m.type ?? "").toLowerCase() === "video"),
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

    const data = (await res.json()) as JuicerResponse;
    const posts = (data.posts?.items ?? [])
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
