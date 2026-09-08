import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FaThreads } from "react-icons/fa6";
import { ABOUT_MENU } from "./aboutMegaMenuData";
import { useAboutMenu, useNavMenu } from "./useAboutMenu";
import { AI_AUTOMATION_MENU } from "./aiAutomationMenuData";
import { NAV_LINKS } from "./data";
import { INDUSTRIES_MENU } from "./industriesMegaMenuData";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import NavSubmenuLink from "./NavSubmenuLink";
import { SOLUTIONS_MENU } from "./solutionsMegaMenuData";
import type { SolutionMenuItem } from "./solutionsMegaMenuData";
import type { MegaMenuItem, MobileDrawerProps } from "./types";
import { WHAT_WE_DO_MENU, WHAT_WE_DO_ITEMS_BY_SLUG } from "./whatWeDoMegaMenuData";
import { useWhatWeDoCategories } from "./useWhatWeDoCategories";

const SIMPLE_MOBILE_MENUS: Partial<Record<(typeof NAV_LINKS)[number], readonly (string | MegaMenuItem)[]>> = {
  About: ABOUT_MENU,
  Industries: INDUSTRIES_MENU,
  "AI & Automation": AI_AUTOMATION_MENU,
};

function MobileSolutionItems({
  items,
  closeDrawer,
  depth = 0,
}: {
  items: { label: string; href?: string; children?: SolutionMenuItem[] }[];
  closeDrawer: () => void;
  depth?: number;
}) {
  return (
    <div className={depth === 0 ? "space-y-2 pb-5" : "mt-2 space-y-2 pl-3"}>
      {items.map((item) =>
        item.children?.length ? (
          <details key={item.label} className="group/solution">
            <summary
              className="
                flex cursor-pointer list-none items-center justify-between py-1.5
                text-sm font-medium leading-6 text-heading marker:content-none
              "
            >
              <span>{item.label}</span>
              <ChevronDown
                size={16}
                className="text-muted-foreground/70 transition-transform duration-200 group-open/solution:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <MobileSolutionItems
              items={item.children}
              closeDrawer={closeDrawer}
              depth={depth + 1}
            />
          </details>
        ) : (
          <NavSubmenuLink
            key={item.label}
            item={item}
            onClick={closeDrawer}
            variant="mobile"
          />
        ),
      )}
    </div>
  );
}

function MobileDrawer({
  overlayRef,
  drawerRef,
  closeDrawer,
}: MobileDrawerProps) {
  // About + Industries items are CMS-managed; the rest stay static.
  const aboutItems = useAboutMenu();
  const industriesItems = useNavMenu(
    "industries",
    INDUSTRIES_MENU.map((i) => ({ label: i.label, href: i.href }))
  );
  const mobileMenus = { ...SIMPLE_MOBILE_MENUS, About: aboutItems, Industries: industriesItems };

  // "What We Do" groups come from the published categories (with linked headers),
  // falling back to the static menu until they load.
  const whatWeDoCats = useWhatWeDoCategories();
  const whatWeDoGroups =
    whatWeDoCats && whatWeDoCats.length
      ? whatWeDoCats.map((c) => ({
          title: c.label,
          href: c.href,
          items: c.items ?? WHAT_WE_DO_ITEMS_BY_SLUG[c.slug] ?? [],
        }))
      : WHAT_WE_DO_MENU.flat().map((g) => ({ title: g.title, href: undefined as string | undefined, items: g.items }));

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={closeDrawer}
        className="
          fixed inset-0 z-[950]
          bg-heading/30 backdrop-blur-sm
          opacity-0 pointer-events-none
          xl:hidden
        "
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="
          fixed top-0 right-0 z-[960]
          h-full w-[min(340px,88vw)]
          bg-card
          flex flex-col
          translate-x-full
          xl:hidden
          shadow-[-16px_0_48px_color-mix(in_srgb,var(--foreground)_12%,transparent)]
        "
        aria-label="Mobile navigation drawer"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-heading/6">
          <Logo width={130} height={36} />
          <MenuButton open={true} onClick={closeDrawer} />
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col px-6 py-4 flex-1 overflow-y-auto">
          {NAV_LINKS.map((label) => {
            const simpleMenu = mobileMenus[label];

            return simpleMenu ? (
              <details key={label} className="group border-b border-heading/6">
                <summary
                  className="
                    flex cursor-pointer list-none items-center justify-between py-4
                    text-base font-medium tracking-wide marker:content-none
                  "
                >
                  <span>{label}</span>
                  <ChevronDown
                    size={18}
                    className="text-muted-foreground/70 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="space-y-2 pb-5">
                  {simpleMenu.map((item) =>
                    typeof item === "string" ? (
                      <NavSubmenuLink
                        key={item}
                        label={item}
                        onClick={closeDrawer}
                        variant="mobile"
                      />
                    ) : (
                      <NavSubmenuLink
                        key={item.href ?? item.label}
                        item={item}
                        onClick={closeDrawer}
                        variant="mobile"
                      />
                    ),
                  )}
                </div>
              </details>
            ) : label === "Solutions" ? (
              <details key={label} className="group border-b border-heading/6">
                <summary
                  className="
                    flex cursor-pointer list-none items-center justify-between py-4
                    text-base font-medium tracking-wide marker:content-none
                  "
                >
                  <span>{label}</span>
                  <ChevronDown
                    size={18}
                    className="text-muted-foreground/70 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <MobileSolutionItems items={SOLUTIONS_MENU} closeDrawer={closeDrawer} />
              </details>
            ) : label === "What We Do" ? (
              <details key={label} className="group border-b border-heading/6">
                <summary
                  className="
                    flex cursor-pointer list-none items-center justify-between py-4
                    text-base font-medium tracking-wide marker:content-none
                  "
                >
                  <span>{label}</span>
                  <ChevronDown
                    size={18}
                    className="text-muted-foreground/70 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="pb-5">
                  {whatWeDoGroups.map((group) => (
                    <div key={group.title} className="pb-4 last:pb-0">
                      {group.href ? (
                        <Link
                          href={group.href}
                          onClick={closeDrawer}
                          className="block text-left text-sm font-semibold leading-6 text-heading"
                        >
                          {group.title}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={closeDrawer}
                          className="block text-left text-sm font-semibold leading-6 text-heading"
                        >
                          {group.title}
                        </button>
                      )}
                      {group.items ? (
                        <div className="mt-2 space-y-2 pl-1">
                          {group.items.map((item) => (
                            <NavSubmenuLink
                              key={item.label}
                              item={item}
                              onClick={closeDrawer}
                              variant="mobile"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </details>
            ) : (
              label === "Contact" ? (
                <Link
                  key={label}
                  href="/contact"
                  onClick={closeDrawer}
                  className="
                    flex items-center justify-between border-b border-heading/6 py-4
                    text-left
                    text-base font-medium tracking-wide transition-all duration-200
                    after:text-sm after:text-muted-foreground/50 after:content-['->']
                    last:border-0 hover:pl-1
                  "
                >
                  {label}
                </Link>
              ) : (
                <button
                  key={label}
                  type="button"
                  onClick={closeDrawer}
                  className="
                    flex items-center justify-between border-b border-heading/6 py-4
                    text-left
                    text-base font-medium tracking-wide transition-all duration-200
                    after:text-sm after:text-muted-foreground/50 after:content-['->']
                    last:border-0 hover:pl-1
                  "
                >
                  {label}
                </button>
              )
            );
          })}
        </nav>

        {/* Drawer footer: social links */}
        <div className="px-6 pb-8 pt-4 border-t border-heading/6">
          <div className="flex justify-center gap-3">
            <a
              href="https://facebook.com/FillipTechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-heading text-[#1877F2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
              aria-label="Facebook"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/filliptechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Instagram"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/fillip-technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-heading text-[#0A66C2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
              aria-label="LinkedIn"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://x.com/Fillip_Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90"
              aria-label="Twitter/X"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.threads.com/@filliptechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-heading text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
              aria-label="Threads"
            >
              <FaThreads className="h-4.5 w-4.5" aria-hidden="true" />
            </a>
            <a
              href="https://youtube.com/channel/UCR7oww-nQszfqAsf19T2UtQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-heading text-[#FF0000] transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
              aria-label="YouTube"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.55em] text-muted-foreground/70 text-center select-none">
            Human x Intelligence
          </p>
        </div>
      </div>
    </>
  );
}

export default MobileDrawer;
