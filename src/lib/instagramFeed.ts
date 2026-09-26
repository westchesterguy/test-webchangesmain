import { socialFeed as fallbackPosts, type SocialPost } from "@/data/social";

/**
 * The live Instagram feed, via Behold.
 *
 * This is the hub's own Behold feed, id 2nN9kAtioTuEfwKxEbVc. The horse site
 * runs a different feed ("horsefeed") on a different account, so a change here
 * is not a change there — check the id against the dashboard before assuming
 * which feed you are looking at.
 *
 * Behold holds the Meta token and refreshes it, so nothing here expires and
 * there is no credential in this repo. The endpoint is public — it is what a
 * browser would fetch — so it sits in config rather than a secret, and
 * BEHOLD_FEED_URL overrides it per deployment if the feed is regenerated.
 *
 * Two things about the payload decide the shape of this file.
 *
 * Each post carries BOTH `mediaUrl`/`thumbnailUrl`, which are raw
 * cdninstagram links signed with an `oe=` expiry, AND `sizes.*.mediaUrl`,
 * which Behold re-hosts on its own domain. Only the re-hosted ones are used:
 * the Instagram originals 404 within hours, and a card whose image has quietly
 * died is worse than one that never went live. A post without a re-hosted
 * image is skipped rather than rendered with a link that will break.
 *
 * Nothing here throws. The band appears on five pages, and a feed that is
 * slow, rate-limited or reshaped must never take a page down with it — every
 * failure lands on the posts committed to data/social.ts instead.
 */

/** The hub's Behold feed. The account it pulls is read from the payload at
 *  run time rather than asserted here, so this cannot drift out of date. */
const FEED_URL =
  process.env.BEHOLD_FEED_URL ??
  "https://feeds.behold.so/2nN9kAtioTuEfwKxEbVc";

/**
 * How long a cached copy is served before Next refetches, in seconds.
 *
 * Half an hour, deliberately no longer than Behold's own pull from Instagram:
 * the two waits stack, and a cache slower than the source adds delay that
 * buys nothing. Next also serves the stale copy to the first visitor after
 * this expires while it rebuilds behind them, so a new post can need one
 * further reload. Shorten this if Behold's plan starts pulling more often.
 */
const REVALIDATE = 1800;

interface BeholdSize {
  width?: number;
  height?: number;
  mediaUrl?: string;
}

interface BeholdPost {
  id?: string;
  permalink?: string;
  caption?: string;
  prunedCaption?: string;
  timestamp?: string;
  likeCount?: number;
  commentsCount?: number;
  mediaType?: string;
  sizes?: Record<string, BeholdSize | undefined>;
}

interface BeholdFeed {
  username?: string;
  posts?: BeholdPost[];
}

export interface LiveFeed {
  posts: SocialPost[];
  /** The account the posts came from, so the cards name the right one. */
  handle: string | null;
  /** False when the fallback is being shown, so callers can tell. */
  live: boolean;
}

/**
 * A caption is not a description of a picture, so it cannot be alt text. The
 * card shows this as its visible label instead, and the image is left
 * decorative — announcing a marketing caption as though it described the
 * photograph would be worse for a screen reader than silence.
 */
function toTitle(post: BeholdPost): string {
  const source = post.prunedCaption ?? post.caption ?? "";
  const firstLine = source
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstLine) return "View on Instagram";
  return firstLine.length > 70 ? `${firstLine.slice(0, 69).trimEnd()}…` : firstLine;
}

function toPost(post: BeholdPost): SocialPost | null {
  // Ordered by preference: the cards are 300px wide and render at up to 2x,
  // so "medium" is the smallest that still holds up on a retina screen.
  const sizes = post.sizes ?? {};
  const poster =
    sizes.medium?.mediaUrl ?? sizes.large?.mediaUrl ?? sizes.small?.mediaUrl;
  if (!poster || !post.permalink) return null;

  return {
    poster,
    href: post.permalink,
    title: toTitle(post),
    alt: "",
  };
}

export async function getInstagramFeed(): Promise<LiveFeed> {
  const fallback: LiveFeed = { posts: fallbackPosts, handle: null, live: false };

  try {
    const res = await fetch(FEED_URL, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return fallback;

    const data = (await res.json()) as BeholdFeed;
    const posts = (data.posts ?? [])
      .map(toPost)
      .filter((p): p is SocialPost => p !== null);

    // An empty or unrecognisable payload is a failure, not an empty feed.
    if (posts.length === 0) return fallback;

    return {
      posts,
      handle: data.username ? `@${data.username}` : null,
      live: true,
    };
  } catch {
    return fallback;
  }
}
