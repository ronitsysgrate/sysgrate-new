"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Activity, Bot, Brain, Cable, Compass, Headphones, PenTool, Phone, Sparkles, Video, type LucideIcon } from "lucide-react";
import { CallbackForm } from "@/components/CallbackForm";
import InquiryModal from "@/components/inquiry/InquiryModal";
import type { InquiryContent } from "@/components/inquiry/types";
import { PillCta } from "@/components/services/PillCta";

const AI_OVERVIEW_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Download AI capability overview",
    description: "Share your details and we'll send the AI capability overview to your work email.",
    submitLabel: "Get the overview",
    subject: "Zoom AI capability overview",
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

type Product = {
    title: string;
    lede: string;
    body: string;
    points: string[];
    icon: LucideIcon;
    image: { src: string; alt: string };
};

const PRODUCTS: Product[] = [
    {
        title: "Zoom Contact Center",
        lede: "An AI-native omnichannel contact centre — voice, video, chat, email, SMS, and social unified in a single agent workspace.",
        body: "Unlike legacy CCaaS platforms, Zoom Contact Center is built on the same infrastructure as Zoom's collaboration suite — giving agents a consistent experience and making CX and UC convergence genuinely possible.",
        points: [
            "Omnichannel routing — voice, video, chat, email, SMS, social",
            "Native AI with generative AI summaries and real-time assist",
            "Built-in WFM and quality management — no third-party add-on required",
            "Supervisor dashboards with real-time queue and agent analytics",
            "Seamless CRM integration — Salesforce, HubSpot, Zendesk, ServiceNow",
            "Skills-based routing, IVR, and intelligent deflection built in",
        ],
        icon: Headphones,
        image: { src: "/practice-areas/customer-experience.jpg", alt: "Agents handling customer conversations in one workspace" },
    },
    {
        title: "Zoom Virtual Agent",
        lede: "Zoom's AI-powered virtual agent resolves customer queries across chat and voice — 24 hours a day, without human intervention.",
        body: "Unlike scripted chatbots, Zoom Virtual Agent uses natural language understanding to handle complex, multi-turn conversations and escalates to a live agent with full context when human intervention is genuinely needed.",
        points: [
            "Natural language understanding — not keyword matching",
            "Multi-turn conversation handling across voice and digital channels",
            "Seamless escalation to Zoom Contact Center with context preserved",
            "Intent detection and entity extraction for intelligent routing",
            "Generative AI-powered responses from your knowledge base",
            "Multilingual — English, Hindi, Arabic, Malay, and more",
        ],
        icon: Bot,
        image: { src: "/practice-areas/artificial-intelligence.jpg", alt: "Specialist working with an AI-assisted service workspace" },
    },
    {
        title: "Zoom Phone",
        lede: "Enterprise cloud telephony that replaces on-premise PBX — delivering voice calling, call recording, voicemail transcription, and AI-powered conversation intelligence across every device and location.",
        body: "Zoom Phone integrates natively with Zoom's collaboration suite, making UC and CX convergence seamless for enterprises managing both internal communications and customer-facing teams.",
        points: [
            "Cloud PBX replacement — no hardware, no planned downtime",
            "Zoom Revenue Accelerator — AI conversation intelligence for sales teams",
            "Call recording with AI transcription and automated summaries",
            "Auto-attendant, call queues, hunt groups, and IVR",
            "Works on desktop, mobile, and desk phone — any device, anywhere",
            "Direct Routing and PSTN calling across 50+ countries",
        ],
        icon: Phone,
        image: { src: "/practice-areas/modern-workplace.jpg", alt: "A workplace set up for cloud calling" },
    },
    {
        title: "Zoom Workplace",
        lede: "Zoom's AI-powered collaboration suite — combining meetings, team chat, whiteboard, and calendar in a single application.",
        body: "Zoom AI Companion is embedded throughout, providing meeting summaries, action item extraction, chat composition, and conversation intelligence without additional licensing or integration work.",
        points: [
            "AI-powered meeting summaries and action item extraction",
            "Persistent team chat with AI composition and thread summarisation",
            "Collaborative whiteboard for hybrid brainstorming and workshops",
            "Smart scheduling with AI calendar intelligence",
            "Zoom Rooms integration for meeting room video conferencing",
            "Works natively with Zoom Phone and Zoom Contact Center",
        ],
        icon: Video,
        image: { src: "/practice-areas/employee-experience.jpg", alt: "Teams collaborating in a meeting" },
    },
];

const AI_LAYERS = [
    {
        title: "AI Companion",
        lede: "Meeting & chat intelligence",
        body: "Auto-summaries, action item extraction, and chat thread summarisation — across every meeting and conversation, without a separate AI licence.",
        icon: Sparkles,
    },
    {
        title: "Agent Assist",
        lede: "Real-time agent guidance",
        body: "Surfaces relevant knowledge articles, suggested responses, and next-best-action recommendations to agents during live customer interactions — reducing AHT and improving first-contact resolution.",
        icon: Headphones,
    },
    {
        title: "Revenue Accelerator",
        lede: "Sales conversation intelligence",
        body: "AI-powered call coaching for sales and telemarketing teams — with talk-to-listen ratios, sentiment scoring, keyword tracking, and automated call summaries synced to your CRM.",
        icon: Brain,
    },
];

const OUTCOMES = [
    { value: "↓30%", label: "Reduction in average handle time with Zoom AI assist", note: "Zoom platform benchmark" },
    { value: "↑25%", label: "Agent productivity improvement with ZRA coaching", note: "Sysgrate deployment data" },
    { value: "100%", label: "Interaction coverage with AI quality management", note: "vs. 2–5% sampled QA" },
    { value: "1 app", label: "Replaces phone, contact centre, meetings, and chat", note: "vs. 4+ disconnected tools" },
];

const CERTS = ["Contact Center", "Phone", "Virtual Agent", "Workplace"];

const STEPS: {
    number: string;
    title: string;
    lede: string;
    body: string;
    icon: LucideIcon;
}[] = [
    {
        number: "01",
        title: "Strategy & Advisory",
        lede: "Platform selection before platform purchase.",
        body: "We help enterprises evaluate the right Zoom products for their specific CX and UC requirements — with a business case, TCO analysis, and implementation roadmap before any licence is committed.",
        icon: Compass,
    },
    {
        number: "02",
        title: "Solution Design & Delivery",
        lede: "Configured for your business. Deployed without disruption.",
        body: "Full Zoom deployment — tenant provisioning, dial plan design, contact flow build, AI configuration, and user onboarding — delivered using our accelerators and playbooks for faster go-live.",
        icon: PenTool,
    },
    {
        number: "03",
        title: "Platform & Systems Integration",
        lede: "Zoom connected to your entire stack.",
        body: "CRM, ITSM, analytics, and HR platforms — integrated with Zoom Contact Center and Zoom Phone so every agent has full context and every interaction is automatically logged.",
        icon: Cable,
    },
    {
        number: "04",
        title: "Managed Operations",
        lede: "24/7 management — ongoing, not one-off.",
        body: "SLA-backed monitoring, proactive support, and quarterly optimisation reviews. We stay accountable for the outcomes we commit to — not just the deployment milestone.",
        icon: Activity,
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

function ZoomDelivery() {
    const listRef = useRef<HTMLOListElement>(null);
    const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [progress, setProgress] = useState(0);
    const [reached, setReached] = useState(-1);
    const [shown, setShown] = useState(-1);
    const [reduced, setReduced] = useState(false);
    const [track, setTrack] = useState({ top: 46, height: 1 });

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) setReduced(true);

        let frame = 0;
        const update = () => {
            frame = 0;
            const list = listRef.current;
            if (!list) return;
            const viewport = window.innerHeight;
            const line = viewport * 0.55;
            const rect = list.getBoundingClientRect();
            const first = nodeRefs.current[0];
            const last = nodeRefs.current[STEPS.length - 1];
            if (first && last) {
                const firstBox = first.getBoundingClientRect();
                const lastBox = last.getBoundingClientRect();
                const start = firstBox.top + firstBox.height / 2 - rect.top;
                const end = lastBox.top + lastBox.height / 2 - rect.top;
                const height = Math.max(1, end - start);
                setTrack((current) =>
                    Math.abs(current.top - start) < 0.5 && Math.abs(current.height - height) < 0.5
                        ? current
                        : { top: start, height },
                );
                if (!reduce) setProgress(Math.min(1, Math.max(0, (line - rect.top - start) / height)));
            }

            if (reduce) {
                setProgress(1);
                setReached(STEPS.length - 1);
                setShown(STEPS.length - 1);
                return;
            }

            let lastReached = -1;
            let lastShown = -1;
            nodeRefs.current.forEach((node, index) => {
                if (!node) return;
                const box = node.getBoundingClientRect();
                const center = box.top + box.height / 2;
                if (center < line) lastReached = index;
                if (box.top < viewport * 0.9) lastShown = index;
            });
            setReached(lastReached);
            setShown((current) => Math.max(current, lastShown));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const active = reached < 0 ? 0 : reached;
    const activeStep = STEPS[active];

    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(28px,5vw,64px)] items-start">
                <div data-reveal="rise" className="flex flex-col gap-4 lg:sticky lg:top-32">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        How Sysgrate delivers Zoom
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        We are a Zoom Platinum Partner — certified across Contact Center, Phone, Virtual Agent, and Workplace. As one of Zoom&apos;s highest-tier partners, Sysgrate deploys, integrates, and manages the full Zoom suite — with the certifications, delivery methodology, and regional presence to make every engagement perform from day one.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {CERTS.map((cert, index) => (
                            <span
                                key={cert}
                                data-reveal="rise"
                                data-delay={index > 0 ? String(Math.min(index, 3)) : undefined}
                                className="rounded-full border border-hairline bg-paper px-3 py-1.5 text-xs font-medium text-ink-800"
                            >
                                {cert}
                            </span>
                        ))}
                    </div>
                    <div className="relative mt-2 aspect-4/3 lg:aspect-video rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <div
                            className="absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
                            style={reduced ? undefined : { transform: `scale(${1 + progress * 0.08})` }}
                        >
                            <Image
                                src="/services/platform-systems-integration.jpg"
                                alt="Specialists connecting Zoom to the rest of the business"
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-ink-800/60 via-ink-800/10 to-transparent" />
                        <div
                            key={activeStep.number}
                            className="absolute bottom-5 left-5 right-5 flex items-center gap-3 motion-safe:animate-[sg-rise_0.4s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                        >
                            <span className="w-10 h-10 rounded-full bg-white text-ink-800 grid place-items-center font-mono text-xs font-semibold shrink-0">
                                {activeStep.number}
                            </span>
                            <span className="text-white text-sm font-medium leading-snug">{activeStep.title}</span>
                        </div>
                    </div>
                </div>

                <ol ref={listRef} className="relative m-0 p-0 list-none flex flex-col gap-4">
                    <div
                        aria-hidden="true"
                        className="absolute left-5.5 w-0.5 -translate-x-1/2 rounded-full bg-hairline"
                        style={{ top: track.top, height: track.height }}
                    >
                        <div
                            className="relative h-full w-full origin-top bg-link transition-transform duration-150 ease-out motion-reduce:transition-none"
                            style={{ transform: `scaleY(${progress})` }}
                        >
                            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-link ring-4 ring-white" />
                        </div>
                    </div>
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isReached = index <= reached;
                        const isCurrent = index === reached;
                        const isShown = index <= shown;
                        return (
                            <li key={step.number} className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                                <div className="flex justify-center pt-6">
                                    <span
                                        ref={(node) => {
                                            nodeRefs.current[index] = node;
                                        }}
                                        className={`relative z-10 w-11 h-11 rounded-full grid place-items-center border-2 transition-all duration-500 ${
                                            isCurrent
                                                ? "scale-110 bg-link border-link text-white shadow-[0_0_0_8px_rgba(74,62,146,0.12)]"
                                                : isReached
                                                  ? "bg-link border-link text-white"
                                                  : "bg-paper border-hairline text-ink-300"
                                        }`}
                                    >
                                        <Icon size={16} strokeWidth={2} aria-hidden="true" />
                                    </span>
                                </div>
                                <article
                                    className={`rounded-card border bg-paper p-6 sm:p-7 transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:opacity-100 motion-reduce:translate-x-0 ${
                                        isShown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                                    } ${isCurrent ? "border-link/40 shadow-card" : "border-hairline"}`}
                                >
                                    <span className={`text-xs font-semibold tracking-wider font-mono ${isReached ? "text-link" : "text-ink-300"}`}>
                                        {step.number}
                                    </span>
                                    <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-3">{step.title}</h3>
                                    <p className="text-sm font-medium text-ink-800 m-0 mt-2">{step.lede}</p>
                                    <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">{step.body}</p>
                                </article>
                            </li>
                        );
                    })}
                </ol>
            </div>
            <div data-reveal="rise" className="flex flex-col sm:flex-row flex-wrap items-start gap-3 mt-8">
                <PillCta cta={{ label: "Book a free Zoom consultation", href: "/contact" }} />
                <PillCta cta={{ label: "See client stories", href: "/case-studies" }} variant="secondary" />
                <PillCta cta={{ label: "Talk to a Zoom specialist", href: "/contact" }} variant="secondary" />
            </div>
        </section>
    );
}

const ZOOM_NODES: { label: string; icon: LucideIcon }[] = [
    { label: "Contact Center", icon: Headphones },
    { label: "Virtual Agent", icon: Bot },
    { label: "Phone", icon: Phone },
];

const TOOL_NODES: { label: string; logo?: string }[] = [
    { label: "Salesforce", logo: "/partners/salesforce.svg" },
    { label: "Microsoft Teams", logo: "/partners/teams.png" },
    { label: "Zendesk", logo: "/partners/zendesk.webp" },
    { label: "And more" },
];

function FlowLine({ vertical = false }: { vertical?: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={
                vertical
                    ? "relative mx-auto h-12 w-0.5 lg:hidden bg-[repeating-linear-gradient(180deg,#4A3E92_0_5px,transparent_5px_11px)] motion-safe:animate-[sg-dash-y_1.1s_linear_infinite]"
                    : "relative hidden h-0.5 w-full lg:block bg-[repeating-linear-gradient(90deg,#4A3E92_0_5px,transparent_5px_11px)] motion-safe:animate-[sg-dash_1.1s_linear_infinite]"
            }
        >
            <span
                className={
                    vertical
                        ? "absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-link motion-safe:animate-[sg-packet-y_2.4s_linear_infinite]"
                        : "absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-link motion-safe:animate-[sg-packet_2.4s_linear_infinite]"
                }
            />
            <span
                className={
                    vertical
                        ? "absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-link/70 motion-safe:animate-[sg-packet-y_2.4s_linear_0.8s_infinite_reverse]"
                        : "absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-link/70 motion-safe:animate-[sg-packet_2.4s_linear_0.8s_infinite_reverse]"
                }
            />
        </div>
    );
}

function IntegrationMap() {
    return (
        <div className="mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_52px_168px_52px_minmax(0,1fr)] lg:items-center lg:gap-4">
            <article data-reveal="rise" className="rounded-card border border-hairline bg-paper p-5 sm:p-6">
                <h3 className="text-center text-sm font-medium text-ink-800 m-0">Zoom platform</h3>
                <ul className="m-0 mt-5 p-0 list-none grid grid-cols-3 gap-3">
                    {ZOOM_NODES.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.label} className="flex flex-col items-center gap-2 text-center">
                                <span className="w-12 h-12 rounded-full bg-link text-white grid place-items-center">
                                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <span className="text-xs font-medium text-ink-800 leading-snug">{item.label}</span>
                            </li>
                        );
                    })}
                </ul>
            </article>

            <FlowLine vertical />
            <FlowLine />

            <div data-reveal="rise" data-delay="1" className="mx-auto justify-self-center w-full max-w-[200px] rounded-3xl bg-surface-inverse text-white px-4 py-6 text-center shadow-lift">
                <p className="m-0 text-[11px] tracking-[0.14em] uppercase text-white/65">Sysgrate</p>
                <p className="m-0 mt-1 text-[20px] font-medium leading-tight">Integration Fabric</p>
                <p className="m-0 mt-1 text-xs text-white/65">for Zoom</p>
            </div>

            <FlowLine vertical />
            <FlowLine />

            <article data-reveal="rise" data-delay="2" className="rounded-card border border-hairline bg-paper p-5 sm:p-6">
                <h3 className="text-center text-sm font-medium text-ink-800 m-0">Business tools</h3>
                <ul className="m-0 mt-5 p-0 list-none grid grid-cols-2 gap-4">
                    {TOOL_NODES.map((item) => (
                        <li key={item.label} className="flex flex-col items-center gap-2 text-center">
                            {item.logo ? (
                                <span className="w-12 h-12 rounded-2xl bg-paper-muted border border-hairline grid place-items-center">
                                    {/* Partner marks include SVG, which next/image does not optimize. */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.logo} alt="" className="h-6 w-6 object-contain" />
                                </span>
                            ) : (
                                <span className="w-12 h-12 rounded-2xl border border-dashed border-link/40 text-link grid place-items-center text-lg leading-none">+</span>
                            )}
                            <span className="text-xs font-medium text-ink-800 leading-snug">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    );
}

function Eyebrow({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            {children}
        </span>
    );
}

export function ZoomPage() {
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
                        <Eyebrow>Zoom</Eyebrow>
                        <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                            One platform. Smarter conversations. Powered by <span className="sg-highlight font-medium">Zoom.</span>
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                            Zoom brings contact centre, telephony, meetings, and collaboration into one platform—with a unified experience and built-in generative AI. Sysgrate, a Zoom Platinum Partner, delivers it end to end across the globe.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                            <PillCta cta={{ label: "Book a Zoom consultation", href: "/contact" }} />
                            <PillCta cta={{ label: "Explore the Zoom suite", href: "#zoom-suite" }} variant="secondary" />
                        </div>
                    </div>
                    <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image
                            src="/practice-areas/employee-experience.jpg"
                            alt="Teams collaborating across meetings and chat"
                            fill
                            priority
                            sizes="(min-width: 1024px) 46vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(28px,5vw,64px)] items-center">
                    <div data-reveal="rise" className="flex flex-col gap-4 max-w-[760px]">
                        <Eyebrow>What is Zoom</Eyebrow>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            Zoom unified communications - Voice, CX, collaboration, and AI
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            When most people think of Zoom, they think of video meetings. But the platform has evolved far beyond that. Today, Zoom provides a single cloud application for business telephony, contact centre, AI collaboration, webinars, virtual agents, and workforce management — all delivered through the same familiar interface your teams already use every day.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            For enterprises, that familiarity is a strategic advantage: lower training costs, higher adoption, and faster time to value than any multi-vendor alternative.
                        </p>
                    </div>
                    <div data-reveal="rise" className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image
                            src="/partners/zoom.png"
                            alt="Zoom"
                            fill
                            sizes="(min-width: 1024px) 40vw, 80vw"
                            className="object-contain p-16"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    {[
                        {
                            title: "One app. Not four platforms bolted together.",
                            body: "Contact centre, phone, meetings, and chat — all in a single application. Agents, employees, and supervisors use the same interface, reducing training time and increasing adoption from day one.",
                        },
                        {
                            title: "AI Companion — embedded, not added on.",
                            body: "Zoom AI Companion is built into every Zoom product — providing meeting summaries, real-time transcription, chat composition, and conversation intelligence without a separate AI licence or integration.",
                        },
                        {
                            title: "Cloud-native. Infinitely scalable.",
                            body: "No on-premise hardware. No per-seat infrastructure costs. Zoom scales instantly across geographies, languages, and channels — from a 10-person team to a 10,000-seat global operation.",
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

            <section id="zoom-suite" className="sg-container scroll-mt-32 pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Zoom powers every interaction in your enterprise.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-ink-800 m-0">From the first customer call to the last internal meeting</p>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Contact centre, AI virtual agents, enterprise phone, and workplace collaboration — a complete suite of products that share AI, analytics, and a common interface, reducing the complexity of running multiple platforms across your organisation.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
                    {PRODUCTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper overflow-hidden flex flex-col">
                                <div className="relative h-44 bg-paper-card">
                                    <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
                                </div>
                                <div className="p-7 flex flex-col gap-3 flex-1">
                                    <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                    </span>
                                    <h3 className="text-[20px] font-medium text-ink-800 m-0 leading-snug">{item.title}</h3>
                                    <p className="text-sm font-medium text-ink-800 m-0">{item.lede}</p>
                                    <p className="text-sm text-text-secondary leading-relaxed m-0">{item.body}</p>
                                    <ul className="m-0 mt-1 p-0 list-none flex flex-col gap-2">
                                        {item.points.map((point) => (
                                            <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-800">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-link shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <div data-reveal="rise" className="mt-8">
                    <PillCta cta={{ label: "Book a Zoom platform demo", href: "/contact" }} />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                        { title: "Zoom Contact Center", image: "/practice-areas/customer-experience.jpg", alt: "Contact centre floor" },
                        { title: "Zoom Phone", image: "/practice-areas/modern-workplace.jpg", alt: "Workplace ready for cloud calling" },
                    ].map((item) => (
                        <article key={item.title} data-reveal="rise" className="relative h-56 rounded-card overflow-hidden">
                            <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-ink-800/70 to-transparent" />
                            <h3 className="absolute bottom-6 left-6 right-6 text-[22px] font-medium text-white m-0">{item.title}</h3>
                        </article>
                    ))}
                </div>
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4 mt-10">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Generative AI built into every layer of the Zoom platform
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Zoom AI Companion is included with the platform — providing real-time meeting intelligence, agent assist, conversation summaries, and knowledge base search across Contact Center, Phone, and Workplace simultaneously.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    {AI_LAYERS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                                <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                </span>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4">{item.title}</h3>
                                <p className="text-sm font-medium text-ink-800 m-0 mt-2">{item.lede}</p>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                            </article>
                        );
                    })}
                </div>
                <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                    <PillCta cta={{ label: "Book a Zoom platform demo", href: "/contact" }} />
                    <PillCta
                        cta={{ label: "Download AI capability overview", href: "/contact" }}
                        variant="secondary"
                        onClick={() => setOverviewOpen(true)}
                    />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="mb-8">
                    <Eyebrow>What Zoom delivers</Eyebrow>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {OUTCOMES.map((stat) => (
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0" aria-label={stat.value}>
                                <CountValue value={stat.value} />
                            </p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                            <p className="text-xs text-ink-300 m-0 mt-3">{stat.note}</p>
                        </article>
                    ))}
                </div>
            </section>

            <ZoomDelivery />

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel bg-paper-muted border border-hairline px-5 py-10 sm:px-8 sm:py-12">
                    <div className="flex flex-col items-start gap-5 max-w-[760px]">
                        <Image src="/partners/zoom.png" alt="" width={120} height={48} className="h-10 w-auto object-contain" />
                        <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal tracking-[-0.02em] text-ink-800 m-0">
                            Sysgrate Integration Fabric for Zoom
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Sysgrate Integration Fabric for Zoom provides a secure, scalable layer to connect Zoom with your enterprise systems—supporting complex, real-world use cases.
                        </p>
                    </div>
                    <IntegrationMap />
                </div>
            </section>

            <InquiryModal open={overviewOpen} onClose={() => setOverviewOpen(false)} {...AI_OVERVIEW_INQUIRY} />
        </>
    );
}
