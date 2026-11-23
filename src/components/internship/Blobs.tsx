/**
 * Soft background blobs that slowly drift (decorative). Drawn with radial
 * gradients instead of a blur filter, and animated with transform only, so
 * they stay cheap to render.
 */
const SKY = "bg-[radial-gradient(circle,rgba(56,189,248,0.32),transparent_68%)]";
const BLUE = "bg-[radial-gradient(circle,rgba(2,66,162,0.18),transparent_68%)]";
const INDIGO = "bg-[radial-gradient(circle,rgba(129,140,248,0.24),transparent_68%)]";

const PRESETS = {
  hero: [
    `-left-40 top-10 size-[560px] ${SKY}`,
    `-right-40 -top-10 size-[620px] ${BLUE} [animation-delay:-6s]`,
    `left-1/3 -bottom-56 size-[520px] ${INDIGO} [animation-delay:-11s]`,
  ],
  section: [`-left-48 top-1/4 size-[520px] ${SKY}`, `-right-48 bottom-0 size-[560px] ${INDIGO} [animation-delay:-8s]`],
} as const;

export default function Blobs({ variant = "section" }: { variant?: keyof typeof PRESETS }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PRESETS[variant].map((cls) => (
        <div key={cls} className={`intern-blob absolute rounded-full ${cls}`} />
      ))}
    </div>
  );
}
