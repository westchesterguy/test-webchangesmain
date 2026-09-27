import { SocialFeedCarousel } from "./SocialFeedCarousel";
import { socialAccount, socialProfiles, type SocialPost } from "@/data/social";
import { getInstagramFeed } from "@/lib/instagramFeed";
import { getJuicerFeed } from "@/lib/juicerFeed";
import { linkedInPosts, linkedInProfile } from "@/data/linkedin";
import { agent } from "@/lib/site";

/**
 * The social band that closes every page: a live Instagram rail, a curated
 * LinkedIn one under it, and an aggregated rail under that for everything
 * wired into Juicer.
 *
 * A server component purely so it can fetch — the carousels track their own
 * scroll position and have to run in the browser, and a client component
 * cannot await anything. Everything visual lives there; this decides what
 * each rail is given.
 *
 * One heading covers every rail. The ones below the first run headerless on
 * purpose: repeated headings would read as separate sections, and this is one
 * band showing the same person in several places.
 *
 * Three rails is a long band, longest on a phone where each one is close to a
 * full screen before the call to action. If it needs shortening, the change is
 * here and in the carousel — one rail with a platform filter above it, rather
 * than dropping a platform.
 *
 * The Instagram handle and profile link come from the feed rather than from
 * config, because the feed knows which account it is actually pulling from
 * and config does not. Config is used only when the committed posts are
 * standing in, where naming the account they came from is correct again.
 */
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
      <SocialFeedCarousel
        posts={posts}
        accountName={socialAccount.name}
        handle={handle ?? socialAccount.handle}
        profiles={profiles}
      />
      {/* The LinkedIn rail is Michael's own profile, so it carries his name
          and his headline — the way LinkedIn itself labels a post — rather
          than the site's brand account and an @handle it does not have. */}
      {linkedIn.length > 0 && (
        <SocialFeedCarousel
          posts={linkedIn}
          accountName={agent.name}
          avatar="/images/mw-linkedin-avatar.jpg"
          handle={agent.title}
          profiles={profiles}
          platform="linkedin"
          showHeader={false}
        />
      )}
      {/* The aggregated rail. Its posts carry their own platform, author
          and handle, so the cards are labelled individually and everything
          passed here is only the fallback — which is why the handle is
          empty rather than guessed. This site knows Michael's Instagram
          handle; his handle on any other platform is a fact that arrives
          with the post. Absent when Juicer returns nothing, which is the
          correct outcome for a rail with no curated content to stand in. */}
      {juicer.live && (
        <SocialFeedCarousel
          posts={juicer.posts}
          accountName={socialAccount.name}
          handle=""
          profiles={profiles}
          platform="tiktok"
          showHeader={false}
        />
      )}
    </section>
  );
}
