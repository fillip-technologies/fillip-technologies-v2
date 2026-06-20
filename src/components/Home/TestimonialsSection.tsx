"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "/images/background.png",
    content:
      "Fillip Technologies transformed our digital presence completely. The team delivered a modern website and strategic guidance that improved engagement and lead generation.",
  },
  {
    name: "Michael Roberts",
    role: "Business Owner",
    image: "/images/background.png",
    content:
      "Professional, responsive, and highly skilled. The project was delivered on time and exceeded our expectations.",
  },
  {
    name: "Emily Carter",
    role: "Operations Head",
    image: "/images/background.png",
    content:
      "Their combination of design expertise and technical execution helped us launch faster and scale with confidence.",
  },
  {
    name: "James Walker",
    role: "Startup Founder",
    image: "/images/background.png",
    content:
      "From strategy to deployment, every stage was handled with clarity and professionalism.",
  },
  {
    name: "Sophia Brown",
    role: "CEO",
    image: "/images/background.png",
    content:
      "One of the most reliable technology partners we've worked with. Great communication and measurable outcomes.",
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
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
              size={92}
              strokeWidth={1.35}
              className="mb-8 text-slate-300"
            />

            <h2 className="text-[42px] font-semibold leading-[1.28] tracking-[-0.03em] text-slate-950 lg:text-[44px]">
              What our
              <br />
              customers are
              <br />
              saying
            </h2>

            <div className="mt-10 flex items-center gap-3">
              <span className="text-xl font-medium text-slate-800">
                4.8/5
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
              Based on 5,210+ reviews
            </p>

            {/* Navigation */}
            <div className="mt-12 flex items-center gap-4">
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
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-6">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[min(340px,calc(100vw-48px))] flex-[0_0_auto] md:min-w-[360px] lg:min-w-0 lg:basis-[calc((100%_-_48px)/3)]"
                >
                  <div className="flex h-[418px] flex-col rounded-[24px] border border-card/70 bg-card/78 px-7 py-8 shadow-[0_18px_45px_color-mix(in_srgb,var(--heading)_7%,transparent)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_color-mix(in_srgb,var(--heading)_10%,transparent)]">
                    <p className="text-[16px] leading-7 text-slate-600">
                      {item.content}
                    </p>

                    <div className="mt-auto flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-8">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
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
    </section>
  );
}
