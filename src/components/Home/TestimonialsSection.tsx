"use client";

import { Star, ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-22">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}

        <div className="mb-20 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">
            CLIENT TESTIMONIALS
          </p>

          <h2 className="text-heading text-3xl font-semibold text-center">
            Real Reviews.
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Real Business Outcomes.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-body">
            Trusted by businesses, organizations, and institutions across
            industries. Every review reflects real-world impact and measurable
            results.
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
              4.8
            </div>

            <div className="mt-3 text-lg text-slate-500">
              Google Rating
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="text-5xl font-semibold text-slate-900">
                137+
              </div>

              <div className="mt-2 text-slate-500">
                Verified Reviews
              </div>
            </div>

            <div className="mt-10 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 w-fit">
              Google Business Profile
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
              Highly Recommended!
            </h3>

            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-slate-600">
              I had an amazing experience with Fillip Technologies. Their
              approach was professional, transparent, and result-driven. The
              team helped us establish a stronger digital presence and execute
              solutions faster than expected.
            </p>

            <div className="mt-14 flex items-center justify-between border-t border-slate-200 pt-8">
              <div>
                <div className="text-xl font-medium text-slate-900">
                  Sameer Verma
                </div>

                <div className="mt-1 text-slate-500">
                  Google Review
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
