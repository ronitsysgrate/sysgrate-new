"use client";

import { useEffect, useRef, useState } from "react";
import { CallbackForm } from "@/components/CallbackForm";
import Image from "next/image";
import Link from "next/link";
import { Activity, Cloud, CloudUpload, Compass, Headset, Layers, Link2, MessagesSquare, Phone, PhoneOutgoing, Puzzle, Shield, Sparkles, Waypoints, type LucideIcon } from "lucide-react";
import { SOLUTION_PAGES, solutionHref, type SolutionPage } from "@/content/solutions/pages";
import InquiryModal from "@/components/inquiry/InquiryModal";
import { CX_CONSULTATION_INQUIRY, CX_SPECIALIST_INQUIRY } from "@/components/inquiry/cxConsultation";
import { UC_ASSESSMENT_INQUIRY } from "@/components/inquiry/ucAssessment";
import { UcRepairGraphic } from "@/components/solutions/UcRepairGraphic";
import { WORKPLACE_OFFERING_ICONS, WorkplaceRoom } from "@/components/solutions/WorkplaceRooms";

function CountValue({ value }: { value: string }) {
    const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
    const ref = useRef<HTMLSpanElement>(null);
    const [current, setCurrent] = useState(() => (match ? 0 : null));

    useEffect(() => {
        const parsed = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
        if (!parsed) return;
        const target = Number(parsed[2]);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setCurrent(target);
            return;
        }
        const node = ref.current;
        if (!node) return;
        let frame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                const duration = 1200;
                const tick = (now: number) => {
                    const progress = Math.min(1, (now - start) / duration);
                    const eased = 1 - (1 - progress) ** 3;
                    setCurrent(Math.round(target * eased));
                    if (progress < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.5 },
        );
        observer.observe(node);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    if (!match || current === null) return <>{value}</>;
    return (
        <span ref={ref}>
            {match[1]}
            {current}
            {match[3]}
        </span>
    );
}

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

function Pill({
    href,
    onClick,
    children,
    variant = "primary",
}: {
    href: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}) {
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
    if (onClick) {
        return (
            <button type="button" onClick={onClick} className={`${className} cursor-pointer`}>
                {inner}
            </button>
        );
    }
    if (href.startsWith("#") || href.startsWith("mailto:") || href.includes("#")) {
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

const SOLVE_ICONS: LucideIcon[] = [MessagesSquare, Waypoints, Compass, Layers];

function PlatformChip({ name, clone }: { name: string; clone?: boolean }) {
    const icon = platformIcon(name);
    return (
        <div className={`shrink-0 inline-flex items-center gap-3 h-16 pl-3 pr-5 rounded-2xl bg-paper border border-hairline shadow-chip ${clone ? "sg-marquee-clone" : ""}`}>
            <span className="w-10 h-10 rounded-xl bg-paper-muted border border-hairline inline-flex items-center justify-center overflow-hidden shrink-0">
                {icon ? (
                    <Image src={icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                ) : (
                    <span className="text-sm font-semibold text-link">{name.slice(0, 1)}</span>
                )}
            </span>
            <span className="text-sm font-medium text-ink-800 whitespace-nowrap">{name}</span>
        </div>
    );
}

function PlatformMarquee({ names, reverse }: { names: string[]; reverse?: boolean }) {
    if (names.length === 0) return null;
    return (
        <div className="sg-marquee relative overflow-hidden py-1">
            <div
                className={`sg-marquee-track items-center ${reverse ? "[animation-direction:reverse] [animation-duration:68s]" : ""}`}
            >
                {names.map((name) => (
                    <PlatformChip key={name} name={name} />
                ))}
                {names.map((name) => (
                    <PlatformChip key={`${name}-clone`} name={name} clone />
                ))}
            </div>
        </div>
    );
}

function PlatformsBand({ page }: { page: SolutionPage }) {
    const midpoint = Math.ceil(page.platforms.length / 2);
    const firstRow = page.platforms.length > 5 ? page.platforms.slice(0, midpoint) : page.platforms;
    const secondRow = page.platforms.length > 5 ? page.platforms.slice(midpoint) : [];

    return (
        <section id="platforms" className="pt-[clamp(64px,10vw,120px)] scroll-mt-32">
            <div data-reveal="rise" className="sg-container">
                <div className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        {page.platformsEyebrow}
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        {page.platformsTitle}
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.platformsIntro}</p>
                </div>
            </div>

            <div
                data-reveal="rise"
                data-delay="1"
                className="relative mt-10 py-6 overflow-hidden"
                style={{ background: "var(--panel-gradient)" }}
            >
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-linear-to-r from-[#F5F2FC] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-linear-to-l from-[#E6E0F4] to-transparent" />
                <div className="flex flex-col gap-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                    <PlatformMarquee names={firstRow} />
                    <PlatformMarquee names={secondRow} reverse />
                </div>
            </div>

            <div className="sg-container mt-8">
                <CallbackForm />
            </div>
        </section>
    );
}

function platformIcon(name: string) {
    const rules: [RegExp, string][] = [
        [/amazon connect|aws|lex|bedrock/i, "/partners/aws-mark.svg"],
        [/avaya/i, "/partners/avaya.png"],
        [/zoom/i, "/partners/zoom.png"],
        [/zendesk/i, "/partners/zendesk.webp"],
        [/salesforce/i, "/partners/salesforce.svg"],
        [/teams/i, "/partners/teams.png"],
        [/poly/i, "/partners/poly.png"],
        [/cisco|webex/i, "/partners/cisco.png"],
    ];
    return rules.find(([pattern]) => pattern.test(name))?.[1];
}

const CX_OFFERING_ICONS: Record<string, LucideIcon> = {
    "Cloud Contact Center": Cloud,
    "Omnichannel Engagement": MessagesSquare,
    "Conversational AI & Virtual Agents": Sparkles,
    "Workforce Engagement Management": Headset,
    "CRM & ITSM Integration": Link2,
    "Outbound Campaigns & Dialers": PhoneOutgoing,
};

const UC_OFFERING_ICONS: Record<string, LucideIcon> = {
    "UCaaS Design & Deployment": Phone,
    "Session Border Controller (SBC)": Shield,
    "PBX to Cloud Migration": CloudUpload,
    "Collaboration Platform Integration": Puzzle,
    "Managed UC Operations": Activity,
    "AI-Enhanced Collaboration": Sparkles,
};

function UcSolveSection({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: string[] }) {
    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div
                className="relative overflow-hidden rounded-panel border border-hairline/80 px-6 py-10 sm:px-10 sm:py-12"
                style={{ background: "var(--panel-gradient)" }}
            >
                <div className="pointer-events-none absolute -top-24 -right-16 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#E79AC0]/30 via-[#9A6EAC]/15 to-transparent blur-2xl" />
                <div className="relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
                    <div data-reveal="rise" className="flex flex-col gap-5 lg:sticky lg:top-32">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                            {eyebrow}
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            {title}
                        </h2>
                        {steps.map((step) => (
                            <p key={step} className="text-[18px] leading-[1.6] text-text-secondary m-0">
                                {step}
                            </p>
                        ))}
                        <CallbackForm />
                    </div>
                    <UcRepairGraphic />
                </div>
            </div>
        </section>
    );
}

function SolveSection({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: string[] }) {
    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div
                className="relative overflow-hidden rounded-panel border border-hairline/80 px-6 py-10 sm:px-10 sm:py-12"
                style={{ background: "var(--panel-gradient)" }}
            >
                <div className="pointer-events-none absolute -top-24 -right-16 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#E79AC0]/30 via-[#9A6EAC]/15 to-transparent blur-2xl" />
                <div className="relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
                    <div data-reveal="rise" className="flex flex-col gap-5 lg:sticky lg:top-32">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                            {eyebrow}
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            {title}
                        </h2>
                        <CallbackForm />
                    </div>

                    <ol className="relative m-0 p-0 list-none flex flex-col gap-4">
                        <div
                            data-reveal="line"
                            aria-hidden="true"
                            className="absolute left-[19px] top-6 bottom-6 w-px bg-hairline"
                        />
                        {steps.map((step, index) => {
                            const Icon = SOLVE_ICONS[index % SOLVE_ICONS.length];
                            return (
                                <li
                                    key={step}
                                    data-reveal="rise"
                                    data-delay={index > 0 ? String(Math.min(index, 3)) : undefined}
                                    className="relative pl-14"
                                >
                                    <span className="absolute left-0 top-5 w-10 h-10 rounded-full bg-paper border border-hairline shadow-chip inline-flex items-center justify-center text-link">
                                        <Icon size={16} strokeWidth={2} />
                                    </span>
                                    <article className="rounded-card border border-hairline bg-paper/90 p-5 shadow-chip backdrop-blur-sm">
                                        <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-300 m-0">
                                            {String(index + 1).padStart(2, "0")}
                                        </p>
                                        <p className="text-[16px] leading-[1.6] text-text-secondary m-0 mt-2">{step}</p>
                                    </article>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}

export function PracticePage({ page }: { page: SolutionPage }) {
    const [consultOpen, setConsultOpen] = useState(false);
    const [specialistOpen, setSpecialistOpen] = useState(false);
    const [ucOpen, setUcOpen] = useState(false);
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
                            {page.slug === "solutions" ? (
                                <Pill href={page.primaryCta.href} onClick={() => setConsultOpen(true)}>
                                    {page.primaryCta.label}
                                </Pill>
                            ) : page.slug === "employee-experience" ? (
                                <Pill href={page.primaryCta.href} onClick={() => setUcOpen(true)}>
                                    {page.primaryCta.label}
                                </Pill>
                            ) : (
                                <Pill href={page.primaryCta.href}>{page.primaryCta.label}</Pill>
                            )}
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

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        {page.statsEyebrow}
                    </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {page.stats.map((stat) => (
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0" aria-label={stat.value}>
                                <CountValue value={stat.value} />
                            </p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                            {stat.source ? <p className="text-xs text-ink-300 m-0 mt-3">{stat.source}</p> : null}
                        </article>
                    ))}
                </div>
                {page.roomNote ? (
                    <div data-reveal="rise" className="max-w-[900px] mt-10">
                        <h2 className="text-[clamp(26px,3.2vw,40px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            {page.roomNote.title}
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 mt-4">{page.roomNote.body}</p>
                        <div className="mt-8">
                            <CallbackForm />
                        </div>
                    </div>
                ) : null}
            </section>

            {showSolve ? (
                page.slug === "employee-experience" ? (
                    <UcSolveSection eyebrow={page.solveEyebrow} title={page.solveTitle} steps={page.solveBody} />
                ) : (
                    <SolveSection eyebrow={page.solveEyebrow} title={page.solveTitle} steps={page.solveBody} />
                )
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
                    {page.offerings.map((item, index) => {
                        const Icon = CX_OFFERING_ICONS[item.title] ?? UC_OFFERING_ICONS[item.title] ?? WORKPLACE_OFFERING_ICONS[item.title];
                        const showRoom = page.slug === "modern-workplace";
                        return (
                            <article
                                key={item.title}
                                data-reveal="rise"
                                className={`rounded-card border border-hairline bg-paper flex flex-col h-full hover:-translate-y-1 hover:shadow-card transition-all ${showRoom ? "overflow-hidden" : "p-7"}`}
                            >
                                {showRoom ? <WorkplaceRoom title={item.title} /> : null}
                                <div className={showRoom ? "p-7 flex flex-col flex-1" : "contents"}>
                                    {Icon ? (
                                        <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                            <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">0{index + 1}</span>
                                    )}
                                    <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{item.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5 flex-1">{item.body}</p>
                                    <Link href="/contact" className="text-sm font-medium text-link hover:text-link-hover mt-4">
                                        Learn more →
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                    {page.midCtas.map((cta, index) => (
                        <Pill
                            key={cta.label}
                            href={cta.href}
                            variant={index === 0 ? "primary" : "secondary"}
                            onClick={cta.label === "Talk to a CX specialist" ? () => setSpecialistOpen(true) : undefined}
                        >
                            {cta.label}
                        </Pill>
                    ))}
                </div>
            </section>

            <PlatformsBand page={page} />

            <section id="client-stories" className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)] scroll-mt-32">
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
            {page.slug === "solutions" ? (
                <>
                    <InquiryModal
                        open={consultOpen}
                        onClose={() => setConsultOpen(false)}
                        scheduleUrl={process.env.NEXT_PUBLIC_CALENDLY_URL || undefined}
                        {...CX_CONSULTATION_INQUIRY}
                    />
                    <InquiryModal
                        open={specialistOpen}
                        onClose={() => setSpecialistOpen(false)}
                        {...CX_SPECIALIST_INQUIRY}
                    />
                </>
            ) : null}
            {page.slug === "employee-experience" ? (
                <InquiryModal
                    open={ucOpen}
                    onClose={() => setUcOpen(false)}
                    {...UC_ASSESSMENT_INQUIRY}
                />
            ) : null}
        </>
    );
}
