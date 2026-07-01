"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface InfoCard {
  title: string;
  value?: string;
  values?: { label: string; href: string }[];
  desc: string;
  href?: string;
  icon: ComponentType<any>;
  badge?: string;
}

const infoCards: InfoCard[] = [
  {
    title: "Email Us",
    value: "info@filliptechnologies.com",
    desc: "For general inquiries, project proposals, and partnership requests.",
    href: "mailto:info@filliptechnologies.com",
    icon: Mail,
    badge: "Fast Response"
  },
  {
    title: "Call Us",
    values: [
      { label: "+91 72579 30444", href: "tel:+917257930444" },
      { label: "+91 75459 99996", href: "tel:+917545999996" },
      { label: "+91 75459 99995", href: "tel:+917545999995" }
    ],
    desc: "Speak directly with our strategy and consulting team for immediate inquiries.",
    icon: Phone,
    badge: "Mon-Sat 9AM-7PM"
  },
  {
    title: "Our Headquarters",
    value: "Patna Office",
    desc: "A3, Ground Floor, Beside Kalyan Jewellers, Near Chandan Hero, Kankarbagh Main Road, Patna, Bihar - 800020",
    icon: MapPin,
  },
  {
    title: "Response Time",
    value: "Under 4 Hours",
    desc: "Our active support managers monitor queries to deliver rapid scoping estimates.",
    icon: Clock,
    badge: "Guaranteed"
  }
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
      {infoCards.map((card, idx) => {
        const Icon = card.icon;
        
        const content = (
          <>
            {card.badge && (
              <span className="absolute top-6 right-6 inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/10 z-20">
                {card.badge}
              </span>
            )}
            <div className="flex items-start gap-5 relative z-10">
              <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                <Icon className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-1.5 mt-1">
                  {card.title}
                </h3>
                {card.values ? (
                  <div className="flex flex-col gap-1.5 mb-2 relative z-30">
                    {card.values.map((v, i) => (
                      <a
                        key={i}
                        href={v.href}
                        className="text-sm md:text-base font-extrabold text-slate-900 hover:text-primary transition-colors duration-300 break-words block"
                      >
                        {v.label}
                      </a>
                    ))}
                  </div>
                ) : card.value ? (
                  <p className="text-sm md:text-base font-extrabold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300 break-words">
                    {card.value}
                  </p>
                ) : null}
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          </>
        );

        const cardClass = "block relative border border-slate-200/80 bg-white/60 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.04)] hover:border-slate-350 transition-all duration-300 overflow-hidden h-full group text-left";

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="h-full"
          >
            {card.href ? (
              <a href={card.href} className={cardClass}>
                {content}
              </a>
            ) : (
              <div className={cardClass}>
                {content}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
