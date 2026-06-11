"use client";

import { Star, ArrowLeft, ArrowRight } from "lucide-react";

<<<<<<< HEAD
export default function TestimonialsSection() {
=======
type TestimonialsContent = Partial<{
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  rating: string;
  ratingLabel: string;
  reviewCount: string;
  reviewCountLabel: string;
  badge: string;
  reviewTitle: string;
  reviewQuote: string;
  reviewAuthor: string;
  reviewAuthorLabel: string;
}>;

export default function TestimonialsSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as TestimonialsContent;
  const c = {
    eyebrow: content.eyebrow ?? "CLIENT TESTIMONIALS",
    headingLine1: content.headingLine1 ?? "Real Reviews.",
    headingLine2: content.headingLine2 ?? "Real Business Outcomes.",
    description:
      content.description ??
      "Trusted by businesses, organizations, and institutions across industries. Every review reflects real-world impact and measurable results.",
    rating: content.rating ?? "4.8",
    ratingLabel: content.ratingLabel ?? "Google Rating",
    reviewCount: content.reviewCount ?? "137+",
    reviewCountLabel: content.reviewCountLabel ?? "Verified Reviews",
    badge: content.badge ?? "Google Business Profile",
    reviewTitle: content.reviewTitle ?? "Highly Recommended!",
    reviewQuote:
      content.reviewQuote ??
      "I had an amazing experience with Fillip Technologies. Their approach was professional, transparent, and result-driven. The team helped us establish a stronger digital presence and execute solutions faster than expected.",
    reviewAuthor: content.reviewAuthor ?? "Sameer Verma",
    reviewAuthorLabel: content.reviewAuthorLabel ?? "Google Review",
  };

>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
  return (
    <section className="relative overflow-hidden py-22">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}

        <div className="mb-20 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">
<<<<<<< HEAD
            CLIENT TESTIMONIALS
          </p>

          <h2 className="text-heading text-3xl font-semibold text-center">
            Real Reviews.
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Real Business Outcomes.
=======
            {c.eyebrow}
          </p>

          <h2 className="text-heading text-3xl font-semibold text-center">
            {c.headingLine1}
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              {c.headingLine2}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-body">
<<<<<<< HEAD
            Trusted by businesses, organizations, and institutions across
            industries. Every review reflects real-world impact and measurable
            results.
=======
            {c.description}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
          </p>
        </div>

        {/* Main Layout */}

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Rating Card */}

          <div className="border border-slate-200 bg-white p-10">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <div className="mt-8 text-7xl font-semibold text-slate-900">
<<<<<<< HEAD
              4.8
            </div>

            <div className="mt-3 text-lg text-slate-500">
              Google Rating
=======
              {c.rating}
            </div>

            <div className="mt-3 text-lg text-slate-500">
              {c.ratingLabel}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="text-5xl font-semibold text-slate-900">
<<<<<<< HEAD
                137+
              </div>

              <div className="mt-2 text-slate-500">
                Verified Reviews
=======
                {c.reviewCount}
              </div>

              <div className="mt-2 text-slate-500">
                {c.reviewCountLabel}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
              </div>
            </div>

            <div className="mt-10 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 w-fit">
<<<<<<< HEAD
              Google Business Profile
=======
              {c.badge}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
            </div>
          </div>

          {/* Featured Review */}

          <div className="relative border border-slate-200 bg-white p-10 lg:p-14">
            <div className="absolute right-10 top-10 flex gap-3">
              <button className="flex h-10 w-10 items-center justify-center border border-slate-200">
                <ArrowLeft size={16} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center border border-slate-200">
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="text-[120px] leading-none text-slate-100">
              "
            </div>

            <div className="-mt-10 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <h3 className="mt-8 text-4xl font-medium text-slate-900">
<<<<<<< HEAD
              Highly Recommended!
            </h3>

            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-slate-600">
              I had an amazing experience with Fillip Technologies. Their
              approach was professional, transparent, and result-driven. The
              team helped us establish a stronger digital presence and execute
              solutions faster than expected.
=======
              {c.reviewTitle}
            </h3>

            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-slate-600">
              {c.reviewQuote}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
            </p>

            <div className="mt-14 flex items-center justify-between border-t border-slate-200 pt-8">
              <div>
                <div className="text-xl font-medium text-slate-900">
<<<<<<< HEAD
                  Sameer Verma
                </div>

                <div className="mt-1 text-slate-500">
                  Google Review
=======
                  {c.reviewAuthor}
                </div>

                <div className="mt-1 text-slate-500">
                  {c.reviewAuthorLabel}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                </div>
              </div>

              <div className="text-slate-400">
                01 / 137
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}

      
      </div>
    </section>
  );
}
