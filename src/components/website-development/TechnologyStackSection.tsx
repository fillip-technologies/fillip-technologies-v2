"use client";

import Link from "next/link";

const integrations = [
  {
    label: "CMS & Ecommerce",
    bgColor: "bg-pink-50/40 dark:bg-pink-950/10 border-pink-100/60 dark:border-pink-900/20",
    tools: [
      { name: "WordPress", slug: "wordpress" },
      { name: "Shopify", slug: "shopify" },
      { name: "WooCommerce", slug: "woocommerce" },
      { name: "Strapi", slug: "strapi" },
      { name: "Webflow", slug: "webflow" },
      { name: "Contentful", slug: "contentful" },
    ],
  },
  {
    label: "Payments",
    bgColor: "bg-blue-50/40 dark:bg-blue-950/10 border-blue-100/60 dark:border-blue-900/20",
    tools: [
      { name: "Stripe", slug: "stripe" },
      { name: "PayPal", slug: "paypal" },
      { name: "Razorpay", slug: "razorpay" },
      { name: "Square", slug: "square" },
      { name: "PayU", slug: "payu" },
      { name: "Authorize.net", slug: "authorizenet" },
    ],
  },
  {
    label: "Marketing",
    bgColor: "bg-amber-50/40 dark:bg-amber-950/10 border-amber-100/60 dark:border-amber-900/20",
    tools: [
      { name: "HubSpot", slug: "hubspot" },
      { name: "Mailchimp", slug: "mailchimp" },
      { name: "Zapier", slug: "zapier" },
      { name: "Google Analytics", slug: "googleanalytics" },
      { name: "Meta Pixel", slug: "meta" },
      { name: "Hotjar", slug: "hotjar" },
    ],
  },
  {
    label: "Cloud & DevOps",
    bgColor: "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100/60 dark:border-emerald-900/20",
    tools: [
      { name: "AWS", slug: "amazonwebservices" },
      { name: "Vercel", slug: "vercel" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Docker", slug: "docker" },
      { name: "Azure", slug: "microsoftazure" },
      { name: "GitHub", slug: "github" },
    ],
  },
];

export default function TechnologyStackSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full blur-[140px] opacity-40"
          style={{ background: "var(--glow-primary)" }}
        />
        <div
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full blur-[140px] opacity-40"
          style={{ background: "var(--glow-accent)" }}
        />
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)] dark:bg-slate-900 dark:border-slate-800">
            TOOLS & PLATFORMS
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
            Technologies We
            <span className="text-[var(--primary)]"> Work With</span>
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
            We integrate websites with the tools, payment gateways,
            marketing platforms, and cloud infrastructure your business
            already relies on.
          </p>
        </div>

        {/* Integration Rows */}
        <div className="mt-16 flex flex-col gap-6">
          {integrations.map((category) => (
            <div
              key={category.label}
              className={`flex flex-col lg:flex-row lg:items-center justify-between p-6 lg:p-8 rounded-3xl border ${category.bgColor} shadow-xs transition-all duration-300 hover:shadow-sm`}
            >
              {/* Left Side: Category Label */}
              <div className="lg:w-1/4 mb-5 lg:mb-0 shrink-0">
                <h3 className="text-xl font-bold text-slate-850 dark:text-white">
                  {category.label}
                </h3>
              </div>

              {/* Right Side: Tools list as pill badges */}
              <div className="flex flex-wrap gap-3 lg:w-3/4">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 px-4.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-full shadow-xs hover:shadow-md hover:scale-[1.03] transition-all duration-300"
                  >
                    {/* Icon wrapper */}
                    <div className="h-5 w-5 flex items-center justify-center shrink-0">
                      <img
                        src={`https://cdn.simpleicons.org/${tool.slug}`}
                        alt={tool.name}
                        className="h-4.5 w-4.5 object-contain"
                        loading="lazy"
                      />
                    </div>

                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-350">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[var(--heading)]">
                Need A Custom Integration?
              </h3>

              <p className="mt-2 max-w-2xl text-[var(--body)]">
                We can connect your website with CRMs, ERPs, payment
                gateways, marketing tools, booking systems, and other
                business software.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Discuss Integration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}