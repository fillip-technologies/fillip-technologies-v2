"use client";

import { motion } from "framer-motion";
import { Award, Users, CheckCircle2, Calendar } from "lucide-react";

const stats = [
  {
    value: "13+",
    label: "Years of Innovation",
    icon: Calendar,
    color: "from-sky-400 to-blue-500",
  },
  {
    value: "1500+",
    label: "Projects Delivered",
    icon: CheckCircle2,
    color: "from-blue-400 to-indigo-400",
  },
  {
    value: "50+",
    label: "Team Experts",
    icon: Users,
    color: "from-sky-300 to-teal-400",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: Award,
    color: "from-emerald-400 to-teal-400",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#081C2E] py-14 text-white dark:bg-slate-950 border-y border-slate-800">
      {/* Visual background noise/dots overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 10%, transparent 11%)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">

          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center lg:px-6 pt-6 lg:pt-0 first:pt-0"
              >
                {/* Visual Icon Badge */}
                <div className="rounded-full bg-white/5 p-2.5 text-sky-400 border border-white/10 mb-3.5">
                  <Icon className="size-5" />
                </div>

                {/* Massive Number */}
                <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r ${stat.color} bg-clip-text text-transparent pb-1 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]`}>
                  {stat.value}
                </span>

                {/* Small Description */}
                <span className="mt-2 text-sm font-semibold tracking-wider text-slate-300 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
