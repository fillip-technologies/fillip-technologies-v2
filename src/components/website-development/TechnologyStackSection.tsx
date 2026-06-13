"use client";

import Image from "next/image";

const integrations = [
  {
    label: "CMS & Ecommerce",
    color: "bg-black",
    tools: [
      { name: "WordPress", logo: "/images/tech/wordpress.png" },
      { name: "Shopify", logo: "/images/tech/shopify.png" },
      { name: "WooCommerce", logo: "/images/tech/woocommerce.png" },
      { name: "Strapi", logo: "/images/tech/strapi.png" },
      { name: "Webflow", logo: "/images/tech/webflow.png" },
      { name: "Contentful", logo: "/images/tech/contentful.png" },
    ],
  },

  {
    label: "Payments",
    color: "bg-blue-600",
    tools: [
      { name: "Stripe", logo: "/images/tech/stripe.png" },
      { name: "PayPal", logo: "/images/tech/paypal.png" },
      { name: "Razorpay", logo: "/images/tech/razorpay.png" },
      { name: "Square", logo: "/images/tech/square.png" },
      { name: "PayU", logo: "/images/tech/payu.png" },
      { name: "Authorize.net", logo: "/images/tech/authorize.png" },
    ],
  },

  {
    label: "Marketing",
    color: "bg-amber-500",
    tools: [
      { name: "HubSpot", logo: "/images/tech/hubspot.png" },
      { name: "Mailchimp", logo: "/images/tech/mailchimp.png" },
      { name: "Zapier", logo: "/images/tech/zapier.png" },
      { name: "Google Analytics", logo: "/images/tech/ga4.png" },
      { name: "Meta Pixel", logo: "/images/tech/meta.png" },
      { name: "Hotjar", logo: "/images/tech/hotjar.png" },
    ],
  },

  {
    label: "Cloud & DevOps",
    color: "bg-emerald-600",
    tools: [
      { name: "AWS", logo: "/images/tech/aws.png" },
      { name: "Vercel", logo: "/images/tech/vercel.png" },
      { name: "Cloudflare", logo: "/images/tech/cloudflare.png" },
      { name: "Docker", logo: "/images/tech/docker.png" },
      { name: "Azure", logo: "/images/tech/azure.png" },
      { name: "GitHub", logo: "/images/tech/github.png" },
    ],
  },
];

export default function TechnologyStackSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Glow */}
      <div
        className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
            TOOLS & PLATFORMS
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-6xl">
            Technologies We
            <span className="text-[var(--primary)]"> Work With</span>
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
            We integrate websites with the tools, payment gateways,
            marketing platforms, and cloud infrastructure your business
            already relies on.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="mt-16 overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.04)]">
          {integrations.map((category, index) => (
            <div
              key={category.label}
              className={`grid lg:grid-cols-[240px_1fr] ${
                index !== integrations.length - 1
                  ? "border-b border-[var(--border)]"
                  : ""
              }`}
            >
              {/* Left Label */}
              <div className="flex items-start p-6 lg:p-8">
                <span
                  className={`${category.color} rounded-full px-5 py-3 text-sm font-medium text-white`}
                >
                  {category.label}
                </span>
              </div>

              {/* Tools */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="group flex flex-col items-center justify-center border-l border-[var(--border)] p-6 transition-all duration-300 hover:bg-slate-50"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        width={38}
                        height={38}
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <span className="mt-4 text-center text-sm font-medium text-[var(--heading)]">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
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

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Discuss Integration
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}