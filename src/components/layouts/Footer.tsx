import Link from "next/link";

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";


type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "What We Do",
    links: [
      { label: "Custom Website Development", href: "/services/website-development" },
      { label: "E-Commerce Development", href: "/services/ecommerce-development" },
      { label: "WordPress Development", href: "/services/wordpress-development" },
      { label: "Software Development", href: "/software-development/software-development" },
      { label: "Enterprise Mobile Applications", href: "/mobile-app-development/enterprise" },
      { label: "Graphics Designing", href: "/graphic-designing" },
      { label: "Technical SEO", href: "/technical-seo" },
      { label: "View All Services", href: "/services" },
    ],
  },
  {
    title: "AI & Automation",
    links: [
      { label: "AI Consulting", href: "/ai-consulting" },
      { label: "AI Chatbots", href: "/aichatbots" },
      { label: "AI Agent Development", href: "/ai-agent-development" },
      { label: "AI + GPT Integration", href: "/ai-gpt-integration" },
      { label: "Workflow Automation", href: "/workflow-automation" },
      { label: "Business Process Automation", href: "/business-process-automation" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Ticket Booking Solution", href: "/solutions/ticket-booking" },
      { label: "SMS Communication Solution", href: "/solutions/sms-communication" },
      { label: "WhatsApp Business Solution", href: "/solutions/whatsapp-business" },
      { label: "Security Surveillance", href: "/hardware-solutions/security-surveillance" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Education", href: "/industries/education" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Logistics", href: "/industries/logistics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Our Culture", href: "/our-culture" },
      { label: "Careers", href: "/others/carrer" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Compliance", href: "/compliance" },
];

function FooterNavLink({ href, label }: FooterLink) {
  const isViewAll = label.startsWith("View All");
  return (
    <Link
      href={href}
      className={`
        text-[13.5px] leading-5 text-primary-foreground/60 hover:text-white
        transition-all duration-200 ease-in-out hover:translate-x-1 flex items-center gap-1
        ${isViewAll ? "text-accent font-semibold hover:text-accent/80 mt-1" : ""}
      `}
    >
      {isViewAll && <span className="text-[10px]">&rarr;</span>}
      <span>{label}</span>
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
        {/* Tier 1: Contact & Office Locations (Top) */}
        <section className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 border-b border-white/5 py-12 sm:py-16">
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-3">Get in Touch</h3>
              <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-sm mb-5">
                Have a project in mind or want to explore partnerships? Reach out to our experts today.
              </p>

              {/* Social Media Links */}
              <div className="flex gap-3 items-center">
                <a
                  href="https://facebook.com/FillipTechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition-all duration-300 text-primary-foreground/70"
                  aria-label="Facebook"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/filliptechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition-all duration-300 text-primary-foreground/70"
                  aria-label="Instagram"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/fillip-technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition-all duration-300 text-primary-foreground/70"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://x.com/Fillip_Tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition-all duration-300 text-primary-foreground/70"
                  aria-label="Twitter/X"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/channel/UCR7oww-nQszfqAsf19T2UtQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition-all duration-300 text-primary-foreground/70"
                  aria-label="YouTube"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold
                  text-navy hover:bg-accent/90 transition-all duration-300 shadow-[0_12px_32px_color-mix(in_srgb,var(--accent)_25%,transparent)]
                "
              >
                Talk to Experts &rarr;
              </Link>
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold
                  text-white hover:border-accent hover:text-accent transition-all duration-300
                "
              >
                Get a Quote &rarr;
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-bold text-white tracking-wider uppercase">Head Office (Patna)</h4>
                <p className="text-[13.5px] text-primary-foreground/75 leading-relaxed mt-1.5">
                  A3, Ground Floor, Beside Kalyan Jewellers, Near Chandan Hero, Kankarbagh Main Road, Patna, Bihar - 800020
                </p>
                <div className="mt-3.5 space-y-1.5 text-[13.5px] text-primary-foreground/70">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-primary-foreground/40">Tel:</span>
                    <a href="tel:+917257930444" className="hover:text-accent transition-colors font-medium">+91 7257930444</a>
                    <a href="tel:+917545999996" className="hover:text-accent transition-colors font-medium">+91 7545999996</a>
                    <a href="tel:+917545999995" className="hover:text-accent transition-colors font-medium">+91 7545999995</a>
                  </div>
                  <p className="pt-1">
                    <span className="font-semibold text-primary-foreground/40">Email: </span>
                    <a href="mailto:info@filliptechnologies.com" className="hover:text-accent transition-colors font-medium">info@filliptechnologies.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-bold text-white tracking-wider uppercase">Branch Office (Ranchi)</h4>
                <p className="text-[13.5px] text-primary-foreground/75 leading-relaxed mt-1.5">
                  Ispat Residency, 1st Floor, A-block-104, Kathal More – Argora – Ranchi Rd, Harmu, Ranchi, Jharkhand 834002
                </p>
                <div className="mt-3.5 space-y-1.5 text-[13.5px] text-primary-foreground/70">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-primary-foreground/40">Tel:</span>
                    <a href="tel:+917545999996" className="hover:text-accent transition-colors font-medium">+91 7545999996</a>
                  </div>
                  <p className="pt-1">
                    <span className="font-semibold text-primary-foreground/40">Email: </span>
                    <a href="mailto:ranchi@filliptechnologies.com" className="hover:text-accent transition-colors font-medium">ranchi@filliptechnologies.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tier 2: Link Directory (Middle) */}
        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="flex flex-col">
                <h3 className="text-[13.5px] font-bold uppercase tracking-[0.2em] text-white mb-5 pb-2 border-b border-white/5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-6 after:bg-accent">
                  {column.title}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <FooterNavLink key={link.label} {...link} />
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </section>

        {/* Tier 3: Corporate Footer (Bottom) */}
        <section className="border-t border-white/5 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                <Image
                  src="/images/Fillip-logo-white.png"
                  alt="Fillip Technologies Logo"
                  width={150}
                  height={40}
                  className="h-9 w-auto"
                />
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-primary-foreground/40 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="text-xs text-primary-foreground/40">
              &copy; {new Date().getFullYear()} Fillip Technologies. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
}
