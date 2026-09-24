import Link from "next/link";

export type RelatedCityLink = { label: string; href: string };

/**
 * Cross-links the other service landing pages for the same city.
 *
 * These pages had no inbound internal links anywhere on the site. This renders
 * from the existing landing-page data (`city.name`) and is mounted once in the
 * [landingSlug] route, so it works for every template without any of the
 * per-template hero/section components being touched.
 */
export default function RelatedCityServices({
  city,
  links,
}: {
  city: string;
  links: RelatedCityLink[];
}) {
  if (!links.length) return null;

  return (
    <section
      aria-labelledby="related-city-services"
      className="border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <h2
          id="related-city-services"
          className="text-lg font-bold tracking-tight text-heading"
        >
          Other services in {city}
        </h2>
        <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block py-1.5 text-[15px] text-body underline-offset-4 transition hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
