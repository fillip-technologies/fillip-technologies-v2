"use client";

const brands = [
  "PATNA ZOO",
  "ENGINEERS CLINIC",
  "FILLIP ERP",
  "ABC EDUCATION",
  "REAL ESTATE",
  "HEALTHCARE",
  "ECOMMERCE",
  "PROFESSIONAL SERVICES",
];

export default function TrustedBrandsSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-12">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Label */}
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--body)]">
            Trusted By Growing Brands
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden">
        <div className="flex min-w-full animate-marquee items-center gap-12 whitespace-nowrap">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-12"
            >
              <span className="text-lg font-bold tracking-[0.08em] text-[var(--heading)] opacity-60 transition-opacity duration-300 hover:opacity-100">
                {brand}
              </span>

              <span className="text-[var(--primary)]">•</span>
            </div>
          ))}
        </div>

        <div
          className="absolute left-0 top-0 h-full flex min-w-full animate-marquee2 items-center gap-12 whitespace-nowrap"
          aria-hidden="true"
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-12"
            >
              <span className="text-lg font-bold tracking-[0.08em] text-[var(--heading)] opacity-60 transition-opacity duration-300 hover:opacity-100">
                {brand}
              </span>

              <span className="text-[var(--primary)]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />
    </section>
  );
}
