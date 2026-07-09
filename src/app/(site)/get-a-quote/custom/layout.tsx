import IndustryNav from "@/components/quote/IndustryNav";

// The "Custom" tab adds its own industry nav (Hospital, Doctor, Real Estate,
// Education, …) below the section sub-nav, shared by the overview + each
// industry page.
export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IndustryNav />
      {children}
    </>
  );
}
