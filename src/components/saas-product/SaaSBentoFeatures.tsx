"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  CreditCard,
  BarChart3,
  Server,
  TrendingUp,
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Activity,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export default function SaaSBentoFeatures() {
  // Card 1: Custom SaaS Architecture state
  const [activeRoutingTenant, setActiveRoutingTenant] = useState<"A" | "B" | null>(null);
  const [routingLog, setRoutingLog] = useState<string>("Click a tenant above to trace data isolation routing.");

  const triggerRouting = (tenant: "A" | "B") => {
    setActiveRoutingTenant(tenant);
    setRoutingLog(`[Gateway] incoming request from client: tenant-${tenant.toLowerCase()}.fillip.app...`);
    setTimeout(() => {
      setRoutingLog(`[Router] verifying token & session matching tenant ${tenant}...`);
    }, 800);
    setTimeout(() => {
      setRoutingLog(`[Database] RLS verified: pointing query strictly to DB_Cluster_Tenant_${tenant}.`);
    }, 1600);
  };

  // Card 2: Stripe Billing state
  const [billingPlan, setBillingPlan] = useState<"Basic" | "Growth" | "Enterprise">("Growth");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success">("idle");

  const billingRates = {
    Basic: 29,
    Growth: 79,
    Enterprise: 199,
  };

  const handleSimulatePayment = () => {
    setPaymentStatus("loading");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 1800);
  };

  const handleResetPayment = () => {
    setPaymentStatus("idle");
  };

  // Card 3: Analytics state (hover tooltip)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; month: string; value: string } | null>(null);
  const dataPoints = [
    { x: 30, y: 110, month: "Aug", value: "$45,000" },
    { x: 90, y: 95, month: "Sep", value: "$62,500" },
    { x: 150, y: 70, month: "Oct", value: "$88,000" },
    { x: 210, y: 55, month: "Nov", value: "$104,200" },
    { x: 270, y: 25, month: "Dec", value: "$124,500" },
  ];

  // Card 4: DevOps deployment state
  const [deployState, setDeployState] = useState<"idle" | "running" | "done">("idle");
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  const startDeployment = () => {
    if (deployState === "running") return;
    setDeployState("running");
    setDeployLogs([]);

    const logSteps = [
      "> git checkout production... OK",
      "> npm run test:unit --silent... [Pass 12/12]",
      "> docker build -t saas-engine:v2.1 . --no-cache...",
      "> packaging layer static assets... [Done]",
      "> push registry.hub.docker.com/fillip/saas-engine:v2.1",
      "> updating kubernetes deployment configurations...",
      "> rolling update initiated: 3 replicas containerizing...",
      "> verifying container health: 200 OK [Ready]",
      "✓ DEPLOYMENT COMPLETELY SUCCESSFUL!"
    ];

    logSteps.forEach((log, index) => {
      setTimeout(() => {
        setDeployLogs((prev) => [...prev, log]);
        if (index === logSteps.length - 1) {
          setDeployState("done");
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            SAAS CAPABILITIES
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">
            We design, build, and deploy custom SaaS applications tailored to your business workflows. Try our live capability simulators below.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">

          {/* CARD 1: Custom SaaS Architecture (Spans 2 columns) */}
          <div className="group lg:col-span-2 flex flex-col justify-between rounded-[28px] border border-slate-100 bg-slate-50/20 p-8 transition-all duration-300 hover:border-slate-200/80 hover:shadow-[0_15px_40px_rgba(2,66,162,0.03)] hover:-translate-y-1">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Custom SaaS Architecture</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-xl">
                Secure logical tenant isolation using schema-based or database-per-tenant separations. We prevent cross-tenant data leaks and build high-efficiency API routing matrices.
              </p>
            </div>

            {/* Interactive Tenant Routing Visualizer */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tenant Data Isolation Simulator</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => triggerRouting("A")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      activeRoutingTenant === "A"
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Simulate Tenant A Request
                  </button>
                  <button
                    onClick={() => triggerRouting("B")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      activeRoutingTenant === "B"
                        ? "bg-indigo-650 border-indigo-650 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Simulate Tenant B Request
                  </button>
                </div>
              </div>

              {/* Diagrams Flow */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-2 border border-slate-50 bg-slate-50/20 rounded-xl">
                {/* Gateway Router */}
                <div className="flex flex-col items-center p-3 border border-slate-100 bg-white rounded-xl shadow-xs z-10 w-40">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                    <Activity className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">API Gateway</span>
                  <span className="text-[9px] text-slate-400">auth.fillip.app</span>
                </div>

                {/* Animated Path lines */}
                <div className="absolute top-[50%] left-40 right-40 hidden md:block h-0.5 bg-slate-100 pointer-events-none">
                  {activeRoutingTenant && (
                    <motion.div
                      initial={{ left: 0 }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className={`absolute top-[-3px] h-2 w-2 rounded-full ${
                        activeRoutingTenant === "A" ? "bg-blue-600 shadow-[0_0_8px_#2563eb]" : "bg-indigo-600 shadow-[0_0_8px_#4f46e5]"
                      }`}
                    />
                  )}
                </div>

                {/* Database Clusters */}
                <div className="flex md:flex-col gap-4 z-10">
                  <div
                    className={`flex items-center gap-2.5 border px-4 py-2 rounded-xl transition ${
                      activeRoutingTenant === "A"
                        ? "border-blue-200 bg-blue-50/30 scale-105 shadow-xs"
                        : "border-slate-150 bg-white"
                    }`}
                  >
                    <Database className={`h-4 w-4 ${activeRoutingTenant === "A" ? "text-blue-600" : "text-slate-400"}`} />
                    <div className="text-left">
                      <span className="block text-[10px] font-bold text-slate-800">DB_Cluster_A</span>
                      <span className="block text-[8px] text-slate-400">Isolated Instance</span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2.5 border px-4 py-2 rounded-xl transition ${
                      activeRoutingTenant === "B"
                        ? "border-indigo-200 bg-indigo-50/30 scale-105 shadow-xs"
                        : "border-slate-150 bg-white"
                    }`}
                  >
                    <Database className={`h-4 w-4 ${activeRoutingTenant === "B" ? "text-indigo-600" : "text-slate-400"}`} />
                    <div className="text-left">
                      <span className="block text-[10px] font-bold text-slate-800">DB_Cluster_B</span>
                      <span className="block text-[8px] text-slate-400">Isolated Instance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Router Log output */}
              <div className="mt-4 p-3 bg-slate-900 rounded-xl text-[11px] font-mono text-slate-350 text-left flex items-start gap-2 shadow-inner min-h-[44px]">
                <Terminal className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="animate-fade-in">{routingLog}</span>
              </div>
            </div>
          </div>

          {/* CARD 2: Billing & Invoicing (Spans 1 column) */}
          <div className="group flex flex-col justify-between rounded-[28px] border border-slate-100 bg-slate-50/20 p-8 transition-all duration-300 hover:border-slate-200 hover:shadow-[0_15px_40px_rgba(2,66,162,0.03)] hover:-translate-y-1">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Billing & Subscriptions</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Recurring credit-card systems, flexible subscription tiers, coupons, trial periods, and automated tax reporting.
              </p>
            </div>

            {/* Interactive Billing Widget */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stripe Invoice Preview</span>
                <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Test Mode</span>
              </div>

              {paymentStatus !== "success" ? (
                <div>
                  {/* Selectors */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-lg mb-4">
                    {(["Basic", "Growth", "Enterprise"] as const).map((plan) => (
                      <button
                        key={plan}
                        onClick={() => {
                          if (paymentStatus === "idle") setBillingPlan(plan);
                        }}
                        className={`py-1.5 text-[10px] font-bold rounded-md transition ${
                          billingPlan === plan
                            ? "bg-white text-slate-800 shadow-xs"
                            : "text-slate-400 hover:text-slate-650"
                        }`}
                        disabled={paymentStatus !== "idle"}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs mb-5">
                    <div className="flex justify-between text-slate-500">
                      <span>Subscription ({billingPlan})</span>
                      <span className="font-semibold text-slate-700">${billingRates[billingPlan]}.00/mo</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Gateway Processing Fee</span>
                      <span className="font-semibold text-slate-700">$0.00</span>
                    </div>
                    <div className="h-[1px] bg-slate-100" />
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Total Invoice</span>
                      <span>${billingRates[billingPlan]}.00</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                    disabled={paymentStatus === "loading"}
                  >
                    {paymentStatus === "loading" ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Processing Pay...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>Simulate Stripe Checkout</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Invoice Fully Paid</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Stripe Token: tok_sandbox_3920</p>
                  
                  <button
                    onClick={handleResetPayment}
                    className="mt-5 text-[10px] font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset Sim</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* CARD 3: Dashboard Analytics (Spans 1 column) */}
          <div className="group flex flex-col justify-between rounded-[28px] border border-slate-100 bg-slate-50/20 p-8 transition-all duration-300 hover:border-slate-200 hover:shadow-[0_15px_40px_rgba(2,66,162,0.03)] hover:-translate-y-1">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Dashboard Analytics</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Fully interactive dashboard displays, key customer metrics tracking, event logs, and user reports.
              </p>
            </div>

            {/* Interactive SVG Chart Card with Tooltip */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">SaaS ARR Chart</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5">$124,500</span>
                </div>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-2.5 w-2.5" />
                  +148%
                </span>
              </div>

              {/* SVG Spline Plot */}
              <div className="relative h-28 w-full mt-2">
                <svg className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="100" x2="300" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Spline Path */}
                  <path
                    d="M 30 110 Q 60 102.5, 90 95 T 150 70 T 210 55 T 270 25"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Shading under Curve */}
                  <path
                    d="M 30 110 Q 60 102.5, 90 95 T 150 70 T 210 55 T 270 25 L 270 120 L 30 120 Z"
                    fill="url(#gradient-chart)"
                    opacity="0.1"
                  />

                  {/* Interactive Points */}
                  {dataPoints.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPoint?.month === pt.month ? "6" : "4"}
                      className={`fill-white stroke-2 cursor-pointer transition-all ${
                        hoveredPoint?.month === pt.month ? "stroke-blue-600" : "stroke-blue-500"
                      }`}
                      onMouseEnter={(e) => {
                        const bounds = e.currentTarget.parentElement?.getBoundingClientRect();
                        if (bounds) {
                          setHoveredPoint({
                            x: pt.x,
                            y: pt.y,
                            month: pt.month,
                            value: pt.value,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}

                  <defs>
                    <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Custom Tooltip */}
                <AnimatePresence>
                  {hoveredPoint && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      className="absolute bg-slate-900 text-white rounded-lg p-2 text-[10px] pointer-events-none shadow-md z-15"
                      style={{
                        left: `${(hoveredPoint.x / 300) * 100}%`,
                        top: `${hoveredPoint.y - 45}px`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <span className="block font-bold text-slate-400 uppercase tracking-wider text-[8px]">
                        {hoveredPoint.month} MRR
                      </span>
                      <span className="block font-extrabold text-white mt-0.5">
                        {hoveredPoint.value}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chart Footer info */}
              <div className="flex justify-between text-[9px] text-slate-400 px-1 mt-4">
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>

          {/* CARD 4: Cloud Scale & DevOps (Spans 2 columns) */}
          <div className="group lg:col-span-2 flex flex-col justify-between rounded-[28px] border border-slate-100 bg-slate-50/20 p-8 transition-all duration-300 hover:border-slate-200 hover:shadow-[0_15px_40px_rgba(2,66,162,0.03)] hover:-translate-y-1">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Cloud Scale & DevOps</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-xl">
                Applications are bundled in Docker containers, integrated with secure GitHub CI/CD build scripts, and hosted via AWS/Vercel auto-scaling pools.
              </p>
            </div>

            {/* Interactive Shell Pipeline Terminal */}
            <div className="mt-8 rounded-2xl border border-slate-900 bg-slate-950 p-5 shadow-lg text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">GitHub CI/CD Deployment Runner</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${
                    deployState === "idle" ? "bg-slate-700" : deployState === "running" ? "bg-amber-400 animate-pulse" : "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                  }`} />
                  <span className="text-[9px] font-mono text-slate-400 uppercase">
                    {deployState === "idle" ? "Ready" : deployState === "running" ? "Running" : "Success"}
                  </span>
                </div>
              </div>

              {/* Terminal Logs Output */}
              <div className="h-32 overflow-y-auto font-mono text-[10px] text-slate-300 leading-normal space-y-1 mb-4 select-text">
                {deployLogs.length === 0 ? (
                  <span className="text-slate-500">Pipeline idle. Press "Deploy to AWS Cluster" to test logs.</span>
                ) : (
                  deployLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.startsWith("✓")
                          ? "text-emerald-400 font-bold mt-2"
                          : log.includes("Error")
                          ? "text-rose-400 font-bold"
                          : "text-slate-300"
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>

              {/* Trigger Button */}
              <div className="flex gap-2">
                <button
                  onClick={startDeployment}
                  disabled={deployState === "running"}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50 flex items-center gap-1"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Deploy to AWS Cluster</span>
                </button>
                {deployState !== "idle" && (
                  <button
                    onClick={() => {
                      setDeployState("idle");
                      setDeployLogs([]);
                    }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
                  >
                    Reset Pipeline
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
