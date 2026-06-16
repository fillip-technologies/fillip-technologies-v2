import TestimonialsSection from "@/components/shared/TestimonialsSection";

const enterpriseMobileTestimonials = [
    {
        name: "Rajesh Mehta",
        role: "Chief Technology Officer, FinTech Company",
        image: "/images/testimonials/client-1.jpg",
        review:
            "The mobile application significantly improved customer engagement and streamlined our digital services. The team's technical expertise and execution were exceptional.",
    },
    {
        name: "Priya Sharma",
        role: "VP Digital Transformation, Healthcare Group",
        image: "/images/testimonials/client-2.jpg",
        review:
            "Fillip Technologies delivered a scalable enterprise mobile solution that helped us improve operational efficiency and provide a better experience for our users.",
    },
    {
        name: "Amit Verma",
        role: "Director of Product, E-Commerce Brand",
        image: "/images/testimonials/client-3.jpg",
        review:
            "From strategy to deployment, the process was seamless. The app performance, user experience, and business impact exceeded our expectations.",
    },
    {
        name: "Neha Kapoor",
        role: "Chief Operations Officer, Logistics Company",
        image: "/images/testimonials/client-4.jpg",
        review:
            "The mobile platform automated several manual workflows and improved communication across teams. We saw measurable productivity gains within weeks.",
    },
];

export default function EnterpriseMobileTestimonials() {
    return (
        <TestimonialsSection
            badge="Client Success Stories"
            title="Trusted by Leading Indian Enterprises"
            description="From healthcare and finance to logistics and e-commerce, organizations across India trust Fillip Technologies to build secure, scalable, and high-performance mobile applications."
            testimonials={enterpriseMobileTestimonials}
        />
    );
}