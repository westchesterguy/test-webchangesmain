import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "Contact",
    title: "Let's talk",
    subtitle: "Michael Winter · Bedford, NY",
  });
}
