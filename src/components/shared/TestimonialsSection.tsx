
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type Testimonial = {
  name: string;
  role: string;
  image: string;
  review: string;
};

type TestimonialsSectionProps = {
  badge?: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  badge = "Testimonials",
  title,
  description,
  testimonials,
}: TestimonialsSectionProps) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-2">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
            {badge}
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[-1, 0, 1].map((offset, index) => {
            const item =
              testimonials[
                (active + offset + testimonials.length) %
                  testimonials.length
              ];

            const center = offset === 0;

            const bgColors = [
              "from-sky-500 to-cyan-400",
              "from-green-500 to-emerald-400",
              "from-cyan-500 to-teal-400",
            ];

            return (
              <div
                key={item.name}
                className={`relative transition-all duration-500 ${
                  center
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-80"
                }`}
              >
                {/* Colored Shape */}
                <div
                  className={`absolute left-1/2 top-12 h-[320px] w-[320px]
                  -translate-x-1/2 rotate-[18deg]
                  rounded-[48px]
                  bg-gradient-to-br ${bgColors[index]}
                  shadow-[0_25px_80px_rgba(37,99,235,0.25)]`}
                />

                {/* White Card */}
                <div className="relative z-10 mt-12 rounded-[34px] bg-white p-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.12)]">

                  {/* Avatar */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                    <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="pt-16">
                    <h3 className="text-3xl font-semibold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-lg font-medium text-blue-600">
                      {item.role}
                    </p>

                    <p className="mt-6 leading-8 text-slate-600">
                      &quot;{item.review}&quot;
                    </p>

                    <div className="mt-6 flex justify-center gap-1 text-yellow-400">
                      <Star fill="currentColor" size={18} />
                      <Star fill="currentColor" size={18} />
                      <Star fill="currentColor" size={18} />
                      <Star fill="currentColor" size={18} />
                      <Star fill="currentColor" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-14 flex justify-center gap-4">
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-blue-500"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-blue-500"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
