"use client";

export default function TrustedBy() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-[28px] md:text-[42px] lg:text-[48px] font-medium leading-[1.1] tracking-[-0.03em] text-heading">
          The Future Isn't Human or AI.{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            It's Human + AI.
          </span>
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground">
          For 13+ years, we've helped businesses navigate technology change.
          Now, we're combining deep industry expertise with artificial
          intelligence to unlock the next generation of growth.
        </p>

        {/* Animated Line */}
        <div className="flex justify-end max-w-3xl mx-auto mt-5">
          <svg
            width="200"
            height="20"
            viewBox="0 0 200 20"
            fill="none"
            className="overflow-visible"
          >
            <path
              d="M5 14C50 2 110 4 195 10"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              className="animated-line"
            />

            <defs>
              <linearGradient
                id="lineGradient"
                x1="0"
                y1="10"
                x2="200"
                y2="10"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}