import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/accessibility" },
  title: "Accessibility Statement",
  description:
    "Accessibility statement for Michael Winter's website, describing our ongoing commitment to WCAG-aligned, inclusive web experiences and how to report accessibility issues.",
  openGraph: {
    title: "Accessibility Statement | Michael Winter",
    description:
      "Our ongoing commitment to an accessible, WCAG-aligned website and how to report accessibility issues.",
    url: `${SITE_URL}/accessibility`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          {
            name: "Accessibility Statement",
            url: `${SITE_URL}/accessibility`,
          },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <Overline className="mb-4">Legal</Overline>
            <h1 className="font-display text-display text-charcoal">
              Accessibility Statement
            </h1>
        </Section>

        {/* Content */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="max-w-3xl prose-custom space-y-10 text-body text-charcoal-light leading-relaxed">
              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Our Commitment
                </h2>
                <p>
                  Michael Winter is committed to ensuring that this website
                  is accessible to everyone, including people with disabilities.
                  We believe that real estate guidance should be available to all
                  visitors, and we work to provide a website experience that is
                  usable, perceivable, and understandable regardless of ability or
                  technology.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Standards We Follow
                </h2>
                <p>
                  We strive to align this website with the Web Content
                  Accessibility Guidelines (WCAG) 2.1 at Level AA, published by the
                  World Wide Web Consortium (W3C). These guidelines explain how to
                  make web content more accessible to people with a wide range of
                  disabilities, including visual, auditory, physical, speech,
                  cognitive, and neurological disabilities. Accessibility is an
                  ongoing effort, and we continue to review and improve the site
                  over time.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Measures We Take
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Using semantic, structured markup so the site works well with
                    screen readers and assistive technologies.
                  </li>
                  <li>
                    Providing descriptive text alternatives for meaningful images.
                  </li>
                  <li>
                    Designing for sufficient color contrast and readable
                    typography.
                  </li>
                  <li>
                    Supporting keyboard navigation, including a &ldquo;skip to
                    content&rdquo; link.
                  </li>
                  <li>
                    Reviewing accessibility considerations as new content and
                    features are added.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Ongoing Effort and Limitations
                </h2>
                <p>
                  Accessibility is a continuous process rather than a one-time
                  achievement. While we make every reasonable effort to conform to
                  recognized standards, some content or third-party components may
                  not yet be fully accessible. We are committed to addressing
                  issues as they are identified and to improving the experience
                  for all visitors.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Reporting an Accessibility Issue
                </h2>
                <p>
                  If you encounter any difficulty using this website, or if you
                  have a suggestion that would improve its accessibility, we want
                  to hear from you. Please reach out via the{" "}
                  <a
                    href="/contact"
                    className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                  >
                    contact page
                  </a>{" "}
                  and describe the issue, the page involved, and the assistive
                  technology you were using if applicable. We will make every
                  reasonable effort to respond promptly and to provide the
                  information or assistance you need.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Alternative Access
                </h2>
                <p>
                  If any information on this site is not accessible to you, please
                  contact us and we will be glad to provide that information in an
                  alternative format or to assist you directly with your real
                  estate questions.
                </p>
              </div>
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
