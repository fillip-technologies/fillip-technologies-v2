import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type Partner = {
  name: string;
  mark: string;
};

const partners: Partner[] = [
  { name: "Microsoft", mark: "MS" },
  { name: "AWS", mark: "AWS" },
  { name: "Google Cloud", mark: "GC" },
  { name: "Salesforce", mark: "SF" },
  { name: "Zoho", mark: "ZO" },
  { name: "Appian", mark: "AP" },
];

const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Capabilities", href: "#" },
      { label: "Products", href: "#" },
      { label: "Platforms", href: "#" },
      { label: "AI Lab", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "#" },
      { label: "Finance", href: "#" },
      { label: "Manufacturing", href: "#" },
      { label: "Retail", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Compliance", href: "#" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Compliance", href: "#" },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div
      className="
        flex min-h-24 items-center justify-center
        border border-primary-foreground/10 bg-primary-foreground/[0.025] px-5
        opacity-70
      "
    >
      <svg
        viewBox="0 0 180 56"
        role="img"
        aria-label={partner.name}
        className="h-12 w-full max-w-[150px] text-primary-foreground"
      >
        <rect
          x="2"
          y="2"
          width="52"
          height="52"
          rx="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.78"
        />
        <text
          x="28"
          y="34"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
          fontWeight="700"
          letterSpacing="1"
        >
          {partner.mark}
        </text>
        <text
          x="68"
          y="33"
          fill="currentColor"
          fontSize="17"
          fontWeight="600"
          letterSpacing="0.4"
        >
          {partner.name}
        </text>
      </svg>
    </div>
  );
}

function FooterNavLink({ href, label }: FooterLink) {
  return (
    <Link
      href={href}
      className="
        w-fit text-sm leading-6 text-primary-foreground/58
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent/70 focus-visible:ring-offset-4
        focus-visible:ring-offset-navy
      "
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden bg-navy text-primary-foreground"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Fillip Technologies footer
      </h2>

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--primary-foreground) 90%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--primary-foreground) 90%, transparent) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <section className="border-b border-primary-foreground/10 py-16 sm:py-20">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/80">
                Partner Ecosystem
              </p>
              <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-primary-foreground md:text-3xl">
                Enterprise technology partnerships for intelligent growth.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-primary-foreground/52">
              Cloud, platforms, automation, and customer systems aligned for modern enterprise delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <PartnerLogo key={partner.name} partner={partner} />
            ))}
          </div>
        </section>

        <section className="border-b border-primary-foreground/10 py-14 sm:py-16">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-primary-foreground/42">
                  {column.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <FooterNavLink key={link.label} {...link} />
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </section>

        <section className="border-b border-primary-foreground/10 py-14 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.38em] text-primary-foreground/42">
                Human &times; Intelligence
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                Ready to transform your business?
              </h3>
            </div>

            <Link
              href="#"
              className="
                inline-flex min-h-12 w-fit items-center justify-center rounded-full
                border border-primary-foreground/18 bg-primary-foreground px-7 py-3 text-sm font-semibold
                text-navy shadow-[0_18px_50px_color-mix(in_srgb,var(--foreground)_22%,transparent)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                focus-visible:ring-offset-4 focus-visible:ring-offset-navy
              "
            >
              Talk to Experts <span aria-hidden="true" className="ml-2">&rarr;</span>
            </Link>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-primary-foreground">
                Fillip Technologies
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.42em] text-primary-foreground/42">
                Human &times; Intelligence
              </p>
            </div>

            <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-3">
              {legalLinks.map((link) => (
                <FooterNavLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          <div className="mt-8 border-t border-primary-foreground/10 pt-6">
            <p className="text-sm text-primary-foreground/42">
              &copy; 2026 Fillip Technologies. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
}
