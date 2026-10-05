"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
    Activity,
    ArrowRight,
    BarChart3,
    Brain,
    Cable,
    Check,
    Cloud,
    Compass,
    Headset,
    Mic,
    PenTool,
    Unplug,
    Users,
    type LucideIcon,
} from "lucide-react";
import { CallbackForm } from "@/components/CallbackForm";
import InquiryModal from "@/components/inquiry/InquiryModal";
import { MIGRATION_GUIDE_INQUIRY } from "@/components/inquiry/migrationGuide";
import type { InquiryContent } from "@/components/inquiry/types";
import { PillCta } from "@/components/services/PillCta";

const AI_OVERVIEW_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Download AI capability overview",
    description: "Share your details and we'll send the AI capability overview to your work email.",
    submitLabel: "Get the overview",
    subject: "AI capability overview",
    sections: [
        {
            title: "Your details",
            fields: [
                { id: "name", label: "Name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
            ],
        },
    ],
};

const contact = { label: "Book a free assessment", href: "/contact" };
const services = { label: "Explore our services", href: "/services" };

type Capability = {
    title: string;
    lede: string;
    body: string;
    points: string[];
    icon: LucideIcon;
    image: { src: string; alt: string };
};

const CAPABILITIES: Capability[] = [
    {
        title: "Contact Lens",
        lede: "Conversational analytics & quality management",
        body: "Contact Lens uses machine learning to analyse every call and chat in real time — detecting customer sentiment, identifying compliance risks, and surfacing coaching opportunities for supervisors before the interaction even ends.",
        points: [
            "Real-time sentiment scoring and escalation alerts",
            "Automated call transcription — 100% of interactions, not samples",
            "Keyword and phrase detection for compliance monitoring",
            "AI-generated call summaries — reducing after-call work by up to 40%",
            "Custom quality evaluation forms linked to conversation data",
        ],
        icon: Headset,
        image: { src: "/services/managed-operations.jpg", alt: "Supervisors reviewing live contact centre activity" },
    },
    {
        title: "Amazon Lex",
        lede: "Conversational AI & intelligent self-service",
        body: "Amazon Lex brings the same deep learning technology behind Alexa to your contact centre — enabling natural language IVR, AI-powered chatbots, and intelligent self-service that understands intent, not just keywords.",
        points: [
            "Natural language understanding — no touch-tone menus required",
            "Multi-turn conversation handling across voice and chat",
            "Intent detection and entity extraction for context-aware routing",
            "Seamless escalation to human agent with full context preserved",
            "Supports 8+ languages — including English, Hindi, Arabic, and Malay",
        ],
        icon: Cloud,
        image: { src: "/practice-areas/customer-experience.jpg", alt: "A contact centre ready for conversational self-service" },
    },
    {
        title: "Amazon Bedrock & Generative AI",
        lede: "Generative AI for agent assistance & automation",
        body: "Amazon Bedrock brings foundation models into the contact centre — powering real-time agent assistance, knowledge base search, and automated post-call processing that reduces manual effort across the entire operation.",
        points: [
            "Real-time agent assist — surface relevant knowledge during live calls",
            "AI-generated post-call summaries and next-step recommendations",
            "Automated CRM data population from conversation content",
            "Generative AI for email and chat response drafting",
        ],
        icon: Brain,
        image: { src: "/practice-areas/artificial-intelligence.jpg", alt: "Specialist working with an AI-assisted service workspace" },
    },
    {
        title: "Voice ID",
        lede: "Biometric voice authentication",
        body: "Amazon Connect Voice ID uses machine learning to verify customer identity through their voice — eliminating the need for knowledge-based authentication questions and significantly reducing average handle time on inbound calls.",
        points: [
            "Passive voice enrolment during natural conversation",
            "Real-time identity verification — no questions, no friction",
            "Fraud risk detection and suspicious voice flagging",
            "Particularly high-value in BFSI and regulated environments",
        ],
        icon: Mic,
        image: { src: "/practice-areas/employee-experience.jpg", alt: "A specialist on a live voice conversation" },
    },
    {
        title: "Real-Time & Historical Analytics",
        lede: "Dashboards and reporting built for action, not just insight",
        body: "Amazon Connect provides real-time supervisor dashboards, historical reporting, and streaming analytics via Amazon Kinesis — feeding QuickSight, custom BI tools, or third-party analytics platforms with the contact data your business needs to make faster decisions.",
        points: [
            "Live queue, agent, and channel performance dashboards",
            "Kinesis data streams for real-time CRM and BI integration",
            "Custom historical reports aligned to your SLA and KPI framework",
            "Contact Lens insights embedded directly into supervisor views",
        ],
        icon: BarChart3,
        image: { src: "/services/platform-systems-integration.jpg", alt: "Operations data moving across connected systems" },
    },
    {
        title: "Customer Profiles & Wisdom",
        lede: "Single customer view and next-best-action intelligence",
        body: "Amazon Connect Customer Profiles unifies data from your CRM, order management, and business systems into a single customer view — surfaced to agents in real time. Connect Wisdom then surfaces relevant knowledge articles and suggested responses before the agent even needs to search.",
        points: [
            "Unified customer profile from Salesforce, HubSpot, SAP, and more",
            "Full interaction history across all channels in a single view",
            "AI-powered next-best-action recommendations during live calls",
            "Reduces agent research time and average handle time simultaneously",
        ],
        icon: Users,
        image: { src: "/services/strategy-advisory.jpg", alt: "A team reviewing a single customer view" },
    },
];

const OUTCOMES = [
    { value: "↓24%", label: "Reduction in inbound call volume via AI self-service" },
    { value: "↓15%", label: "Reduction in average handle time" },
    { value: "↓31%", label: "Reduction in subscription and usage costs vs legacy platforms" },
    { value: "↓60%", label: "Reduction in system administrator effort" },
];

const PROBLEMS = [
    {
        title: "Legacy platform migration",
        body: "Genesys, Avaya, Cisco, NICE, Five9 — we have the migration tooling and playbooks for every platform your team is trying to leave behind.",
        icon: Unplug,
    },
    {
        title: "No AI in your contact centre",
        body: "Virtual agents, sentiment analysis, and automated summaries are no longer future-state. We embed Contact Lens and Amazon Lex into every deployment as standard.",
        icon: Brain,
    },
    {
        title: "CRM data that doesn't reach agents",
        body: "Agents making decisions without customer context lose deals and lengthen calls. We build real-time CRM integration so every agent sees the full picture before they say hello.",
        icon: Users,
    },
];

const STEPS: {
    number: string;
    short: string;
    title: string;
    lede: string;
    body: string;
    icon: LucideIcon;
}[] = [
    {
        number: "01",
        short: "Strategy",
        title: "Strategy & Advisory",
        lede: "Discovery before deployment.",
        body: "We audit your current contact centre, map your call flows, assess CRM dependencies, and define success metrics — before any architecture or platform decisions are made.",
        icon: Compass,
    },
    {
        number: "02",
        short: "Design",
        title: "Solution Design & Delivery",
        lede: "Built for your business, not a template.",
        body: "Architecture design, IVR flow build, AI configuration, and full CRM integration — delivered using our pre-built tooling to go live 30–50% faster than DIY AWS deployment.",
        icon: PenTool,
    },
    {
        number: "03",
        short: "Integrate",
        title: "Platform & Systems Integration",
        lede: "Amazon Connect connected to your entire stack.",
        body: "Pre-built connectors and custom middleware. Your agents have full customer context before they say hello.",
        icon: Cable,
    },
    {
        number: "04",
        short: "Operate",
        title: "Managed Operations",
        lede: "24/7 management — long after go-live.",
        body: "Proactive monitoring, SLA-backed support, quarterly optimisation reviews, and continuous improvement. We stay accountable for the outcomes we committed to from day one.",
        icon: Activity,
    },
];

const INTEGRATIONS: { title: string; body: string; logo?: string }[] = [
    {
        title: "HubSpot CRM",
        body: "Screen pops, automatic call logging, contact timeline sync, and deal pipeline updates — triggered by every Amazon Connect interaction.",
    },
    {
        title: "Salesforce",
        body: "CTI adapter, Service Cloud Voice integration, case auto-creation, and real-time agent workspace embedded directly into Salesforce.",
        logo: "/partners/salesforce.svg",
    },
    {
        title: "Zendesk",
        body: "Ticket auto-creation, agent widget for call handling inside Zendesk, and full conversation sync with contact history preserved.",
        logo: "/partners/zendesk.webp",
    },
    {
        title: "ServiceNow",
        body: "Incident auto-creation, CMDB lookup during live calls, and workflow triggering based on call disposition and outcome.",
    },
    {
        title: "Amazon QuickSight",
        body: "Real-time and historical contact centre dashboards via Kinesis data streams — fully configurable to your SLA and KPI framework.",
        logo: "/partners/aws.png",
    },
    {
        title: "Microsoft Teams",
        body: "Expert finder, escalation routing, and agent collaboration directly from within the Amazon Connect agent workspace.",
        logo: "/partners/teams.png",
    },
];

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
        let started = false;
        const begin = () => {
            if (started) return;
            const rect = node.getBoundingClientRect();
            const view = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top >= view * 0.9 || rect.bottom <= 0) return;
            started = true;
            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min(1, (now - start) / 1200);
                const eased = 1 - (1 - progress) ** 3;
                setCurrent(Math.round(target * eased));
                if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        };
        begin();
        window.addEventListener("scroll", begin, { passive: true });
        window.addEventListener("resize", begin);
        return () => {
            window.removeEventListener("scroll", begin);
            window.removeEventListener("resize", begin);
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

function Eyebrow({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            {children}
        </span>
    );
}

const ANALYSIS_LINES = ["Every call.", "Every chat.", "Fully analysed.", "Automatically."];

function AiCapabilityStage() {
    const [active, setActive] = useState(0);
    const [inView, setInView] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const offering = CAPABILITIES[active];
    const Icon = offering.icon;

    useEffect(() => {
        const node = rootRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % CAPABILITIES.length);
        }, 7000);
        return () => window.clearInterval(timer);
    }, [inView, active]);

    return (
        <div
            ref={rootRef}
            className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] gap-5 lg:gap-8 items-start"
        >
            <div role="tablist" aria-label="Amazon Connect AI services" className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1">
                {CAPABILITIES.map((item, index) => {
                    const selected = index === active;
                    const TabIcon = item.icon;
                    return (
                        <button
                            key={item.title}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setActive(index)}
                            className={`relative shrink-0 lg:shrink text-left rounded-2xl border px-4 py-3 cursor-pointer transition-colors overflow-hidden ${
                                selected ? "border-link bg-paper shadow-chip" : "border-hairline bg-paper/70 hover:bg-paper"
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${selected ? "bg-link text-white" : "bg-paper-muted text-link"}`}>
                                    <TabIcon size={16} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-[11px] font-mono tracking-[0.08em] text-ink-300">0{index + 1}</span>
                                    <span className="block text-sm font-medium text-ink-800 leading-snug">{item.title}</span>
                                </span>
                            </span>
                            {selected ? (
                                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-hairline" aria-hidden="true">
                                    <span
                                        key={`${item.title}-${inView}`}
                                        className="block h-full origin-left bg-link motion-safe:animate-[sg-progress_7s_linear_forwards]"
                                        style={{ animationPlayState: !inView ? "paused" : "running" }}
                                    />
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <article
                key={offering.title}
                role="tabpanel"
                className="rounded-panel border border-hairline bg-paper overflow-hidden motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
            >
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    <div className="relative min-h-56 md:min-h-full bg-paper-card">
                        <Image src={offering.image.src} alt={offering.image.alt} fill sizes="(min-width: 768px) 28vw, 100vw" className="object-cover" />
                    </div>
                    <div className="p-7 md:p-8 flex flex-col gap-3">
                        <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                            <Icon size={18} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <h3 className="text-[clamp(22px,2.2vw,32px)] font-medium text-ink-800 m-0 leading-tight">{offering.title}</h3>
                        <p className="text-sm font-medium text-ink-800 m-0">{offering.lede}</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0">{offering.body}</p>
                        <ul className="m-0 mt-1 p-0 list-none flex flex-col gap-2">
                            {offering.points.map((point, index) => (
                                <li
                                    key={point}
                                    className="flex gap-3 text-sm leading-relaxed text-ink-800 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                                    style={{ animationDelay: `${80 + index * 50}ms` }}
                                >
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-link shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </article>
        </div>
    );
}

function AuditScene() {
    const checks = ["Current contact centre", "Call flow map", "Success metrics"];
    return (
        <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
            {checks.map((item, index) => (
                <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-paper border border-hairline px-4 py-3 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                    style={{ animationDelay: `${index * 90}ms` }}
                >
                    <span className="w-7 h-7 rounded-full bg-link text-white grid place-items-center shrink-0">
                        <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-ink-800">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function BuildScene() {
    const stages = [
        { label: "IVR flows", note: "Designed around your callers" },
        { label: "AI configuration", note: "Lex, Contact Lens, Bedrock" },
        { label: "CRM integration", note: "Context before hello" },
    ];
    return (
        <ol className="m-0 p-0 list-none">
            {stages.map((stage, index) => (
                <li
                    key={stage.label}
                    className="relative pl-9 pb-5 last:pb-0 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                    style={{ animationDelay: `${index * 90}ms` }}
                >
                    {index < stages.length - 1 ? <span className="absolute left-2.75 top-7 bottom-0 w-0.5 bg-link/25" aria-hidden="true" /> : null}
                    <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-link text-white text-[11px] font-mono grid place-items-center">
                        {index + 1}
                    </span>
                    <p className="m-0 text-sm font-medium text-ink-800">{stage.label}</p>
                    <p className="m-0 mt-0.5 text-xs text-text-secondary">{stage.note}</p>
                </li>
            ))}
        </ol>
    );
}

function StackScene() {
    const systems = ["Salesforce", "HubSpot", "Zendesk", "ServiceNow"];
    return (
        <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex flex-wrap justify-center gap-2">
                {systems.map((name, index) => (
                    <span
                        key={name}
                        className="rounded-full bg-paper border border-hairline px-3 py-1.5 text-xs font-medium text-ink-800 shadow-chip motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                        style={{ animationDelay: `${index * 70}ms` }}
                    >
                        {name}
                    </span>
                ))}
            </div>
            <span className="h-6 w-0.5 bg-link/40 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]" aria-hidden="true" />
            <span className="rounded-full bg-link text-white px-4 py-2 text-sm font-medium motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both] [animation-delay:280ms]">
                Amazon Connect
            </span>
        </div>
    );
}

function OpsScene() {
    return (
        <div className="rounded-2xl bg-paper border border-hairline p-4 flex flex-col gap-4 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]">
            <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-800">
                    <span className="w-2 h-2 rounded-full bg-[#cbf382] motion-safe:animate-[sg-live-dot_1.6s_ease-in-out_infinite]" aria-hidden="true" />
                    Live operations
                </span>
                <span className="text-xs font-mono text-ink-300">24/7</span>
            </div>
            <span className="inline-flex items-end gap-1 h-10" aria-hidden="true">
                {[18, 28, 40, 24, 36, 20, 32, 44, 26, 16, 20, 32, 44, 26, 16, 18, 28, 40, 24, 36, 20, 16].map((height, bar) => (
                    <span
                        key={bar}
                        className="w-1.5 rounded-full bg-link origin-bottom motion-safe:animate-[sg-bar_1.1s_ease-in-out_infinite]"
                        style={{ height, animationDelay: `${bar * 80}ms` }}
                    />
                ))}
            </span>
            <p className="m-0 text-xs leading-relaxed text-text-secondary">Monitoring, SLAs, and quarterly optimisation — still accountable after go-live.</p>
        </div>
    );
}

const STEP_SCENES = [AuditScene, BuildScene, StackScene, OpsScene];

function ProcessJourney() {
    const [active, setActive] = useState(0);
    const [inView, setInView] = useState(false);
    const [paused, setPaused] = useState(false);
    const [engaged, setEngaged] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const step = STEPS[active];
    const Scene = STEP_SCENES[active];
    const Icon = step.icon;

    useEffect(() => {
        const node = rootRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || paused || engaged) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % STEPS.length);
        }, 6500);
        return () => window.clearInterval(timer);
    }, [inView, paused, engaged, active]);

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        let next = active;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % STEPS.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active + STEPS.length - 1) % STEPS.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = STEPS.length - 1;
        else return;
        event.preventDefault();
        setEngaged(true);
        setActive(next);
        document.getElementById(`process-tab-${next}`)?.focus();
    };

    return (
        <div
            ref={rootRef}
            className="mt-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
            }}
            onPointerDown={() => setEngaged(true)}
        >
            <div
                role="tablist"
                aria-label="How we build Amazon Connect"
                onKeyDown={onKeyDown}
                className="relative grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
                {STEPS.map((item, index) => {
                    const selected = index === active;
                    const done = index < active;
                    const TabIcon = item.icon;
                    return (
                        <button
                            key={item.number}
                            id={`process-tab-${index}`}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            aria-controls="process-panel"
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(index)}
                            className="relative z-10 flex flex-col items-center text-center rounded-card px-3 pb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link/40"
                        >
                            {index < STEPS.length - 1 ? (
                                <span className="pointer-events-none absolute top-7 left-1/2 hidden h-0.5 w-[calc(100%+0.75rem)] -translate-y-1/2 overflow-hidden bg-hairline sm:block" aria-hidden="true">
                                    <span
                                        className={`block h-full origin-left bg-link transition-transform duration-500 ease-out ${
                                            index < active ? "scale-x-100" : "scale-x-0"
                                        }`}
                                    />
                                </span>
                            ) : null}
                            <span
                                className={`relative z-10 w-14 h-14 rounded-full grid place-items-center border-2 transition-all duration-300 ${
                                    selected
                                        ? "bg-link border-link text-white scale-110 shadow-[0_0_0_8px_rgba(74,62,146,0.12)]"
                                        : done
                                          ? "bg-paper border-link text-link"
                                          : "bg-paper border-hairline text-ink-300"
                                }`}
                            >
                                {selected ? (
                                    <>
                                        <span className="absolute inset-0 rounded-full border border-link opacity-40 motion-safe:animate-ping" aria-hidden="true" />
                                        <TabIcon size={18} strokeWidth={2} aria-hidden="true" />
                                    </>
                                ) : done ? (
                                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                                ) : (
                                    <span className="font-mono text-sm">{item.number}</span>
                                )}
                            </span>
                                <span className={`mt-3 text-sm font-medium leading-snug ${selected || done ? "text-ink-800" : "text-ink-300"}`}>
                                    {item.short}
                                </span>
                                <span className="mt-0.5 text-[11px] font-mono tracking-[0.08em] text-ink-300">{item.number}</span>
                            </button>
                        );
                    })}
            </div>

            <article
                id="process-panel"
                role="tabpanel"
                aria-labelledby={`process-tab-${active}`}
                className="mt-4 grid grid-cols-1 md:grid-cols-[minmax(220px,300px)_minmax(0,1fr)] rounded-panel border border-hairline bg-paper overflow-hidden shadow-chip"
            >
                <div
                    key={`${step.number}-scene`}
                    className="bg-paper-muted border-b md:border-b-0 md:border-r border-hairline p-6 md:p-7 flex flex-col justify-center gap-4 min-h-55 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                >
                    <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.08em] uppercase text-ink-300">
                        <Icon size={14} strokeWidth={2} aria-hidden="true" />
                        In this step
                    </span>
                    <Scene />
                </div>
                <div className="p-7 md:p-9 flex flex-col">
                    <div key={`${step.number}-copy`} className="motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]">
                        <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">{step.number}</span>
                        <h3 className="text-[clamp(22px,2.4vw,32px)] font-medium text-ink-800 m-0 mt-3 leading-tight">{step.title}</h3>
                        <p className="text-sm font-medium text-ink-800 m-0 mt-3">{step.lede}</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2 max-w-[62ch]">{step.body}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => setActive((current) => (current + STEPS.length - 1) % STEPS.length)}
                            className="inline-flex items-center h-11 px-5 rounded-full bg-paper border border-hairline text-ink-800 text-sm font-medium cursor-pointer hover:-translate-y-0.5 hover:shadow-chip transition-all"
                        >
                            Back
                        </button>
                        <span className="text-xs font-mono tracking-[0.08em] text-ink-300">
                            {step.number} / 04
                        </span>
                        <button
                            type="button"
                            onClick={() => setActive((current) => (current + 1) % STEPS.length)}
                            className="inline-flex items-center gap-2 h-11 pl-5 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium cursor-pointer hover:-translate-y-0.5 transition-transform"
                        >
                            {active === STEPS.length - 1 ? "Start again" : "Next step"}
                            <span className="w-7 h-7 rounded-full bg-white text-ink-800 inline-flex items-center justify-center">
                                <ArrowRight size={14} aria-hidden="true" />
                            </span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}

export function AmazonConnectPage() {
    const [guideOpen, setGuideOpen] = useState(false);
    const [overviewOpen, setOverviewOpen] = useState(false);

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
                        <Eyebrow>Amazon Connect</Eyebrow>
                        <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                            Seamless CX. Delivered with <span className="sg-highlight font-medium">Amazon Connect.</span>
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                            Cloud contact centre design, migration, AI integration, and 24/7 managed operations — by a certified AWS Service Delivery Partner with deep CRM integration expertise and a proven track record worldwide.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                            <PillCta cta={contact} />
                            <PillCta cta={services} variant="secondary" />
                        </div>
                    </div>
                    <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image
                            src="/practice-areas/customer-experience.jpg"
                            alt="Contact centre team handling customer conversations"
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
                    <article data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6 flex flex-col justify-between gap-4">
                        <Image src="/partners/aws.png" alt="" width={72} height={44} className="h-8 w-auto object-contain object-left" />
                        <p className="text-[18px] font-medium leading-snug text-ink-800 m-0">AWS Certified Service Delivery Partner</p>
                    </article>
                    {[
                        { value: "50+", label: "Contact centres deployed" },
                        { value: "6 wks", label: "Average go-live from day one" },
                        { value: "24/7", label: "Managed operations" },
                    ].map((stat, index) => (
                        <article key={stat.label} data-reveal="rise" data-delay={index + 1} className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0" aria-label={stat.value}>
                                <CountValue value={stat.value} />
                            </p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(28px,5vw,64px)] items-center">
                    <div data-reveal="rise" className="flex flex-col gap-4 max-w-[760px]">
                        <Eyebrow>What is Amazon Connect</Eyebrow>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            The Cloud Contact Center Built for Enterprise Scale
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Amazon Connect is AWS&apos;s omnichannel cloud contact center — built to deliver superior customer experiences at any scale. It combines AI, real-time analytics, and flexible routing in a single, pay-as-you-go platform.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Sysgrate is a certified Amazon Connect Service Delivery Partner — meaning we&apos;ve been validated by AWS for expertise in deploying and managing Amazon Connect solutions across industries.
                        </p>
                    </div>
                    <div data-reveal="rise" className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image
                            src="/services/solution-design-delivery.jpg"
                            alt="Delivery team in a modern contact centre"
                            fill
                            sizes="(min-width: 1024px) 46vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    {[
                        {
                            title: "No upfront infrastructure cost",
                            body: "Pure cloud: spin up a fully functional contact centre in hours. Pay per minute, per agent — never for capacity you're not using.",
                        },
                        {
                            title: "AI built in from day one.",
                            body: "Contact Lens, Amazon Lex, and Bedrock — native AI for sentiment analysis, virtual agents, and automated call summaries.",
                        },
                        {
                            title: "Connects to your entire stack.",
                            body: "Salesforce, HubSpot, Zendesk, ServiceNow — pre-built integrations that go live without months of custom development.",
                        },
                    ].map((item) => (
                        <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                        </article>
                    ))}
                </div>
                <div data-reveal="rise" className="mt-8">
                    <CallbackForm />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                    <h2 data-reveal="rise" className="text-[clamp(32px,4vw,56px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                        {ANALYSIS_LINES.map((line, index) => (
                            <span key={line} data-reveal="rise" data-delay={index || undefined} className="block">
                                {line}
                            </span>
                        ))}
                    </h2>
                    <div data-reveal="rise" data-delay="2" className="rounded-panel border border-hairline bg-paper-muted px-7 py-8 md:px-9 md:py-10 flex flex-col gap-6">
                        <span className="inline-flex items-end gap-1.5 h-14" aria-hidden="true">
                            {[10, 22, 36, 48, 32, 18, 40, 26, 14, 30, 16, 28, 44, 22, 36, 48, 32, 18, 40, 26, 14, 30, 16, 28, 44, 22, 36, 48, 32, 18, 40, 26, 14, 30, 16, 28, 44, 22, 36, 48, 32, 18, 40, 26, 14,].map((height, bar) => (
                                <span
                                    key={bar}
                                    className="w-1.5 rounded-full bg-link origin-bottom motion-safe:animate-[sg-bar_1.1s_ease-in-out_infinite]"
                                    style={{ height, animationDelay: `${bar * 90}ms` }}
                                />
                            ))}
                        </span>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Amazon Connect&apos;s native AI services — Contact Lens, Amazon Lex, Bedrock, and Voice ID — work together to surface intelligence that was previously buried in unstructured conversation data. In real time, for every agent, on every interaction.
                        </p>
                    </div>
                </div>
                <AiCapabilityStage />
                <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                    <PillCta cta={{ label: "Book an Amazon Connect AI demo", href: "/contact" }} />
                    <PillCta
                        cta={{ label: "Download AI capability overview", href: "/contact" }}
                        variant="secondary"
                        onClick={() => setOverviewOpen(true)}
                    />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {OUTCOMES.map((stat) => (
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0" aria-label={stat.value}>
                                <CountValue value={stat.value} />
                            </p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(28px,5vw,64px)] items-start">
                    <div data-reveal="rise" className="flex flex-col gap-4">
                        <Eyebrow>What we do</Eyebrow>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            Still running on Genesys, Avaya, or Cisco?
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-ink-800 m-0">
                            You&apos;re paying for yesterday&apos;s infrastructure to power today&apos;s customer experience.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Legacy platforms were built before AI, before omnichannel, and before the cloud changed what a contact centre could be. We help enterprises make the move — with zero disruption to live operations and a go-live timeline 30–50% faster than any DIY approach.
                        </p>
                        <div className="relative mt-2 aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                            <Image
                                src="/services/strategy-advisory.jpg"
                                alt="Team planning a contact centre migration"
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        {PROBLEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                                    <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                    </span>
                                    <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{item.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                                </article>
                            );
                        })}
                        <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3">
                            <PillCta cta={{ label: "See how we migrate legacy platforms", href: "/services/solution-design-delivery" }} />
                            <PillCta
                                cta={{ label: "Download migration guide", href: "/contact" }}
                                variant="secondary"
                                onClick={() => setGuideOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <Eyebrow>Our Process</Eyebrow>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        How We Build Your Amazon Connect Journey
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Every deployment follows a proven methodology refined across 50+ deployments. Every integration is built to production standards. And every managed service is backed by an SLA that matches the criticality of your contact centre to your business.
                    </p>
                </div>
                <ProcessJourney />
                <div data-reveal="rise" className="mt-8">
                    <CallbackForm />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Amazon Connect connects to your entire technology stack — with no custom development required.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Pre-built native integrations and Sysgrate-developed connectors for the most common enterprise stacks across the world.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {INTEGRATIONS.map((item) => (
                        <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7 flex flex-col gap-3">
                            {item.logo ? (
                                // Partner marks include SVG, which next/image does not optimize.
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.logo} alt="" className="h-8 w-auto object-contain object-left" />
                            ) : (
                                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-ink-300">{item.title}</span>
                            )}
                            <h3 className="text-[18px] font-medium text-ink-800 m-0">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0">{item.body}</p>
                        </article>
                    ))}
                </div>
                <div data-reveal="rise" className="flex flex-col sm:flex-row flex-wrap items-start gap-3 mt-8">
                    <PillCta cta={contact} />
                    <PillCta cta={{ label: "See client stories", href: "/case-studies" }} variant="secondary" />
                    <PillCta cta={{ label: "Talk to a specialist", href: "/contact" }} variant="secondary" />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel bg-paper-muted border border-hairline px-8 py-12 flex flex-col items-start gap-5">
                    <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal tracking-[-0.02em] text-ink-800 m-0">
                        Ready to Transform Your Contact Center?
                    </h2>
                    <PillCta cta={{ label: "Talk to a specialist", href: "/contact" }} />
                </div>
            </section>

            <InquiryModal open={guideOpen} onClose={() => setGuideOpen(false)} {...MIGRATION_GUIDE_INQUIRY} />
            <InquiryModal open={overviewOpen} onClose={() => setOverviewOpen(false)} {...AI_OVERVIEW_INQUIRY} />
        </>
    );
}
