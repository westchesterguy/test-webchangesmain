import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { ContactForm } from "./ContactForm";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL, agent, officeList } from "@/lib/site";
import { profile } from "@/data/profile";

const DESCRIPTION =
  "Reach Michael Winter (the Westchester Guy) or schedule a consultation. Serving buyers and sellers across Northern Westchester County, NY.";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Michael Winter",
  description: DESCRIPTION,
  openGraph: {
    title: "Contact Michael Winter",
    description: DESCRIPTION,
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    title: "Contact Michael Winter",
    description: DESCRIPTION,
  },
};

const primaryOffice = agent.offices.bedford;
const mapQuery = `${primaryOffice.street}, ${primaryOffice.city}, ${primaryOffice.region} ${primaryOffice.postalCode}`;
const mapAddress = `${primaryOffice.street}, ${primaryOffice.city}, ${primaryOffice.region} ${primaryOffice.postalCode}`;

export default function ContactPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-32 md:pt-40 pb-16 md:pb-20" className="bg-cream">
          <Overline className="mb-4">Contact</Overline>
          <h1 className="font-display text-display text-charcoal mb-6">
            Let&apos;s talk.
          </h1>
          <p className="text-subheading text-charcoal-light font-light max-w-2xl leading-relaxed">
            Whether you&apos;re buying, selling, or simply weighing your options,
            Michael is here to help, across Bedford, Katonah, Chappaqua,
            Pound Ridge, and all of Northern Westchester.
          </p>
        </Section>

        {/* Form + Info */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
              {/* Form */}
              <div className="lg:col-span-7">
                <div className="w-12 h-px bg-[image:var(--gradient-accent)] mb-10" />
                <ContactForm />
              </div>

              {/* Info Sidebar */}
              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-10">
                  {/* Phone */}
                  <div>
                    <Overline tone="muted" className="mb-3">
                      Phone
                    </Overline>
                    <a
                      href={`tel:${agent.phone}`}
                      className="text-body text-charcoal hover:text-accent-dark transition-colors"
                    >
                      {agent.phoneDisplay}
                    </a>
                  </div>

                  {/* Schedule */}
                  <div>
                    <Overline tone="muted" className="mb-3">
                      Schedule
                    </Overline>
                    <a
                      href={agent.scheduling}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-small uppercase tracking-[0.08em] font-medium rounded-sm hover:bg-navy-light transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      Schedule a Consultation
                    </a>
                  </div>

                  {/* Offices */}
                  <div>
                    <Overline tone="muted" className="mb-3">
                      Offices
                    </Overline>
                    <div className="space-y-6">
                      {officeList.map((office) => (
                        <address
                          key={office.label}
                          className="not-italic text-body text-charcoal leading-relaxed"
                        >
                          <span className="font-medium">{office.brokerage}</span>
                          <br />
                          {office.street}
                          <br />
                          {office.city}, {office.region} {office.postalCode}
                          {office.primary && (
                            <span className="block text-charcoal-muted text-small mt-1">
                              Primary office
                            </span>
                          )}
                        </address>
                      ))}
                    </div>
                  </div>

                  {/* Connect */}
                  <div>
                    <Overline tone="muted" className="mb-3">
                      Connect
                    </Overline>
                    <div className="flex flex-col gap-3">
                      <a
                        href={profile.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-body text-charcoal hover:text-accent-dark transition-colors group"
                      >
                        <span className="w-9 h-9 rounded-full border border-border group-hover:border-accent transition-colors flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </span>
                        LinkedIn
                      </a>
                      <a
                        href={profile.contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-body text-charcoal hover:text-accent-dark transition-colors group"
                      >
                        <span className="w-9 h-9 rounded-full border border-border group-hover:border-accent transition-colors flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </span>
                        Instagram
                      </a>
                      <a
                        href={profile.contact.sothebysProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-body text-charcoal hover:text-accent-dark transition-colors group"
                      >
                        <span className="w-9 h-9 rounded-full border border-border group-hover:border-accent transition-colors flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3a1 1 0 001-1V10"
                            />
                          </svg>
                        </span>
                        Professional Profile
                      </a>
                    </div>
                  </div>

                  {/* Google Maps — primary Bedford office */}
                  <div>
                    <Overline tone="muted" className="mb-3">
                      Location
                    </Overline>
                    <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border">
                      <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Office location: ${mapAddress}`}
                      />
                    </div>
                  </div>
                </div>
              </aside>
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
