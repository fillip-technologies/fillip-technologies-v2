import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
import { WHAT_WE_DO_MENU } from "./whatWeDoMegaMenuData";

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
          lg:hidden
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
          lg:hidden
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
                  {WHAT_WE_DO_MENU.flat().map((group) => (
                    <div key={group.title} className="pb-4 last:pb-0">
                      <button
                        type="button"
                        onClick={closeDrawer}
                        className="block text-left text-sm font-semibold leading-6 text-heading"
                      >
                        {group.title}
                      </button>
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

        {/* Drawer footer CTA */}
        <div className="px-6 pb-8 pt-4 border-t border-heading/6">
          <button
            onClick={closeDrawer}
            className="
              w-full py-3.5 rounded-full text-sm font-medium tracking-wide
              bg-heading text-primary-foreground hover:bg-navy
              transition-colors duration-300
            "
          >
            Talk -&gt;
          </button>
          <p className="mt-4 text-[10px] uppercase tracking-[0.55em] text-muted-foreground/70 text-center select-none">
            Human x Intelligence
          </p>
        </div>
      </div>
    </>
  );
}

export default MobileDrawer;
