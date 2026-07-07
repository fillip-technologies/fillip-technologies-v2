"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const blogPosts = [
  {
    image: "/images/blog-ai.png",
    title: "What are the 7 types of AI? Understand with Examples",
    date: "June 25, 2026",
    comments: "No Comments",
    link: "#",
    badge: "0.00",
  },
  {
    image: "/images/blog-careers.png",
    title: "5 High-Paying Careers After Digital Marketing Training in 2026",
    date: "June 13, 2026",
    comments: "No Comments",
    link: "#",
    badge: "0.00",
  },
  {
    image: "/images/blog-uiux.png",
    title: "UI UX Design Certification: Your Fast Track to a High-Paying UX Career",
    date: "June 12, 2026",
    comments: "No Comments",
    link: "#",
    badge: "0.00",
  },
];

export default function BlogSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-28"
    >
      {/* Background Mesh/Glow matching existing pages */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full blur-[140px] opacity-40"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[140px] opacity-30"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary text-center mb-3">
            Our Blog
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-heading text-center">
            Latest Blog
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                relative
                flex
                flex-col
                overflow-hidden
                rounded-[32px]
                border
                border-border
                bg-card
                shadow-sm
                transition-shadow
                duration-300
                hover:shadow-md
              "
            >
              {/* Blog Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Badge Overlay */}
                <div className="absolute right-6 top-6 rounded-full border border-primary/20 bg-white/90 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur shadow-sm">
                  {post.badge}
                </div>
              </div>

              {/* Overlapping Profile Avatar */}
              <div className="relative z-10 -mt-8 ml-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-slate-200 shadow-sm overflow-hidden">
                <svg
                  className="h-8 w-8 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-5">
                <div>
                  <h3 className="text-xl font-bold leading-snug text-heading group-hover:text-primary transition-colors duration-300 mb-6">
                    {post.title}
                  </h3>

                  <a
                    href={post.link}
                    className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:underline mb-6"
                  >
                    READ MORE »
                  </a>
                </div>

                {/* Card Footer */}
                <div>
                  <div className="h-[1px] bg-border w-full mb-4" />
                  <div className="flex items-center text-xs text-body font-medium">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
