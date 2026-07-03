"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";

const checklist = [
  {
    icon: FileText,
    title: "Homeowner's Insurance Certificate",
    description: "If your security surveillance system is eligible for discounts on your homeowner's or business insurance, we'll provide a certificate for your insurer.",
  },
  {
    icon: ShieldCheck,
    title: "Our Promise",
    description: "Fast, reliable response backed by years of experience, products, and services that keep you safe and secure.",
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
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function SecuritySupport() {
  return (
    <section className="py-24 bg-white relative text-heading">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">

          {/* Left Column (Image) */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              className="relative w-full max-w-[480px] aspect-[4/5] overflow-hidden shadow-md border border-slate-100"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/hardware/security_technician.png"
                alt="Technician mounting a bullet security camera on a brick wall"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Column (Text Details) */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Header label with blue line */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-blue-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  About our company
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Our systems are backed by people committed to your security, with professional 24/7 support.
              </h3>
            </div>

            {/* Checklist items with blue icons */}
            <div className="space-y-8 pt-4">
              {checklist.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <motion.div key={idx} variants={itemVariants} className="flex gap-4 items-start">
                    <div className="mt-1 flex-shrink-0 size-12 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                      <IconComp className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
