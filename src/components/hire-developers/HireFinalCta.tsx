import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Cta, HireImage, TitleParts } from "@/data/hire-developers/types";

type FinalCtaContent = { eyebrow: string; title: TitleParts; description: string; primaryCta: Cta; secondaryCta: Cta };

export default function HireFinalCta({ content, image }: { content: FinalCtaContent; image?: HireImage | null }) {
  const t = content.title;
  return (
    <section className="bg-white px-2 py-16 sm:px-3 lg:py-20">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#081C2E] via-[#0242A2] to-[#0F6FFF]">
        {image && <Image src={image.src} alt="" fill sizes="100vw" className="object-cover opacity-25" />}
        <div
          aria-hidden
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative flex flex-col items-start gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#38BDF8]">{content.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t.before && <>{t.before} </>}
              <span className="text-[#7DD3FC]">{t.highlight}</span>
              {t.after && <> {t.after}</>}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{content.description}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={content.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0242A2] transition-colors duration-300 hover:bg-blue-50"
            >
              {content.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
