"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Activity, ChartColumn, Compass, Database, EyeOff, MicOff, PenTool, Phone, ScrollText, ShieldCheck, Sparkles, TrendingUp, Unplug, type LucideIcon } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PillCta } from "@/components/services/PillCta";

const contact = "/contact";

const STATS = [
    { value: "100%", label: "Call recording coverage", note: "Up from 0% on SIM-based setup" },
    { value: "↑30%", label: "Agent productivity improvement", note: "Typical Zoom Phone + ZRA benchmark" },
    { value: "Real-time", label: "SAP C4C data sync", note: "Zero manual post-call data entry" },
    { value: "↓40%", label: "Reporting overhead reduced", note: "Automated vs. manual log compilation" },
];

const DROPS: { label: string; status: string }[] = [
    { label: "Call recording", status: "Never captured" },
    { label: "Call log", status: "Fragmented" },
    { label: "SAP C4C", status: "Not synced" },
    { label: "Reporting", status: "No data in" },
];

const CHALLENGES: { title: string; body: string; icon: LucideIcon }[] = [
    {
        title: "Calls lived on personal SIMs",
        body: "Agents dialled from their own mobiles, with no centralised call management, recording, or audit trail.",
        icon: Phone,
    },
    {
        title: "Logs no one could trust",
        body: "Call records were fragmented, so leaders could not track activity, volume, or conversation quality.",
        icon: ScrollText,
    },
    {
        title: "Nothing was recorded",
        body: "With zero call recording, quality assurance and compliance monitoring could not be enforced.",
        icon: MicOff,
    },
    {
        title: "SAP C4C never heard the call",
        body: "Agents updated the CRM by hand, and only sometimes, so customer records stayed incomplete.",
        icon: Unplug,
    },
    {
        title: "Coaching ran on self-reporting",
        body: "Performance was whatever agents said they did, leaving blind spots across the sales funnel.",
        icon: EyeOff,
    },
    {
        title: "No picture of the campaign",
        body: "There was no reporting layer for outbound performance or coaching decisions.",
        icon: ChartColumn,
    },
];

const APPROACH: { title: string; body: string; icon: LucideIcon }[] = [
    {
        title: "Discover & Define",
        body: "Mapped Brigade's outbound sales workflow, reviewed SAP C4C data dependencies, and locked in compliance, recording, and reporting requirements before touching any technology.",
        icon: Compass,
    },
    {
        title: "Evaluate & Design",
        body: "Assessed enterprise telephony platforms against Brigade's scale and SAP integration needs — selecting Zoom Phone with ZRA, then designing a custom middleware architecture for bi-directional CRM data flow.",
        icon: PenTool,
    },
    {
        title: "Deploy & Measure",
        body: "Rolled out in phases to protect live sales operations — validating CRM sync accuracy and recording coverage at each stage before full go-live.",
        icon: Activity,
    },
];

const SOLUTION: { eyebrow: string; title: string; body: string; image: string; alt: string; points: string[]; icon: LucideIcon }[] = [
    {
        eyebrow: "Cloud telephony",
        title: "Cloud telephony architecture replacing SIM-based mobile calling",
        icon: Phone,
        body: "Designed a cloud-first telephony environment using Zoom Phone as the enterprise UCaaS layer — replacing fragmented SIM-based devices with a centralised, policy-managed calling platform. Architecture accounted for agent distribution across multiple cities, call routing logic, IVR configuration, and compliance recording policies at the tenant level.",
        image: "/practice-areas/modern-workplace.jpg",
        alt: "Modern workplace ready for centralised cloud calling",
        points: [
            "Zoom Phone tenant provisioning and dial plan configuration",
            "Outbound calling policies and call queue design",
            "Compliance-grade call recording is enabled across all agent extensions",
        ],
    },
    {
        eyebrow: "Bespoke integration",
        title: "Custom middleware layer connecting Zoom Phone to SAP C4C",
        icon: Unplug,
        body: "Developed a purpose-built middleware integration that bi-directionally connected Zoom Phone's API with Brigade's SAP C4C (Cloud for Customer) CRM. This removed the dependency on manual data entry and ensured every call event — initiated, completed, missed, or transferred — was automatically reflected in the customer record.",
        image: "/services/platform-systems-integration.jpg",
        alt: "Systems integration work connecting telephony and CRM",
        points: [
            "Real-time call event capture via Zoom Phone Webhooks",
            "Automated activity logging and contact association within SAP C4C",
            "Call recording URLs and metadata synced directly to CRM opportunity records",
            "Error handling and retry logic built into the middleware to ensure zero data loss",
        ],
    },
    {
        eyebrow: "Technology development",
        title: "Zoom Revenue Accelerator (ZRA) — AI conversation intelligence layer",
        icon: Activity,
        body: "Deployed Zoom Revenue Accelerator on top of Zoom Phone to introduce AI-powered conversation intelligence into Brigade's telemarketing operations. ZRA provided automated transcription, sentiment analysis, keyword tracking, and structured coaching insights — giving managers a data-driven view of every sales conversation without manual review.",
        image: "/practice-areas/artificial-intelligence.jpg",
        alt: "Conversation intelligence layered onto live sales calls",
        points: [
            "Automatic call transcription and AI-generated call summaries",
            "Sentiment scoring and talk-to-listen ratio analytics per agent",
            "Keyword and topic tracking aligned to Brigade's sales script and objection patterns",
            "Manager dashboards with coaching flags and performance trend visualisation",
        ],
    },
    {
        eyebrow: "CX process automation",
        title: "End-to-end outbound sales workflow automation",
        icon: ChartColumn,
        body: "Automated the post-call workflow to eliminate manual processes that were creating data gaps and slowing agent throughput. Every interaction — from call initiation to follow-up scheduling — was captured, logged, and surfaced within the tools agents and managers already used.",
        image: "/practice-areas/customer-experience.jpg",
        alt: "Customer experience team running an automated outbound workflow",
        points: [
            "Automated follow-up task creation in SAP C4C triggered by call disposition",
            "Call outcome tagging and disposition mapping to CRM pipeline stages",
            "Reporting dashboards for outbound call volumes, connection rates, and team performance",
        ],
    },
];

const OUTCOMES: { title: string; body: string; icon: LucideIcon }[] = [
    {
        title: "Complete call compliance from day one",
        body: "Every outbound interaction is now recorded, timestamped, and searchable — giving Brigade's compliance and quality teams an audit-ready record of all telemarketing activity for the first time.",
        icon: ShieldCheck,
    },
    {
        title: "AI coaching that scales across the team",
        body: "ZRA's conversation intelligence surfaces coaching insights automatically — sentiment trends, keyword triggers, and talk-to-listen ratios — so managers can develop agents based on data, not gut feel.",
        icon: Sparkles,
    },
    {
        title: "SAP C4C reflects every customer conversation",
        body: "With real-time middleware sync, pipeline data in SAP C4C is now complete and accurate. Sales managers make decisions based on verified interaction data — not agent self-reporting.",
        icon: Database,
    },
    {
        title: "Agents sell more. Admin is gone.",
        body: "Automated call logging, CRM sync, and follow-up task creation freed agents from post-call manual work — measurably increasing outbound call capacity and follow-up consistency across the team.",
        icon: TrendingUp,
    },
];

function BrokenSignal({ delay }: { delay: string }) {
    return (
        <div aria-hidden="true" className="relative mx-auto h-8 w-0.5 lg:mx-0 lg:h-0.5 lg:w-auto lg:min-w-0">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,#C9C4D6_0_4px,transparent_4px_9px)] lg:bg-[repeating-linear-gradient(90deg,#C9C4D6_0_5px,transparent_5px_11px)]" />
            <span
                className="absolute top-[42%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-link lg:hidden motion-safe:animate-[sg-signal-die-y_3.6s_ease-in-out_infinite]"
                style={{ animationDelay: delay }}
            />
            <span
                className="absolute top-1/2 left-[42%] hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-link lg:block motion-safe:animate-[sg-signal-die_3.6s_ease-in-out_infinite]"
                style={{ animationDelay: delay }}
            />
        </div>
    );
}

function ChallengeBoard() {
    return (
        <div data-reveal="rise" className="mt-8 rounded-panel border border-hairline bg-paper-muted p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:gap-x-4 lg:gap-y-3">
                <div className="rounded-card border border-hairline bg-paper p-5 lg:row-span-4">
                    <div className="flex items-center gap-3">
                        <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline grid place-items-center text-link">
                            <Phone size={18} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <div>
                            <p className="m-0 text-sm font-medium text-ink-800">Outbound call</p>
                            <p className="m-0 mt-0.5 text-xs text-ink-300">Personal SIM</p>
                        </div>
                    </div>
                    <div className="mt-5 flex h-8 items-end gap-1" aria-hidden="true">
                        {[0.45, 0.8, 1, 0.62, 0.9, 0.5, 0.74, 0.45, 0.8, 1, 0.62, 0.9, 0.5, 0.74, 0.45, 0.8, 1, 0.62, 0.9, 0.5, 0.74].map((height, index) => (
                            <span
                                key={index}
                                className="w-1 origin-bottom rounded-full bg-link/80 motion-safe:animate-[sg-bar_1.05s_ease-in-out_infinite]"
                                style={{ height: `${height * 100}%`, animationDelay: `${index * 0.12}s` }}
                            />
                        ))}
                    </div>
                    <p className="m-0 mt-4 text-sm leading-relaxed text-text-secondary">The conversation happens. The trail stops.</p>
                </div>
                {DROPS.map((drop, index) => (
                    <div key={drop.label} className="contents">
                        <BrokenSignal delay={`${index * 0.7}s`} />
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-hairline bg-paper/70 px-4 py-3">
                            <div>
                                <p className="m-0 text-sm font-medium text-ink-800">{drop.label}</p>
                                <p className="m-0 mt-0.5 text-xs text-ink-300">{drop.status}</p>
                            </div>
                            <span className="h-2 w-2 shrink-0 rounded-full bg-hairline" aria-hidden="true" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
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

function SolutionFilm() {
    const [active, setActive] = useState(0);
    const stepsRef = useRef<Array<HTMLElement | null>>([]);
    const trackRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const frame = SOLUTION[active];

    useEffect(() => {
        const nodes = stepsRef.current.filter((node): node is HTMLElement => node !== null);
        if (!nodes.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const hit = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!hit) return;
                const index = nodes.indexOf(hit.target as HTMLElement);
                if (index >= 0) setActive(index);
            },
            { rootMargin: "-30% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
        );
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        const frameNode = frameRef.current;
        if (!track || !frameNode) return;
        const offset = 104;
        let raf = 0;
        const update = () => {
            const trackTop = track.getBoundingClientRect().top;
            const max = Math.max(0, track.offsetHeight - frameNode.offsetHeight);
            const y = Math.max(0, Math.min(offset - trackTop, max));
            frameNode.style.transform = `translate3d(0, ${y}px, 0)`;
        };
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };
        update();
        document.addEventListener("scroll", onScroll, { passive: true, capture: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener("scroll", onScroll, { capture: true });
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    function focusStep(index: number) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        stepsRef.current[index]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }

    return (
        <div ref={trackRef} className="relative mt-10">
            <div ref={frameRef} className="absolute top-0 left-0 z-10 w-[42%] sm:w-[46%] will-change-transform">
                <div className="relative h-[min(62vh,560px)] overflow-hidden rounded-panel bg-paper-card shadow-chip">
                    {SOLUTION.map((item, index) => (
                        <Image
                            key={item.eyebrow}
                            src={item.image}
                            alt={index === active ? item.alt : ""}
                            fill
                            sizes="(min-width: 640px) 46vw, 42vw"
                            className={`object-cover transition-opacity duration-700 ease-out ${index === active ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-800/55 to-transparent p-4 pt-14 sm:p-6">
                        <p className="m-0 font-mono text-xs tracking-[0.14em] text-white/80">0{active + 1} / 0{SOLUTION.length}</p>
                        <p className="m-0 mt-2 text-[18px] sm:text-[22px] font-medium leading-tight text-white">{frame.eyebrow}</p>
                    </div>
                </div>
                <div className="mt-4 flex gap-2" role="tablist" aria-label="Solution workstreams">
                    {SOLUTION.map((item, index) => (
                        <button
                            key={item.eyebrow}
                            type="button"
                            role="tab"
                            aria-selected={index === active}
                            aria-label={item.eyebrow}
                            onClick={() => focusStep(index)}
                            className={`h-1 flex-1 rounded-full cursor-pointer transition-colors ${index === active ? "bg-link" : "bg-hairline hover:bg-ink-300"}`}
                        />
                    ))}
                </div>
            </div>

            <div className="ml-[46%] flex flex-col pl-4 sm:ml-[54%] sm:pl-10">
                {SOLUTION.map((item, index) => {
                    const Icon = item.icon;
                    const on = index === active;
                    return (
                        <article
                            key={item.title}
                            ref={(node) => {
                                stepsRef.current[index] = node;
                            }}
                            className={`border-t border-hairline py-8 transition-opacity duration-500 sm:min-h-[72vh] sm:py-10 ${on ? "opacity-100" : "opacity-40"}`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <span className="font-mono text-xs font-semibold tracking-[0.12em] text-ink-300">0{index + 1}</span>
                            </div>
                            <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0 mt-5">{item.eyebrow}</p>
                            <h3 className="text-[clamp(22px,2.4vw,36px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0 mt-3">{item.title}</h3>
                            <p className="text-[16px] leading-[1.65] text-text-secondary m-0 mt-4">{item.body}</p>
                            <ul className="m-0 mt-6 p-0 list-none flex flex-col gap-2.5">
                                {item.points.map((point) => (
                                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-800">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-link" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export function CaseStudyPage() {
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
                        <h1 className="text-[clamp(34px,4.2vw,56px)] font-normal leading-[1.12] tracking-[-0.03em] text-ink-800 m-0">
                            How Brigade&apos;s telemarketing team went from zero visibility to full{" "}
                            <span className="sg-highlight font-medium">AI-powered</span> conversation intelligence — without replacing their CRM.
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[640px]">
                            Brigade&apos;s outbound sales team was operating without call recording, logs, or reporting — running on SIM-based mobile calling with no integration to SAP C4C. Sysgrate replaced the legacy setup with Zoom Phone and Zoom Revenue Accelerator, connected to SAP C4C via a custom-built middleware layer — delivering full compliance, real-time CRM sync, and AI-driven sales coaching from day one.
                        </p>
                        <CallbackForm />
                    </div>
                    <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image
                            src="/practice-areas/employee-experience.jpg"
                            alt="Sales team collaborating across voice and CRM"
                            fill
                            priority
                            sizes="(min-width: 1024px) 46vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATS.map((stat) => (
                        <StatCard key={stat.label} value={stat.value} label={stat.label} source={stat.note} />
                    ))}
                </div>
                <div className="mt-8">
                    <PillCta cta={{ label: "Want results like these? Let's talk", href: contact }} />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        The challenge
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        A high-volume outbound sales team with no visibility into what was being said, logged, or followed up.
                    </h2>
                </div>
                <ChallengeBoard />
                <ul className="m-0 mt-5 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CHALLENGES.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                data-reveal="rise"
                                data-delay={index > 0 ? String(Math.min(index, 3)) : undefined}
                                className="rounded-card border border-hairline bg-paper p-5"
                            >
                                <span className="w-10 h-10 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <h3 className="text-[16px] font-medium text-ink-800 m-0 mt-4 leading-snug">{item.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">{item.body}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        The approach
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Modernise the calling layer. Integrate the CRM. Preserve what already works.
                    </h2>
                </div>
                <ol className="m-0 mt-10 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-5">
                    {APPROACH.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <li key={step.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                    </span>
                                    <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">0{index + 1}</span>
                                </div>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{step.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{step.body}</p>
                            </li>
                        );
                    })}
                </ol>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        The solution
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Four integrated workstreams. One cohesive outcome.
                    </h2>
                </div>
                <SolutionFilm />
                <div className="flex flex-wrap gap-3 mt-8">
                    <PillCta cta={{ label: "Discuss your integration requirements", href: contact }} />
                    <PillCta cta={{ label: "Download capability deck", href: contact }} variant="secondary" />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        The outcomes
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Full sales visibility. AI-powered coaching. A CRM that finally reflects reality.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    {OUTCOMES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7 hover:-translate-y-1 hover:shadow-card transition-all">
                                <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{item.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                            </article>
                        );
                    })}
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                    <PillCta cta={{ label: "Book a free consultation", href: contact }} />
                    <PillCta cta={{ label: "Download case study (PDF)", href: contact }} variant="secondary" />
                    <PillCta cta={{ label: "Talk to a Zoom specialist", href: contact }} variant="secondary" />
                </div>
            </section>
        </>
    );
}
