import { SocialFeedCarousel } from "./SocialFeedCarousel";
import { socialAccount, socialProfiles, type SocialPost } from "@/data/social";
import { getInstagramFeed } from "@/lib/instagramFeed";
import { getJuicerFeed } from "@/lib/juicerFeed";
import { linkedInPosts, linkedInProfile } from "@/data/linkedin";
import { agent } from "@/lib/site";

/**
 * The social band that closes every page: one rail, filtered by platform.
 *
 * It was three stacked rails, one per source. That was a long band — measured
 * at 1,496px on a desktop and close to three full screens on a phone, all of
 * it before the call to action — and it made the same point three times. One
 * rail says it once and lets someone narrow it if they want to.
 *
 * A server component purely so it can fetch: the rail tracks its own scroll
 * position and has to run in the browser, and a client component cannot await
 * anything. Everything visual lives there; this decides what it is given.
 *
 * Each post carries its own author, handle, picture and platform, because a
 * mixed rail cannot take those from the rail any more. That is also what lets
 * the filter work on the client without a second fetch: every post is in the
 * markup from the start and the filter only hides.
 *
 * The Instagram handle and profile link come from the feed rather than from
 * config, because the feed knows which account it is actually pulling from
 * and config does not. Config is used only when the committed posts are
 * standing in, where naming the account they came from is correct again.
 */

/**
 * Interleave the sources rather than concatenate or sort them.
 *
 * Sorting by date is not available: the LinkedIn posts are curated
 * screenshots and carry none. Concatenating would put every Instagram post
 * first, so the other platforms would live past the right edge where nobody
 * scrolls. Round-robin means the opening cards show all three, which is the
 * whole argument for merging the rails in the first place.
 */
function interleave(groups: SocialPost[][]): SocialPost[] {
  const out: SocialPost[] = [];
  const longest = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < longest; i++) {
    for (const group of groups) {
      if (group[i]) out.push(group[i]);
    }
  }
  return out;
}

export async function SocialFeed() {
  // Independent sources, so they are fetched together rather than in turn.
  // Neither rejects: both loaders resolve to an empty or fallback feed.
  const [{ posts, handle, live }, juicer] = await Promise.all([
    getInstagramFeed(),
    getJuicerFeed(),
  ]);

  const profiles =
    live && handle
      ? socialProfiles.map((p) =>
          p.label === "Instagram"
            ? { ...p, href: `https://www.instagram.com/${handle.slice(1)}/` }
            : p,
        )
      : socialProfiles;

  const instagram: SocialPost[] = posts.map((post) => ({
    ...post,
    platform: "instagram",
    authorName: socialAccount.name,
    authorHandle: handle ?? socialAccount.handle,
  }));

  // Screenshots carry no caption and no permalink, so the cards state neither.
  // A made-up caption or a link to the wrong post would both be worse than the
  // frame and a link to the profile it came from. They are Michael's own
  // profile, so they carry his name and his headline, the way LinkedIn itself
  // labels a post, rather than the site's brand account and an @handle it does
  // not have.
  const linkedIn: SocialPost[] = linkedInPosts.map((post) => ({
    poster: post.image,
    href: post.href ?? linkedInProfile,
    title: "",
    alt: "",
    platform: "linkedin",
    authorName: agent.name,
    authorHandle: agent.title,
    authorAvatar: "/images/mw-linkedin-avatar.jpg",
  }));

  // Juicer's posts already name their own author, handle, picture and
  // platform, so they pass through untouched.
  const all = interleave([instagram, linkedIn, juicer.live ? juicer.posts : []]);

  if (all.length === 0) return null;

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="border-t border-border bg-surface pb-14 md:pb-20"
    >
      <SocialFeedCarousel posts={all} profiles={profiles} />
    </section>
  );
}
