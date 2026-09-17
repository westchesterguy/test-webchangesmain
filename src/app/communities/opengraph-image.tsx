import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Communities | Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "Communities",
    title: "Northern Westchester Towns",
    subtitle: "Local real estate expertise across CT and NY",
  });
}
