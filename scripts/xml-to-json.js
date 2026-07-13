/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];
const outputDir = path.join(process.cwd(), "src", "data", "blogs");

if (!inputFile) {
  console.error("Usage: node scripts/xml-to-json.js <wordpress-export.xml>");
  process.exit(1);
}

const allowedTags = new Set([
  "a",
  "blockquote",
  "br",
  "code",
  "em",
  "h2",
  "h3",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "strong",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
]);

const allowedAttrs = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan"]),
};

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&#8230;/g, "...");
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTag(source, tag) {
  const escapedTag = tag.replace(":", "\\:");
  const match = source.match(new RegExp(`<${escapedTag}[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`, "i"));
  return match ? decodeXml(match[1]).trim() : "";
}

function getPostMeta(source, key) {
  const metaRegex = /<wp:postmeta>[\s\S]*?<wp:meta_key><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_key>[\s\S]*?<wp:meta_value>([\s\S]*?)<\/wp:meta_value>[\s\S]*?<\/wp:postmeta>/gi;
  let match;

  while ((match = metaRegex.exec(source))) {
    if (match[1] === key) return decodeXml(match[2]).trim();
  }

  return "";
}

function getTerms(source, domain) {
  const terms = [];
  const termRegex = /<category\s+([^>]*?)>([\s\S]*?)<\/category>/gi;
  let match;

  while ((match = termRegex.exec(source))) {
    if (!new RegExp(`domain=["']${domain}["']`, "i").test(match[1])) continue;
    const term = decodeXml(match[2]).trim();
    if (term && term.toLowerCase() !== "uncategorized") terms.push(term);
  }

  return Array.from(new Set(terms));
}

function normalizeInternalUrl(value) {
  return value
    .replace(/^https?:\/\/(www\.)?filliptechnologies\.com/gi, "")
    .replace(/^https?:\/\/version2\.filliptechnologies\.com/gi, "");
}

function parseAttributes(rawAttrs, tag) {
  const keep = allowedAttrs[tag] || new Set();
  if (keep.size === 0) return "";

  const attrs = [];
  const attrRegex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match;

  while ((match = attrRegex.exec(rawAttrs))) {
    const name = match[1].toLowerCase();
    if (!keep.has(name)) continue;

    let value = decodeXml(match[3] || match[4] || "").trim();
    if (!value || /^javascript:/i.test(value)) continue;
    if (name === "href" || name === "src") value = normalizeInternalUrl(value);
    if (tag === "a" && name === "target" && value !== "_blank") continue;
    attrs.push(`${name}="${escapeHtml(value)}"`);
  }

  if (tag === "a" && attrs.some((attr) => attr === 'target="_blank"') && !attrs.some((attr) => attr.startsWith("rel="))) {
    attrs.push('rel="noopener noreferrer"');
  }

  if (tag === "img" && !attrs.some((attr) => attr.startsWith("loading="))) {
    attrs.push('loading="lazy"');
  }

  return attrs.length ? ` ${attrs.join(" ")}` : "";
}

function slugifyHeading(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .toLowerCase()
    .trim()
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanHtml(html) {
  let cleaned = decodeXml(html);

  cleaned = cleaned
    .replace(/\r/g, "")
    .replace(/<!--\s*\/?wp:[\s\S]*?-->/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/\[(\/)?(?:vc|elementor|et_pb|caption|gallery)[^\]]*\]/gi, "")
    .replace(/<figure[^>]*>/gi, "")
    .replace(/<\/figure>/gi, "")
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, "<p>$1</p>")
    .replace(/<\/?(?:div|span|section|article|main|header|footer)[^>]*>/gi, "");

  cleaned = cleaned.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (full, rawTag, attrs) => {
    const tag = rawTag.toLowerCase();
    const isClosing = full.startsWith("</");

    if (!allowedTags.has(tag)) return "";
    if (isClosing) return tag === "br" || tag === "img" ? "" : `</${tag}>`;
    if (tag === "br") return "<br>";
    if (tag === "img") return `<img${parseAttributes(attrs, tag)}>`;
    return `<${tag}${parseAttributes(attrs, tag)}>`;
  });

  const usedHeadingIds = new Set();
  cleaned = cleaned.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_, level, inner) => {
    const base = slugifyHeading(inner) || `section-${usedHeadingIds.size + 1}`;
    let id = base;
    let count = 2;
    while (usedHeadingIds.has(id)) {
      id = `${base}-${count}`;
      count += 1;
    }
    usedHeadingIds.add(id);
    return `<h${level} id="${id}">${inner.trim()}</h${level}>`;
  });

  let previous;
  do {
    previous = cleaned;
    cleaned = cleaned
      .replace(/<p>(?:\s|&nbsp;|<br>)*<\/p>/gi, "")
      .replace(/<li>(?:\s|&nbsp;|<br>)*<\/li>/gi, "")
      .replace(/<h[23][^>]*>(?:\s|&nbsp;|<br>)*<\/h[23]>/gi, "");
  } while (cleaned !== previous);

  return cleaned
    .replace(/\n{3,}/g, "\n\n")
    .replace(/>\s+</g, "><")
    .trim();
}

function textFromHtml(html) {
  return decodeXml(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createExcerpt(explicitExcerpt, content) {
  const text = textFromHtml(explicitExcerpt || content);
  if (text.length <= 170) return text;
  return `${text.slice(0, 167).replace(/\s+\S*$/, "")}...`;
}

function readingTime(content) {
  const words = textFromHtml(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function toIsoDate(value) {
  if (!value) return "";
  const normalized = value.includes(" ") ? value.replace(" ", "T") + "Z" : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function mergeExisting(generated, existing) {
  if (!existing) return generated;

  return {
    ...generated,
    author: existing.author || generated.author,
    category: existing.category || generated.category,
    tags: Array.isArray(existing.tags) && existing.tags.length ? existing.tags : generated.tags,
    seo: {
      title: existing.seo?.title || generated.seo.title,
      description: existing.seo?.description || generated.seo.description,
      keywords: existing.seo?.keywords || generated.seo.keywords,
    },
  };
}

function readExistingJson(slug) {
  const file = path.join(outputDir, `${slug}.json`);
  if (!fs.existsSync(file)) return null;

  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

const xml = fs.readFileSync(inputFile, "utf8");
const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

const attachmentsById = new Map();
for (const item of items) {
  if (getTag(item, "wp:post_type") !== "attachment") continue;
  const id = getTag(item, "wp:post_id");
  const url = getTag(item, "wp:attachment_url");
  if (id && url) attachmentsById.set(id, url);
}

fs.mkdirSync(outputDir, { recursive: true });

const posts = [];
for (const item of items) {
  if (getTag(item, "wp:post_type") !== "post") continue;
  if (getTag(item, "wp:status") !== "publish") continue;

  const id = Number(getTag(item, "wp:post_id"));
  const title = getTag(item, "title");
  const slug = getTag(item, "wp:post_name");
  if (!id || !title || !slug) continue;

  const rawContent = getTag(item, "content:encoded");
  const content = cleanHtml(rawContent);
  const rawExcerpt = getTag(item, "excerpt:encoded");
  const excerpt = createExcerpt(rawExcerpt, content);
  const categories = getTerms(item, "category");
  const tags = getTerms(item, "post_tag");
  const featuredImage = attachmentsById.get(getPostMeta(item, "_thumbnail_id")) || "";
  const publishedAt = toIsoDate(getTag(item, "wp:post_date_gmt") || getTag(item, "pubDate"));
  const updatedAt = toIsoDate(getTag(item, "wp:post_modified_gmt")) || publishedAt;
  const seoTitle = getPostMeta(item, "_yoast_wpseo_title") || title;
  const seoDescription = getPostMeta(item, "_yoast_wpseo_metadesc") || excerpt;
  const seoKeywords = getPostMeta(item, "_yoast_wpseo_focuskw") || tags.join(", ");

  const generated = {
    id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    author: getTag(item, "dc:creator") || "Fillip Technologies",
    publishedAt,
    updatedAt,
    readingTime: readingTime(content),
    category: categories[0] || "",
    tags,
    seo: {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords,
    },
  };

  const post = mergeExisting(generated, readExistingJson(slug));
  posts.push(post);
  fs.writeFileSync(path.join(outputDir, `${slug}.json`), `${JSON.stringify(post, null, 2)}\n`);
}

const index = posts
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .map(({ id, title, slug, excerpt, featuredImage, category, publishedAt, readingTime }) => ({
    id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt,
    readingTime,
  }));

fs.writeFileSync(path.join(outputDir, "index.json"), `${JSON.stringify(index, null, 2)}\n`);
console.log(`Generated ${posts.length} blog JSON files and index.json in ${outputDir}`);
