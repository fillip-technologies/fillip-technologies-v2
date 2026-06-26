"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Server, Database, Globe, Shield, RefreshCw } from "lucide-react";

const tiers = [
  {
    id: "startup",
    label: "Startup Tier",
    title: "Launch Quickly & Validate",
    description:
      "Build a sleek, high-performing MVP to test market demand, acquire early adopters, and pitch to investors with low infrastructure costs.",
    metrics: [
      { label: "Optimal Team Size", value: "1-10 Members" },
      { label: "Monthly Requests Limit", value: "100K API Calls" },
      { label: "Guaranteed Uptime SLA", value: "99% Standard" },
      { label: "Support Deliverables", value: "Email Support" },
    ],
    architecture: {
      title: "Monolith Node Architecture",
      desc: "Single server and database setup, perfect for MVP cost efficiency.",
      nodes: [
        { label: "Browser Client", icon: Globe, color: "text-blue-500 bg-blue-50" },
        { label: "App Server", icon: Server, color: "text-slate-500 bg-slate-100" },
        { label: "Logical Database", icon: Database, color: "text-slate-500 bg-slate-100" },
      ],
    },
  },
  {
    id: "scaleup",
    label: "Scaleup Tier",
    title: "Expand Operations & Automate",
    description:
      "Optimize subscription billing, handle traffic surges, scale database read/write replicas, and automate administrative approvals.",
    metrics: [
      { label: "Optimal Team Size", value: "10-100 Members" },
      { label: "Monthly Requests Limit", value: "5M API Calls" },
      { label: "Guaranteed Uptime SLA", value: "99.9% Premium" },
      { label: "Support Deliverables", value: "Priority Slack" },
    ],
    architecture: {
      title: "Decoupled Scaled Cluster",
      desc: "Includes load balancer routing, Redis cache layer, and database read replica.",
      nodes: [
        { label: "CDN Edge Clients", icon: Globe, color: "text-blue-600 bg-blue-50" },
        { label: "Load Balancer Router", icon: RefreshCw, color: "text-blue-600 bg-blue-50" },
        { label: "App Nodes (AutoScale)", icon: Server, color: "text-emerald-500 bg-emerald-50" },
        { label: "Redis Cache + DB Replica", icon: Database, color: "text-indigo-500 bg-indigo-50" },
      ],
    },
  },
  {
    id: "enterprise",
    label: "Enterprise Tier",
    title: "High Security & Compliance",
    description:
      "Deploy multi-tenant database clusters, enforce strict security compliance, ensure zero-downtime rolling updates, and support custom SSO integrations.",
    metrics: [
      { label: "Optimal Team Size", value: "100+ Members" },
      { label: "Monthly Requests Limit", value: "100M+ API Calls" },
      { label: "Guaranteed Uptime SLA", value: "99.99% Enterprise" },
      { label: "Support Deliverables", value: "24/7 Dedicated SLA" },
    ],
    architecture: {
      title: "Global High-Availability Mesh",
      desc: "Cross-region Kubernetes clusters, WAF shield, and globally replicated active databases.",
      nodes: [
        { label: "Global Edge WAF Shield", icon: Shield, color: "text-indigo-650 bg-indigo-50" },
        { label: "Kubernetes API Pod Mesh", icon: Server, color: "text-indigo-650 bg-indigo-50" },
        { label: "Multi-Region DB Failover", icon: Database, color: "text-emerald-500 bg-emerald-50" },
      ],
    },
  },
];

export default function SaaSScaleTiers() {
  const [activeTier, setActiveTier] = useState("scaleup");
  const selectedTier = tiers.find((t) => t.id === activeTier) || tiers[1];

  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/40 border-y border-slate-100">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[5%] top-[10%] h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[90px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-cyan-400/5 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            BUILT FOR GROWTH
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Scale Your SaaS Without Limits
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">
            Choose the scaling tier that fits your SaaS lifecycle. We design architecture models that grow seamlessly with your user count.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 rounded-full border border-slate-150 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
            {tiers.map((t) => {
              const isActive = activeTier === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTier(t.id)}
                  className="relative rounded-full px-6 py-2.5 text-xs md:text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-primary focus:outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTierTab"
                      className="absolute inset-0 rounded-full bg-blue-600 shadow-[0_8px_20px_rgba(2,66,162,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-100 bg-white p-8 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.02)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center"
            >
              {/* Left Column: Text & Metrics */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 md:text-3xl leading-tight">
                  {selectedTier.title}
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-500">
                  {selectedTier.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-100 pt-6 mt-8">
                  {selectedTier.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span className="text-sm font-extrabold text-slate-800 mt-1">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-semibold text-white shadow-soft transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02]"
                  >
                    <span>Get a Proposal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Architecture nodes comparison */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-10 flex flex-col gap-6 w-full">
                <div className="text-left bg-slate-50/50 p-4 border border-slate-100/50 rounded-2xl">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    System Architecture
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-800">{selectedTier.architecture.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{selectedTier.architecture.desc}</p>
                </div>

                <div className="flex flex-col gap-4 relative">
                  {selectedTier.architecture.nodes.map((node, i) => {
                    const NodeIcon = node.icon;
                    return (
                      <div key={i} className="flex items-center gap-4 relative">
                        {/* Connecting Line */}
                        {i < selectedTier.architecture.nodes.length - 1 && (
                          <div className="absolute left-6 top-10 bottom-[-16px] w-[1.5px] bg-slate-200" />
                        )}

                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border border-white shadow-sm ${node.color}`}>
                          <NodeIcon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-700 block">{node.label}</span>
                          <span className="text-[10px] text-slate-400 block">
                            {i === 0 ? "Entrypoint Gateway" : i === 1 ? "Computational Process" : "Data Persistence Layer"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
