import Blobs from "./Blobs";
import RegistrationFlow from "./RegistrationFlow";
import SectionHeading, { Highlight } from "./SectionHeading";

/** Registration section, laid out like the National Internship Portal's register page. */
export default function InternshipApply() {
  // overflow-clip (not overflow-hidden) so the sticky info card inside can stick to the viewport.
  return (
    <section id="apply" className="relative scroll-mt-24 overflow-clip bg-slate-50 py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#0242a2 1px,transparent 1px),linear-gradient(to bottom,#0242a2 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <Blobs />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title={
            <>
              Register for the <Highlight>internship</Highlight>
            </>
          }
          description="Choose your track and complete the registration form below."
        />

        <div className="mt-12">
          <RegistrationFlow />
        </div>
      </div>
    </section>
  );
}
