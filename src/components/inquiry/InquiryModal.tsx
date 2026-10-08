"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { InquiryContent, InquiryField, InquirySelectField } from "@/components/inquiry/types";

const SALES_EMAIL = "sales@sysgrate.com";
const OTHER = "Other";

const inputClass =
    "h-9 w-full rounded-full border border-hairline bg-paper px-3.5 text-xs text-ink-800 outline-none transition-shadow placeholder:text-ink-300 focus-visible:border-link focus-visible:shadow-[var(--ring-focus)]";

type Values = Record<string, string | string[]>;
type Errors = Record<string, string>;

function customKey(id: string) {
    return `${id}Custom`;
}

function emptyValues(sections: InquiryContent["sections"]): Values {
    const values: Values = {};
    for (const section of sections) {
        for (const field of section.fields) {
            values[field.id] = field.type === "select" && field.multiple ? [] : "";
            if (field.type === "select") values[customKey(field.id)] = "";
        }
    }
    return values;
}

function isOtherSelected(field: InquirySelectField, values: Values) {
    const current = values[field.id];
    if (field.multiple) return Array.isArray(current) && current.includes(OTHER);
    return current === OTHER;
}

function displayValue(field: InquiryField, values: Values) {
    if (field.type !== "select") return String(values[field.id] ?? "").trim();
    const custom = String(values[customKey(field.id)] ?? "").trim();
    if (field.multiple) {
        const current = values[field.id];
        const selected = Array.isArray(current) ? current : [];
        return selected
            .map((item) => (item === OTHER ? custom : item))
            .filter(Boolean)
            .join(", ");
    }
    const selected = String(values[field.id] ?? "");
    return selected === OTHER ? custom : selected;
}

function validate(sections: InquiryContent["sections"], values: Values): Errors {
    const errors: Errors = {};
    for (const section of sections) {
        for (const field of section.fields) {
            if (field.type === "email") {
                const email = String(values[field.id] ?? "").trim();
                if (!email) errors[field.id] = "Add your work email.";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    errors[field.id] = "Enter a valid email address.";
                }
                continue;
            }
            if (field.type === "country") {
                if (!String(values[field.id] ?? "").trim()) errors[field.id] = "Choose a country.";
                continue;
            }
            if (field.type === "textarea") {
                if (!String(values[field.id] ?? "").trim()) {
                    errors[field.id] = `Please fill in “${field.label}”.`;
                }
                continue;
            }
            if (field.type === "select") {
                const current = values[field.id];
                const empty = field.multiple
                    ? !Array.isArray(current) || current.length === 0
                    : !String(current ?? "").trim();
                if (empty) {
                    errors[field.id] = "Choose an option.";
                    continue;
                }
                if (isOtherSelected(field, values) && !String(values[customKey(field.id)] ?? "").trim()) {
                    errors[customKey(field.id)] = "Add your own answer.";
                }
                continue;
            }
            if (!String(values[field.id] ?? "").trim()) {
                errors[field.id] = `Add your ${field.label.toLowerCase()}.`;
            }
        }
    }
    return errors;
}

function FieldLabel({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <label htmlFor={id} className="text-xs font-medium text-ink-800">
            {children}
        </label>
    );
}

function countryNames() {
    const display = new Intl.DisplayNames(["en"], { type: "region" });
    const names: string[] = [];
    for (let first = 65; first <= 90; first += 1) {
        for (let second = 65; second <= 90; second += 1) {
            const code = String.fromCharCode(first, second);
            let name: string | undefined;
            try {
                name = display.of(code);
            } catch {
                continue;
            }
            if (name && name !== code) names.push(name);
        }
    }
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}

const COUNTRIES = countryNames();

function CountryField({
    id,
    value,
    invalid,
    onChange,
}: {
    id: string;
    value: string;
    invalid: boolean;
    onChange: (value: string) => void;
}) {
    const listId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value);
    const trimmed = query.trim().toLowerCase();
    const browsing = !trimmed || trimmed === value.trim().toLowerCase();
    const matches = browsing
        ? COUNTRIES
        : COUNTRIES.filter((country) => country.toLowerCase().includes(trimmed));

    useEffect(() => {
        setQuery(value);
    }, [value]);

    useEffect(() => {
        if (!open) return;
        const onPointer = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onPointer);
        return () => document.removeEventListener("mousedown", onPointer);
    }, [open]);

    return (
        <div ref={rootRef} className="relative">
            <input
                id={id}
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-autocomplete="list"
                autoComplete="country-name"
                value={query}
                placeholder="Search for a country"
                onChange={(event) => {
                    setQuery(event.target.value);
                    onChange("");
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className={inputClass}
                aria-invalid={invalid}
                aria-describedby={invalid ? `${id}-error` : undefined}
            />
            {open && matches.length > 0 && (
                <ul
                    id={listId}
                    role="listbox"
                    data-lenis-prevent
                    className="absolute z-20 bottom-[calc(100%+4px)] inset-x-0 m-0 p-1.5 list-none rounded-2xl border border-hairline bg-paper shadow-float max-h-48 overflow-y-auto"
                >
                    {matches.map((country) => (
                        <li key={country}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={country === value}
                                className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-ink-800 cursor-pointer hover:bg-paper-muted"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                    onChange(country);
                                    setQuery(country);
                                    setOpen(false);
                                }}
                            >
                                {country}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null;
    return (
        <p id={`${id}-error`} className="text-xs text-rose-700 m-0">
            {message}
        </p>
    );
}

function SelectField({
    field,
    values,
    errors,
    onChange,
    onCustom,
}: {
    field: InquirySelectField;
    values: Values;
    errors: Errors;
    onChange: (value: string | string[]) => void;
    onCustom: (value: string) => void;
}) {
    const listId = useId();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const selected = values[field.id];
    const showCustom = isOtherSelected(field, values);

    useEffect(() => {
        if (!field.multiple || !open) return;
        const onPointer = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onPointer);
        return () => document.removeEventListener("mousedown", onPointer);
    }, [field.multiple, open]);

    const customInput = showCustom ? (
        <input
            id={customKey(field.id)}
            value={String(values[customKey(field.id)] ?? "")}
            onChange={(event) => onCustom(event.target.value)}
            placeholder="Add your own"
            className={inputClass}
            aria-invalid={Boolean(errors[customKey(field.id)])}
            aria-describedby={errors[customKey(field.id)] ? `${customKey(field.id)}-error` : undefined}
        />
    ) : null;

    if (field.multiple) {
        const chosen = Array.isArray(selected) ? selected : [];
        const summary = chosen.length > 0 ? chosen.join(", ") : "Choose platforms";
        const toggle = (option: string) => {
            const next = chosen.includes(option)
                ? chosen.filter((item) => item !== option)
                : [...chosen, option];
            onChange(next);
        };

        return (
            <div ref={rootRef} className="relative flex flex-col gap-2">
                <button
                    id={field.id}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls={listId}
                    onClick={() => setOpen((current) => !current)}
                    className={`${inputClass} flex items-center justify-between gap-3 text-left cursor-pointer ${chosen.length === 0 ? "text-ink-300" : ""
                        }`}
                >
                    <span className="truncate">{summary}</span>
                    <span className="text-ink-300 text-xs shrink-0" aria-hidden="true">
                        ▾
                    </span>
                </button>
                {open && (
                    <ul
                        id={listId}
                        role="listbox"
                        aria-multiselectable="true"
                        className="absolute z-10 top-[calc(100%+4px)] inset-x-0 m-0 p-1.5 list-none rounded-2xl border border-hairline bg-paper shadow-float"
                    >
                        {(field.allowOther === false ? field.options : [...field.options, OTHER]).map((option) => {
                            const checked = chosen.includes(option);
                            return (
                                <li key={option}>
                                    <label className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs text-ink-800 cursor-pointer hover:bg-paper-muted">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggle(option)}
                                            className="accent-link"
                                        />
                                        {option}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {customInput}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="relative">
                <select
                    id={field.id}
                    value={String(selected ?? "")}
                    onChange={(event) => onChange(event.target.value)}
                    className={`${inputClass} appearance-none pr-8`}
                    aria-invalid={Boolean(errors[field.id])}
                    aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                >
                    <option value="">Choose one</option>
                    {field.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                    {field.allowOther === false ? null : <option value={OTHER}>{OTHER}</option>}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 text-[10px]">
                    ▾
                </span>
            </div>
            {customInput}
        </div>
    );
}

export default function InquiryModal({
    open,
    onClose,
    eyebrow,
    title,
    description,
    submitLabel,
    subject,
    sections,
    scheduleUrl,
}: InquiryContent & {
    open: boolean;
    onClose: () => void;
    scheduleUrl?: string;
}) {
    const titleId = useId();
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    const [mounted, setMounted] = useState(false);
    const [values, setValues] = useState<Values>(() => emptyValues(sections));
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;
        setValues(emptyValues(sections));
        setErrors({});
        setSubmitted(false);
        const { body, documentElement } = document;
        const previousBody = body.style.overflow;
        const previousHtml = documentElement.style.overflow;
        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        document.addEventListener("keydown", onKey);
        return () => {
            body.style.overflow = previousBody;
            documentElement.style.overflow = previousHtml;
            document.removeEventListener("keydown", onKey);
        };
    }, [open, sections]);

    if (!mounted || !open) return null;

    const update = (id: string, value: string | string[]) => {
        setValues((current) => ({ ...current, [id]: value }));
        setErrors((current) => {
            const next = { ...current };
            delete next[id];
            return next;
        });
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validate(sections, values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        const emailField = sections.flatMap((section) => section.fields).find((field) => field.type === "email");
        const email = emailField ? String(values[emailField.id] ?? "").trim() : "";

        if (scheduleUrl) {
            const url = new URL(scheduleUrl);
            if (email) url.searchParams.set("email", email);
            sections
                .flatMap((section) => section.fields)
                .filter((field) => field.type !== "email")
                .forEach((field, index) => {
                    url.searchParams.set(`a${index + 1}`, displayValue(field, values));
                });
            window.location.href = url.toString();
        } else {
            const body = sections
                .flatMap((section) => [
                    section.title,
                    ...section.fields.map((field) => `${field.label}: ${displayValue(field, values)}`),
                    "",
                ])
                .join("\n");

            window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
                `Sysgrate enquiry — ${subject}`,
            )}&body=${encodeURIComponent(body)}`;
        }
        setSubmitted(true);
    };

    return createPortal(
        <div data-lenis-prevent className="fixed inset-0 z-80 flex items-end sm:items-center justify-center p-4 sm:p-8">
            <button
                type="button"
                className="absolute inset-0 bg-black/25 backdrop-blur-md cursor-default"
                aria-label="Close form"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative z-10 flex w-full max-w-md min-h-0 max-h-[min(32rem,calc(100vh-2.5rem))] flex-col overflow-hidden rounded-card border border-hairline bg-paper shadow-float"
            >
                <div className="flex shrink-0 items-start justify-between gap-3 px-4 pt-4 pb-2">
                    <div className="flex flex-col gap-1">
                        {
                            eyebrow?.length > 0 &&
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-paper-muted text-[10px] font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                                {eyebrow}
                            </span>
                        }
                        <h2 id={titleId} className="text-lg font-medium text-ink-800 m-0 leading-tight">
                            {title}
                        </h2>
                        <p className="text-xs leading-relaxed text-text-secondary m-0">{description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 w-7 h-7 rounded-full border border-hairline text-ink-800 inline-flex items-center justify-center hover:bg-paper-muted cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>

                {submitted ? (
                    <div className="flex flex-col gap-2 px-4 pb-4">
                        <h3 className="text-sm font-medium text-ink-800 m-0">
                            {scheduleUrl ? "Opening the scheduler." : "Message sent, we'll get back to you."}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed m-0">
                            {scheduleUrl
                                ? "Your answers are attached to the booking page so the specialist has them before the call."
                                : `Your email app should have opened with this message addressed to ${SALES_EMAIL}. Send it from there and the right specialist will pick it up.`}
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-1 text-xs font-medium text-link hover:text-link-hover w-fit cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
                        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3">
                            <div className="flex flex-col gap-4">
                            {sections.map((section) => (
                                <fieldset key={section.title} className="m-0 p-0 border-0 flex flex-col gap-2.5">
                                    <legend className="text-[10px] font-medium tracking-[0.08em] uppercase text-text-secondary/70 mb-0.5">
                                        {section.title}
                                    </legend>
                                    {section.fields.map((field) => (
                                        <div key={field.id} className="flex flex-col gap-1.5">
                                            <FieldLabel id={field.id}>{field.label}</FieldLabel>
                                            {field.type === "select" ? (
                                                <SelectField
                                                    field={field}
                                                    values={values}
                                                    errors={errors}
                                                    onChange={(value) => update(field.id, value)}
                                                    onCustom={(value) => update(customKey(field.id), value)}
                                                />
                                            ) : field.type === "textarea" ? (
                                                <textarea
                                                    id={field.id}
                                                    name={field.id}
                                                    rows={4}
                                                    placeholder={field.placeholder}
                                                    value={String(values[field.id] ?? "")}
                                                    onChange={(event) => update(field.id, event.target.value)}
                                                    className="w-full min-h-24 resize-y rounded-2xl border border-hairline bg-paper px-3.5 py-2.5 text-xs text-ink-800 outline-none transition-shadow placeholder:text-ink-300 focus-visible:border-link focus-visible:shadow-[var(--ring-focus)]"
                                                    aria-invalid={Boolean(errors[field.id])}
                                                    aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                                                />
                                            ) : field.type === "country" ? (
                                                <CountryField
                                                    id={field.id}
                                                    value={String(values[field.id] ?? "")}
                                                    invalid={Boolean(errors[field.id])}
                                                    onChange={(value) => update(field.id, value)}
                                                />
                                            ) : (
                                                <input
                                                    id={field.id}
                                                    name={field.id}
                                                    type={field.type}
                                                    autoComplete={field.autoComplete}
                                                    value={String(values[field.id] ?? "")}
                                                    onChange={(event) => update(field.id, event.target.value)}
                                                    className={inputClass}
                                                    aria-invalid={Boolean(errors[field.id])}
                                                    aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                                                />
                                            )}
                                            <FieldError id={field.id} message={errors[field.id]} />
                                            {field.type === "select" ? (
                                                <FieldError id={customKey(field.id)} message={errors[customKey(field.id)]} />
                                            ) : null}
                                        </div>
                                    ))}
                                </fieldset>
                            ))}
                            </div>
                        </div>
                        <div className="shrink-0 border-t border-hairline px-4 py-3">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-surface-inverse text-white text-xs font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all w-fit cursor-pointer"
                            >
                                {submitLabel}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>,
        document.body,
    );
}
