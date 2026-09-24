"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PillCta } from "@/components/services/PillCta";
import { PLATFORMS, platformHref, type PlatformPage } from "@/content/platforms/pages";

const contact = "/contact";

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

export function PlatformIndex() {
    return (
        <section className="sg-container pt-[clamp(120px,16vw,168px)] pb-[clamp(64px,10vw,120px)]">
            <div className="max-w-[760px] flex flex-col gap-4 sg-animate-rise">
                <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                    The platforms we <span className="sg-highlight font-medium">deploy</span>, integrate, and run.
                </h1>
                <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                    Amazon Connect, Zoom, and Zendesk — delivered by certified specialists, connected to the rest of your stack, and managed after go-live.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                {PLATFORMS.map((page) => (
                    <Link
                        key={page.slug}
                        href={platformHref(page.slug)}
                        className="rounded-card border border-hairline bg-paper overflow-hidden no-underline hover:-translate-y-1 hover:shadow-card transition-all flex flex-col"
                    >
                        <div className="relative aspect-[16/10] bg-paper-card">
                            <Image src={page.image.src} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                        </div>
                        <div className="p-6 flex flex-col gap-2 flex-1">
                            <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">{page.eyebrow}</p>
                            <h2 className="text-[20px] font-medium text-ink-800 m-0 leading-snug">{page.name}</h2>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 flex-1">{page.summary}</p>
                            <span className="text-sm font-medium text-link mt-3">View platform →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export function PlatformView({ page }: { page: PlatformPage }) {
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

    return (
        <>
            <section className="sg-container pt-[clamp(120px,16vw,168px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(28px,5vw,64px)]">
                    <div className="flex flex-col items-start gap-5 sg-animate-rise">
                        <Link href="/platforms" className="text-sm font-medium text-link no-underline hover:text-link-hover">
                            ← Platform details
                        </Link>
                        <h1 className="text-[clamp(34px,4.2vw,56px)] font-normal leading-[1.1] tracking-[-0.03em] text-ink-800 m-0">
                            <Headline text={page.headline} highlight={page.highlight} />
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">{page.summary}</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <PillCta cta={{ label: page.primaryCta, href: contact }} />
                            <PillCta
                                cta={{
                                    label: page.secondaryCta,
                                    href: page.secondaryCta.toLowerCase().includes("stories") ? "/case-studies" : "/services",
                                }}
                                variant="secondary"
                            />
                        </div>
                    </div>
                    <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image src={page.image.src} alt={page.image.alt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
                    </div>
                </div>
            </section>

            <div className="sg-container pt-8">
                <nav aria-label="Platforms" className="flex flex-wrap gap-2">
                    {PLATFORMS.map((item) => {
                        const active = item.slug === page.slug;
                        return (
                            <Link
                                key={item.slug}
                                href={platformHref(item.slug)}
                                aria-current={active ? "page" : undefined}
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium no-underline transition-all ${
                                    active ? "bg-surface-inverse text-white" : "bg-paper border border-hairline text-text-secondary hover:text-ink-800"
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {page.stats.map((stat) => (
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0">{stat.value}</p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                            {stat.note ? <p className="text-xs text-ink-300 m-0 mt-2">{stat.note}</p> : null}
                        </article>
                    ))}
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">{page.introTitle}</h2>
                    {page.introBody.map((paragraph) => (
                        <p key={paragraph} className="text-[18px] leading-[1.6] text-text-secondary m-0">{paragraph}</p>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    {page.pillars.map((item) => (
                        <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">{page.capabilitiesTitle}</h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.capabilitiesIntro}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    {page.capabilities.map((item) => (
                        <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7 hover:-translate-y-1 hover:shadow-card transition-all">
                            <h3 className="text-[18px] font-medium text-ink-800 m-0">{item.title}</h3>
                            {item.lede ? <p className="text-sm font-medium text-ink-800 m-0 mt-2">{item.lede}</p> : null}
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">{item.body}</p>
                            {item.points ? (
                                <ul className="m-0 mt-4 p-0 list-none flex flex-col gap-2">
                                    {item.points.map((point) => (
                                        <li key={point} className="text-sm text-ink-800 leading-snug">{point}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </article>
                    ))}
                </div>
            </section>

            {page.process ? (
                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">{page.processTitle}</h2>
                        {page.processIntro ? <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.processIntro}</p> : null}
                    </div>
                    <ol className="m-0 mt-10 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-5">
                        {page.process.map((step, index) => (
                            <li key={step.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                                <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">0{index + 1}</span>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4">{step.title}</h3>
                                <p className="text-sm font-medium text-ink-800 m-0 mt-2">{step.lede}</p>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">{step.body}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            ) : null}

            {page.integrations ? (
                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">{page.integrationsTitle}</h2>
                        {page.integrationsIntro ? <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.integrationsIntro}</p> : null}
                    </div>
                    <ul className="m-0 mt-8 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {page.integrations.map((item) => (
                            <li key={item.title} className="rounded-2xl border border-hairline bg-paper px-5 py-4">
                                <p className="text-sm font-medium text-ink-800 m-0">{item.title}</p>
                                <p className="text-sm text-text-secondary leading-snug m-0 mt-1.5">{item.body}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {page.comparison ? (
                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">{page.comparison.title}</h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.comparison.intro}</p>
                    </div>
                    <div className="mt-8 overflow-x-auto rounded-card border border-hairline">
                        <table className="w-full min-w-[640px] border-collapse text-sm">
                            <thead>
                                <tr className="bg-paper-muted text-left">
                                    <th className="px-4 py-3 font-medium text-ink-800">Category</th>
                                    <th className="px-4 py-3 font-medium text-ink-800">Buying direct</th>
                                    <th className="px-4 py-3 font-medium text-ink-800">With Sysgrate</th>
                                    <th className="px-4 py-3 font-medium text-ink-800">Your advantage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {page.comparison.rows.map((row) => (
                                    <tr key={row.category} className="border-t border-hairline">
                                        <td className="px-4 py-3 font-medium text-ink-800">{row.category}</td>
                                        <td className="px-4 py-3 text-text-secondary">{row.direct}</td>
                                        <td className="px-4 py-3 text-ink-800">{row.sysgrate}</td>
                                        <td className="px-4 py-3 text-ink-800">{row.advantage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : null}

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel bg-paper-muted border border-hairline px-8 py-12 flex flex-col items-start gap-5">
                    <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal tracking-[-0.02em] text-ink-800 m-0">Ready to put {page.name} to work?</h2>
                    <PillCta cta={{ label: page.primaryCta, href: contact }} />
                </div>
            </section>
        </>
    );
}
