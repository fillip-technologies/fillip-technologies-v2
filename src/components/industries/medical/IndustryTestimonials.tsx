"use client";

import TestimonialsSection from "@/components/shared/TestimonialsSection";

type IndustryTestimonialsProps = {
    data: {
        badge: string;
        title: string;
        description: string;
        items: {
            name: string;
            role: string;
            image: string;
            review: string;
        }[];
    };
};

export default function IndustryTestimonials({ data }: IndustryTestimonialsProps) {
    return (
        <TestimonialsSection
            badge={data.badge}
            title={data.title}
            description={data.description}
            testimonials={data.items}
        />
    );
}
