type BlogHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function BlogHero({ eyebrow = "Fillip Blog", title, description }: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full opacity-40 blur-[140px]" style={{ background: "var(--glow-primary)" }} />
      <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-30 blur-[140px]" style={{ background: "var(--glow-accent)" }} />

      <div className="relative z-10 container mx-auto max-w-5xl px-6 text-center">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="text-center text-4xl font-bold tracking-tight text-heading md:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-body">{description}</p>
      </div>
    </section>
  );
}
