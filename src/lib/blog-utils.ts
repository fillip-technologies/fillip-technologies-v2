/** Pure content-processing helpers for blog posts. No side effects, no server-only deps. */

export function textFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createExcerpt(content: string): string {
  const text = textFromHtml(content);
  if (text.length <= 170) return text;
  return `${text.slice(0, 167).replace(/\s+\S*$/, "")}...`;
}

export function readingTime(content: string): string {
  const words = textFromHtml(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

export function parseDate(value: unknown, fallback: Date): Date {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

export function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((t) => t.trim()).filter(Boolean);
  return String(value ?? "")
    .split(/[\n,]/)
    .map((t) => t.trim())
    .filter(Boolean);
}
