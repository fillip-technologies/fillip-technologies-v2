import { getLocationPage } from "@/server/location-pages/registry";

// Renders an admin-managed "<service> in <city>" page. Re-fetches by slug
// (cheap — snapshot-cached) so this stays a self-contained, cacheable unit
// the same way IndustryPageView etc. do.
export default async function LocationPageView({ slug }: { slug: string }) {
  const page = await getLocationPage(slug);
  if (!page) return null;

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border px-6 py-20 text-center sm:py-28">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold text-heading sm:text-5xl">
          {page.content.hero.title}{" "}
          <span className="text-primary">{page.content.hero.highlightedTitle}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-body">{page.content.hero.description}</p>
      </section>

      {/* Challenges */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {page.content.challenges.badge}
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-heading sm:text-4xl">
            {page.content.challenges.title}{" "}
            <span className="text-primary">{page.content.challenges.highlightedTitle}</span>
          </h2>
          <p className="mt-4 text-lg font-medium text-body">{page.content.challenges.lead}</p>
          <p className="mt-2 text-body">{page.content.challenges.support}</p>
          <p className="mt-6 text-body">{page.content.challenges.description}</p>
        </div>
      </section>

      {/* FAQ */}
      {page.faq.items.length > 0 ? (
        <section className="border-t border-border px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {page.faq.badge}
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-heading sm:text-4xl">{page.faq.title}</h2>
              <p className="mt-3 text-body">{page.faq.description}</p>
            </div>
            <div className="mt-10 space-y-3">
              {page.faq.items.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border bg-card/40 px-5 py-4 open:bg-card"
                >
                  <summary className="cursor-pointer list-none font-medium text-heading marker:content-none">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span className="shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-body">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
