"use client";

import { useState } from "react";
import { ArrowRight, FileText, UploadCloud } from "lucide-react";

type CareerApplicationFormProps = {
  roles: string[];
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  linkedIn: string;
  portfolio: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  experience: "",
  linkedIn: "",
  portfolio: "",
  message: "",
};

export default function CareerApplicationForm({ roles }: CareerApplicationFormProps) {
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{10,16}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (!form.role) nextErrors.role = "Select a role.";
    if (!form.experience) nextErrors.experience = "Select your experience.";
    if (!resume) nextErrors.resume = "Attach your resume.";
    if (resume && resume.size > 5 * 1024 * 1024) nextErrors.resume = "Resume must be smaller than 5 MB.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    console.log({ ...form, resume: resume?.name });
    setSubmitted(true);
    setForm(initialForm);
    setResume(null);
    event.currentTarget.reset();
  };

  const fieldClass = "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

  return (
    <section id="apply" className="relative overflow-hidden bg-slate-50 py-24">
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(to right,#0242a2 1px,transparent 1px),linear-gradient(to bottom,#0242a2 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Apply now</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">Bring your ideas.<br /><span className="text-primary">Build what matters.</span></h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">Tell us about your experience and the role that interests you. Our team reviews every relevant application carefully.</p>
          <div className="mt-10 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-primary/10"><FileText className="size-5 text-primary" /></span><div><p className="font-semibold text-slate-900">Resume guidelines</p><p className="mt-1 text-sm text-slate-500">PDF, DOC or DOCX, maximum 5 MB</p></div></div></div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" error={errors.fullName}><input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={fieldClass} placeholder="Your full name" /></Field>
            <Field label="Email address" error={errors.email}><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} placeholder="you@example.com" /></Field>
            <Field label="Phone number" error={errors.phone}><input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass} placeholder="+91 98765 43210" /></Field>
            <Field label="Role" error={errors.role}><select value={form.role} onChange={(e) => update("role", e.target.value)} className={fieldClass}><option value="">Select a role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select></Field>
            <Field label="Experience" error={errors.experience}><select value={form.experience} onChange={(e) => update("experience", e.target.value)} className={fieldClass}><option value="">Select experience</option><option>Fresher</option><option>1-2 years</option><option>3-5 years</option><option>6-9 years</option><option>10+ years</option></select></Field>
            <Field label="LinkedIn profile"><input type="url" value={form.linkedIn} onChange={(e) => update("linkedIn", e.target.value)} className={fieldClass} placeholder="https://linkedin.com/in/..." /></Field>
            <div className="sm:col-span-2"><Field label="Portfolio or work link"><input type="url" value={form.portfolio} onChange={(e) => update("portfolio", e.target.value)} className={fieldClass} placeholder="Portfolio, GitHub, Behance or case studies" /></Field></div>
            <div className="sm:col-span-2"><Field label="Why would you like to join Fillip Technologies?"><textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Tell us about your interests, strengths and goals." /></Field></div>
            <div className="sm:col-span-2"><label className="block text-sm font-semibold text-slate-700">Resume</label><label className="mt-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-5 transition hover:border-primary/50 hover:bg-primary/[0.03]"><span className="flex items-center gap-3"><UploadCloud className="size-5 text-primary" /><span className="text-sm text-slate-600">{resume?.name ?? "Choose your resume"}</span></span><span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm">Browse</span><input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => { setResume(e.target.files?.[0] ?? null); setErrors((current) => ({ ...current, resume: "" })); }} /></label>{errors.resume ? <p className="mt-2 text-sm text-red-600">{errors.resume}</p> : null}</div>
          </div>
          {submitted ? <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Application details validated. Connect a careers email, ATS, or upload API before publishing to receive applications and resume files.</p> : null}
          <button type="submit" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5">Submit application <ArrowRight className="size-4" /></button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}{children}{error ? <span className="mt-2 block text-sm font-normal text-red-600">{error}</span> : null}</label>;
}
