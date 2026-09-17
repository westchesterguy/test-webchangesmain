import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TownTicker } from "@/components/TownTicker";
import { ActionCards } from "@/components/ActionCards";
import { Statement } from "@/components/Statement";
import { NeighborhoodGrid } from "@/components/NeighborhoodGrid";
import { AboutTeaser } from "@/components/AboutTeaser";
import { InstagramReels } from "@/components/InstagramReels";
import { Insights } from "@/components/Insights";
import { ContactPanel } from "@/components/ContactPanel";
import { Footer } from "@/components/Footer";

// Homepage: viewport hero → runway town ticker → full-bleed Buy/Sell/Rent →
// editorial statement → neighborhood wall → about teaser → Instagram reels →
// insights → black contact panel. The IDX New Listings strip slots in after
// the neighborhood wall when Phase 3 lands. Testimonials return once real
// reviews replace the placeholders.
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
        <InstagramReels />
        <Insights />
        <ContactPanel />
      </main>
      <Footer />
    </>
  );
}
