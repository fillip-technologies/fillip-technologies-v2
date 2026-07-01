"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Layers, 
  Palette, 
  BarChart2, 
  Play, 
  Pause, 
  Grid, 
  Box, 
  Info,
  Maximize2
} from "lucide-react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});

const grainUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`;

interface Project {
  id: string;
  serial: string;
  title: string;
  category: string;
  client: string;
  desc: string;
  tag: string;
  color: string; // Theme color for background aurora (pastel in light mode)
}

const projects: Project[] = [
  {
    id: "vortex",
    serial: "01",
    title: "Vortex Brand System",
    category: "Visual Systems",
    client: "Vortex Labs",
    desc: "A generative brand system exploring fluid vector geometry, structural guides, and organic particle flows.",
    tag: "BRAND SYSTEM",
    color: "from-cyan-400/15 to-indigo-400/5",
  },
  {
    id: "chronos",
    serial: "02",
    title: "Chronos Editorial Posters",
    category: "Print & Packaging",
    client: "Zurich Art Museum",
    desc: "Swiss modernist exhibition posters structured around typographic grids and mathematical curves.",
    tag: "POSTER SERIES",
    color: "from-rose-400/15 to-orange-400/5",
  },
  {
    id: "cyclone",
    serial: "03",
    title: "Cyclone Neon Dashboard",
    category: "Visual Systems",
    client: "Cyclone SaaS",
    desc: "Neomorphic data visualizations utilizing glowing curves and glassmorphic control panels.",
    tag: "UI SYSTEMS",
    color: "from-emerald-400/15 to-blue-400/5",
  },
  {
    id: "aura",
    serial: "04",
    title: "Aura Natural Products",
    category: "Print & Packaging",
    client: "Aura Skincare",
    desc: "Earthy botanical label packaging structured on golden-ratio alignment marks and eco spec data sheets.",
    tag: "PACKAGING",
    color: "from-amber-400/15 to-emerald-400/5",
  },
  {
    id: "pulse",
    serial: "05",
    title: "Pulse Campaign Deck",
    category: "Digital & Ads",
    client: "Pulse Audio",
    desc: "Bold high-contrast duotone ads featuring audio-responsive waves and dynamic layouts.",
    tag: "SOCIAL CAMPAIGN",
    color: "from-pink-400/15 to-violet-400/5",
  },
  {
    id: "orbit",
    serial: "06",
    title: "Orbit 3D Asset Pack",
    category: "Digital & Ads",
    client: "Orbit Metaverse",
    desc: "Isometric low-poly shapes and structural assets modeled on fine perspective vector coordinate systems.",
    tag: "3D VECTOR PACK",
    color: "from-green-400/15 to-cyan-400/5",
  },
];

export default function GraphicPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProj = projects[activeIndex] || projects[0];

  // Interactive stage states
  const [exhibit1Guides, setExhibit1Guides] = useState(true);
  const [exhibit2Colorway, setExhibit2Colorway] = useState<"red" | "purple" | "mono">("red");
  const [exhibit3Metric, setExhibit3Metric] = useState<"users" | "conv" | "rev">("users");
  const [exhibit4Hotspot, setExhibit4Hotspot] = useState<string | null>(null);
  const [exhibit5Play, setExhibit5Play] = useState(false);
  const [exhibit6Wireframe, setExhibit6Wireframe] = useState(false);

  // Audio wave animation simulation heights
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 60, 30, 80, 50, 90, 45, 70, 35, 60, 20]);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (exhibit5Play) {
      interval = setInterval(() => {
        setWaveHeights(Array.from({ length: 11 }, () => Math.floor(Math.random() * 85) + 15));
      }, 120);
    } else {
      setWaveHeights([40, 60, 30, 80, 50, 90, 45, 70, 35, 60, 20]);
    }
    return () => clearInterval(interval);
  }, [exhibit5Play]);

  // Render the respective interactive visual for the active project
  const renderProjectVisual = (projectId: string) => {
    switch (projectId) {
      case "vortex":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="vortex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
              <pattern id="vortex-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15, 23, 42, 0.04)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="#ffffff" />
            <rect width="100%" height="100%" fill="url(#vortex-grid)" />

            {/* Generative Spiral Vortices */}
            <g transform="translate(200, 125)">
              <circle cx="0" cy="0" r="85" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(79, 70, 229, 0.12)" strokeWidth="1.5" />

              {/* Generative swirling lines */}
              <path d="M-50,0 Q0,-60 50,0 T150,0" fill="none" stroke="url(#vortex-grad)" strokeWidth="2.5" opacity="0.85" transform="rotate(0)" />
              <path d="M-50,0 Q0,-60 50,0 T150,0" fill="none" stroke="url(#vortex-grad)" strokeWidth="2" opacity="0.65" transform="rotate(45)" />
              <path d="M-50,0 Q0,-60 50,0 T150,0" fill="none" stroke="url(#vortex-grad)" strokeWidth="1.5" opacity="0.45" transform="rotate(90)" />
              <path d="M-50,0 Q0,-60 50,0 T150,0" fill="none" stroke="url(#vortex-grad)" strokeWidth="1.5" opacity="0.35" transform="rotate(135)" />
              <path d="M-50,0 Q0,-60 50,0 T150,0" fill="none" stroke="url(#vortex-grad)" strokeWidth="0.5" opacity="0.25" transform="rotate(180)" />

              {/* Vortex Core */}
              <circle cx="0" cy="0" r="12" fill="#0f172a" className="drop-shadow-[0_4px_10px_rgba(6,182,212,0.4)]" />
              <circle cx="0" cy="0" r="4" fill="#06b6d4" />
            </g>

            {/* Layout guides layer */}
            {exhibit1Guides && (
              <g stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1" fill="none">
                <line x1="200" y1="0" x2="200" y2="250" strokeDasharray="3 3" />
                <line x1="0" y1="125" x2="400" y2="125" strokeDasharray="3 3" />
                <circle cx="200" cy="125" r="105" strokeDasharray="4 2" />
                <rect x="95" y="20" width="210" height="210" strokeDasharray="5 5" />
                <text x="210" y="35" fill="#ef4444" fontSize="8" fontFamily="monospace" letterSpacing="1">SEC: 210px</text>
                <text x="210" y="225" fill="#ef4444" fontSize="8" fontFamily="monospace" letterSpacing="1">CENTER [200, 125]</text>
                {/* Vector Nodes */}
                <circle cx="200" cy="40" r="3" fill="#ef4444" />
                <circle cx="350" cy="125" r="3" fill="#ef4444" />
                <circle cx="200" cy="210" r="3" fill="#ef4444" />
                <circle cx="50" cy="125" r="3" fill="#ef4444" />
              </g>
            )}

            <text x="25" y="35" fill="rgba(15, 23, 42, 0.7)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="2">VORTEX LABS // LABS-01</text>
            <text x="375" y="35" textAnchor="end" fill="rgba(15, 23, 42, 0.4)" fontSize="8" fontFamily="monospace">GEN.MODE: VECTOR</text>
          </svg>
        );

      case "chronos":
        // Colorway definitions (these keep their poster gradients as artwork)
        const bgFill = exhibit2Colorway === "red" ? "#dc2626" : exhibit2Colorway === "purple" ? "#6d28d9" : "#1e293b";
        const accentColor = exhibit2Colorway === "red" ? "#f97316" : exhibit2Colorway === "purple" ? "#db2777" : "#64748b";
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full object-cover transition-all duration-500">
            <rect width="100%" height="100%" fill={bgFill} className="transition-colors duration-500" />
            
            {/* Swiss Grid margins */}
            <rect x="15" y="15" width="370" height="220" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <line x1="200" y1="15" x2="200" y2="235" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.75" />
            
            {/* Abstract Graphic Waveforms */}
            <g opacity="0.3" transform="translate(230, 110)">
              <ellipse cx="50" cy="30" rx="90" ry="40" fill="none" stroke="white" strokeWidth="6" />
              <ellipse cx="50" cy="30" rx="70" ry="25" fill="none" stroke="white" strokeWidth="3" />
              <ellipse cx="50" cy="30" rx="50" ry="12" fill="none" stroke="white" strokeWidth="1" />
            </g>

            {/* Switzerland Cross */}
            <g transform="translate(350, 40)" stroke="white" strokeWidth="2">
              <line x1="-5" y1="0" x2="5" y2="0" />
              <line x1="0" y1="-5" x2="0" y2="5" />
            </g>
            
            {/* Swiss Poster Typography */}
            <text x="35" y="65" fill="white" fontSize="42" fontFamily="sans-serif" fontWeight="900" letterSpacing="-2.5">CHRONOS</text>
            <text x="35" y="105" fill="white" fontSize="42" fontFamily="sans-serif" fontWeight="900" letterSpacing="-2.5">TEMPORAL</text>
            
            <rect x="35" y="125" width="130" height="4" fill={accentColor} className="transition-colors duration-500" />
            
            <text x="35" y="155" fill="white" opacity="0.85" fontSize="8" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">ZURICH ART MUSEUM SERIES</text>
            
            <text x="35" y="185" fill="white" opacity="0.7" fontSize="7.5" fontFamily="sans-serif">
              <tspan x="35" dy="0">DATE: OCT 12 – NOV 04</tspan>
              <tspan x="35" dy="11">STAGE: HALL C / ENTRY FREE</tspan>
              <tspan x="35" dy="11">COORDINATE: ZRH_CH_2026</tspan>
            </text>

            <text x="365" y="220" textAnchor="end" fill="white" opacity="0.5" fontSize="7" fontFamily="monospace" letterSpacing="1">THEME: HELVETICA</text>
          </svg>
        );

      case "cyclone":
        // Path logic based on selected metrics
        const chartPath = exhibit3Metric === "users" 
          ? "M 180 155 L 210 115 L 240 135 L 275 85 L 310 120 L 340 70"
          : exhibit3Metric === "conv"
          ? "M 180 100 L 210 135 L 240 90 L 275 125 L 310 80 L 340 95"
          : "M 180 145 L 210 130 L 240 115 L 275 105 L 310 90 L 340 65";

        const statTitle = exhibit3Metric === "users" ? "USER TRAFFIC" : exhibit3Metric === "conv" ? "CONVERSION RATE" : "MONTHLY REVENUE";
        const statPercent = exhibit3Metric === "users" ? "+14.2% YOY" : exhibit3Metric === "conv" ? "+3.8% MOO" : "+22.4% LTM";
        const statValue = exhibit3Metric === "users" ? "8,492 ACTIVE" : exhibit3Metric === "conv" ? "4.21% RATIO" : "$124,500 MRR";
        
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="cyclone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="cyclone-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(103, 232, 249, 0.25)" />
                <stop offset="100%" stopColor="rgba(103, 232, 249, 0.0)" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="#ffffff" />
            <circle cx="320" cy="50" r="70" fill="none" stroke="rgba(15,23,42,0.03)" strokeWidth="15" />

            {/* Glassmorphic card frame */}
            <rect x="30" y="35" width="340" height="180" rx="14" fill="rgba(15, 23, 42, 0.02)" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.5" />
            
            {/* Window control circles */}
            <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
            <circle cx="60" cy="50" r="3.5" fill="#fbbf24" />
            <circle cx="70" cy="50" r="3.5" fill="#10b981" />
            <text x="90" y="53" fill="#0f172a" opacity="0.6" fontSize="8" fontFamily="monospace">CYCLONE_V1.X // SYSTEM</text>

            {/* Left Content Metric Box */}
            <g transform="translate(50, 80)">
              <rect width="110" height="40" rx="6" fill="rgba(15,23,42,0.02)" stroke="rgba(15,23,42,0.05)" />
              <text x="10" y="14" fill="rgba(15,23,42,0.5)" fontSize="6.5" fontFamily="monospace">{statTitle}</text>
              <text x="10" y="24" fill="#0f172a" fontSize="10" fontFamily="sans-serif" fontWeight="bold">{statValue}</text>
              <text x="10" y="32" fill="#059669" fontSize="6.5" fontFamily="sans-serif">{statPercent}</text>
            </g>

            {/* Bottom mini-sliders */}
            <g transform="translate(50, 140)">
              <line x1="0" y1="4" x2="100" y2="4" stroke="rgba(15,23,42,0.08)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="4" x2="70" y2="4" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="70" cy="4" r="4.5" fill="#0ea5e9" />
              <text x="0" y="16" fill="#0f172a" opacity="0.5" fontSize="7" fontFamily="sans-serif">NEON FEEDBACK LOAD</text>
            </g>

            <g transform="translate(50, 175)">
              <line x1="0" y1="4" x2="100" y2="4" stroke="rgba(15,23,42,0.08)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="4" x2="45" y2="4" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="45" cy="4" r="4.5" fill="#059669" />
              <text x="0" y="16" fill="#0f172a" opacity="0.5" fontSize="7" fontFamily="sans-serif">AMBIENT DEPTH SENSOR</text>
            </g>

            {/* Dynamic Graph Line */}
            <path 
              d={chartPath} 
              fill="none" 
              stroke="#0ea5e9" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-all duration-700 ease-in-out"
            />
            {/* Dynamic Area Fill below path */}
            <path 
              d={`${chartPath} L 340 185 L 180 185 Z`} 
              fill="url(#cyclone-glow)"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Glowing endpoint node */}
            <circle cx="340" cy={exhibit3Metric === "users" ? 70 : exhibit3Metric === "conv" ? 95 : 65} r="4.5" fill="white" stroke="#0ea5e9" strokeWidth="2.5" className="transition-all duration-700 ease-in-out" />
          </svg>
        );

      case "aura":
        const detailsText = exhibit4Hotspot === "pure" 
          ? "INGREDIENTS: 100% ORGANIC ESSENTIAL EXTRACTS"
          : exhibit4Hotspot === "bottle"
          ? "CONTAINER: 100% POST-CONSUMER RECYCLED GLASS"
          : exhibit4Hotspot === "specs"
          ? "DIMENSIONS: 500ML // ECO-CERT STANDARD // BLEED 3MM"
          : "HOVER DOTS FOR SPECS";

        return (
          <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="aura-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="60%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#aura-grad)" />
            
            {/* Spec lines blueprint */}
            <path d="M 15 25 L 15 15 L 25 15 M 385 25 L 385 15 L 375 15 M 15 225 L 15 235 L 25 235 M 385 225 L 385 235 L 375 235" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />

            {/* Bottle sketch overlay */}
            <g transform="translate(260, 125) scale(0.9)" opacity="0.95">
              {/* Bottle body */}
              <path 
                d="M -30 75 L -30 -10 C -30 -25 -20 -45 -10 -52 L -10 -72 L 10 -72 L 10 -52 C 20 -45 30 -25 30 -10 L 30 75 C 30 85 20 90 0 90 C -20 90 -30 85 -30 75 Z" 
                fill="none" 
                stroke="white" 
                strokeWidth="1.5" 
              />
              <line x1="-10" y1="-65" x2="10" y2="-65" stroke="white" strokeWidth="0.75" />
              <line x1="-13" y1="-72" x2="13" y2="-72" stroke="white" strokeWidth="2" />
              
              {/* Organic leaf vectors */}
              <path 
                d="M 0 55 C -12 40 -18 20 0 0 C 18 20 12 40 0 55 Z M 0 55 Q -8 25 -4 10 M 0 55 Q 8 25 4 10" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.5)" 
                strokeWidth="1" 
              />
            </g>

            {/* Typography brand details */}
            <text x="35" y="55" fill="white" fontSize="18" fontFamily="serif" fontWeight="bold" letterSpacing="3">AURA</text>
            <text x="35" y="70" fill="white" opacity="0.6" fontSize="7.5" fontFamily="sans-serif" letterSpacing="1">SKINCARE CO. // ED. 04</text>
            
            {/* Interactive tooltip box */}
            <g transform="translate(35, 150)">
              <rect width="180" height="35" rx="4" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
              <text x="10" y="20" fill="white" fontSize="7" fontFamily="monospace" letterSpacing="0.5">{detailsText}</text>
            </g>

            {/* Hotspots */}
            <g transform="translate(260, 125) scale(0.9)">
              <g 
                className="cursor-pointer group/spot"
                onMouseEnter={() => setExhibit4Hotspot("pure")}
                onMouseLeave={() => setExhibit4Hotspot(null)}
              >
                <circle cx="0" cy="20" r="10" fill="rgba(255,255,255,0.1)" />
                <circle cx="0" cy="20" r="4" fill="white" className="animate-pulse" />
              </g>

              <g 
                className="cursor-pointer group/spot"
                onMouseEnter={() => setExhibit4Hotspot("bottle")}
                onMouseLeave={() => setExhibit4Hotspot(null)}
              >
                <circle cx="28" cy="-5" r="10" fill="rgba(255,255,255,0.1)" />
                <circle cx="28" cy="-5" r="4" fill="white" className="animate-pulse" />
              </g>

              <g 
                className="cursor-pointer group/spot"
                onMouseEnter={() => setExhibit4Hotspot("specs")}
                onMouseLeave={() => setExhibit4Hotspot(null)}
              >
                <circle cx="-28" cy="70" r="10" fill="rgba(255,255,255,0.1)" />
                <circle cx="-28" cy="70" r="4" fill="white" className="animate-pulse" />
              </g>
            </g>

            <text x="35" y="95" fill="white" opacity="0.5" fontSize="7" fontFamily="sans-serif">
              <tspan x="35" dy="0">SCOPE: PACKAGING SYSTEM</tspan>
              <tspan x="35" dy="10">TYPEFACE: BASKERVILLE</tspan>
              <tspan x="35" dy="10">SOURCE: ORGANIC SWEDEN</tspan>
            </text>
          </svg>
        );

      case "pulse":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="pulse-grad" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#db2777" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#pulse-grad)" />

            {/* Social card frame */}
            <g transform="translate(195, 35) rotate(-4)">
              <rect width="150" height="175" rx="6" fill="white" className="shadow-2xl" />
              <rect x="10" y="10" width="130" height="120" rx="3" fill="#0c0a0f" />
              
              {/* Dynamic Soundwaves */}
              <g transform="translate(25, 70)">
                {waveHeights.map((h, i) => (
                  <rect 
                    key={i} 
                    x={i * 9} 
                    y={(80 - h) / 2} 
                    width="4.5" 
                    height={h} 
                    rx="2" 
                    fill="#db2777" 
                    className="transition-all duration-150 ease-in-out"
                  />
                ))}
              </g>

              <text x="15" y="148" fill="#0f172a" fontSize="8.5" fontFamily="sans-serif" fontWeight="black" letterSpacing="0.5">PULSE AUDIO SYSTEM</text>
              <text x="15" y="160" fill="rgba(15,23,42,0.5)" fontSize="6" fontFamily="sans-serif">DIGITAL CAMPAIGN // LABS-05</text>
            </g>

            {/* Campaign info block */}
            <g transform="translate(30, 45)">
              <rect x="-5" y="-5" width="130" height="52" rx="4" fill="rgba(15, 10, 22, 0.4)" />
              <text x="10" y="20" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="950" letterSpacing="1">FEEL MORE.</text>
              <text x="10" y="38" fill="#f472b6" fontSize="12" fontFamily="sans-serif" fontWeight="800">HEAR EVERYTHING.</text>
            </g>

            <g transform="translate(30, 160)">
              <circle cx="15" cy="15" r="10" fill="rgba(255, 255, 255, 0.2)" />
              <text x="33" y="18" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="bold">@pulse_acoustics</text>
            </g>

            <g transform="translate(30, 195)">
              <rect width="60" height="16" rx="8" fill="rgba(255,255,255,0.15)" />
              <text x="10" y="11" fill="white" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">♥ LIVE METRIC</text>
            </g>
          </svg>
        );

      case "orbit":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
            <rect width="100%" height="100%" fill="#ffffff" />

            {/* Perspective Grid lines */}
            <g stroke="rgba(15, 23, 42, 0.05)" strokeWidth="0.75" fill="none">
              <path d="M -100 125 L 300 -125 M 0 225 L 400 -25 M 100 325 L 500 75" />
              <path d="M 0 -25 L 400 225 M 100 -125 L 500 125 M -100 75 L 300 325" />
            </g>

            {/* Extruded Isometric columns */}
            {exhibit6Wireframe ? (
              // Wireframe / Mesh Shading Mode
              <g stroke="#059669" strokeWidth="1.25" fill="none" opacity="0.8">
                {/* Column 1 */}
                <g transform="translate(140, 160)">
                  <polygon points="0,0 -35,-17 -35,-47 0,-30" strokeDasharray="3 2" />
                  <polygon points="0,0 35,-17 35,-47 0,-30" />
                  <polygon points="0,-30 -35,-47 0,-64 35,-47" />
                </g>
                {/* Column 2 */}
                <g transform="translate(200, 190)">
                  <polygon points="0,0 -35,-17 -35,-87 0,-70" strokeDasharray="3 2" />
                  <polygon points="0,0 35,-17 35,-87 0,-70" />
                  <polygon points="0,-70 -35,-87 0,-104 35,-87" />
                </g>
                {/* Column 3 */}
                <g transform="translate(260, 160)">
                  <polygon points="0,0 -35,-17 -35,-67 0,-50" strokeDasharray="3 2" />
                  <polygon points="0,0 35,-17 35,-67 0,-50" />
                  <polygon points="0,-50 -35,-67 0,-84 35,-67" />
                </g>
              </g>
            ) : (
              // Solid Render Mode
              <g>
                {/* Column 1 */}
                <g transform="translate(140, 160)">
                  <polygon points="0,0 -35,-17 -35,-47 0,-30" fill="rgba(5, 150, 105, 0.4)" />
                  <polygon points="0,0 35,-17 35,-47 0,-30" fill="rgba(5, 150, 105, 0.2)" />
                  <polygon points="0,-30 -35,-47 0,-64 35,-47" fill="rgba(16, 185, 129, 0.85)" />
                </g>
                {/* Column 2 */}
                <g transform="translate(200, 190)">
                  <polygon points="0,0 -35,-17 -35,-87 0,-70" fill="rgba(5, 150, 105, 0.5)" />
                  <polygon points="0,0 35,-17 35,-87 0,-70" fill="rgba(5, 150, 105, 0.3)" />
                  <polygon points="0,-70 -35,-87 0,-104 35,-87" fill="rgba(6, 182, 212, 0.9)" />
                </g>
                {/* Column 3 */}
                <g transform="translate(260, 160)">
                  <polygon points="0,0 -35,-17 -35,-67 0,-50" fill="rgba(5, 150, 105, 0.4)" />
                  <polygon points="0,0 35,-17 35,-67 0,-50" fill="rgba(5, 150, 105, 0.2)" />
                  <polygon points="0,-50 -35,-67 0,-84 35,-67" fill="rgba(16, 185, 129, 0.7)" />
                </g>
              </g>
            )}

            {/* Glowing coordinate labels */}
            <g transform="translate(30, 45)" fill="#0f172a">
              <text x="0" y="0" fontSize="12.5" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">ORBIT 3D ASSETS</text>
              <text x="0" y="14" opacity="0.6" fontSize="7" fontFamily="monospace">COORDS: X_24.0 // Y_-18.9</text>
              <line x1="0" y1="22" x2="95" y2="22" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1" />
            </g>

            <g transform="translate(30, 205)" fill="#0f172a" opacity="0.6" fontSize="7.5" fontFamily="monospace">
              <text x="0" y="0">MODE: {exhibit6Wireframe ? "WIREFRAME" : "SOLID"}</text>
              <text x="0" y="10">PERSPECTIVE: ISO 30°</text>
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  // Render respective controls below/beside the active project visual canvas
  const renderProjectControls = (projectId: string) => {
    switch (projectId) {
      case "vortex":
        return (
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setExhibit1Guides(!exhibit1Guides)}
              className="flex items-center gap-2 text-xs uppercase font-mono px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-lg bg-slate-50 transition-all text-slate-700"
            >
              <Grid size={13} className={exhibit1Guides ? "text-red-500" : "text-slate-400"} />
              Toggle Guides: {exhibit1Guides ? "ON" : "OFF"}
            </button>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Toggles SVG design vector metrics</span>
          </div>
        );

      case "chronos":
        return (
          <div className="flex flex-col gap-2 mt-6">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Select Poster Theme Colorway</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExhibit2Colorway("red")}
                className={`flex items-center gap-2 text-xs uppercase font-mono px-3.5 py-1.5 rounded-md border transition-all ${
                  exhibit2Colorway === "red"
                    ? "bg-[#dc2626] border-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:text-slate-800 bg-slate-50"
                }`}
              >
                <Palette size={12} />
                Zurich Red
              </button>
              <button
                onClick={() => setExhibit2Colorway("purple")}
                className={`flex items-center gap-2 text-xs uppercase font-mono px-3.5 py-1.5 rounded-md border transition-all ${
                  exhibit2Colorway === "purple"
                    ? "bg-[#6d28d9] border-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:text-slate-800 bg-slate-50"
                }`}
              >
                <Palette size={12} />
                Grape Purple
              </button>
              <button
                onClick={() => setExhibit2Colorway("mono")}
                className={`flex items-center gap-2 text-xs uppercase font-mono px-3.5 py-1.5 rounded-md border transition-all ${
                  exhibit2Colorway === "mono"
                    ? "bg-[#1e293b] border-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:text-slate-800 bg-slate-50"
                }`}
              >
                <Palette size={12} />
                Slate Mono
              </button>
            </div>
          </div>
        );

      case "cyclone":
        return (
          <div className="flex flex-col gap-2 mt-6">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Switch Dashboard Analytics Data Metric</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExhibit3Metric("users")}
                className={`flex items-center gap-1.5 text-xs uppercase font-mono px-3 py-1.5 rounded-md border transition-all ${
                  exhibit3Metric === "users" ? "bg-slate-900 text-white border-transparent" : "border-slate-200 text-slate-600 bg-slate-50"
                }`}
              >
                <BarChart2 size={12} />
                Users
              </button>
              <button
                onClick={() => setExhibit3Metric("conv")}
                className={`flex items-center gap-1.5 text-xs uppercase font-mono px-3 py-1.5 rounded-md border transition-all ${
                  exhibit3Metric === "conv" ? "bg-slate-900 text-white border-transparent" : "border-slate-200 text-slate-600 bg-slate-50"
                }`}
              >
                <BarChart2 size={12} />
                Conversion
              </button>
              <button
                onClick={() => setExhibit3Metric("rev")}
                className={`flex items-center gap-1.5 text-xs uppercase font-mono px-3 py-1.5 rounded-md border transition-all ${
                  exhibit3Metric === "rev" ? "bg-slate-900 text-white border-transparent" : "border-slate-200 text-slate-600 bg-slate-50"
                }`}
              >
                <BarChart2 size={12} />
                Revenue
              </button>
            </div>
          </div>
        );

      case "aura":
        return (
          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200">
              <Info size={11} className="text-amber-500" />
              <span className="uppercase font-mono">Specs interactive hotspots active inside artwork canvas</span>
            </div>
          </div>
        );

      case "pulse":
        return (
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setExhibit5Play(!exhibit5Play)}
              className={`flex items-center gap-2 text-xs uppercase font-mono px-5 py-2.5 rounded-full border transition-all ${
                exhibit5Play 
                  ? "bg-pink-600 border-pink-500 text-white" 
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {exhibit5Play ? (
                <>
                  <Pause size={12} /> Pause Preview
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" /> Play Soundwave
                </>
              )}
            </button>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Simulates active media audio frequency</span>
          </div>
        );

      case "orbit":
        return (
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setExhibit6Wireframe(!exhibit6Wireframe)}
              className="flex items-center gap-2 text-xs uppercase font-mono px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-lg bg-slate-50 transition-all text-slate-700"
            >
              <Box size={13} className={exhibit6Wireframe ? "text-green-600" : "text-slate-400"} />
              Wireframe: {exhibit6Wireframe ? "ON" : "OFF"}
            </button>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Toggles isometric geometry raster shading</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-[#f8fafc] text-slate-900 py-32 px-6 md:px-12 relative overflow-hidden transition-all duration-1000">

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-25 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Dynamically shifting brand background glows (soft pastel tones in light mode) */}
      <div className={`absolute left-[30%] top-[25%] w-[450px] h-[450px] rounded-full bg-gradient-to-br ${activeProj.color} blur-3xl pointer-events-none z-0 transition-all duration-1000`} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title and Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-900/5 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
              ✦ Interactive stage
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase text-slate-950">
              Exhibitions<br />
              <span className={`${dancingScript.className} text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-pink-500 to-amber-500 normal-case font-normal`}>
                Runway
              </span>
            </h2>
          </div>
          <p className="max-w-md text-slate-500 text-sm font-light leading-relaxed">
            Welcome to the Creative Archives. Hover or select an exhibit item on the left directory to display and control its live layout parameters on the stage workspace.
          </p>
        </div>

        {/* Desktop Split-Screen Stage Gallery */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Project Navigation Directory */}
          <div className="col-span-5 flex flex-col border-t border-slate-200">
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group py-8 border-b border-slate-200 flex flex-col justify-start cursor-pointer transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`font-mono text-xs mt-1 transition-colors duration-300 ${isActive ? "text-cyan-600" : "text-slate-400 group-hover:text-slate-700"}`}>
                      {proj.serial} /
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-black uppercase tracking-tight transition-all duration-300 ${
                        isActive ? "text-slate-900 pl-2 border-l-2 border-cyan-500" : "text-slate-400 group-hover:text-slate-700"
                      }`}>
                        {proj.title}
                      </h3>
                      
                      {/* Sub-details (Visible only when active) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-slate-500 font-light leading-relaxed mb-4">
                              {proj.desc}
                            </p>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-mono border border-slate-200 bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase">
                                {proj.category}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 uppercase">
                                Client: <span className="text-slate-600 font-sans">{proj.client}</span>
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-slate-900 border-transparent text-white" : "border-slate-200 text-slate-400 group-hover:text-slate-800 group-hover:border-slate-300"
                    }`}>
                      <ArrowUpRight size={14} className={isActive ? "translate-x-0.5 -translate-y-0.5" : ""} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Art Stage */}
          <div className="col-span-7 sticky top-32">
            <div className="relative w-full rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-md p-6 flex flex-col justify-between">
              
              {/* Stage Bezel / Header */}
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest">LIVE INTERACTIVE STAGE // EXHIBIT_{activeProj.serial}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-[8px] font-mono text-slate-500">
                  <Maximize2 size={8} /> WORKSPACE
                </div>
              </div>

              {/* Artwork stage viewport container */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-[#f8fafc] flex items-center justify-center shadow-inner">
                {/* Grain Overlay */}
                <div
                  className="absolute inset-0 mix-blend-overlay pointer-events-none z-10 opacity-[0.1]"
                  style={{ backgroundImage: grainUrl }}
                />

                {/* Render the dynamic interactive SVG layout based on active selection */}
                <div className="w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProj.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      {renderProjectVisual(activeProj.id)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Dynamic stage controls rendering */}
              <div className="mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProj.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderProjectControls(activeProj.id)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Accordion Layout */}
        <div className="lg:hidden flex flex-col border-t border-slate-200">
          {projects.map((proj, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={proj.id} 
                className="border-b border-slate-200 py-6"
              >
                {/* Header accordion button */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isActive ? "text-cyan-600" : "text-slate-400"}`}>
                      {proj.serial} /
                    </span>
                    <h3 className={`text-xl font-bold uppercase tracking-tight ${isActive ? "text-cyan-600" : "text-slate-900"}`}>
                      {proj.title}
                    </h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    isActive ? "bg-slate-900 text-white border-transparent" : "border-slate-200 text-slate-400"
                  }`}>
                    <ArrowUpRight size={12} className={isActive ? "translate-x-0.5 -translate-y-0.5" : ""} />
                  </div>
                </button>

                {/* Expanded Stage visual and details */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden flex flex-col gap-6"
                    >
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        {proj.desc}
                      </p>

                      <div className="relative w-full rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-[#f8fafc] flex items-center justify-center shadow-inner mb-4">
                          <div
                            className="absolute inset-0 mix-blend-overlay pointer-events-none z-10 opacity-[0.1]"
                            style={{ backgroundImage: grainUrl }}
                          />
                          <div className="w-full h-full">
                            {renderProjectVisual(proj.id)}
                          </div>
                        </div>
                        {renderProjectControls(proj.id)}
                      </div>

                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                        <span className="border border-slate-200 bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase">
                          {proj.category}
                        </span>
                        <span>CLIENT: <span className="text-slate-600 font-sans">{proj.client}</span></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
