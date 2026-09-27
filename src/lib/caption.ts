/**
 * Turning a social caption into a card label.
 *
 * Shared by the Instagram and Juicer loaders because both face the same
 * problem and must answer it the same way: a caption is written to be read
 * under a photograph in an app, not as a line of UI on a website, so it
 * arrives with line breaks, hashtag tails and sometimes markup.
 *
 * A caption is also not a description of a picture, so it never becomes alt
 * text. The card shows it as a visible label and leaves the image
 * decorative; announcing a marketing caption as though it described the
 * photograph would be worse for a screen reader than silence.
 */

/** Longest label a 300px card holds before the CSS truncates it anyway. */
const MAX = 70;

/**
 * The first real line of a caption, trimmed to fit a card.
 *
 * `fallback` is what a post with no caption shows. It is a required argument
 * rather than a default, because the right words depend on where the post
 * came from and a generic one would end up on the wrong platform's card.
 */
export function toCaption(source: string | undefined | null, fallback: string): string {
  if (!source) return fallback;

  // Juicer returns the caption as HTML; Behold returns it as plain text.
  // Stripping tags is safe for both, and leaves the text either way.
  const text = source
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const firstLine = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (!firstLine) return fallback;
  return firstLine.length > MAX ? `${firstLine.slice(0, MAX - 1).trimEnd()}…` : firstLine;
}
