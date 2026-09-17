/** Shared section rhythm — one place to tune vertical spacing + container width.
   `padding` overrides the home-page rhythm (standalone pages use py-20 md:py-28,
   page heros pt-36 md:pt-40 pb-16 md:pb-20). `background` renders decorative
   layers between the section and the container — pair it with
   className="relative overflow-hidden" and containerClassName="relative". */
export function Section({
  id,
  className = "",
  containerClassName = "",
  padding = "py-24 md:py-32",
  background,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  padding?: string;
  background?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${padding} ${className}`}>
      {background}
      <div className={`max-w-6xl mx-auto px-6 md:px-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
