"use client";

import HomeTestimonialsSection from "@/components/Home/TestimonialsSection";

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
  title,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <HomeTestimonialsSection
      content={{
        heading: title,
      }}
      items={testimonials}
    />
  );
}
