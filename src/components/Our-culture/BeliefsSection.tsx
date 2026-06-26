"use client";

import { motion } from "framer-motion";
import { Compass, GraduationCap, Sparkles, Handshake, Target, TrendingUp } from "lucide-react";

const beliefs = [
  {
    title: "Thinking Beyond Boundaries",
    description: "We don't limit ourselves to conventional thinking. We push past predefined constraints to discover breakthrough ideas that shape markets.",
    icon: Compass,
    color: "from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20",
    border: "border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Boundless Learning",
    description: "Growth is a lifelong pursuit. We foster a mindset of constant curiosity, continuous upskilling, and sharing knowledge across teams.",
    icon: GraduationCap,
    color: "from-purple-600/10 to-pink-600/10 dark:from-purple-600/20 dark:to-pink-600/20",
    border: "border-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Purposeful Creativity",
    description: "Creativity without strategy is just art. We design and innovate with clear intent, ensuring every solution solves a real-world problem.",
    icon: Sparkles,
    color: "from-amber-600/10 to-orange-600/10 dark:from-amber-600/20 dark:to-orange-600/20",
    border: "border-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Respectful Collaboration",
    description: "The best ideas are born from collaboration among diverse minds. We communicate openly, respect every voice, and win as a single team.",
    icon: Handshake,
    color: "from-emerald-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:to-teal-600/20",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Excellence in Execution",
    description: "Strategy is nothing without execution. We maintain high quality standards, work with precision, and deliver measurable business impact.",
    icon: Target,
    color: "from-rose-600/10 to-red-600/10 dark:from-rose-600/20 dark:to-red-600/20",
    border: "border-rose-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Empowering Partners",
    description: "We align our efforts with our clients' long-term business goals, measuring our success by the actual value and growth we help them achieve.",
    icon: TrendingUp,
    color: "from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20",
    border: "border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

export default function BeliefsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="beliefs" className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/40">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-800/40" />

      <div className="container relative mx-auto max-w-7xl px-6">
        
        {/* Title Area */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-heading dark:text-white sm:text-5xl">
              We Believe In
            </h2>
            <div className="mt-4 mx-auto h-1.5 w-20 rounded-full bg-primary" />
            <p className="mt-6 text-lg leading-relaxed text-body dark:text-slate-400">
              Our core beliefs are not just slogans on a wall. They guide how we think, how we work, and how we interact with our clients and each other every single day.
            </p>
          </motion.div>
        </div>

        {/* Beliefs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {beliefs.map((belief, index) => {
            const Icon = belief.icon;
            const isDarkCard = index % 2 === 1;
            return (
              <motion.div
                key={belief.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-[2.5rem] border p-8 shadow-sm transition-all duration-300 ${
                  isDarkCard 
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white dark:bg-primary/90 shadow-blue-500/5 hover:shadow-xl hover:shadow-sky-500/10" 
                    : "bg-white border-slate-200 text-heading dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-primary/5"
                }`}
              >
                {!isDarkCard && (
                  <div className={`absolute inset-0 bg-gradient-to-br -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${belief.color}`} />
                )}
                
                <div className="flex items-center gap-4">
                  <div className={`rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                    isDarkCard 
                      ? "bg-white p-4 border border-white/10" 
                      : "bg-slate-50 p-4 border border-slate-100 dark:bg-slate-900 dark:border-slate-800/80"
                  }`}>
                    <Icon className={`size-6 ${
                      isDarkCard 
                        ? "text-[var(--primary)]" 
                        : "text-[var(--primary)] dark:text-blue-400"
                    }`} />
                  </div>
                  <span className={`text-xl font-bold tracking-tight ${
                    isDarkCard 
                      ? "text-white/30" 
                      : "text-slate-300 dark:text-slate-700"
                  }`}>
                    0{index + 1}
                  </span>
                </div>

                <h3 className={`mt-6 text-xl font-bold transition-colors ${
                  isDarkCard 
                    ? "text-white group-hover:text-sky-200" 
                    : "text-heading dark:text-white group-hover:text-primary dark:group-hover:text-blue-400"
                }`}>
                  {belief.title}
                </h3>

                <p className={`mt-4 text-sm leading-relaxed ${
                  isDarkCard 
                    ? "text-white/80" 
                    : "text-body dark:text-slate-400"
                }`}>
                  {belief.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 relative overflow-hidden rounded-[3rem] bg-[#081C2E] p-10 sm:p-16 lg:p-20 text-white shadow-2xl"
        >
          {/* Radial light glow */}
          <div className="absolute -left-20 -top-20 size-[30rem] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 size-[30rem] rounded-full bg-accent/20 blur-3xl" />
          
          {/* Decorative quote marks */}
          <span className="absolute -left-4 -top-8 text-[12rem] font-serif font-bold text-white/5 select-none pointer-events-none sm:-left-2 sm:-top-12 sm:text-[18rem]">
            “
          </span>

          <div className="relative z-10 flex flex-col justify-center max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-6 sm:mb-8">
              PEOPLE & PERFORMANCE
            </span>
            
            <blockquote className="text-2xl font-medium sm:text-3xl lg:text-4xl leading-relaxed text-slate-100 tracking-tight">
              &ldquo;Every one of us at Fillip Technologies works towards creating an environment that respects <span className="highlight-text font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">people</span> as much as <span className="highlight-text font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">performance</span>.&rdquo;
            </blockquote>

            <div className="mt-8 mx-auto w-12 h-1 rounded-full bg-accent/60" />

            <cite className="mt-6 not-italic block text-lg sm:text-xl font-semibold text-slate-300">
              As great performance starts with great people.
            </cite>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
