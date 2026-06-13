"use client";

import { Star, Users, BriefcaseBusiness } from "lucide-react";

export default function TrustBar() {
    const c = {
        headingLead: "The Future Isn't Human or AI.",
        headingHighlight: "It's Human + AI.",
        description:
            "For 13+ years, we've helped businesses navigate technology change. Now, we're combining deep industry expertise with artificial intelligence to unlock the next generation of growth.",
    };

    return (
        <section className="relative bg-white py-20 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.1] tracking-[-0.03em] text-heading">
                        {c.headingLead}
                        <br />
                        <span className="animated-gradient-text">
                            {c.headingHighlight}
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl">
                        {c.description}
                    </p>
                </div>

               

                {/* Stats */}
                <div className="mt-10 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">

                    {/* Clients */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                            <Users className="h-5 w-5 text-[#0F6FFF]" />
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                3K+
                            </div>
                            <div className="text-sm text-slate-500">
                                Clients Worldwide
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-10 w-px bg-slate-200 md:block" />

                    {/* Satisfaction */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                5K+
                            </div>
                            <div className="text-sm text-slate-500">
                                Customer Satisfaction
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-10 w-px bg-slate-200 md:block" />

                    {/* Experience */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                            <BriefcaseBusiness className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                13+
                            </div>
                            <div className="text-sm text-slate-500">
                                Years Experience
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-10 w-px bg-slate-200 md:block" />

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <div className="text-lg text-amber-500">
                            ★★★★★
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                4.9/5
                            </div>
                            <div className="text-sm text-slate-500">
                                Average Rating
                            </div>
                        </div>

                        
                    </div>
                    
                </div>
                 {/* Small Label */}
                <div className="mt-14 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Trusted By Businesses Across Industries
                    </p>
                </div>
            </div>

            {/* Animated Gradient CSS */}
            <style jsx>{`
                .animated-gradient-text {
                    background: linear-gradient(
                        90deg,
                        #2563eb,
                        #7c3aed,
                        #ec4899,
                        #2563eb
                    );
                    background-size: 300% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientMove 6s linear infinite;
                }

                @keyframes gradientMove {
                    0% {
                        background-position: 0% center;
                    }
                    100% {
                        background-position: 300% center;
                    }
                }
            `}</style>
        </section>
    );
}