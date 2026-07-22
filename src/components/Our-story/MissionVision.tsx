"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Quote, Users } from "lucide-react";

// A single team member card's content (managed via the CMS `teamMembers` list).
type TeamMember = { name: string; role: string; image?: string; imagePosition?: string };

// CMS-editable content (key: page.our-story.missionvision). Falls back to defaults.
type MissionVisionContent = Partial<{
  eyebrow: string;
  heading: string;
  missionText: string;
  visionText: string;
  creedText: string;
  leadershipEyebrow: string;
  leadershipHeading: string;
  leadershipDescription: string;
  ceoName: string;
  ceoRole: string;
  ceoExperience: string;
  ceoImage: string;
  ceoMessage: string;
  teamMembers: TeamMember[];
  signatureLead: string;
  signatureName: string;
}>;

// Fallback team shown until the CMS `teamMembers` list is populated.
const DEFAULT_TEAM: TeamMember[] = [
  { name: "Shruti Sinha", role: "IT Team Lead", image: "/images/team/shruti-sinha.jpeg" },
  { name: "Payal Kumari", role: "Digital Marketing Head", image: "/images/team/Payal.jpeg" },
  { name: "Shruti Chouhan", role: "Software Development Engineer II", image: "/images/team/shruti-singh.png" },
  { name: "Abhishek Prajapati", role: "Backend Developer", image: "/images/team/ABHISHEK.jpeg" },
  { name: "Prince Raj", role: "Associate Software Developer", image: "/images/team/prince-kumar.png", imagePosition: "object-[50%_18%]" },
  { name: "Govind Kumar", role: "Associate Software Developer", image: "/images/team/Govind-Kumar.png", imagePosition: "object-[50%_18%]" },
  { name: "Aman Sharma", role: "Digital Marketing Executive", image: "/images/team/aman.jpeg" },
  { name: "Mukta Trivedy", role: "UI Designer", image: "/images/team/mukta-trivedy.png" },
  { name: "Wagish Karna", role: "Content Writer", image: "/images/team/wagish-karna.jpeg", imagePosition: "object-[50%_18%]" },
  { name: "Khushi Bharti", role: "HR Generalist" },
  { name: "Lincy Bhardwaj", role: "HR Executive" },


  { name: "Anushka Raj", role: "BDE" },

  { name: "Anushka Raj", role: "Business Development Executive", image: "/images/team/Anushka.jpeg" },

  { name: "Anushka Raj", role: "Business Development Executive", image: "/images/team/Anushka.jpeg" },
];

export default function MissionVision({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as MissionVisionContent;
  const c = {
    eyebrow: content.eyebrow ?? "AFTERWORD",
    heading: content.heading ?? "Pioneering the Agentic Future",
    missionText:
      content.missionText ??
      "To empower modern brands with high-performance custom engineering, future-proof agentic AI systems, and search optimization, transforming complex operational workflows and marketing budgets into measurable business growth.",
    visionText:
      content.visionText ??
      "To establish ourselves as a global benchmark for digital execution and next-generation agentic AI, proving that client transparency, clean scalable code, and forward-looking automation can consistently win on the international stage.",
    creedText:
      content.creedText ??
      "We make commitments, not excuses. We work with absolute accountability, leverage AI responsibly to amplify human intelligence, refuse code shortcuts, and measure our agency's reputation directly by the scalability and success of the products we launch.",
    leadershipEyebrow: content.leadershipEyebrow ?? "Leadership & Team",
    leadershipHeading: content.leadershipHeading ?? "The People Behind The Pages",
    leadershipDescription:
      content.leadershipDescription ??
      "One clear leadership voice, supported by a focused team of builders, designers, and growth specialists.",
    signatureLead: content.signatureLead ?? "Signed in code and character,",
    signatureName: content.signatureName ?? "The Fillip Team",
  };

  const ceo = {
    name: content.ceoName ?? "Vikash Kumar",
    role: content.ceoRole ?? "Founder & CEO",
    experience: content.ceoExperience ?? "13+ Years of Experience",
    image: content.ceoImage || "/images/team/VIKASH.jpeg",
    message:
      content.ceoMessage ??
      "Fillip Technologies was built with a simple belief: technology should make businesses clearer, faster, and more capable. Every solution we deliver carries our promise of discipline, transparency, and meaningful digital impact for the businesses we serve.",
  };

  const teamMembers = content.teamMembers?.length ? content.teamMembers : DEFAULT_TEAM;

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface pt-24 text-heading">

      {/* Decorative Book Page corner folds backgrounds */}
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-48 w-48 bg-gradient-to-tl from-primary/10 to-transparent" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">

        {/* Afterword Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {c.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            {c.heading}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-primary/30" />
        </div>

        {/* 3-Column Ledger Grid */}
        <div className="grid grid-cols-1 items-stretch gap-10 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">

          {/* Mission Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6 first:pl-0"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Target className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Mission</span>
              </div>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                {c.missionText}
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section I</span>
          </motion.div>

          {/* Vision Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Eye className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Vision</span>
              </div>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                {c.visionText}
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section II</span>
          </motion.div>

          {/* Creed Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Compass className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Creed</span>
              </div>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                {c.creedText}
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section III</span>
          </motion.div>

        </div>

        {/* CEO and Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative left-1/2 mt-20 w-screen -translate-x-1/2 overflow-hidden border-y border-border bg-gradient-to-br from-surface via-white to-primary/5 py-20 text-heading"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.72),transparent_30%)]" />
          <div className="container relative z-10 mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
              <div>
                <div className="mb-4 flex items-center justify-center gap-2 text-primary">
                  <Users className="size-4.5" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.25em]">
                    {c.leadershipEyebrow}
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
                  {c.leadershipHeading}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-body">
                {c.leadershipDescription}
              </p>
            </div>

            <motion.article
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative min-h-[420px] overflow-hidden bg-muted">
                <Image
                  src={ceo.image}
                  alt={ceo.name}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
              </div>
              <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <Quote className="absolute right-8 top-8 size-28 text-primary/[0.08]" />
                <p className="text-xs font-extrabold uppercase tracking-[0.42em] text-primary">
                  {ceo.role}
                </p>
                <h4 className="mt-5 max-w-sm text-4xl font-black leading-tight tracking-tight text-heading sm:text-5xl">
                  {ceo.name}
                </h4>
                <p className="mt-4 text-base font-extrabold text-heading">{ceo.experience}</p>
                <p className="mt-8 max-w-md text-base leading-8 text-body">
                  {ceo.message}
                </p>
              </div>
            </motion.article>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.035 }}
                  className="group overflow-hidden rounded-[1.65rem] border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
                >
                  <div className="relative aspect-[4/4.7] overflow-hidden bg-muted">
                    {member.image ? (
                      <>
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className={`object-cover ${member.imagePosition ?? ""}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_28%_24%,rgba(14,165,233,0.2),transparent_32%),radial-gradient(circle_at_72%_18%,rgba(37,99,235,0.16),transparent_28%),linear-gradient(135deg,#f8fbff_0%,#eaf4ff_45%,#ffffff_100%)]">
                        <div className="flex size-20 items-center justify-center rounded-full border border-primary/15 bg-white/70 text-2xl font-black text-primary shadow-soft backdrop-blur">
                          {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="text-xl font-black tracking-tight text-heading">{member.name}</h4>
                    <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.24em] text-primary">
                      {member.role}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
