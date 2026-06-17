import TestimonialsSection from "@/components/shared/TestimonialsSection";
import type { MobileAppTestimonialsContent } from "@/data/mobile-app-development";

type MobileAppTestimonialsProps = {
    data: MobileAppTestimonialsContent;
};

export default function MobileAppTestimonials({ data }: MobileAppTestimonialsProps) {
    return (
        <TestimonialsSection
            badge={data.badge}
            title={data.title}
            description={data.description}
            testimonials={data.testimonials}
        />
    );
}
