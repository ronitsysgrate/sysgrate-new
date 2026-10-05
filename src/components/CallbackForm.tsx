"use client";

import { useState, type FormEvent } from "react";

export function CallbackForm() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        if (!email.trim()) return;
        window.location.href = `mailto:sales@sysgrate.com?subject=${encodeURIComponent("Call back request")}&body=${encodeURIComponent(`Please call me back.\n\nEmail: ${email.trim()}`)}`;
        setSent(true);
    }

    if (sent) {
        return (
            <p className="text-sm text-ink-800 m-0">
                Callback requested for <strong className="font-semibold">{email}</strong>.
            </p>
        );
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-[560px]">
            <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                className="h-12 flex-1 rounded-full border border-hairline bg-paper px-5 text-sm text-ink-800 outline-none placeholder:text-ink-300 focus-visible:border-link focus-visible:shadow-[var(--ring-focus)]"
            />
            <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:-translate-y-0.5 transition-all cursor-pointer"
            >
                Get a call back
            </button>
        </form>
    );
}
