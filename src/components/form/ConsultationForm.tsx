"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const budgets = [
    "Under ₹50K",
    "₹50K - ₹1L",
    "₹1L - ₹3L",
    "₹3L - ₹5L",
    "₹5L+",
];

export default function ConsultationForm({
    className,
    source = "Consultation Form",
}: {
    className?: string;
    source?: string;
}) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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

        setSubmitError(null);

        try {
            setLoading(true);

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    company: form.company,
                    budget: form.budget,
                    message: form.message,
                    source,
                }),
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            setSubmitted(true);
            setForm({
                fullName: "",
                company: "",
                email: "",
                phone: "",
                budget: "",
                message: "",
            });
        } catch (err) {
            console.error("Consultation form submit failed:", err);
            setSubmitError(
                "Something went wrong while submitting. Please try again or email us directly."
            );
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div
                className={`flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-14 text-center ${className ?? ""}`}
            >
                <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Request received</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Thanks for reaching out! Our team will review your details and get back to you
                    shortly.
                </p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-blue-600 hover:underline"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
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

                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
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
                            className={`rounded-2xl border p-4 text-xs sm:text-sm transition ${form.budget === budget
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
                    className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white/50 text-sm text-slate-900"
                />

                {errors.message && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.message}
                    </p>
                )}
            </div>

            {submitError && (
                <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {submitError}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-8 py-4 font-semibold text-white cursor-pointer disabled:opacity-70"
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
                className="h-14 w-full rounded border border-slate-200 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white/50 text-sm text-slate-900"
            />

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
