"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Smartphone, Wifi, Battery, MessageSquare, Zap } from "lucide-react";
import type { SmsHeroContent } from "@/components/solutions/sms-content";

export default function SmsHero({ content }: { content: SmsHeroContent }) {
  const [senderId, setSenderId] = useState("FILLIP");
  const [message, setMessage] = useState("Your OTP for secure registration is 829104. Valid for 5 minutes. Do not share this code.");
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [timeStr, setTimeStr] = useState("10:00");

  // Get current clock time for phone header
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = d.getHours();
      const mins = d.getMinutes();
      const hrsStr = hrs < 10 ? `0${hrs}` : hrs;
      const minsStr = mins < 10 ? `0${mins}` : mins;
      setTimeStr(`${hrsStr}:${minsStr}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || !message.trim()) return;

    setIsSending(true);
    setHasSent(false);

    // Simulate gateway queue & latency
    setTimeout(() => {
      setIsSending(false);
      setHasSent(true);

      // Auto-clear notification after 8 seconds
      setTimeout(() => {
        setHasSent(false);
      }, 8000);
    }, 1200);
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eef4f8] via-[#f5f8fb] to-white px-6 pt-32 pb-20 text-slate-900 lg:px-12">
      {/* Visual background grids */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 66, 162, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 66, 162, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      {/* Soft light blue/cyan gradient overlay */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-cyan-200/30 via-indigo-100/20 to-transparent blur-3xl pointer-events-none z-0 opacity-75" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* LEFT COLUMN - TEXT COPY & COMPOSER */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">

          {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono text-primary uppercase tracking-widest mb-6 w-fit">
            <Zap size={10} className="text-amber-500 fill-amber-500" /> Interactive SMS Simulator
          </span> */}

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-[1.05] mb-6">
            {content.headingLine1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-600">
              {content.headingLine2}
            </span>
          </h1>

          <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed mb-10 max-w-xl">
            {content.description}
          </p>

          {/* SIMULATOR COMPOSER FORM */}
          <form onSubmit={handleSendTest} className="border border-slate-200 bg-white rounded-[2rem] p-6 sm:p-8 shadow-md relative overflow-hidden max-w-xl">
            <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <MessageSquare size={14} className="text-primary" /> Live Test Console
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                No real charge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Sender ID
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={senderId}
                  onChange={(e) => setSenderId(e.target.value.toUpperCase())}
                  placeholder="FLLIP"
                  className="w-full rounded-full border border-slate-250 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 font-mono outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 uppercase"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Simulated Destination Number
                </label>
                <input
                  type="text"
                  disabled
                  value="+91 99999 99999"
                  className="w-full rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs text-slate-400 font-mono outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                SMS Message Body ({message.length} chars)
              </label>
              <textarea
                rows={3}
                maxLength={160}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-2xl border border-slate-250 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-900/60 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              {isSending ? (
                <>
                  <div className="size-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Routing via Gateway...</span>
                </>
              ) : (
                <>
                  <span>Send SMS Demo</span>
                  <Send size={11} />
                </>
              )}
            </button>
          </form>

        </div>

        {/* RIGHT COLUMN - PHONE MOCKUP & PUSH NOTIFICATION */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-[300px] h-[610px] rounded-[3rem] border-[12px] border-slate-950 bg-slate-900 shadow-2xl overflow-hidden flex flex-col justify-between p-3 select-none">

            {/* Phone Screen Background wallpaper */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0242a2] via-[#081C2E] to-[#38bdf8] pointer-events-none" />

            {/* Camera notch cutout */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
            </div>

            {/* Status Bar */}
            <div className="relative z-30 flex justify-between items-center text-[10px] text-white px-5 pt-1.5 font-mono">
              <span>{timeStr}</span>
              <div className="flex items-center gap-1.5">
                <Wifi size={10} />
                <span className="text-[8px] font-bold">5G</span>
                <Battery size={12} className="rotate-0" />
              </div>
            </div>

            {/* LOCKSCREEN CONTENT AREA */}
            <div className="flex-1 flex flex-col justify-start pt-16 relative px-3">

              {/* Big clock face */}
              <div className="text-center text-white mb-8">
                <div className="text-5xl font-extralight tracking-tight font-sans">
                  {timeStr}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-light text-white/70 mt-1.5">
                  Wednesday, July 1
                </div>
              </div>

              {/* DYNAMIC NOTIFICATION INCOMING PANEL */}
              <div className="relative h-48 w-full">
                <AnimatePresence>
                  {hasSent && (
                    <motion.div
                      initial={{ opacity: 0, y: -80, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full bg-white/95 backdrop-blur-md border border-white/20 rounded-[1.25rem] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.15)] relative z-40 text-left"
                    >
                      {/* Notification Header */}
                      <div className="flex justify-between items-center mb-1.5 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded-md bg-primary text-white flex items-center justify-center text-[9px] font-bold">
                            FT
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wide">
                            {senderId || "FLLIP"}
                          </span>
                        </div>
                        <span className="text-[8px] text-slate-400 font-mono">now</span>
                      </div>

                      {/* Notification Message content */}
                      <p className="text-[11px] text-slate-700 font-normal leading-relaxed break-words line-clamp-3">
                        {message || "..."}
                      </p>

                      {/* Delivery Success Report badge */}
                      <div className="mt-3 flex justify-between items-center text-[8px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-2 py-0.5 w-fit">
                        <CheckCircle size={8} className="mr-1 fill-emerald-50 text-emerald-600" />
                        <span>DELIVERED via VIP Route (1.8s)</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Lockscreen footer icons */}
            <div className="relative z-30 flex justify-between items-center text-white/80 px-6 pb-2.5">
              <div className="size-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Smartphone size={14} />
              </div>
              <div className="w-24 h-1 bg-white/60 rounded-full mx-auto" />
              <div className="size-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Zap size={14} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
