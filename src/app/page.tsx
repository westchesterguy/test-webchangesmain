import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TownTicker } from "@/components/TownTicker";
import { ActionCards } from "@/components/ActionCards";
import { Statement } from "@/components/Statement";
import { NeighborhoodGrid } from "@/components/NeighborhoodGrid";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Testimonials } from "@/components/Testimonials";
import { Insights } from "@/components/Insights";
import { ContactPanel } from "@/components/ContactPanel";
import { Footer } from "@/components/Footer";
import { SocialFeed } from "@/components/SocialFeed";

// Homepage: viewport hero → runway town ticker → full-bleed Buy/Sell/Rent →
// editorial statement → neighborhood wall → about teaser → testimonials →
// insights → social → black contact panel. The IDX New Listings strip slots
// in after the neighborhood wall when Phase 3 lands.
//
// Testimonials sit directly after the about teaser on purpose: the teaser is
// Michael's own account of himself, and the reviews are somebody else's, so
// the claim and the corroboration read as one movement before the page moves
// on to his writing.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TownTicker />
        <ActionCards />
        <Statement />
        <NeighborhoodGrid />
        <AboutTeaser />
        <Testimonials />
        <Insights />
        <SocialFeed />
        <ContactPanel />
      </main>
      <Footer />
    </>
  );
}
