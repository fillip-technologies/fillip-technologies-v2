import { Check, Minus } from "lucide-react";
import type { ServiceCategory } from "@/data/pricing";
import type { IndustryPackage } from "@/data/quote/industries";
import { discountedPrice, formatINR, tierDiscount } from "@/lib/quote";

/**
 * Full, untruncated feature breakdowns for the Get-a-Quote pages — the detail
 * the compact calculator/cards hide. Two shapes:
 *  - GroupedComparison: pricing categories (grouped featureGroups per tier).
 *  - PlanMatrix: industry tiers (flat features with "Everything in <prev>"
 *    inheritance) → a true side-by-side comparison table.
 */

/** Renders one pricing category's packages side-by-side with every feature group. */
export function GroupedComparison({ category }: { category: ServiceCategory }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-[var(--primary)] to-[var(--accent)]" />
        <h3 className="text-xl font-bold tracking-tight text-heading">{category.name}</h3>
      </div>
      <p className="mt-1 pl-4 text-sm text-body">{category.description}</p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {category.packages.map((pkg, i) => {
          // Middle tier reads as the "recommended" one — give it quiet emphasis.
          const featured = category.packages.length === 3 && i === 1;
          const rate = tierDiscount(i);
          return (
            <div
              key={pkg.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] ${
                featured
                  ? "border-primary/40 bg-primary/[0.03] ring-1 ring-primary/15"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {featured ? (
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Popular
                </span>
              ) : null}

              <div>
                <div className="font-bold text-heading">{pkg.name}</div>
                {pkg.tagline ? <div className="text-xs text-body">{pkg.tagline}</div> : null}
              </div>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                  {formatINR(discountedPrice(pkg.price, rate))}
                </span>
                <span className="text-sm font-medium text-body/60 line-through">
                  {formatINR(pkg.price)}
                </span>
                {pkg.billing === "monthly" ? (
                  <span className="text-xs font-medium text-body">/mo</span>
                ) : (
                  <span className="text-xs font-medium text-body">one-time</span>
                )}
                <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold text-green-600">
                  {Math.round(rate * 100)}% OFF
                </span>
              </div>

              {pkg.bestFor ? (
                <div className="mt-2 text-xs text-body">✓ Best for {pkg.bestFor}</div>
              ) : null}

              <div className="mt-4 space-y-4 border-t border-border pt-4">
                {pkg.featureGroups.map((group) => (
                  <div key={group.title}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                      <span className="h-px flex-none w-3 bg-primary/40" />
                      {group.title}
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-body">
                          <span className="mt-0.5 flex size-4.5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Expands each tier's "Everything in <prev>" shorthand into its full effective
 * feature set, so a comparison matrix can honestly tick every inherited row.
 * Returns tiers in input order plus the ordered union of all features.
 */
function resolveInheritedFeatures(packages: IndustryPackage[]) {
  const rows: string[] = [];
  let inherited: string[] = [];

  const tiers = packages.map((pkg) => {
    const own = pkg.features.filter((f) => !/^everything in/i.test(f.trim()));
    const effective = [...inherited, ...own];
    for (const f of own) if (!rows.includes(f)) rows.push(f);
    inherited = effective;
    return { pkg, effective: new Set(effective) };
  });

  return { tiers, rows };
}

/** Side-by-side comparison table for an industry's tiers. */
export function PlanMatrix({ packages }: { packages: IndustryPackage[] }) {
  const { tiers, rows } = resolveInheritedFeatures(packages);

  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-gradient-to-r from-[var(--surface)] to-white">
            <th className="p-4 text-sm font-semibold text-heading">What you get</th>
            {tiers.map(({ pkg }, i) => {
              const rate = tierDiscount(i);
              return (
              <th
                key={pkg.id}
                className={`p-4 text-center align-bottom ${
                  pkg.popular ? "bg-primary/[0.06]" : ""
                }`}
              >
                <div className="text-sm font-bold text-heading">{pkg.name}</div>
                <div className="mt-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-base font-extrabold text-transparent">
                  {formatINR(discountedPrice(pkg.price, rate))}
                  {pkg.billing === "monthly" ? (
                    <span className="text-xs font-medium text-body">/mo</span>
                  ) : null}
                </div>
                <div className="text-[11px] font-medium text-body/60 line-through">
                  {formatINR(pkg.price)}
                </div>
                <div className="text-[10px] font-bold text-green-600">{Math.round(rate * 100)}% OFF</div>
                {pkg.popular ? (
                  <span className="mt-1 inline-block rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-white">
                    Most Popular
                  </span>
                ) : null}
              </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((feature, i) => (
            <tr key={feature} className={i % 2 ? "bg-surface/40" : ""}>
              <td className="p-4 text-sm text-body">{feature}</td>
              {tiers.map(({ pkg, effective }) => (
                <td
                  key={pkg.id}
                  className={`p-4 text-center ${pkg.popular ? "bg-primary/[0.04]" : ""}`}
                >
                  {effective.has(feature) ? (
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  ) : (
                    <Minus size={14} className="inline text-border" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
