"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ConsultationFormSection() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
        website: "", // Honeypot
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!form.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!/^[0-9]{10,15}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid phone number";
        }

        if (!form.service) {
            newErrors.service = "Select a service";
        }

        if (!form.budget) {
            newErrors.budget = "Select a budget";
        }

        if (form.message.trim().length < 20) {
            newErrors.message =
                "Please provide at least 20 characters about your project";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (form.website) return;

        if (!validate()) return;

        try {
            setLoading(true);

            console.log(form);

            // API Call Here

            alert("Consultation request submitted successfully.");

            setForm({
                fullName: "",
                email: "",
                phone: "",
                company: "",
                service: "",
                budget: "",
                message: "",
                website: "",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff] to-white" />

            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="container relative mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                        Free Consultation
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
                        Ready to Build Something
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                            {" "}
                            Exceptional?
                        </span>
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Tell us about your project and our team will get back to
                        you within 24 hours with a tailored solution.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-5xl">
                    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-10">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="website"
                                autoComplete="off"
                                className="hidden"
                                value={form.website}
                                onChange={(e) =>
                                    setForm({ ...form, website: e.target.value })
                                }
                            />

                            <div className="grid gap-6 md:grid-cols-2">
                                <Field
                                    label="Full Name *"
                                    error={errors.fullName}
                                >
                                    <input
                                        type="text"
                                        value={form.fullName}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                fullName: e.target.value,
                                            })
                                        }
                                        className="input"
                                    />
                                </Field>

                                <Field
                                    label="Email Address *"
                                    error={errors.email}
                                >
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        className="input"
                                    />
                                </Field>

                                <Field
                                    label="Phone Number *"
                                    error={errors.phone}
                                >
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="input"
                                    />
                                </Field>

                                <Field label="Company Name">
                                    <input
                                        type="text"
                                        value={form.company}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                company: e.target.value,
                                            })
                                        }
                                        className="input"
                                    />
                                </Field>

                                <Field
                                    label="Service *"
                                    error={errors.service}
                                >
                                    <select
                                        value={form.service}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                service: e.target.value,
                                            })
                                        }
                                        className="input"
                                    >
                                        <option value="">
                                            Select Service
                                        </option>
                                        <option>
                                            Custom Website Development
                                        </option>
                                        <option>
                                            E-Commerce Development
                                        </option>
                                        <option>
                                            WordPress Development
                                        </option>
                                        <option>
                                            Software Development
                                        </option>
                                    </select>
                                </Field>

                                <Field
                                    label="Budget *"
                                    error={errors.budget}
                                >
                                    <select
                                        value={form.budget}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                budget: e.target.value,
                                            })
                                        }
                                        className="input"
                                    >
                                        <option value="">
                                            Select Budget
                                        </option>
                                        <option>Under ₹50K</option>
                                        <option>₹50K - ₹1L</option>
                                        <option>₹1L - ₹3L</option>
                                        <option>₹3L - ₹5L</option>
                                        <option>₹5L+</option>
                                    </select>
                                </Field>
                            </div>

                            <div className="mt-6">
                                <Field
                                    label="Project Details *"
                                    error={errors.message}
                                >
                                    <textarea
                                        rows={6}
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                message: e.target.value,
                                            })
                                        }
                                        className="input resize-none py-4"
                                    />
                                </Field>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-8 py-4 font-semibold text-white transition hover:scale-[1.02]"
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Request Free Consultation"}

                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .input {
          width: 100%;
          height: 56px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 0 16px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
        }

        textarea.input {
          height: auto;
        }
      `}</style>
        </section>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            {children}

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}