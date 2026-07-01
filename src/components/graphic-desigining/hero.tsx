"use client";

import { motion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowRight,
    Pen,
    MousePointer,
    Type
} from "lucide-react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    display: "swap",
});

const cards = [
    {
        id: "01",
        title: "Gradient Loop",
        desc: "3D gradient prisms with smooth looping animations.",
        // Gradient loop abstract shape
        renderVisual: () => (
            <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                <defs>
                    <linearGradient id="gl1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="50%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                    </linearGradient>
                    <linearGradient id="gl2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e0e7ff" />
                        <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                </defs>
                <ellipse cx="100" cy="115" rx="55" ry="18" fill="#e0e7ff" opacity="0.5" />
                <path d="M60,130 C20,100 30,50 70,40 C110,30 130,60 120,90 C110,120 80,130 60,130 Z" fill="url(#gl1)" opacity="0.9" />
                <path d="M90,120 C60,110 50,70 80,50 C110,30 140,50 140,80 C140,110 120,130 90,120 Z" fill="url(#gl2)" opacity="0.7" />
                <circle cx="75" cy="75" r="12" fill="white" opacity="0.25" />
            </svg>
        ),
    },
    {
        id: "02",
        title: "Liquid Flow",
        desc: "Abstract liquid shapes for modern branding.",
        // Orange/green liquid blob
        renderVisual: () => (
            <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                <defs>
                    <linearGradient id="lf1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="lf2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>
                <ellipse cx="100" cy="155" rx="45" ry="12" fill="#fed7aa" opacity="0.4" />
                <path d="M55,120 C30,90 40,45 75,35 C110,25 125,55 130,75 C135,95 120,125 90,130 C70,133 60,128 55,120 Z" fill="url(#lf1)" />
                <path d="M110,115 C85,105 90,65 115,55 C140,45 160,65 155,90 C150,115 130,125 110,115 Z" fill="url(#lf2)" opacity="0.85" />
                <circle cx="80" cy="65" r="8" fill="white" opacity="0.3" />
                <circle cx="130" cy="80" r="5" fill="white" opacity="0.2" />
            </svg>
        ),
    },
    {
        id: "03",
        title: "Fluid Wave",
        desc: "Smooth & fluid abstract illustrations.",
        // Blue fluid wave blob
        renderVisual: () => (
            <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                <defs>
                    <linearGradient id="fw1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="fw2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#7dd3fc" />
                    </linearGradient>
                </defs>
                <ellipse cx="100" cy="155" rx="50" ry="14" fill="#e0f2fe" opacity="0.5" />
                <path d="M40,100 C35,60 65,30 100,35 C135,40 155,65 150,95 C145,125 115,145 85,140 C55,135 42,120 40,100 Z" fill="url(#fw1)" />
                <path d="M70,90 C65,60 90,40 115,50 C140,60 145,85 130,100 C115,115 80,110 70,90 Z" fill="url(#fw2)" opacity="0.6" />
                <circle cx="95" cy="65" r="10" fill="white" opacity="0.2" />
                <path d="M80,130 Q100,110 120,125" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
            </svg>
        ),
    },
    {
        id: "04",
        title: "Poly Prism",
        desc: "Geometric shapes with vibrant gradient effects.",
        // Crystal/prism geometric shapes
        renderVisual: () => (
            <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                <defs>
                    <linearGradient id="pp1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="pp2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="pp3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                </defs>
                {/* Large diamond */}
                <polygon points="100,25 140,70 100,115 60,70" fill="url(#pp1)" opacity="0.9" />
                <polygon points="100,25 140,70 100,55" fill="url(#pp2)" opacity="0.6" />
                {/* Small diamond */}
                <polygon points="145,55 165,80 145,105 125,80" fill="url(#pp3)" opacity="0.75" />
                <polygon points="145,55 165,80 145,70" fill="white" opacity="0.15" />
                {/* Tiny crystal */}
                <polygon points="55,100 70,120 55,140 40,120" fill="url(#pp2)" opacity="0.5" />
                {/* Sparkle dots */}
                <circle cx="80" cy="45" r="2" fill="#c084fc" opacity="0.6" />
                <circle cx="155" cy="100" r="1.5" fill="#818cf8" opacity="0.5" />
                <circle cx="45" cy="85" r="1.5" fill="#a78bfa" opacity="0.4" />
            </svg>
        ),
    },
    {
        id: "05",
        title: "Neon Morph",
        desc: "Bright & bold shapes for creative projects.",
        // Green/yellow neon morph shape
        renderVisual: () => (
            <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                <defs>
                    <linearGradient id="nm1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="50%" stopColor="#a3e635" />
                        <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="nm2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#86efac" />
                        <stop offset="100%" stopColor="#bef264" />
                    </linearGradient>
                </defs>
                <ellipse cx="100" cy="155" rx="45" ry="12" fill="#dcfce7" opacity="0.5" />
                <path d="M50,100 C40,55 70,25 105,35 C140,45 155,75 145,105 C135,135 100,145 75,135 C50,125 45,115 50,100 Z" fill="url(#nm1)" />
                <path d="M85,95 C80,65 100,50 120,60 C140,70 140,95 125,105 C110,115 90,110 85,95 Z" fill="url(#nm2)" opacity="0.5" />
                <circle cx="90" cy="60" r="8" fill="white" opacity="0.25" />
                <circle cx="130" cy="90" r="5" fill="white" opacity="0.15" />
            </svg>
        ),
    },
    {
        id: "06",
        title: "Smoke Trail",
        desc: "Elegant smoky abstract graphic effects.",
        // Purple/pink smoke trail
        renderVisual: () => (
            <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                <defs>
                    <linearGradient id="st1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e879f9" />
                        <stop offset="50%" stopColor="#d946ef" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="st2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f0abfc" />
                        <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                </defs>
                <path d="M140,150 C155,130 160,100 145,75 C130,50 110,40 95,45 C80,50 75,65 85,80 C95,95 85,115 70,125 C55,135 45,130 40,115" fill="none" stroke="url(#st1)" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
                <path d="M130,140 C145,120 148,95 135,75 C122,55 108,48 98,52 C88,56 85,68 92,78 C99,88 92,105 80,112" fill="none" stroke="url(#st2)" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
                <circle cx="140" cy="150" r="6" fill="#e879f9" opacity="0.4" />
                <circle cx="40" cy="115" r="4" fill="#a855f7" opacity="0.3" />
            </svg>
        ),
    },
];

export default function GraphicHero() {
    return (
        <section className="relative text-[#0f172a] border-b border-[#0f172a]/10">

            {/* Styles */}
            <style jsx>{`
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float { animation: float-gentle 6s ease-in-out infinite; }
            `}</style>

            {/* ====== STICKY BACKGROUND IMAGE ====== */}
            <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
                <img
                    src="/images/graphic-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Soft overlay to keep content readable */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
            </div>

            {/* ====== SCROLLABLE CONTENT OVER STICKY BG ====== */}
            <div className="relative z-10 -mt-[100vh]">
                <div className="pt-28 pb-44 px-4 md:px-12 overflow-hidden">

            {/* Floating vector path accent (left) */}
            <div className="absolute left-[10%] top-[18%] pointer-events-none hidden xl:block z-0 opacity-50">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="text-slate-500/40">
                    <path d="M10,80 C60,20 120,20 170,80" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="10" cy="80" r="3" fill="white" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="90" cy="40" r="3.5" fill="white" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="170" cy="80" r="3" fill="white" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="90" y1="40" x2="65" y2="20" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="65" cy="20" r="1.5" fill="currentColor" />
                    <line x1="90" y1="40" x2="115" y2="60" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="115" cy="60" r="1.5" fill="currentColor" />
                </svg>
                <div className="absolute left-[72px] top-[24px] transform rotate-[135deg] text-slate-500/60">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21 L5,21 L18.5,7.5 L15.5,4.5 L2,18 L2,21 Z M17,3 L20,3 C21,3 22,4 22,5 L22,8 L19,5 L17,3 Z" />
                    </svg>
                </div>
            </div>

            {/* Floating design tool icons (right side) */}
            <div className="absolute right-[8%] top-[15%] pointer-events-none hidden xl:flex flex-col gap-3 z-0 opacity-35">
                <div className="w-7 h-7 rounded-lg border border-slate-300/40 bg-white/70 flex items-center justify-center text-slate-400 animate-float" style={{ animationDelay: "0s" }}>
                    <MousePointer size={12} className="transform -rotate-45" />
                </div>
                <div className="w-7 h-7 rounded-lg border border-slate-300/40 bg-white/70 flex items-center justify-center text-slate-400 animate-float" style={{ animationDelay: "1s" }}>
                    <Type size={12} />
                </div>
                <div className="w-7 h-7 rounded-lg border border-slate-300/40 bg-white/70 flex items-center justify-center text-slate-400 animate-float" style={{ animationDelay: "2s" }}>
                    <Pen size={12} />
                </div>
            </div>

            {/* ====== MAIN HEADER ====== */}
            <div className="max-w-7xl mx-auto text-center relative z-10">

                {/* Funky Title */}
                <div className="mb-7 flex justify-center items-baseline flex-wrap gap-x-5 gap-y-3 select-none relative">
                    {/* Accent scratches */}
                    <div className="absolute left-[15%] md:left-[22%] top-[-12px] text-pink-400/30 text-xl font-bold font-mono tracking-widest hidden md:block select-none pointer-events-none">//</div>
                    <div className="absolute right-[10%] md:right-[18%] top-[-6px] text-pink-400/30 text-xl font-bold font-mono tracking-widest hidden md:block select-none pointer-events-none">///</div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-8xl font-black tracking-tight text-[#0f172a] leading-none"
                    >
                        Graphic
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 80, delay: 0.1 }}
                        className={`${dancingScript.className} text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 inline-block pl-2`}
                    >
                        Designing
                    </motion.span>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-xl mx-auto text-base md:text-lg text-slate-500 leading-relaxed font-light mb-16"
                >
                    Turning ideas into <span className="font-medium text-slate-700 underline decoration-pink-400 decoration-wavy underline-offset-4">visually stunning</span> designs that speak for your brand.
                </motion.p>
            </div>

            {/* ====== REFERENCE-STYLE CARDS ====== */}
            <div className="max-w-[1400px] mx-auto mt-4 z-10 relative">

                {/* Floating decorative dots */}
                <div className="absolute -left-4 top-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 opacity-40 hidden lg:block" />
                <div className="absolute left-[15%] -top-6 w-2 h-2 rounded-full bg-pink-400 opacity-30 hidden lg:block" />
                <div className="absolute right-[10%] top-[20%] w-4 h-4 rounded-full border-2 border-purple-300 opacity-30 hidden lg:block" />
                <div className="absolute right-[5%] bottom-[30%] w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30 hidden lg:block" />

                <div className="flex gap-5 overflow-x-auto pb-8 px-4 snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0 scrollbar-hide">
                    {cards.map((card, idx) => {
                        // Slight rotation angles for fanned look
                        const rotations = [-3, -1.5, 0, 1.5, 3, 1];
                        const rotation = rotations[idx] || 0;

                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 40, rotate: 0 }}
                                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.08 }}
                                whileHover={{ y: -12, rotate: 0, scale: 1.04 }}
                                className="group bg-white/95 backdrop-blur-md border border-slate-200/70 rounded-[24px] p-4 flex flex-col shadow-lg hover:shadow-2xl hover:border-slate-300 transition-all duration-300 relative overflow-hidden cursor-pointer min-w-[200px] snap-center"
                            >
                                {/* Card header: No. + GRAPHIC DESIGNING */}
                                <div className="mb-1">
                                    <span className="text-[9px] font-mono text-slate-400/60 tracking-wider block mb-2">No. 0{card.id}</span>
                                    <div className="flex items-baseline gap-1.5 select-none">
                                        <span className="text-[11px] font-black uppercase tracking-wide text-[#0f172a] leading-none">GRAPHIC</span>
                                        <span className={`${dancingScript.className} text-[13px] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 leading-none`}>
                                            DESIGNING
                                        </span>
                                    </div>
                                </div>

                                {/* Visual area with abstract 3D shape */}
                                <div className="flex-1 flex items-center justify-center py-4 min-h-[140px]">
                                    {card.renderVisual()}
                                </div>

                                {/* Card title */}
                                <h3 className="text-[13px] font-bold text-slate-800 mb-1 leading-snug group-hover:text-slate-900 transition-colors">{card.title}</h3>

                                {/* Footer: desc + button */}
                                <div className="flex items-end justify-between mt-1">
                                    <p className="text-[9.5px] leading-snug text-slate-400 font-light pr-2 max-w-[78%]">
                                        {card.desc}
                                    </p>
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:rotate-45 transition-all duration-300 shrink-0">
                                        <ArrowUpRight size={12} className="stroke-[2.5]" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ====== BOTTOM CTA ====== */}
            <div className="max-w-4xl mx-auto mt-24 text-center relative z-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="#estimate"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0f172a] text-white hover:bg-slate-800 transition-colors text-sm font-semibold shadow-lg"
                    >
                        <span>Request Custom Designs</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                        href="#capabilities"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white transition-colors text-sm font-semibold shadow-sm"
                    >
                        <span>Explore Services</span>
                    </a>
                </div>
            </div>

                </div>{/* end pt-28 pb-44 */}
            </div>{/* end scrollable content */}

        </section>
    );
}
