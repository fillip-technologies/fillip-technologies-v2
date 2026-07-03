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

export default function ConsultationForm({ className }: { className?: string }) {
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

            <button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-8 py-4 font-semibold text-white cursor-pointer"
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
