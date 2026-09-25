import { SocialFeedCarousel } from "./SocialFeedCarousel";
import { socialAccount, socialProfiles, type SocialPost } from "@/data/social";
import { getInstagramFeed } from "@/lib/instagramFeed";
import { linkedInPosts, linkedInProfile } from "@/data/linkedin";
import { agent } from "@/lib/site";

/**
 * The social band that closes every page: a live Instagram rail, then a
 * curated LinkedIn one directly under it.
 *
 * A server component purely so it can fetch — the carousels track their own
 * scroll position and have to run in the browser, and a client component
 * cannot await anything. Everything visual lives there; this decides what
 * each rail is given.
 *
 * One heading covers both rails. The second runs headerless on purpose: two
 * headings would read as two sections, and this is one band showing the same
 * person in two places.
 *
 * The Instagram handle and profile link come from the feed rather than from
 * config, because the feed knows which account it is actually pulling from
 * and config does not. Config is used only when the committed posts are
 * standing in, where naming the account they came from is correct again.
 */
export async function SocialFeed() {
  const { posts, handle, live } = await getInstagramFeed();

  const profiles =
    live && handle
      ? socialProfiles.map((p) =>
          p.label === "Instagram"
            ? { ...p, href: `https://www.instagram.com/${handle.slice(1)}/` }
            : p,
        )
      : socialProfiles;

  // Screenshots carry no caption and no permalink, so the cards state neither.
  // A made-up caption or a link to the wrong post would both be worse than the
  // frame and a link to the profile it came from.
  const linkedIn: SocialPost[] = linkedInPosts.map((post) => ({
    poster: post.image,
    href: post.href ?? linkedInProfile,
    title: "",
    alt: "",
  }));

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="border-t border-border bg-surface"
    >
      <SocialFeedCarousel posts={posts} handle={handle ?? socialAccount.handle} profiles={profiles} />
      {/* LinkedIn has no @handle, so the second line carries the headline the
          way LinkedIn itself does, rather than repeating the name. */}
      {linkedIn.length > 0 && (
        <SocialFeedCarousel
          posts={linkedIn}
          handle={agent.title}
          profiles={profiles}
          platform="linkedin"
          showHeader={false}
        />
      )}
    </section>
  );
}
