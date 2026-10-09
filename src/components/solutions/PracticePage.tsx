"use client";

import { useEffect, useRef, useState } from "react";
import { CallbackForm } from "@/components/CallbackForm";
import Image from "next/image";
import Link from "next/link";
import { Activity, Cloud, CloudUpload, Compass, Headset, Layers, Link2, MessagesSquare, Phone, PhoneOutgoing, Puzzle, Shield, Sparkles, Waypoints, type LucideIcon } from "lucide-react";
import { type SolutionPage } from "@/content/solutions/pages";
import InquiryModal from "@/components/inquiry/InquiryModal";
import { CX_CONSULTATION_INQUIRY, CX_SPECIALIST_INQUIRY } from "@/components/inquiry/cxConsultation";
import { UC_ASSESSMENT_INQUIRY } from "@/components/inquiry/ucAssessment";
import { UcRepairGraphic } from "@/components/solutions/UcRepairGraphic";
import { WORKPLACE_OFFERING_ICONS } from "@/components/solutions/WorkplaceRooms";
import { WorkplaceDeliver } from "@/components/solutions/WorkplaceDeliver";

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

function statTrend(value: string): "up" | "down" | "steady" {
    if (value.includes("↑")) return "up";
    if (value.includes("↓")) return "down";
    return "steady";
}

const STAT_TRENDS = {
    up: {
        line: "M0 52 C 22 50, 34 44, 50 36 S 82 16, 106 12 S 138 6, 160 4",
        area: "M0 52 C 22 50, 34 44, 50 36 S 82 16, 106 12 S 138 6, 160 4 L160 64 L0 64 Z",
        stroke: "#3E3A97",
        wash: "#EEEDF8",
        ink: "#3E3A97",
    },
    down: {
        line: "M0 8 C 22 12, 36 22, 52 30 S 84 48, 108 52 S 140 58, 160 60",
        area: "M0 8 C 22 12, 36 22, 52 30 S 84 48, 108 52 S 140 58, 160 60 L160 64 L0 64 Z",
        stroke: "#9A6EAC",
        wash: "#F8F1F6",
        ink: "#7B5AA6",
    },
    steady: {
        line: "M0 34 C 26 30, 42 40, 64 36 S 102 28, 126 34 S 148 40, 160 34",
        area: "M0 34 C 26 30, 42 40, 64 36 S 102 28, 126 34 S 148 40, 160 34 L160 64 L0 64 Z",
        stroke: "#BDB5D4",
        wash: "#F6F3FB",
        ink: "#141414",
    },
} as const;

function StatCard({ value, label, source }: { value: string; label: string; source?: string }) {
    const trend = statTrend(value);
    const tone = STAT_TRENDS[trend];
    const gradientId = `stat-${trend}-${label.replace(/\W+/g, "").slice(0, 18)}`;

    return (
        <article
            data-reveal="rise"
            className="relative overflow-hidden rounded-card border border-hairline min-h-[176px] flex flex-col"
            style={{ background: `linear-gradient(180deg, #ffffff 0%, ${tone.wash} 100%)` }}
        >
            <div className="relative z-10 p-6 pb-16">
                <p
                    className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] m-0"
                    style={{ color: tone.ink }}
                    aria-label={value}
                >
                    <CountValue value={value} />
                </p>
                <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{label}</p>
                {source ? <p className="text-xs text-ink-300 m-0 mt-3">{source}</p> : null}
            </div>
            <svg
                viewBox="0 0 160 64"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 w-full"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={tone.stroke} stopOpacity="0.28" />
                        <stop offset="100%" stopColor={tone.stroke} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path className="sg-stat-fill" d={tone.area} fill={`url(#${gradientId})`} />
                <path
                    className="sg-stat-line"
                    d={tone.line}
                    fill="none"
                    stroke={tone.stroke}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    pathLength={1}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </article>
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
    const viewportRef = useRef<HTMLDivElement>(null);
    const unitRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(3);

    useEffect(() => {
        const viewport = viewportRef.current;
        const unit = unitRef.current;
        if (!viewport || !unit) return;

        const measure = () => {
            const unitWidth = unit.getBoundingClientRect().width;
            const viewWidth = viewport.getBoundingClientRect().width;
            if (unitWidth <= 0 || viewWidth <= 0) return;
            const next = Math.max(1, Math.ceil(viewWidth / unitWidth));
            setCount((current) => (current === next ? current : next));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [names]);

    if (names.length === 0) return null;

    const loops = Array.from({ length: count }, (_, index) => index);

    return (
        <div ref={viewportRef} className="sg-marquee relative overflow-hidden py-1">
            <div
                className={`sg-marquee-track sg-marquee-seamless items-center ${reverse ? "[animation-direction:reverse]" : ""}`}
                style={{ animationDuration: `${(reverse ? 68 : 52) * count}s` }}
            >
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        className={`sg-marquee-group ${copy === 1 ? "sg-marquee-clone" : ""}`}
                        aria-hidden={copy === 1}
                    >
                        {loops.map((loop) => (
                            <div
                                key={loop}
                                ref={copy === 0 && loop === 0 ? unitRef : undefined}
                                className="sg-marquee-unit"
                            >
                                {names.map((name) => (
                                    <PlatformChip key={`${copy}-${loop}-${name}`} name={name} />
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function OfferingMarquee({
    offerings,
}: {
    offerings: SolutionPage["offerings"];
}) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const unitRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(2);

    useEffect(() => {
        const viewport = viewportRef.current;
        const unit = unitRef.current;
        if (!viewport || !unit) return;

        const measure = () => {
            const unitWidth = unit.getBoundingClientRect().width;
            const viewWidth = viewport.getBoundingClientRect().width;
            if (unitWidth <= 0 || viewWidth <= 0) return;
            const next = Math.max(1, Math.ceil(viewWidth / unitWidth));
            setCount((current) => (current === next ? current : next));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [offerings]);

    if (offerings.length === 0) return null;

    const loops = Array.from({ length: count }, (_, index) => index);

    return (
        <div ref={viewportRef} className="sg-offering-rail relative overflow-hidden py-3 pb-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-linear-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-linear-to-l from-white to-transparent" />
            <div
                className="sg-practice-track"
                style={{ animationDuration: `${44 * count}s` }}
            >
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        className={`sg-marquee-group ${copy === 1 ? "sg-marquee-clone" : ""}`}
                        aria-hidden={copy === 1}
                    >
                        {loops.map((loop) => (
                            <div
                                key={loop}
                                ref={copy === 0 && loop === 0 ? unitRef : undefined}
                                className="sg-offering-unit"
                            >
                                {offerings.map((item, index) => (
                                    <OfferingCard
                                        key={`${copy}-${loop}-${item.title}`}
                                        item={item}
                                        index={index}
                                        clone={copy === 1}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

const OFFERING_TONES = [
    "from-[#fbfcfd] to-[#e8eef4]",
    "from-[#fffbfc] to-[#f4e8ec]",
    "from-[#fffcf8] to-[#f3ebe0]",
    "from-[#f8fbff] to-[#e4eef9]",
    "from-[#f9fbf9] to-[#e6efe8]",
    "from-[#fafafb] to-[#e8e9ee]",
];

function OfferingCard({
    item,
    index,
    clone,
}: {
    item: SolutionPage["offerings"][number];
    index: number;
    clone: boolean;
}) {
    const Icon = CX_OFFERING_ICONS[item.title] ?? UC_OFFERING_ICONS[item.title] ?? WORKPLACE_OFFERING_ICONS[item.title];
    const tone = OFFERING_TONES[index % OFFERING_TONES.length];

    return (
        <article className={`sg-offering-card bg-linear-to-br ${tone}`}>
            <div className="flex flex-col flex-1 gap-3.5 p-7">
                <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-300">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="w-11 h-11 rounded-2xl bg-white/80 border border-hairline inline-flex items-center justify-center text-link">
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed m-0 flex-1">{item.body}</p>
                <Link href="/contact" className="text-sm font-medium text-link hover:text-link-hover" tabIndex={clone ? -1 : undefined}>
                    Learn more →
                </Link>
            </div>
        </article>
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

function RoomNoteSection({ note }: { note: NonNullable<SolutionPage["roomNote"]> }) {
    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div data-reveal="rise" className="relative">
                <div className="relative overflow-hidden rounded-panel bg-paper-card shadow-chip aspect-4/5 sm:aspect-16/10 lg:aspect-[2/1] min-h-[320px]">
                    <Image
                        src={note.image.src}
                        alt={note.image.alt}
                        fill
                        sizes="(min-width: 1440px) 1312px, 100vw"
                        className="object-cover object-[center_30%]"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
                        style={{
                            background: "linear-gradient(180deg, rgba(38,32,90,0) 0%, rgba(38,32,90,0.34) 100%)",
                        }}
                    />
                </div>
                <div className="relative z-10 -mt-16 sm:-mt-24 lg:-mt-28 mx-3 sm:mx-8 lg:mx-auto lg:w-[min(100%,780px)]">
                    <div className="overflow-hidden rounded-panel border border-hairline bg-paper shadow-float">
                        <div aria-hidden="true" className="h-1.5 w-full" style={{ background: "var(--accent-gradient)" }} />
                        <div className="px-6 py-8 sm:px-10 sm:py-10">
                            <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                                {note.title}
                            </h2>
                            <p className="text-[18px] leading-[1.6] text-text-secondary m-0 mt-4">{note.body}</p>
                            <div className="mt-8">
                                <CallbackForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolveSection({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: string[] }) {
    const listRef = useRef<HTMLOListElement>(null);
    const [seen, setSeen] = useState<boolean[]>(() => steps.map(() => false));

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setSeen(steps.map(() => true));
            return;
        }

        const reveal = () => {
            const rect = list.getBoundingClientRect();
            const view = window.innerHeight || document.documentElement.clientHeight;
            const start = view * 0.78;
            const end = view * 0.32;
            const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
            const count = Math.ceil(progress * steps.length - 0.001);
            setSeen((current) => {
                const next = steps.map((_, index) => index < count);
                return current.every((value, index) => value === next[index]) ? current : next;
            });
        };

        reveal();
        window.addEventListener("scroll", reveal, { passive: true });
        window.addEventListener("resize", reveal);
        return () => {
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("resize", reveal);
        };
    }, [steps]);

    const revealed = seen.filter(Boolean).length;
    const progress = steps.length <= 1 ? 100 : (Math.max(revealed - 1, 0) / (steps.length - 1)) * 100;

    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div className="max-w-[640px] flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {title}
                </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-stretch gap-6 lg:gap-10">
                <div>
                    <ol ref={listRef} className="relative m-0 p-0 list-none flex flex-col gap-3">
                        <div aria-hidden="true" className="absolute left-[19px] top-5 bottom-5 w-px bg-hairline">
                            <div
                                className="w-full bg-[#3E3A97] transition-[height] duration-700 ease-out"
                                style={{ height: `${progress}%` }}
                            />
                        </div>
                        {steps.map((step, index) => {
                            const Icon = SOLVE_ICONS[index % SOLVE_ICONS.length];
                            const on = seen[index];
                            return (
                                <li
                                    key={step}
                                    data-cx-step={index}
                                    className={`relative grid grid-cols-[40px_1fr] items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-700 ease-out ${
                                        on
                                            ? "opacity-100 translate-y-0 border-hairline bg-paper shadow-chip"
                                            : "opacity-0 translate-y-3 border-transparent bg-transparent"
                                    }`}
                                    style={{ transitionDelay: on ? `${index * 70}ms` : "0ms" }}
                                >
                                    <span
                                        className={`w-10 h-10 rounded-full border inline-flex items-center justify-center transition-colors duration-500 ${
                                            on
                                                ? "bg-surface-inverse text-white border-surface-inverse"
                                                : "bg-paper text-ink-300 border-hairline"
                                        }`}
                                    >
                                        <Icon size={16} strokeWidth={2} aria-hidden="true" />
                                    </span>
                                    <p className="text-[16px] leading-snug text-ink-800 m-0">{step}</p>
                                </li>
                            );
                        })}
                    </ol>

                    <div className="mt-8 max-w-[480px]">
                        <CallbackForm />
                    </div>
                </div>

                <div className="relative min-h-[280px] lg:min-h-full rounded-panel overflow-hidden bg-paper-card shadow-chip">
                    <Image
                        src="/practice-areas/customer-experience.jpg"
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                    />
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
                        Results
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        {page.statsEyebrow}
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {page.stats.map((stat) => (
                        <StatCard key={stat.label} value={stat.value} label={stat.label} source={stat.source} />
                    ))}
                </div>
            </section>

            {page.roomNote ? <RoomNoteSection note={page.roomNote} /> : null}

            {showSolve ? (
                page.slug === "employee-experience" ? (
                    <UcSolveSection eyebrow={page.solveEyebrow} title={page.solveTitle} steps={page.solveBody} />
                ) : (
                    <SolveSection eyebrow={page.solveEyebrow} title={page.solveTitle} steps={page.solveBody} />
                )
            ) : null}

            <section className="pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="sg-container">
                    <div className="max-w-[760px] flex flex-col gap-4">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                            {page.deliverEyebrow}
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            {page.deliverTitle}
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">{page.deliverIntro}</p>
                    </div>
                </div>
                {page.slug === "modern-workplace" ? (
                    <WorkplaceDeliver offerings={page.offerings} />
                ) : (
                    <div data-reveal="rise" data-delay="1" className="mt-10">
                        <OfferingMarquee offerings={page.offerings} />
                    </div>
                )}
                <div className="sg-container flex flex-wrap gap-3 mt-8">
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
