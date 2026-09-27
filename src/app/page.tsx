import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TownTicker } from "@/components/TownTicker";
import { ActionCards } from "@/components/ActionCards";
import { Statement } from "@/components/Statement";
import { NeighborhoodGrid } from "@/components/NeighborhoodGrid";
import { AboutTeaser } from "@/components/AboutTeaser";
import { InstagramReels } from "@/components/InstagramReels";
import { Testimonials } from "@/components/Testimonials";
import { Insights } from "@/components/Insights";
import { ContactPanel } from "@/components/ContactPanel";
import { Footer } from "@/components/Footer";

// Homepage: viewport hero → runway town ticker → full-bleed Buy/Sell/Rent →
// editorial statement → neighborhood wall → about teaser → Instagram reels →
// testimonials → insights → black contact panel. The IDX New Listings strip
// slots in after the neighborhood wall when Phase 3 lands.
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
        <Testimonials />
        <Insights />
        <ContactPanel />
      </main>
      <Footer />
    </>
  );
}
