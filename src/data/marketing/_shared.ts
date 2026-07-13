import type {
  MarketingIndustriesContent,
  MarketingTestimonialsContent,
} from "./types";

/**
 * Generic sections reused across all marketing pages. The Industries and
 * Testimonials blocks are brand-level (not slug-specific), so they are shared to
 * avoid re-authoring the same content in every slug file. Slug files can still
 * override them if a page needs bespoke copy.
 */

export const sharedIndustries: MarketingIndustriesContent = {
  badge: "INDUSTRIES WE SERVE",
  title: "Industries We Help",
  highlightedTitle: "Scale Digitally",
  items: [
    {
      name: "Healthcare",
      label: "Care",
      blurb:
        "Digital growth strategy for Healthcare businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Clinic growth campaigns", "Doctor appointment leads", "Local SEO visibility"],
    },
    {
      name: "Finance",
      label: "Trust",
      blurb:
        "Digital growth strategy for Finance businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Lead generation funnels", "SEO for finance brands", "Conversion landing pages"],
    },
    {
      name: "Retail",
      label: "Sales",
      blurb:
        "Digital growth strategy for Retail businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["E-commerce growth", "Shopping campaigns", "Store visibility"],
    },
    {
      name: "Education",
      label: "Admissions",
      blurb:
        "Digital growth strategy for Education businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Admission campaigns", "Institute SEO", "Student enquiries"],
    },
    {
      name: "Real Estate",
      label: "Property",
      blurb:
        "Digital growth strategy for Real Estate businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Buyer lead funnels", "Project promotions", "Local property SEO"],
    },
    {
      name: "Logistics",
      label: "B2B",
      blurb:
        "Digital growth strategy for Logistics businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Transport SEO", "B2B campaigns", "Lead funnel optimization"],
    },
  ],
};

/** Generic client testimonials with a customizable heading. */
export function sharedTestimonials(
  description = "See how businesses improved visibility, performance, and measurable growth through our expertise.",
): MarketingTestimonialsContent {
  return {
    badge: "CLIENT SUCCESS STORIES",
    title: "What Our Clients Say",
    description,
    items: [
      {
        name: "Rahul Sharma",
        role: "Marketing Director",
        image: "/testimonials/rahul.jpg",
        review:
          "The team uncovered issues limiting our growth and delivered a clear, measurable improvement.",
      },
      {
        name: "Priya Verma",
        role: "Founder",
        image: "/testimonials/priya.jpg",
        review:
          "They fixed problems previous agencies had missed and our results improved within weeks.",
      },
      {
        name: "Amit Gupta",
        role: "Growth Manager",
        image: "/testimonials/amit.jpg",
        review:
          "Detailed, actionable reporting that translated directly into stronger performance.",
      },
    ],
  };
}
