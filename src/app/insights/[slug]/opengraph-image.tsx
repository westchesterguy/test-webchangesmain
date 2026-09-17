import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPostBySlug, getAllSlugs } from "@/data/insights";

export const alt = "Insights | Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return ogImage({
    overline: post?.topic ?? "Insights",
    title: post?.title ?? "Insights",
    subtitle: "Michael Winter",
  });
}
