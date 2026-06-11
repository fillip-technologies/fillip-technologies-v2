"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    title: "Web Development",

    subServices: [
      {
        name: "Custom Website",

        image:
          "/images/projects/project-1.jpg",

        heading:
          "Custom Website Development",

        description:
          "Modern scalable business websites with premium UI/UX.",

        tags: [
          "Next.js",
          "React",
          "UI/UX",
        ],
      },

      {
        name: "E-Commerce",

        image:
          "/images/projects/project-2.jpg",

        heading:
          "E-Commerce Development",

        description:
          "High converting online stores and ecommerce platforms.",

        tags: [
          "Shopify",
          "WooCommerce",
          "Payments",
        ],
      },

      {
        name: "WordPress",

        image:
          "/images/projects/project-3.jpg",

        heading:
          "WordPress Development",

        description:
          "Fast and SEO-friendly WordPress business websites.",

        tags: [
          "WordPress",
          "Elementor",
          "CMS",
        ],
      },

      {
        name: "Software Dev",

        image:
          "/images/projects/project-4.jpg",

        heading:
          "Software Development",

        description:
          "Scalable custom software solutions for businesses.",

        tags: [
          "CRM",
          "ERP",
          "Systems",
        ],
      },
    ],
  },

  {
    title: "SEO",

    subServices: [
      {
        name: "On Page SEO",

        image:
          "/images/projects/project-5.jpg",

        heading:
          "On Page SEO",

        description:
          "Improve visibility and website structure.",

        tags: [
          "SEO",
          "Optimization",
        ],
      },

      {
        name: "Technical SEO",

        image:
          "/images/projects/project-6.jpg",

        heading:
          "Technical SEO",

        description:
          "Advanced technical optimization for better ranking.",

        tags: [
          "Speed",
          "Schema",
          "Indexing",
        ],
      },
    ],
  },

  {
    title: "Marketing",

    subServices: [
      {
        name: "Meta Ads",

        image:
          "/images/projects/project-7.jpg",

        heading:
          "Meta Advertising",

        description:
          "High-converting Facebook & Instagram ad campaigns.",

        tags: [
          "Facebook",
          "Instagram",
        ],
      },

      {
        name: "Google Ads",

        image:
          "/images/projects/project-8.jpg",

        heading:
          "Google Ads Campaign",

        description:
          "Reach more customers through Google advertising.",

        tags: [
          "Google",
          "PPC",
        ],
      },
    ],
  },
];

export default function MegaMenu({
  megaMenu,
}: {
  megaMenu: boolean;
}) {
  const [activeCategory, setActiveCategory] =
    useState(services[0]);

  const [activeSubService, setActiveSubService] =
    useState(
      services[0].subServices[0]
    );

  return (
    <div
      className={`absolute left-1/2 top-[140%] z-50 w-[1200px] -translate-x-1/2 transition-all duration-300 ${
        megaMenu
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-4 opacity-0"
      }`}
    >
      <div className="flex rounded-[32px] border border-border bg-card p-5 shadow-2xl">
        
        {/* LEFT CATEGORY */}
        <div className="w-[250px] border-r border-border pr-5">
          
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[3px] text-muted-foreground/70">
            Services
          </h3>

          <div className="space-y-2">
            {services.map((service) => (
              <button
                key={service.title}
                onMouseEnter={() => {
                  setActiveCategory(service);

                  setActiveSubService(
                    service.subServices[0]
                  );
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                  activeCategory.title ===
                  service.title
                    ? "bg-heading text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <span className="text-base font-medium">
                  {service.title}
                </span>

                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE SUB SERVICES */}
        <div className="w-[280px] border-r border-border px-5">
          
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[3px] text-muted-foreground/70">
            Solutions
          </h3>

          <div className="space-y-2">
            {activeCategory.subServices.map(
              (sub) => (
                <button
                  key={sub.name}
                  onMouseEnter={() =>
                    setActiveSubService(
                      sub
                    )
                  }
                  className={`w-full rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                    activeSubService.name ===
                    sub.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-base font-medium">
                    {sub.name}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        {/* RIGHT SHOWCASE */}
        <div className="flex flex-1 items-center gap-8 px-8">
          
          {/* Image */}
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={
                activeSubService.image
              }
              alt={
                activeSubService.heading
              }
              width={360}
              height={260}
              className="h-[260px] w-[360px] object-cover transition-all duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            
            <h2 className="text-3xl font-bold text-heading">
              {
                activeSubService.heading
              }
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {
                activeSubService.description
              }
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-3">
              {activeSubService.tags.map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Button */}
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-heading px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-105"
            >
              View Service

              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
