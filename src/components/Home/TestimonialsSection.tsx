
"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonialCards = [
  {
    type: "stat",
    value: "4.8★",
    label: "Google Rating",
    color: "bg-[#EEF6FF]",
  },
  {
    type: "review",
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "/testimonials/user-1.jpg",
    content:
      "Fillip Technologies transformed our digital presence completely. The team delivered a modern website and strategic guidance that improved engagement and lead generation.",
    color: "bg-[#F8FAFC]",
  },
  {
    type: "review",
    name: "Michael Roberts",
    role: "Business Owner",
    image: "/testimonials/user-2.jpg",
    content:
      "Professional, responsive, and highly skilled. The project was delivered on time and exceeded our expectations.",
    color: "bg-[#FDF4FF]",
  },
  {
    type: "stat",
    value: "137+",
    label: "Verified Reviews",
    color: "bg-[#FEF9C3]",
  },
  {
    type: "review",
    name: "Emily Carter",
    role: "Operations Head",
    image: "/testimonials/user-3.jpg",
    content:
      "Their combination of design expertise and technical execution helped us launch faster and scale with confidence.",
    color: "bg-[#ECFDF5]",
  },
  {
    type: "image",
    image: "/testimonials/team-1.jpg",
  },
  {
    type: "review",
    name: "James Walker",
    role: "Startup Founder",
    image: "/testimonials/user-4.jpg",
    content:
      "From strategy to deployment, every stage was handled with clarity and professionalism.",
    color: "bg-[#EEF6FF]",
  },
  {
    type: "stat",
    value: "98%",
    label: "Client Satisfaction",
    color: "bg-[#FCE7F3]",
  },
  {
    type: "review",
    name: "Sophia Brown",
    role: "CEO",
    image: "/testimonials/user-5.jpg",
    content:
      "One of the most reliable technology partners we've worked with. Great communication and measurable outcomes.",
    color: "bg-[#F8FAFC]",
  },
  {
    type: "image",
    image: "/testimonials/team-2.jpg",
  },
  {
    type: "stat",
    value: "3000+",
    label: "Businesses Served",
    color: "bg-[#ECFCCB]",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#0F6FFF]">
            Client Testimonials
          </p>

          <h2 className="text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-heading md:text-[42px] lg:text-[48px]">
            <span className="text-slate-900">
              Real Reviews.
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Real Business Outcomes.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Trusted by businesses across industries. Every review
            reflects real-world impact, measurable growth, and
            long-term partnerships.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-5 md:columns-2 xl:columns-4">
          {testimonialCards.map((card, index) => {
            if (card.type === "stat") {
              return (
                <div
                  key={index}
                  className={`mb-5 break-inside-avoid rounded-[28px] p-8 ${card.color}`}
                >
                  <div className="text-5xl font-bold text-slate-900">
                    {card.value}
                  </div>

                  <div className="mt-3 text-slate-600">
                    {card.label}
                  </div>
                </div>
              );
            }

            if (card.type === "image") {
              return (
                <div
                  key={index}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-[28px]"
                >
                  <Image
                    src={card.image}
                    alt=""
                    width={600}
                    height={700}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`mb-5 break-inside-avoid rounded-[28px] p-7 ${card.color}`}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="mt-5 text-base leading-relaxed text-slate-700">
                  "{card.content}"
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="font-semibold text-slate-900">
                      {card.name}
                    </div>

                    <div className="text-sm text-slate-500">
                      {card.role}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

