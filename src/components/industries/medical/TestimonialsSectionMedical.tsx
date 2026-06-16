"use client";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

const medicalTestimonials = [
    {
        name: "Dr. Anjali Sharma",
        role: "Consultant Cardiologist",
        image: "/images/testimonials/dr-1.jpg",
        review:
            "Our appointment bookings increased significantly within months. The combination of SEO, website improvements, and social media helped us attract more qualified patients.",
    },
    {
        name: "Dr. Rajesh Verma",
        role: "Orthopedic Surgeon",
        image: "/images/testimonials/dr-2.jpg",
        review:
            "We now rank for important healthcare searches in our city. Patient enquiries have become more consistent and predictable than ever before.",
    },
    {
        name: "Dr. Priya Mehta",
        role: "Dermatology Specialist",
        image: "/images/testimonials/dr-3.jpg",
        review:
            "The digital growth strategy transformed our online presence. Patients discover us faster, trust us sooner, and book appointments more frequently.",
    },
    {
        name: "Dr. Vikram Singh",
        role: "General Physician",
        image: "/images/testimonials/dr-4.jpg",
        review:
            "Fillip Technologies helped us create a complete patient acquisition system.",
    },
];

export default function TestimonialsSectionMedical() {
    return (
        <TestimonialsSection
            badge="Testimonials"
            title="Trusted by Healthcare Professionals"
            description="Hospitals, clinics, and healthcare specialists trust Fillip Technologies to improve visibility, strengthen patient trust, and generate more appointment opportunities."
            testimonials={medicalTestimonials}
        />
    );
}