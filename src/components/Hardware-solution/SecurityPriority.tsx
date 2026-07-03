"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SecurityPriority() {
  return (
    <section className="py-24 bg-white relative text-heading">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column (Text & Button) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Your Home and Office Security is Our Priority
            </h2>
            
            <p className="text-base text-slate-600 leading-relaxed font-light">
              Whether you are at home or on the road, it&apos;s never been easier to keep your family and home safe and secure.
            </p>
            
            <p className="text-base text-slate-600 leading-relaxed font-light">
              Certified Security works with you to custom design a system to meet your individual needs and budget. We provide everything you need from a basic burglar and fire alarm to sophisticated surveillance system.
            </p>
            
            <div className="pt-4">
              <Button size="lg" className="rounded-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-auto text-sm font-bold uppercase tracking-wider transition-all duration-300" asChild>
                <Link href="/contact">
                  Read More
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column (Dome Camera Image) */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div 
              className="relative w-full max-w-[540px] aspect-[16/10] overflow-hidden shadow-md border border-slate-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/hardware/security_dome.png"
                alt="Dome security camera installation by technician"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
