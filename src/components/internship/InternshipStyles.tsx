/**
 * Keyframes and utility classes used only on the internship page, modelled on
 * the National Internship Portal's motion language (aurora-gradient keywords,
 * floating blobs, glass cards with a glowing edge, button glare) in Fillip's
 * blue palette. Rendered by the page, so nothing leaks into the rest of the site.
 *
 * Performance: everything that runs continuously animates only `transform`
 * (GPU-composited). No backdrop-filter or animated filter/blur, and the edge
 * glow only animates while hovered.
 */
const CSS = `
@keyframes intern-aurora { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes intern-float-slow { 0%, 100% { transform: translate3d(0, 0, 0); } 33% { transform: translate3d(14px, -26px, 0); } 66% { transform: translate3d(-16px, 12px, 0); } }
@keyframes intern-glare { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(120%); } }

.intern-page { font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif; color: #0b1733; }
.intern-display { font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif; font-weight: 700; letter-spacing: -0.022em; }

.intern-aurora {
  background-image: linear-gradient(110deg, #0242a2, #1d6fe0 45%, #0ea5e9 80%, #0242a2);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: intern-aurora 9s ease-in-out infinite;
}

.intern-blob { animation: intern-float-slow 18s ease-in-out infinite; will-change: transform; }

.intern-glass {
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.84));
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: inset 0 1px 0 #fff, 0 12px 40px -18px rgba(2, 30, 80, 0.28);
}

.intern-edge-glow { position: relative; isolation: isolate; }
.intern-edge-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(115deg, #0242a2, #0ea5e9, #6366f1, #0242a2);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.intern-edge-glow:hover::before,
.intern-edge-glow:focus-visible::before,
.intern-edge-glow:focus-within::before { opacity: 1; animation: intern-aurora 6s linear infinite; }

.intern-glare { position: relative; overflow: hidden; isolation: isolate; }
.intern-glare::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.32) 50%, transparent 70%);
  transform: translateX(-120%);
  animation: intern-glare 5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .intern-aurora, .intern-blob, .intern-edge-glow::before, .intern-glare::after { animation: none !important; }
}
`;

export default function InternshipStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
