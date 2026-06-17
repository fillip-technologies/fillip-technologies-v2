"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const budgets = [
    "Under ₹50K",
    "₹50K - ₹1L",
    "₹1L - ₹3L",
    "₹3L - ₹5L",
    "₹5L+",
];

export default function ConsultationFormSection() {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        budget: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!form.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!/^[0-9]{10,15}$/.test(form.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!form.budget) {
            newErrors.budget = "Select your budget";
        }

        if (form.message.trim().length < 20) {
            newErrors.message =
                "Please provide at least 20 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            console.log(form);

            alert("Consultation request submitted.");

            setForm({
                fullName: "",
                company: "",
                email: "",
                phone: "",
                budget: "",
                message: "",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative overflow-hidden py-24">
            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />

            <div className="container relative mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                        Free Consultation
                    </span>

                    <h2 className="mt-6 text-5xl font-bold leading-[1.05] text-slate-900 md:text-6xl">
                        {"Let's Discuss Your"}
                        <br />
                        <span className="highlight-text">
                            Next Project
                        </span>
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Tell us about your requirements and our team
                        will get back to you within 24 hours.
                    </p>
                </div>

                {/* Content */}
                <div className="mt-16 overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

                        {/* Form Column */}
                        <div className="p-8 md:p-10">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <InputField
                                        label="Full Name *"
                                        value={form.fullName}
                                        error={errors.fullName}
                                        onChange={(value) =>
                                            setForm({
                                                ...form,
                                                fullName: value,
                                            })
                                        }
                                    />

                                    <InputField
                                        label="Company Name"
                                        value={form.company}
                                        onChange={(value) =>
                                            setForm({
                                                ...form,
                                                company: value,
                                            })
                                        }
                                    />

                                    <InputField
                                        label="Email Address *"
                                        value={form.email}
                                        error={errors.email}
                                        onChange={(value) =>
                                            setForm({
                                                ...form,
                                                email: value,
                                            })
                                        }
                                    />

                                    <InputField
                                        label="Phone Number *"
                                        value={form.phone}
                                        error={errors.phone}
                                        onChange={(value) =>
                                            setForm({
                                                ...form,
                                                phone: value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Budget */}
                                <div className="mt-8">
                                    <label className="mb-4 block text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        Project Budget
                                    </label>

                                    <div className="grid gap-3 md:grid-cols-5">
                                        {budgets.map((budget) => (
                                            <button
                                                key={budget}
                                                type="button"
                                                onClick={() =>
                                                    setForm({
                                                        ...form,
                                                        budget,
                                                    })
                                                }
                                                className={`rounded-2xl border p-4 text-sm transition ${form.budget === budget
                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                    : "border-slate-200 hover:border-blue-300"
                                                    }`}
                                            >
                                                {budget}
                                            </button>
                                        ))}
                                    </div>

                                    {errors.budget && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.budget}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="mt-8">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Project Requirements *
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                message: e.target.value,
                                            })
                                        }
                                        placeholder="Tell us about your project goals, features, timeline and requirements..."
                                        className="w-full rounded border border-slate-200 p-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                    />

                                    {errors.message && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 flex w-full items-center justify-center gap-3 rounded bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-8 py-4 font-semibold text-white"
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Schedule A Consultation"}

                                    <ArrowRight size={18} />
                                </button>

                                <p className="mt-5 text-center text-sm text-slate-500">
                                    🔒 We respect your privacy. Your information is secure and
                                    confidential.
                                </p>
                            </form>
                        </div>

                        {/* Video Column */}
                        <div className="relative min-h-[500px]">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover"
                            >
                                <source
                                    src="/images/consultation.mp4"
                                    type="video/mp4"
                                />
                            </video>

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="text-sm uppercase tracking-[0.2em] text-white/70">
                                    Fillip Technologies
                                </div>

                                <h3 className="mt-3 text-3xl font-semibold">
                                    Building Intelligent Solutions
                                </h3>

                                <p className="mt-3 text-white/80">
                                    AI, Cloud, Software Engineering and Digital Growth
                                    Solutions designed for modern organizations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function InputField({
    label,
    value,
    error,
    onChange,
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-14 w-full rounded border border-slate-200 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
