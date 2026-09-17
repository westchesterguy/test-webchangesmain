import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Insights | Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "Insights",
    title: "Market & lifestyle insight",
    subtitle: "Michael Winter",
  });
}
