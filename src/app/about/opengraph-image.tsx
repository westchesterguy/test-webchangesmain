import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "About Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "About",
    title: "Michael Winter",
    subtitle: "Licensed Real Estate Salesperson · CT & NY",
  });
}
