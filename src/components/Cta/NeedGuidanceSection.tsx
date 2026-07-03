"use client";

// Shared CTA. Editable via CMS on the home page (key: home.needguidance) by
// passing `content`, or via explicit props on service landing pages (explicit
// props win over CMS content, which wins over the defaults below).
type NeedGuidanceFields = Partial<{
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}>;

export default function NeedGuidanceSection(
  props: { content?: Record<string, unknown> } & NeedGuidanceFields
) {
  const fromContent = (props.content ?? {}) as NeedGuidanceFields;
  const eyebrow = props.eyebrow ?? fromContent.eyebrow ?? "Need Expert Advice?";
  const title =
    props.title ?? fromContent.title ?? "Not Sure What Solution Fits Your Business?";
  const description =
    props.description ??
    fromContent.description ??
    "Every business has different goals. Whether you need a website, mobile app, digital marketing, SEO, automation, or AI solutions, our experts will help you choose the right strategy.";
  const buttonText = props.buttonText ?? fromContent.buttonText ?? "Talk To Our Experts →";
  const image = props.image || fromContent.image || "/images/ai-assistant.png";

  return (
    <section className="py-4">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8  px-8 py-8 lg:flex-row">
          
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
              {eyebrow}
            </div>

            <h3 className="mt-2 text-2xl font-semibold text-[var(--heading)]">
              {title}
            </h3>

            <p className="mt-2 max-w-3xl text-[var(--body)]">
              {description}
            </p>
          </div>

          <button className="group flex flex-col items-center">
            <img
              src={image}
              alt="Expert Consultation"
              className="h-36 w-36 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <span className="mt-2 text-sm font-semibold text-[var(--heading)] transition-colors group-hover:text-[var(--primary)]">
              {buttonText}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}