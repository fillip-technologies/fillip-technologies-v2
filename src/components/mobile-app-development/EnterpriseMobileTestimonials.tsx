import GlobalTestimonials from "@/components/shared/GlobalTestimonials";
import type { MobileAppTestimonialsContent } from "@/data/mobile-app-development";

type MobileAppTestimonialsProps = {
    data: MobileAppTestimonialsContent;
};

export default function MobileAppTestimonials({ data }: MobileAppTestimonialsProps) {
    return (
        <GlobalTestimonials
            badge={data.badge}
            title={data.title}
            description={data.description}
        />
    );
}
