import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Overline } from "@/components/Overline";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="min-h-[70vh] flex items-center justify-center bg-cream">
          <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
            <Overline className="mb-4">404</Overline>
            <h1 className="font-display text-display text-charcoal mb-6">
              Page not found.
            </h1>
            <p className="text-body text-charcoal-light leading-relaxed mb-10">
              The page you are looking for does not exist or has been moved.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors group"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to home
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
