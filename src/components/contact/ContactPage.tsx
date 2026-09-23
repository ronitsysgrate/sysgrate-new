"use client";

import React, { useState } from "react";
import { REGION_LAND, REGION_PINS, REGION_VIEWBOX } from "@/components/contact/region-map";
import {
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    Headset,
    Mail,
    MapPin,
    Phone,
    Send,
    Users,
    type LucideIcon,
} from "lucide-react";

const SALES_EMAIL = "sales@sysgrate.com";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

type PracticeValue = "CX" | "EX" | "Workplace" | "AI";

interface Specialist {
    value: PracticeValue;
    label: string;
    title: string;
    detail: string;
    icon: LucideIcon;
    tint: string;
    accent: string;
}

const SPECIALISTS: Specialist[] = [
    {
        value: "CX",
        label: "CX",
        title: "Customer Experience",
        detail: "Contact centre, conversational AI, CRM integration",
        icon: Headset,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        value: "EX",
        label: "EX",
        title: "Employee Experience",
        detail: "UCaaS, Microsoft Teams, Zoom, SBC",
        icon: Users,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        value: "Workplace",
        label: "Workplace",
        title: "Modern Workplace",
        detail: "AV, boardrooms, video walls, signage",
        icon: Building2,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
];

const PRACTICE_OPTIONS: { value: PracticeValue; label: string }[] = [
    { value: "CX", label: "CX — Contact centre, conversational AI, CRM" },
    { value: "EX", label: "EX — UCaaS, Microsoft Teams, Zoom, SBC" },
    { value: "Workplace", label: "Workplace — AV, boardrooms, video walls, signage" },
    { value: "AI", label: "AI — Automation, analytics, and agentic workflows" },
];

interface Office {
    id: string;
    name: string;
    region: string;
    lines: string[];
    phone?: string;
    phoneHref?: string;
    timezone: string;
    label: "left" | "right";
}

const OFFICES: Office[] = [
    {
        id: "singapore",
        name: "Singapore",
        region: "Asia-Pacific",
        lines: ["#46-00, OCBC Centre", "65 Chulia Street", "Singapore 049513"],
        phone: "+65 8346 7679",
        phoneHref: "tel:+6583467679",
        timezone: "SGT · GMT+8",
        label: "right",
    },
    {
        id: "india",
        name: "India",
        region: "Asia-Pacific",
        lines: ["#155, 4th Cross, Kasturi Nagar", "Bangalore 560043"],
        phone: "+91 99806 14280",
        phoneHref: "tel:+919980614280",
        timezone: "IST · GMT+5:30",
        label: "left",
    },
    {
        id: "malaysia",
        name: "Malaysia",
        region: "Asia-Pacific",
        lines: ["Wisma UOA 2, 15-13A", "Jalan Pinang", "Kuala Lumpur 50450"],
        timezone: "MYT · GMT+8",
        label: "left",
    },
    {
        id: "uae",
        name: "UAE",
        region: "Middle East",
        lines: ["IFZA, Dubai Silicon Oasis", "Dubai"],
        phone: "+971 54 385 3398",
        phoneHref: "tel:+971543853398",
        timezone: "GST · GMT+4",
        label: "right",
    },
];

interface FormState {
    name: string;
    email: string;
    company: string;
    practice: PracticeValue | "";
    message: string;
}

const EMPTY_FORM: FormState = {
    name: "",
    email: "",
    company: "",
    practice: "",
    message: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FormErrors {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = "Add your name.";
    if (!form.email.trim()) errors.email = "Add your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = "Enter a valid email address.";
    }
    if (!form.company.trim()) errors.company = "Add your company.";
    if (!form.practice) errors.practice = "Choose the practice you want to talk about.";
    if (!form.message.trim()) errors.message = "Tell us what you're solving.";
    return errors;
}

function calendlyEmbedSrc(url: string) {
    try {
        const next = new URL(url);
        if (!next.searchParams.has("hide_landing_page_details")) {
            next.searchParams.set("hide_landing_page_details", "1");
        }
        if (!next.searchParams.has("hide_gdpr_banner")) {
            next.searchParams.set("hide_gdpr_banner", "1");
        }
        next.searchParams.set("background_color", "ffffff");
        next.searchParams.set("text_color", "141414");
        next.searchParams.set("primary_color", "4a3e92");
        return next.toString();
    } catch {
        return url;
    }
}

const inputClass =
    "h-12 w-full rounded-full border border-hairline bg-paper px-5 text-sm text-ink-800 outline-none transition-shadow placeholder:text-ink-300 focus-visible:border-link focus-visible:shadow-[var(--ring-focus)]";

export default function ContactPage() {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [activeOffice, setActiveOffice] = useState(OFFICES[0].id);

    const office = OFFICES.find((item) => item.id === activeOffice) ?? OFFICES[0];

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((current) => ({ ...current, [key]: value }));
        setErrors((current) => ({ ...current, [key]: undefined }));
    }

    function selectPractice(value: PracticeValue) {
        update("practice", value);
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validate(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        const body = [
            `Name: ${form.name.trim()}`,
            `Work email: ${form.email.trim()}`,
            `Company: ${form.company.trim()}`,
            `Practice: ${form.practice}`,
            "",
            form.message.trim(),
        ].join("\n");

        const href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
            `Sysgrate enquiry — ${form.practice}`,
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = href;
        setSubmitted(true);
    }

    return (
        <>
            <section className="sg-container pt-[clamp(120px,16vw,168px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] items-center gap-[clamp(32px,5vw,72px)]">
                    <div className="flex flex-col items-start gap-5">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                            Contact
                        </span>
                        <h1 className="text-[clamp(34px,4.4vw,64px)] font-normal leading-[1.35] tracking-[-0.03em] text-ink-800 m-0">
                            Your challenge deserves the{" "}
                            <span className="sg-highlight font-medium">right expert</span>.
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[560px]">
                            Tell us what you&rsquo;re solving — our specialists across CX, Digital
                            Workplace, Modern Workplace, and AI will get back to you within one
                            business day.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                            <a
                                href="#message"
                                className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group"
                            >
                                <span>Send a message</span>
                                <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    ↗
                                </span>
                            </a>
                            <a
                                href="#book"
                                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-paper border border-hairline text-ink-800 text-sm font-medium shadow-sm hover:shadow-chip hover:-translate-y-0.5 transition-all"
                            >
                                Book a call
                            </a>
                        </div>
                    </div>

                    <aside className="relative rounded-panel border border-hairline bg-paper-card p-7 sm:p-9 shadow-chip overflow-hidden">
                        <div className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-gradient-to-br from-[#E79AC0]/30 via-[#E4D8F3]/40 to-transparent blur-2xl" />
                        <p className="relative text-xs font-medium tracking-[0.08em] uppercase text-text-secondary m-0">
                            Talk to a specialist
                        </p>
                        <ul className="relative mt-5 m-0 p-0 list-none flex flex-col gap-5">
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-2xl bg-[#F4EEF8] flex items-center justify-center shrink-0">
                                    <Mail size={18} strokeWidth={2} className="text-[#7B5AA6]" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.06em] uppercase text-ink-300 m-0">
                                        Email
                                    </p>
                                    <a
                                        href={`mailto:${SALES_EMAIL}`}
                                        className="text-[17px] font-medium text-ink-800 no-underline hover:text-link transition-colors"
                                    >
                                        {SALES_EMAIL}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-2xl bg-[#EEEDF8] flex items-center justify-center shrink-0">
                                    <Clock size={18} strokeWidth={2} className="text-[#3E3A97]" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.06em] uppercase text-ink-300 m-0">
                                        Response
                                    </p>
                                    <p className="text-[17px] font-medium text-ink-800 m-0">
                                        Within one business day
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-2xl bg-[#FAF0F5] flex items-center justify-center shrink-0">
                                    <MapPin size={18} strokeWidth={2} className="text-[#9A6EAC]" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.06em] uppercase text-ink-300 m-0">
                                        Offices
                                    </p>
                                    <p className="text-[17px] font-medium text-ink-800 m-0">
                                        Singapore, India, Malaysia, UAE
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </aside>
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="max-w-190 flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.35] tracking-[-0.02em] text-ink-800 m-0">
                        Let&rsquo;s turn your technology goals into{" "}
                        <span className="sg-highlight font-medium">reality</span>.
                    </h2>
                    <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                        Whether it&rsquo;s CX, Digital Workplace, Modern Workplace, or AI —
                        speak to the right Sysgrate specialist and start moving faster today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {SPECIALISTS.map((item) => {
                        const Icon = item.icon;
                        const selected = form.practice === item.value;
                        return (
                            <button
                                key={item.value}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => selectPractice(item.value)}
                                className={`group relative text-left bg-paper rounded-card border p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card cursor-pointer ${
                                    selected
                                        ? "border-[#9A6EAC] shadow-card"
                                        : "border-hairline hover:border-[#9A6EAC]/35"
                                }`}
                            >
                                <div
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.tint}`}
                                >
                                    <Icon size={20} strokeWidth={2} style={{ color: item.accent }} />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold tracking-[0.08em] uppercase text-ink-300">
                                        {item.label}
                                    </span>
                                    <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-1 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed mt-2.5 mb-0">
                                        {item.detail}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="max-w-[760px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Ready to transform? <span className="sg-highlight font-medium">Let&rsquo;s talk.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                        Speak to a specialist across CX, Digital Workplace, Modern Workplace, or
                        AI — and take the first step towards your next breakthrough.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 items-stretch">
                    <div
                        id="message"
                        className="scroll-mt-32 rounded-panel border border-hairline/80 bg-paper p-7 sm:p-9 shadow-chip"
                    >
                        <h3 className="text-xl font-medium text-ink-800 m-0">Send us a message</h3>
                        <p className="text-sm text-text-secondary leading-relaxed mt-2 mb-6">
                            A specialist replies within one business day.
                        </p>

                        {submitted ? (
                            <div className="rounded-card border border-hairline bg-paper-muted px-6 py-8 flex flex-col items-start gap-3">
                                <span className="w-11 h-11 rounded-2xl bg-[#F4EEF8] inline-flex items-center justify-center">
                                    <CheckCircle2 size={20} strokeWidth={2} className="text-[#7B5AA6]" />
                                </span>
                                <h4 className="text-lg font-medium text-ink-800 m-0">
                                    We&rsquo;ll reply within one business day.
                                </h4>
                                <p className="text-sm text-text-secondary leading-relaxed m-0">
                                    Your email app should have opened with this message addressed to{" "}
                                    <a
                                        href={`mailto:${SALES_EMAIL}`}
                                        className="text-link hover:text-link-hover"
                                    >
                                        {SALES_EMAIL}
                                    </a>
                                    . Send it from there and the right specialist will pick it up.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSubmitted(false);
                                        setForm(EMPTY_FORM);
                                    }}
                                    className="mt-2 text-sm font-medium text-link hover:text-link-hover"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                                <Field label="Name" htmlFor="contact-name" error={errors.name}>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        autoComplete="name"
                                        value={form.name}
                                        onChange={(event) => update("name", event.target.value)}
                                        className={inputClass}
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                                    />
                                </Field>
                                <Field label="Work email" htmlFor="contact-email" error={errors.email}>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={(event) => update("email", event.target.value)}
                                        className={inputClass}
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                                    />
                                </Field>
                                <Field label="Company" htmlFor="contact-company" error={errors.company}>
                                    <input
                                        id="contact-company"
                                        name="company"
                                        autoComplete="organization"
                                        value={form.company}
                                        onChange={(event) => update("company", event.target.value)}
                                        className={inputClass}
                                        aria-invalid={Boolean(errors.company)}
                                        aria-describedby={errors.company ? "contact-company-error" : undefined}
                                    />
                                </Field>
                                <Field label="Practice" htmlFor="contact-practice" error={errors.practice}>
                                    <div className="relative">
                                        <select
                                            id="contact-practice"
                                            name="practice"
                                            value={form.practice}
                                            onChange={(event) =>
                                                update("practice", event.target.value as PracticeValue | "")
                                            }
                                            className={`${inputClass} appearance-none pr-12`}
                                            aria-invalid={Boolean(errors.practice)}
                                            aria-describedby={
                                                errors.practice ? "contact-practice-error" : undefined
                                            }
                                        >
                                            <option value="">Choose a practice</option>
                                            {PRACTICE_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink-300 text-xs">
                                            ▾
                                        </span>
                                    </div>
                                </Field>
                                <Field label="What you're solving" htmlFor="contact-message" error={errors.message}>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        value={form.message}
                                        onChange={(event) => update("message", event.target.value)}
                                        className="w-full rounded-3xl border border-hairline bg-paper px-5 py-4 text-sm text-ink-800 outline-none transition-shadow placeholder:text-ink-300 focus-visible:border-link focus-visible:shadow-[var(--ring-focus)] resize-y min-h-32"
                                        aria-invalid={Boolean(errors.message)}
                                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                                    />
                                </Field>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all w-fit cursor-pointer"
                                >
                                    <Send size={16} strokeWidth={2.2} />
                                    <span>Send message</span>
                                </button>
                            </form>
                        )}
                    </div>

                    <div
                        id="book"
                        className="scroll-mt-32 relative overflow-hidden rounded-panel border border-hairline/80 flex flex-col"
                        style={{ background: "var(--panel-gradient)" }}
                    >
                        <div className="pointer-events-none absolute -top-24 -right-24 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#E79AC0]/25 via-[#9A6EAC]/20 to-transparent blur-2xl" />
                        <div className="relative z-10 p-7 sm:p-9 flex flex-col gap-3">
                            <span className="w-11 h-11 rounded-2xl bg-paper shadow-chip inline-flex items-center justify-center">
                                <Calendar size={20} strokeWidth={2} className="text-[#3E3A97]" />
                            </span>
                            <h3 className="text-xl font-medium text-ink-800 m-0">Book a call</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 max-w-[460px]">
                                Speak to a specialist across CX, Digital Workplace, Modern Workplace,
                                or AI — and take the first step towards your next breakthrough.
                            </p>
                        </div>
                        {CALENDLY_URL ? (
                            <iframe
                                src={calendlyEmbedSrc(CALENDLY_URL)}
                                title="Book a call with a Sysgrate specialist"
                                className="relative z-10 w-full min-h-[680px] border-0 bg-paper"
                            />
                        ) : (
                            <div className="relative z-10 px-7 sm:px-9 pb-9">
                                <span className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill">
                                    <Calendar size={16} strokeWidth={2.2} />
                                    <span>Book a call</span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id="offices" className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Our offices
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Singapore, India, Malaysia, and the UAE.
                    </h2>
                    <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                        Engineers, architects, and project managers on the ground across
                        Asia-Pacific and the Middle East. Select a location to see the address.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 lg:gap-6 mt-8 lg:h-[500px] items-stretch">
                    <div
                        className="relative h-[260px] sm:h-[300px] lg:h-full w-full max-w-full rounded-panel border border-hairline/80 overflow-hidden isolate"
                        style={{ background: "var(--panel-gradient)" }}
                    >
                        <div className="absolute inset-0 overflow-hidden rounded-panel">
                            <RegionMap activeId={office.id} onSelect={setActiveOffice} />
                        </div>
                        <div className="hidden sm:block absolute left-4 bottom-4 max-w-[200px] rounded-2xl bg-paper/95 backdrop-blur-md border border-white/80 shadow-float p-3">
                            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-ink-300 m-0">
                                {office.region}
                            </p>
                            <p className="text-base font-medium text-ink-800 m-0 mt-1">{office.name}</p>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-1">
                                {office.lines.join(", ")}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5 lg:h-full min-h-0">
                        {OFFICES.map((item, index) => {
                            const selected = item.id === office.id;
                            return (
                                <article
                                    key={item.id}
                                    className={`sg-animate-rise group relative flex-1 min-h-0 rounded-3xl border bg-paper overflow-hidden transition-all duration-300 ${
                                        selected
                                            ? "border-[#9A6EAC] shadow-card"
                                            : "border-hairline hover:-translate-y-0.5 hover:border-[#9A6EAC]/40 hover:shadow-chip"
                                    }`}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    <span
                                        className={`absolute left-0 inset-y-0 w-1 origin-center transition-transform duration-500 ${
                                            selected
                                                ? "scale-y-100 bg-[#7B5AA6]"
                                                : "scale-y-0 bg-[#CDB8E4] group-hover:scale-y-100"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => setActiveOffice(item.id)}
                                        className="relative h-full w-full text-left cursor-pointer px-4 py-2.5 flex flex-col justify-center gap-1"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="text-[16px] font-medium text-ink-800 m-0 leading-tight">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[11px] tracking-[0.04em] uppercase text-text-secondary m-0 mt-0.5">
                                                    {item.region}
                                                </p>
                                            </div>
                                            <span
                                                className={`w-9 h-9 rounded-2xl inline-flex items-center justify-center shrink-0 transition-colors duration-300 ${
                                                    selected ? "bg-[#F4EEF8]" : "bg-paper-muted group-hover:bg-[#F4EEF8]"
                                                }`}
                                            >
                                                <MapPin
                                                    size={16}
                                                    strokeWidth={2}
                                                    className={`${selected ? "text-[#7B5AA6] sg-pin-float" : "text-ink-300 group-hover:text-[#7B5AA6]"} transition-colors`}
                                                />
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-text-secondary leading-snug m-0 line-clamp-2">
                                            {item.lines.join(", ")}
                                        </p>
                                        <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-text-secondary">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock size={13} strokeWidth={2} />
                                                {item.timezone}
                                            </span>
                                            {item.phone ? (
                                                <span className="inline-flex items-center gap-1.5 text-link">
                                                    <Phone size={13} strokeWidth={2} />
                                                    {item.phone}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-link">
                                                    <Mail size={13} strokeWidth={2} />
                                                    {SALES_EMAIL}
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

function Field({
    label,
    htmlFor,
    error,
    children,
}: {
    label: string;
    htmlFor: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
                {label}
            </label>
            {children}
            {error ? (
                <p id={`${htmlFor}-error`} className="text-xs text-rose-700 m-0">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

const PIN_BY_ID = Object.fromEntries(REGION_PINS.map((pin) => [pin.id, pin]));

function officeRoute() {
    const order = ["uae", "india", "malaysia", "singapore"].map((id) => PIN_BY_ID[id]);
    const [uae, india, malaysia, singapore] = order;
    return `M${uae.x} ${uae.y} Q${(uae.x + india.x) / 2} ${(uae.y + india.y) / 2 - 36} ${india.x} ${india.y} Q${(india.x + malaysia.x) / 2} ${(india.y + malaysia.y) / 2 - 28} ${malaysia.x} ${malaysia.y} T${singapore.x} ${singapore.y}`;
}

function RegionMap({
    activeId,
    onSelect,
}: {
    activeId: string;
    onSelect: (id: string) => void;
}) {
    return (
        <svg
            viewBox={REGION_VIEWBOX}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full font-sans"
            role="img"
            aria-label="Offices across the Middle East and Asia-Pacific"
        >
            <defs>
                <pattern id="sea-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.9" fill="#9A6EAC" opacity="0.22" />
                </pattern>
                <filter id="land-shadow" x="-8%" y="-8%" width="116%" height="116%">
                    <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#3E3A97" floodOpacity="0.12" />
                </filter>
            </defs>
            <rect width="920" height="560" fill="url(#sea-dots)" />
            <g filter="url(#land-shadow)" fill="#FFFFFF" stroke="#E4D8F3" strokeWidth="1.1" strokeLinejoin="round">
                {REGION_LAND.map((d, index) => (
                    <path key={index} d={d} fillRule="evenodd" />
                ))}
            </g>
            <path
                d={officeRoute()}
                fill="none"
                stroke="#9A6EAC"
                strokeWidth="1.4"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.8"
            />
            {OFFICES.map((item) => {
                const pin = PIN_BY_ID[item.id];
                const selected = item.id === activeId;
                const labelLeft = item.label === "left";
                const labelWidth = item.name.length * 7.2 + 18;
                const labelX = labelLeft ? -labelWidth - 12 : 12;
                const labelY = item.id === "singapore" ? 10 : item.id === "malaysia" ? -28 : -12;
                return (
                    <g
                        key={item.id}
                        transform={`translate(${pin.x} ${pin.y})`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected}
                        aria-label={item.name}
                        className="cursor-pointer outline-none"
                        onClick={() => onSelect(item.id)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                onSelect(item.id);
                            }
                        }}
                    >
                        <circle r="20" fill="transparent" />
                        {selected ? (
                            <circle r="11" fill="none" stroke="#E4D8F3" strokeWidth="5" />
                        ) : null}
                        <circle
                            r={selected ? 6.5 : 5}
                            fill={selected ? "#3E3A97" : "#7B5AA6"}
                            stroke="#FFFFFF"
                            strokeWidth="2.5"
                        />
                        <g transform={`translate(${labelX} ${labelY})`}>
                            <rect width={labelWidth} height="22" rx="11" fill="#FFFFFF" />
                            <text
                                x={labelWidth / 2}
                                y="15"
                                textAnchor="middle"
                                fill={selected ? "#141414" : "#5A5372"}
                                fontSize="12"
                                fontWeight="500"
                            >
                                {item.name}
                            </text>
                        </g>
                    </g>
                );
            })}
        </svg>
    );
}
