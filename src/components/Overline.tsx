/** The repeated eyebrow/overline label, formalized into one primitive.
   tone="light" is for dark backgrounds (navy sections);
   tone="muted" is for de-emphasized fact/field labels. */
export function Overline({
  children,
  className = "",
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "muted";
}) {
  const color =
    tone === "light"
      ? "text-accent-light"
      : tone === "muted"
        ? "text-charcoal-muted"
        : "text-accent-dark";
  return (
    <p className={`text-overline uppercase font-medium ${color} ${className}`}>
      {children}
    </p>
  );
}
