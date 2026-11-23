import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FAQS, INTERNSHIP_PHONE, OFFICE } from "./constants";
import Blobs from "./Blobs";
import { PopIn, Reveal } from "./motion";
import { Highlight, titleClass } from "./SectionHeading";

/**
 * FAQ: helpline card on the left, accordion on the right. Built on <details>,
 * so it works without JavaScript and is keyboard accessible.
 */
export default function InternshipFaq() {
  const contacts = [
    { icon: Phone, title: INTERNSHIP_PHONE.display, sub: "Call the internship desk", href: `tel:${INTERNSHIP_PHONE.display.replace(/\s/g, "")}` },
    { icon: Mail, title: siteConfig.email, sub: "Write to us", href: `mailto:${siteConfig.email}` },
    { icon: MapPin, title: "Kankarbagh, Patna", sub: OFFICE.address, href: undefined },
  ];

  return (
    <section id="faq" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
      <Blobs />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={titleClass}>
            The questions you&apos;d <Highlight>ask us</Highlight>
          </h2>

          <div className="mt-8 rounded-[28px] bg-white shadow-[0_16px_40px_-24px_rgba(2,30,80,0.25)] ring-1 ring-slate-200/70 p-6">
            <p className="text-sm leading-6 text-slate-600">Still have a question? Talk to our team before you register.</p>
            <ul className="mt-5 space-y-3">
              {contacts.map(({ icon: Icon, title, sub, href }) => {
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_8px_18px_rgba(2,66,162,0.22)]">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block break-all text-sm font-bold text-slate-900">{title}</span>
                      <span className="block text-xs leading-5 text-slate-500">{sub}</span>
                    </span>
                  </>
                );
                return (
                  <li key={title}>
                    {href ? (
                      <a href={href} className="flex items-center gap-3.5 rounded-2xl p-2 transition hover:bg-slate-50">
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3.5 p-2">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link
              href="#apply"
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#0b6ad6] text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_12px_26px_rgba(2,66,162,0.25)] transition hover:-translate-y-0.5"
            >
              Register now <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-3.5">
          {FAQS.map(({ question, answer }, i) => (
            <PopIn key={question} index={i}>
            <details
              open={i === 0}
              className="group rounded-[22px] border border-slate-200 bg-white px-5 transition open:border-primary/40 open:bg-primary/[0.02] open:shadow-[0_14px_34px_rgba(2,66,162,0.08)] sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left font-bold text-slate-900 marker:content-none focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-open:rotate-45 group-open:bg-primary group-open:text-white">
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
                <span className="group-open:text-primary">{question}</span>
              </summary>
              <p className="pb-6 pl-[3.25rem] pr-2 leading-7 text-slate-600">{answer}</p>
            </details>
            </PopIn>
          ))}
        </div>
      </div>
    </section>
  );
}
