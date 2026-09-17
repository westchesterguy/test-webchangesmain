import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { Overline } from "./Overline";

/**
 * The neighborhood wall — 2023's asymmetric video grid, now edge-to-edge
 * with hairline joints. Three tiles play the recovered town footage; stills
 * sit grayscale and take color on hover. The sixth tile is typographic and
 * indexes all nine towns.
 */

type Tile =
  | { kind: "video"; name: string; slug: string; src: string; poster: string }
  | { kind: "image"; name: string; slug: string; src: string };

const northSalem: Tile = { kind: "video", name: "North Salem", slug: "north-salem", src: "/videos/north.mp4", poster: "/videos/north-poster.jpg" };
const poundRidge: Tile = { kind: "image", name: "Pound Ridge", slug: "pound-ridge", src: "/images/pound-ridge.webp" };
const katonah: Tile = { kind: "video", name: "Katonah", slug: "katonah", src: "/videos/katonnah.mp4", poster: "/videos/katonnah-poster.jpg" };
const bedford: Tile = { kind: "video", name: "Bedford", slug: "bedford", src: "/videos/bedfordnynew.mp4", poster: "/videos/bedfordnynew-poster.jpg" };
const southSalem: Tile = { kind: "image", name: "South Salem", slug: "south-salem", src: "/images/lewisboro.webp" };

function TileMedia({ tile }: { tile: Tile }) {
  if (tile.kind === "video") {
    return (
      <>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={tile.poster}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          aria-hidden="true"
        >
          <source src={tile.src} type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tile.poster}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
      </>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tile.src}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
    />
  );
}

function GridTile({ tile, className = "" }: { tile: Tile; className?: string }) {
  return (
    <Link
      href={`/communities/${tile.slug}`}
      className={`group relative block overflow-hidden bg-black ${className}`}
    >
      <TileMedia tile={tile} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <span className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-small font-medium text-charcoal transition-colors group-hover:bg-charcoal group-hover:text-white">
          {tile.name}
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5.75 12.5L10.25 8L5.75 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function NeighborhoodGrid() {
  return (
    <section className="bg-warm-white">
      <div className="px-6 pt-20 pb-10 md:px-10 md:pt-28 md:pb-12">
        <FadeIn>
          <Overline className="mb-4">Featured Neighborhoods</Overline>
          <h2 className="max-w-3xl font-display text-heading text-charcoal">
            The towns best suited to your lifestyle.
          </h2>
        </FadeIn>
      </div>

      <div className="border-y border-border bg-border">
        <div className="grid gap-px lg:grid-cols-2">
          {/* Left column */}
          <div className="grid gap-px">
            <div className="grid gap-px sm:grid-cols-2">
              <GridTile tile={northSalem} className="h-80" />
              <GridTile tile={poundRidge} className="h-80" />
            </div>
            <GridTile tile={katonah} className="h-96" />
          </div>

          {/* Right column */}
          <div className="grid gap-px">
            <GridTile tile={bedford} className="h-96" />
            <div className="grid gap-px sm:grid-cols-2">
              <GridTile tile={southSalem} className="h-80" />
              <Link
                href="/communities"
                className="group relative flex h-80 flex-col justify-between bg-warm-white p-6 transition-colors hover:bg-[#0A0A0A]"
              >
                <Overline className="transition-colors group-hover:text-white/60">
                  And more
                </Overline>
                <div>
                  <p className="font-display text-2xl leading-snug text-charcoal transition-colors group-hover:text-white">
                    Chappaqua, Armonk, Mount&nbsp;Kisco, Bedford&nbsp;Hills…
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-small font-medium uppercase tracking-[0.08em] text-accent-dark transition-colors group-hover:text-white">
                    All nine towns
                    <svg className="h-4 w-4 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
