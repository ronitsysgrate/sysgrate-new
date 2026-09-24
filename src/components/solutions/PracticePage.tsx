"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { SOLUTION_PAGES, solutionHref, type SolutionPage } from "@/content/solutions/pages";

function Headline({ text, highlight }: { text: string; highlight: string }) {
    const index = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, index)}
            <span className="sg-highlight font-medium">{text.slice(index, index + highlight.length)}</span>
            {text.slice(index + highlight.length)}
        </>
    );
}

function Pill({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
    const className =
        variant === "primary"
            ? "inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group"
            : "inline-flex items-center justify-center h-12 px-6 rounded-full bg-paper border border-hairline text-ink-800 text-sm font-medium shadow-sm hover:shadow-chip hover:-translate-y-0.5 transition-all";
    const inner =
        variant === "primary" ? (
            <>
                <span>{children}</span>
                <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                </span>
            </>
        ) : (
            <span>{children}</span>
        );
    if (href.startsWith("#") || href.startsWith("mailto:")) {
        return (
            <a href={href} className={className}>
                {inner}
            </a>
        );
    }
    return (
        <Link href={href} className={className}>
            {inner}
        </Link>
    );
}

function CallbackForm() {
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

function Subnav({ current }: { current: SolutionPage["slug"] }) {
    return (
        <div className="sg-container pt-6">
            <nav aria-label="Solutions" className="flex flex-wrap gap-2">
                {SOLUTION_PAGES.map((page) => {
                    const active = page.slug === current;
                    return (
                        <Link
                            key={page.slug}
                            href={solutionHref(page.slug)}
                            aria-current={active ? "page" : undefined}
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                active
                                    ? "bg-surface-inverse text-white"
                                    : "bg-paper border border-hairline text-text-secondary hover:text-ink-800"
                            }`}
                        >
                            {page.eyebrow}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export function PracticePage({ page }: { page: SolutionPage }) {
    useEffect(() => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const reveal = () => {
            const view = window.innerHeight || document.documentElement.clientHeight;
            nodes.forEach((node) => {
                if (node.classList.contains("is-in") || reduce) {
                    node.classList.add("is-in");
                    return;
                }
                const rect = node.getBoundingClientRect();
                if (rect.top < view * 0.92 && rect.bottom > 24) node.classList.add("is-in");
            });
        };
        reveal();
        window.addEventListener("scroll", reveal, { passive: true });
        window.addEventListener("resize", reveal);
        return () => {
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("resize", reveal);
        };
    }, []);

    const showSolve = page.solveTitle !== page.deliverTitle;

    return (
        <>
            <section className="sg-container pt-[clamp(120px,16vw,168px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(28px,5vw,64px)]">
                    <div className="flex flex-col items-start gap-5 sg-animate-rise">
                        <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                            <Headline text={page.headline} highlight={page.highlight} />
                        </h1>
                        {page.alternate ? (
                            <p className="text-[16px] leading-snug text-ink-800 m-0">{page.alternate}</p>
                        ) : null}
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">{page.summary}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                            <Pill href={page.primaryCta.href}>{page.primaryCta.label}</Pill>
                            <Pill href={page.secondaryCta.href} variant="secondary">
                                {page.secondaryCta.label}
                            </Pill>
                        </div>
                    </div>
                    <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image src={page.image.src} alt={page.image.alt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
                    </div>
                </div>
            </section>
            {page.alternateHero ? (
                <section className="sg-container pt-[clamp(48px,8vw,80px)]">
                    <div data-reveal="rise" className="rounded-panel border border-hairline bg-paper-muted px-8 py-10 sm:px-12 flex flex-col items-start gap-4">
                        <h2 className="text-[clamp(26px,3vw,40px)] font-normal tracking-[-0.02em] text-ink-800 m-0">
                            {page.alternateHero.title}
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[760px]">{page.alternateHero.body}</p>
                        <div className="flex flex-wrap gap-3">
                            {page.alternateHero.ctas.map((cta, index) => (
                                <Pill key={cta.label} href={cta.href} variant={index === 0 ? "primary" : "secondary"}>
                                    {cta.label}
                                </Pill>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        {page.statsEyebrow}
                    </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {page.stats.map((stat) => (
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0">{stat.value}</p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                            {stat.source ? <p className="text-xs text-ink-300 m-0 mt-3">{stat.source}</p> : null}
                        </article>
                    ))}
                </div>
            </section>

            {showSolve ? (
                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                            {page.solveEyebrow}
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            {page.solveTitle}
                        </h2>
                        {page.solveBody.map((paragraph) => (
                            <p key={paragraph} className="text-[18px] leading-[1.6] text-text-secondary m-0">
                                {paragraph}
                            </p>
                        ))}
                        <CallbackForm />
                    </div>
                </section>
            ) : null}

            {page.roomNote ? (
                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <p data-reveal="rise" className="text-[clamp(22px,2.4vw,32px)] font-normal leading-[1.35] tracking-[-0.02em] text-ink-800 m-0 max-w-[900px]">
                        {page.roomNote}
                    </p>
                    <div className="mt-8">
                        <CallbackForm />
                    </div>
                </section>
            ) : null}

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        {page.deliverEyebrow}
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        {page.deliverTitle}
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.deliverIntro}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {page.offerings.map((item, index) => (
                        <article
                            key={item.title}
                            data-reveal="rise"
                            className="rounded-card border border-hairline bg-paper p-7 flex flex-col h-full hover:-translate-y-1 hover:shadow-card transition-all"
                        >
                            <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">0{index + 1}</span>
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5 flex-1">{item.body}</p>
                            <Link href="/contact" className="text-sm font-medium text-link hover:text-link-hover mt-4">
                                Learn more →
                            </Link>
                        </article>
                    ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                    {page.midCtas.map((cta, index) => (
                        <Pill key={cta.label} href={cta.href} variant={index === 0 ? "primary" : "secondary"}>
                            {cta.label}
                        </Pill>
                    ))}
                </div>
            </section>

            <section id="platforms" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        {page.platformsEyebrow}
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        {page.platformsTitle}
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.platformsIntro}</p>
                </div>
                <ul className="m-0 mt-8 p-0 list-none flex flex-wrap gap-2">
                    {page.platforms.map((name) => (
                        <li key={name} className="px-4 py-2 rounded-full bg-paper border border-hairline text-sm font-medium text-ink-800">
                            {name}
                        </li>
                    ))}
                </ul>
                <div className="mt-8">
                    <CallbackForm />
                </div>
            </section>

            {page.capabilities ? (
                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <h2 data-reveal="rise" className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        {page.capabilities.title}
                    </h2>
                    <ul className="m-0 mt-8 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {page.capabilities.items.map((item) => (
                            <li key={item} className="rounded-2xl border border-hairline bg-paper px-4 py-3 text-sm text-ink-800">
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8">
                        <CallbackForm />
                    </div>
                </section>
            ) : null}

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <h2 data-reveal="rise" className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    Related client stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                    {page.stories.map((story, index) => (
                        <article key={`${page.slug}-${index}`} className="rounded-card border border-hairline bg-paper overflow-hidden flex flex-col">
                            <div className="h-36 bg-paper-card flex items-end p-5">
                                <span className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300">Case visual</span>
                            </div>
                            <div className="p-6 flex flex-col gap-2 flex-1">
                                {story.sector ? (
                                    <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">{story.sector}</p>
                                ) : null}
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">{story.title}</h3>
                                {story.body !== "Read" ? (
                                    <p className="text-sm text-text-secondary leading-relaxed m-0">{story.body}</p>
                                ) : null}
                                <Link href="/#case-studies" className="text-sm font-medium text-link hover:text-link-hover mt-auto pt-3">
                                    Read the story →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                    {page.closeLinks.map((cta, index) => (
                        <Pill key={cta.label} href={cta.href} variant={index === 0 ? "primary" : "secondary"}>
                            {cta.label}
                        </Pill>
                    ))}
                </div>
            </section>
        </>
    );
}
