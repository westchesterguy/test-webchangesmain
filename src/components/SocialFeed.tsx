import { SocialFeedCarousel } from "./SocialFeedCarousel";
import { socialAccount, socialProfiles } from "@/data/social";
import { getInstagramFeed } from "@/lib/instagramFeed";

/**
 * The social band that closes every page.
 *
 * A server component purely so it can fetch: the carousel below tracks its own
 * scroll position and has to run in the browser, and a client component cannot
 * await anything. Everything visual lives there; this decides what it is given.
 *
 * Both the handle on the cards and the Instagram link in the header come from
 * the feed rather than from config, because the feed knows which account it is
 * actually pulling from and config does not — site.ts still names the account
 * these sites were built around, and this feed is a different one. Config is
 * used only when the live feed is unavailable and the committed posts are
 * standing in, where naming the account the posts came from is correct again.
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

  return (
    <SocialFeedCarousel
      posts={posts}
      handle={handle ?? socialAccount.handle}
      profiles={profiles}
    />
  );
}
