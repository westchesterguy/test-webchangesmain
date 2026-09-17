import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { FadeIn } from "@/components/FadeIn";
import { AccentLine } from "@/components/AccentLine";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL, agent, officeList } from "@/lib/site";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Michael Winter",
  description: profile.aboutFull[0],
  openGraph: {
    title: "About Michael Winter",
    description: profile.aboutFull[0],
    url: `${SITE_URL}/about`,
  },
  twitter: {
    title: "About Michael Winter",
    description: profile.aboutFull[0],
  },
};

const faqs = [
  {
    question: "What areas does Michael Winter serve?",
    answer:
      "Michael serves buyers and sellers across Northern Westchester County, New York (Bedford, Bedford Hills, Katonah, Chappaqua, Pound Ridge, North Salem, South Salem, Armonk, and Mount Kisco) and the surrounding towns.",
  },
  {
    question: "Is Michael licensed in both New York and Connecticut?",
    answer:
      "Yes. Michael is a Licensed Real Estate Salesperson in both New York and Connecticut, working from Julia B. Fee Sotheby's International Realty in Bedford, NY.",
  },
  {
    question: "Who is The Westchester Guy?",
    answer:
      "The Westchester Guy is Michael Winter, the name he's known by across Northern Westchester through his video series and social media (@westchesternyhomes), where more than 22,000 people follow his town tours, local business spotlights, and Ask Michael Q&A.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: { "@id": `${SITE_URL}/#realestateagent` },
          dateModified: "2026-06-01",
          url: `${SITE_URL}/about`,
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }) }}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-32 md:pt-40 pb-16 md:pb-20" className="bg-cream">
          <Overline className="mb-4">About</Overline>
          <h1 className="font-display text-display text-charcoal">
            About Michael Winter
          </h1>
        </Section>

        {/* Extended Bio */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
              {/* Sidebar - Photo + Quick Facts */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <FadeIn direction="left">
                    <div className="relative aspect-[3/4] max-w-xs mx-auto lg:max-w-none mb-10">
                      <Image
                        src={agent.headshot}
                        alt={`${agent.fullName}, ${agent.title}`}
                        fill
                        priority
                        className="object-cover object-top rounded-sm shadow-[var(--shadow-lg)]"
                        sizes="(max-width: 1024px) 320px, 33vw"
                      />
                      <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/30 rounded-sm -z-10" />
                      <div className="absolute -bottom-6 -right-6 w-full h-full border border-accent/10 rounded-sm -z-20" />
                    </div>
                  </FadeIn>

                  {/* Quick Facts */}
                  <div className="space-y-6 border-t border-border pt-8">
                    <div>
                      <Overline tone="muted" className="mb-1">
                        Title
                      </Overline>
                      <p className="text-body text-charcoal">
                        {agent.title}
                      </p>
                    </div>
                    <div>
                      <Overline tone="muted" className="mb-1">
                        Licensed
                      </Overline>
                      <p className="text-body text-charcoal">
                        New York and Connecticut
                      </p>
                    </div>
                    <div>
                      <Overline tone="muted" className="mb-1">
                        Brokerages
                      </Overline>
                      <ul className="text-body text-charcoal space-y-3">
                        {officeList.map((office) => (
                          <li key={office.label}>
                            {office.brokerage}
                            <br />
                            <span className="text-charcoal-light text-small">
                              {office.city}, {office.region}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Overline tone="muted" className="mb-1">
                        Specialties
                      </Overline>
                      <ul className="text-body text-charcoal space-y-1">
                        {profile.specialties.map((specialty) => (
                          <li key={specialty}>{specialty}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Overline tone="muted" className="mb-1">
                        Recognition
                      </Overline>
                      <ul className="text-body text-charcoal space-y-1">
                        {profile.recognition.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="max-w-2xl">
                  {/* Decorative line */}
                  <AccentLine className="mb-10" />

                  <div className="space-y-7 text-body text-charcoal-light leading-relaxed">
                    <p className="text-subheading text-charcoal font-light leading-relaxed">
                      {profile.aboutFull[0]}
                    </p>

                    <h2 className="font-display text-2xl text-charcoal pt-4">
                      Experience &amp; Approach
                    </h2>

                    <p>{profile.aboutFull[1]}</p>

                    <p>{profile.aboutFull[2]}</p>

                    <p>
                      See what that approach looks like in practice for{" "}
                      <Link href="/buyers" className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors">
                        buyers
                      </Link>{" "}
                      and{" "}
                      <Link href="/sellers" className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors">
                        sellers
                      </Link>.
                    </p>

                    <h2 className="font-display text-2xl text-charcoal pt-4">
                      Communities Served
                    </h2>

                    <p>
                      Michael&apos;s market is Northern Westchester:{" "}
                      {profile.serviceAreas.ny.join(", ")}, and the surrounding
                      towns. Explore the{" "}
                      <Link href="/communities" className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors">
                        community guides
                      </Link>{" "}
                      for a closer look at each market.
                    </p>

                    <h2 className="font-display text-2xl text-charcoal pt-4">
                      The Westchester Guy
                    </h2>

                    <p>
                      Around Northern Westchester, Michael is known as The
                      Westchester Guy, the voice behind a video series followed
                      by more than 22,000 people, spotlighting the towns, the
                      local businesses, and the real questions buyers and
                      sellers ask.
                    </p>

                    <h2 className="font-display text-2xl text-charcoal pt-4">
                      Frequently Asked Questions
                    </h2>

                    {faqs.map((faq) => (
                      <div key={faq.question}>
                        <h3 className="font-display text-lg text-charcoal pt-2">
                          {faq.question}
                        </h3>
                        <p>{faq.answer}</p>
                      </div>
                    ))}
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-14 pt-10 border-t border-border">
                    <p className="text-body text-charcoal-light mb-6">
                      Ready to make a move, or just exploring? Let&apos;s talk.
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors group"
                      >
                        Get in touch
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                      <a
                        href={agent.scheduling}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors"
                      >
                        Schedule a Consultation
                      </a>
                      <a
                        href={profile.contact.sothebysProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors"
                      >
                        Professional Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
