"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import HomeSectionTitle from "./HomeSectionTitle";
import { GLOBAL_TESTIMONIALS, type GlobalTestimonial } from "@/data/testimonials";

// Heading/rating are CMS-editable (key: home.testimonials). The testimonial
// LIST comes from the single site-wide source (`items`), passed in by the page.
type TestimonialsContent = Partial<{
  heading: string;
  rating: string;
  reviewsLabel: string;
}>;

export default function TestimonialsSection({
  content: raw = {},
  items,
}: {
  content?: Record<string, unknown>;
  items?: GlobalTestimonial[];
}) {
  const content = raw as TestimonialsContent;
  const c = {
    heading: content.heading ?? "What our customers are saying",
    rating: content.rating ?? "4.8/5",
    reviewsLabel: content.reviewsLabel ?? "Based on 5,210+ reviews",
  };
  const testimonials = items?.length ? items : GLOBAL_TESTIMONIALS;
  const [selectedTestimonial, setSelectedTestimonial] = useState<GlobalTestimonial | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative overflow-hidden bg-surface py-16 lg:py-20">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, var(--heading) 4.5%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, var(--heading) 4.5%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -left-24 top-16 h-[420px] w-[420px] rounded-full bg-[var(--glow-primary)] opacity-55 blur-[120px]" />
        <div className="absolute right-[-10%] top-24 h-[480px] w-[480px] rounded-full bg-[var(--glow-cyan)] opacity-50 blur-[130px]" />
        <div className="absolute bottom-[-18%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--glow-accent)] opacity-35 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1540px] px-4 sm:px-6">
        {/* Main Layout */}
        <div className="grid gap-10 lg:grid-cols-[330px_1fr] lg:items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <Quote
              strokeWidth={1.35}
              className="mb-6 md:mb-8 text-slate-300 h-16 w-16 md:h-24 md:w-24"
            />

            <HomeSectionTitle text={c.heading} />

            <div className="mt-6 md:mt-10 flex items-center gap-3">
              <span className="text-xl font-medium text-slate-800">
                {c.rating}
              </span>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <p className="mt-3 text-base text-slate-500">
              {c.reviewsLabel}
            </p>

            {/* Navigation */}
            <div className="mt-8 md:mt-12 flex items-center gap-4">
              <button
                onClick={scrollPrev}
                aria-label="Previous testimonial"
                className="group flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:bg-slate-950"
              >
                <ChevronLeft className="h-5 w-5 text-slate-800 group-hover:text-white" />
              </button>

              <div className="h-px w-24 bg-slate-300" />

              <button
                onClick={scrollNext}
                aria-label="Next testimonial"
                className="group flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:bg-slate-950"
              >
                <ChevronRight className="h-5 w-5 text-slate-800 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            ref={emblaRef}
            className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex -ml-6">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex-[0_0_100%] pl-6 md:min-w-[360px] md:flex-[0_0_auto] lg:min-w-0 lg:basis-1/3"
                >
                  <div className="flex h-auto min-h-[380px] md:h-[418px] flex-col rounded-[24px] border border-card/70 bg-card/78 px-7 py-8 shadow-[0_18px_45px_color-mix(in_srgb,var(--heading)_7%,transparent)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_color-mix(in_srgb,var(--heading)_10%,transparent)]">
                    <p className="line-clamp-6 text-[16px] leading-7 text-slate-600 whitespace-normal break-words">
                      {item.review}
                    </p>

                    {item.review.length > 260 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedTestimonial(item)}
                        className="mt-4 w-fit text-sm font-semibold text-primary transition hover:text-slate-950"
                      >
                        Read More
                      </button>
                    ) : null}

                    <div className="mt-auto flex gap-1.5 pt-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-8">
                      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-lg font-semibold text-slate-500">
                            {item.name?.trim()?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-950">
                          {item.name}
                        </h4>

                        <p className="mt-1 text-base text-slate-500">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedTestimonial ? (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_28px_80px_rgba(15,23,42,0.28)] md:p-9">
            <button
              type="button"
              onClick={() => setSelectedTestimonial(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
              aria-label="Close full review"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            <Quote className="mb-5 h-12 w-12 text-slate-200" strokeWidth={1.4} />
            <p className="pr-4 text-base leading-8 text-slate-700 md:text-lg">
              {selectedTestimonial.review}
            </p>

            <div className="mt-8 flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-7">
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                {selectedTestimonial.image ? (
                  <Image
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-slate-500">
                    {selectedTestimonial.name?.trim()?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-950">
                  {selectedTestimonial.name}
                </h4>
                <p className="mt-1 text-base text-slate-500">
                  {selectedTestimonial.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
