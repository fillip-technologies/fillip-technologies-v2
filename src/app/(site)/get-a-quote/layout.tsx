import QuoteSubNav from "@/components/quote/QuoteSubNav";

// Shared shell for the Get-a-Quote section: a secondary nav (Packages / Custom /
// Requirement) rendered directly under the main site nav, above every sub-page.
export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    // Top padding clears the site's fixed navbar (tall hero state on desktop);
    // the sub-nav below is sticky and settles just under the compact pill nav.
    <div className="pt-24 lg:pt-32">
      <QuoteSubNav />
      {children}
    </div>
  );
}
