"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    image: "/images/hardware/service_security_system.png",
    title: "Security Systems",
    description: "We install burglar alarm systems with all extents of protection, vaults, and zone alarms.",
  },
  {
    image: "/images/hardware/service_monitoring.png",
    title: "Central Station Monitoring",
    description: "We offer 24-hour central station monitoring service for all installations.",
  },
  {
    image: "/images/hardware/service_fire_alarm.png",
    title: "Fire Alarm Systems",
    description: "Our company sells, installs, and maintains complete integrated fire alarm systems.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function SecurityServices() {
  return (
    <section id="our-services" className="py-24 bg-[#f9f9f9] relative border-y border-slate-200/40 text-heading">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="flex flex-col items-center gap-2">
            {/* Small blue line indicator */}
            <div className="w-8 h-[2px] bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 leading-tight">
            High-Quality Alarm and Security Services
          </h2>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {services.map((svc, i) => {
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white border border-slate-100 shadow-sm rounded-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Card Top Image */}
                <div className="relative w-full aspect-[16/10] bg-slate-50 border-b border-slate-100">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Card Info & Action */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900">
                      {svc.title}
                    </h3>
                    <p className="text-slate-500 font-light text-sm leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-2 text-left">
                    <Button size="sm" className="rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider px-6 py-4.5 h-auto text-xs" asChild>
                      <Link href="/contact">
                        Read More
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
