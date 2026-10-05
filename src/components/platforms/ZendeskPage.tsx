"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Activity, Bot, Brain, ChevronLeft, ChevronRight, Compass, Headset, Network, Pause, PenTool, Play, Search, Workflow, type LucideIcon } from "lucide-react";
import { CallbackForm } from "@/components/CallbackForm";
import InquiryModal from "@/components/inquiry/InquiryModal";
import type { InquiryContent } from "@/components/inquiry/types";
import { PillCta } from "@/components/services/PillCta";

const NUMBER_SOURCE = String.raw`\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?`;

function numberPattern() {
    return new RegExp(NUMBER_SOURCE, "g");
}

function downloadInquiry(title: string, subject: string): InquiryContent {
    return {
        eyebrow: "",
        title,
        description: `Share your details and we'll send the ${title.toLowerCase()} to your work email.`,
        submitLabel: "Get the download",
        subject,
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
}

const PLATFORM_OVERVIEW = downloadInquiry("Download platform overview", "Zendesk platform overview");
const COMPARISON_TABLE = downloadInquiry("Download comparison table", "Zendesk comparison table");

type Block = {
    short: string;
    title: string;
    lede: string;
    body: string;
    points: string[];
    icon: LucideIcon;
    image: { src: string; alt: string };
};

const PRODUCTS: Block[] = [
    {
        title: "Zendesk AI Agents",
        short: "AI Agents",
        lede: "Zendesk AI agents resolve customer issues autonomously across every channel — voice, chat, email, social, and messaging.",
        body: "Unlike scripted bots, they reason through complex queries, access live data, and take actions across connected systems. Powered by the Resolution Learning Loop, they improve with every interaction without manual retraining.",
        points: [
            "Automate up to 80% of customer interactions end-to-end",
            "Multi-step reasoning across complex, multi-turn conversations",
            "AI Agent Builder — no-code custom agent creation",
            "Federated search across knowledge bases and connected data sources",
            "Resolution Learning Loop — continuous self-improvement",
            "Forethought integration for advanced AI agent capabilities",
        ],
        icon: Bot,
        image: { src: "/practice-areas/artificial-intelligence.jpg", alt: "Specialist working with an AI-assisted support workspace" },
    },
    {
        title: "Zendesk Copilot",
        short: "Copilot",
        lede: "Zendesk Copilot is a proactive AI assistant embedded directly in the agent workspace — surfacing suggested responses, relevant knowledge articles, and next-best-action recommendations in real time, without agents leaving the ticket view.",
        body: "It's not a tool agents need to remember to use. It works continuously in the background, reducing cognitive load and handling time simultaneously.",
        points: [
            "Real-time response suggestions based on ticket context and history",
            "AI-generated ticket summaries — agents get context instantly",
            "Proactive knowledge article surfacing during live interactions",
            "Autonomous task execution — actions in Jira, Slack, and CRM systems",
            "AI Reasoning Controls — full transparency into AI decision-making",
        ],
        icon: Brain,
        image: { src: "/practice-areas/artificial-intelligence.jpg", alt: "Specialist working with an AI-assisted support workspace" },
    },
    {
        title: "Zendesk for Contact Centre",
        short: "Contact Centre",
        lede: "Zendesk's CCaaS platform — built natively on Zendesk, powered by AWS infrastructure — delivers AI-native voice alongside every digital channel in a single unified agent workspace.",
        body: "Real-time transcription, sentiment analysis, and automated after-call work are built in as standard, not optional extras.",
        points: [
            "AI-powered voice with real-time transcription and sentiment scoring",
            "Intelligent IVR — personalised and dynamic, not static touch-tone",
            "Predictive dialling and answering machine detection for outbound",
            "Automated after-call work — eliminates manual, post-call admin",
            "Voice QA — AI scoring across 100% of calls, not sampled reviews",
            "Unified agent workspace — voice and digital in one interface",
        ],
        icon: Headset,
        image: { src: "/practice-areas/customer-experience.jpg", alt: "Agents handling voice and digital support together" },
    },
    {
        title: "Quality Assurance & Workforce Management",
        short: "QA & WFM",
        lede: "Zendesk QA automatically scores every interaction — human and AI — surfacing hidden performance patterns and coaching opportunities that random sampling would never catch.",
        body: "Zendesk WFM uses AI to forecast demand, optimize scheduling, and manage agent performance — removing the guesswork from contact centre operations planning.",
        points: [
            "Custom QA scorecards applied automatically across all interactions",
            "AI agent scoring — same QA framework for bots and human agents",
            "AI-powered demand forecasting and schedule optimization",
            "Real-time adherence monitoring and intraday management",
            "Omnichannel live monitoring dashboard — queues, agents, SLAs",
            "Trend analysis and predictive insights for continuous improvement",
        ],
        icon: Workflow,
        image: { src: "/practice-areas/artificial-intelligence.jpg", alt: "Specialist working with an AI-assisted support workspace" },
    },
    {
        title: "Knowledge Graph & Generative Search",
        short: "Knowledge",
        lede: "The Zendesk Knowledge Graph consolidates knowledge from internal wikis, FAQ databases, product documentation, and external sources — giving AI agents, human agents, and customers access to accurate answers from a single, curated source.",
        body: "Generative Search surfaces direct answers rather than search result lists — reducing the effort required to find the right information at the right moment.",
        points: [
            "Access to 50,000+ service knowledge bases out of the box",
            "Knowledge Builder — AI identifies gaps and updates content automatically",
            "Generative Search — direct answers, not a list of links",
            "Federated search across Confluence, SharePoint, and external sources",
            "Used by both AI agents and human agents in real time",
        ],
        icon: Search,
        image: { src: "/practice-areas/artificial-intelligence.jpg", alt: "Specialist working with an AI-assisted support workspace" },
    },
    {
        title: "Actions, Integrations & Marketplace",
        short: "Integrations",
        lede: "Zendesk connects to virtually any enterprise system through 1,800+ marketplace integrations, a flexible REST API, and an Action Builder for custom workflow automation.",
        body: "No-code App Builder lets support teams build custom applications inside Zendesk without developer dependencies — extending the platform for specific industry or operational requirements.",
        points: [
            "1,800+ pre-built marketplace integrations",
            "Action Builder — no-code workflow automation across connected systems",
            "App Builder — custom apps built without engineering resources",
            "Native integrations with Salesforce, HubSpot, SAP, Jira, Slack",
            "IT Asset Management — hardware and software lifecycle tracking",
        ],
        icon: Network,
        image: { src: "/services/platform-systems-integration.jpg", alt: "Systems connected across a support operation" },
    },
];

const FLOW = [
    {
        title: "Zoom Call Ends",
        body: "Every call handled in Zoom Phone or Zoom Contact Center is automatically logged in HubSpot with full metadata — duration, recording, agent, and outcome. Zero manual entry required from any agent.",
        stat: "0",
        label: "manual entries",
    },
    {
        title: "HubSpot Updates",
        body: "The call activity updates the contact's HubSpot record — lifecycle stage, last contact date, and deal pipeline status. Support calls automatically trigger Zendesk ticket creation with the customer's full CRM history pre-populated.",
        stat: "100%",
        label: "CRM accuracy",
    },
    {
        title: "Zendesk Gets Context",
        body: "The Zendesk agent sees the customer's full HubSpot history — account value, open deals, past interactions, and support history — inside the ticket view before they say a word. No tab-switching. No asking the customer to repeat themselves.",
        stat: "",
        label: "Full context visible",
    },
    {
        title: "Smart Routing",
        body: "HubSpot lifecycle stage and customer value automatically adjusts Zendesk ticket priority — high-value customers escalate faster, renewals-at-risk are flagged, and VIP accounts route directly to senior agents without any manual intervention.",
        stat: "",
        label: "Intelligent prioritisation",
    },
    {
        title: "Unified Reporting",
        body: "Leadership dashboards pull data across all three platforms — support volume, SLA performance, call quality, and pipeline impact — in a single source of truth. No manual report compilation. No data reconciliation between systems.",
        stat: "40–60%",
        label: "faster reporting",
    },
];

const COMPARISON = [
    ["Licensing", "Standard vendor pricing", "Partner pricing — 0% markup", "Sysgrate 10–25% lower cost"],
    ["Deployment", "Basic setup — platform defaults", "Strategic workflow implementation", "Sysgrate 30–50% faster"],
    ["Integrations", "Minimal — manual setup required", "Full Zoom + HubSpot + Zendesk sync", "Sysgrate Unified workflows"],
    ["Automation", "None included", "RevOps + CX workflow engineering", "Sysgrate 2–5× efficiency gain"],
    ["Support", "Standard vendor queues", "Priority partner escalation", "Sysgrate 40–60% faster resolution"],
    ["Customer Journey", "Not designed", "Cross-platform CX architecture", "Sysgrate Higher NPS & retention"],
];

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
        lede: "Workflow design before platform configuration.",
        body: "Channel mapping, SLA architecture, automation logic, integration scoping, and AI readiness assessment — before any licence is purchased or any Zendesk configuration begins.",
        icon: Compass,
    },
    {
        number: "02",
        title: "Solution Design & Delivery",
        lede: "Configured for your workflows. 30–50% faster.",
        body: "SLA policies, routing rules, IVR design, AI agent setup, knowledge base build, and QA scorecard configuration — deployed using our accelerators and methodology for faster, more reliable go-lives.",
        icon: PenTool,
    },
    {
        number: "03",
        title: "Ecosystem Integration",
        lede: "Zendesk + Zoom + HubSpot — one connected system.",
        body: "Full bi-directional sync between all three platforms — automated call logging, ticket creation, CRM updates, and priority routing — built and tested by Sysgrate engineers.",
        icon: Network,
    },
    {
        number: "04",
        title: "Managed Operations",
        lede: "24/7 support. Continuous improvement.",
        body: "Platform administration, AI agent tuning, SLA monitoring, WFM optimization, and quarterly performance reviews — backed by priority partner escalation to Zendesk, Zoom, and HubSpot.",
        icon: Activity,
    },
];

function CountValue({ value }: { value: string }) {
    const numbers = [...value.matchAll(numberPattern())].map((match) => ({
        target: Number(match[0].replace(/,/g, "")),
        commas: match[0].includes(","),
    }));
    const ref = useRef<HTMLSpanElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node || numbers.length === 0) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setProgress(1);
            return;
        }
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
                const next = Math.min(1, (now - start) / 1200);
                setProgress(1 - (1 - next) ** 3);
                if (next < 1) frame = requestAnimationFrame(tick);
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
    }, [value, numbers.length]);

    if (numbers.length === 0) return <>{value}</>;
    let index = 0;
    const shown = value.replace(numberPattern(), (raw) => {
        const item = numbers[index];
        index += 1;
        if (!item) return raw;
        const rounded = String(Math.round(item.target * progress));
        return item.commas ? Number(rounded).toLocaleString("en-US") : rounded;
    });
    return <span ref={ref}>{shown}</span>;
}

function Eyebrow({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            {children}
        </span>
    );
}

function ProductSlideshow() {
    const [active, setActive] = useState(0);
    const [inView, setInView] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);
    const product = PRODUCTS[active];
    const Icon = product.icon;
    const playing = autoplay && inView;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAutoplay(false);
    }, []);

    useEffect(() => {
        const node = rootRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!playing) return;
        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % PRODUCTS.length);
        }, 7000);
        return () => window.clearInterval(timer);
    }, [playing, active]);

    const show = (index: number) => {
        setActive((index + PRODUCTS.length) % PRODUCTS.length);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        let next = active;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % PRODUCTS.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active + PRODUCTS.length - 1) % PRODUCTS.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = PRODUCTS.length - 1;
        else return;
        event.preventDefault();
        show(next);
        document.getElementById(`zendesk-product-${next}`)?.focus();
    };

    const control = "w-11 h-11 rounded-full border border-hairline bg-paper text-ink-800 inline-flex items-center justify-center cursor-pointer hover:-translate-y-0.5 hover:shadow-chip transition-all";
    const controlOn = "w-11 h-11 rounded-full bg-surface-inverse text-white inline-flex items-center justify-center cursor-pointer";

    return (
        <div ref={rootRef} className="mt-10">
            <div role="tablist" aria-label="Zendesk platform products" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-1">
                {PRODUCTS.map((item, index) => {
                    const selected = index === active;
                    return (
                        <button
                            key={item.title}
                            id={`zendesk-product-${index}`}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            aria-controls="zendesk-product-panel"
                            tabIndex={selected ? 0 : -1}
                            onClick={() => show(index)}
                            className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
                                selected ? "border-link bg-link text-white" : "border-hairline bg-paper text-ink-800 hover:bg-paper-muted"
                            }`}
                        >
                            {item.short}
                            {selected ? (
                                <span className="absolute left-4 right-4 bottom-1 h-0.5 rounded-full bg-white/30 overflow-hidden" aria-hidden="true">
                                    <span
                                        key={`${item.short}-${playing}`}
                                        className="block h-full origin-left bg-white motion-safe:animate-[sg-progress_7s_linear_forwards]"
                                        style={{ animationPlayState: playing ? "running" : "paused" }}
                                    />
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <article
                id="zendesk-product-panel"
                role="tabpanel"
                aria-labelledby={`zendesk-product-${active}`}
                className="mt-4 grid grid-cols-1 md:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.15fr)] rounded-panel border border-hairline bg-paper overflow-hidden shadow-chip"
            >
                <div className="relative min-h-56 md:min-h-full bg-paper-card">
                    <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 768px) 36vw, 100vw" className="object-cover" />
                </div>
                <div key={product.title} className="p-6 md:p-8 flex flex-col motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]">
                    <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="text-[clamp(22px,2.2vw,30px)] font-medium text-ink-800 m-0 mt-4 leading-tight">{product.title}</h3>
                    <p className="text-sm font-medium text-ink-800 m-0 mt-3">{product.lede}</p>
                    <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">{product.body}</p>
                    <ul className="m-0 mt-4 p-0 list-none flex flex-col gap-2">
                        {product.points.map((point, index) => (
                            <li
                                key={point}
                                className="flex gap-3 text-sm leading-relaxed text-ink-800 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                                style={{ animationDelay: `${60 + index * 40}ms` }}
                            >
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-link shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                        <span className="text-xs font-mono tracking-[0.08em] text-ink-300">
                            {String(active + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-2">
                            <button type="button" aria-label="Previous slide" onClick={() => show(active - 1)} className={control}>
                                <ChevronLeft size={18} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Play slideshow"
                                aria-pressed={autoplay}
                                onClick={() => setAutoplay(true)}
                                className={autoplay ? controlOn : control}
                            >
                                <Play size={16} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Pause slideshow"
                                aria-pressed={!autoplay}
                                onClick={() => setAutoplay(false)}
                                className={autoplay ? control : controlOn}
                            >
                                <Pause size={16} aria-hidden="true" />
                            </button>
                            <button type="button" aria-label="Next slide" onClick={() => show(active + 1)} className={control}>
                                <ChevronRight size={18} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

const FLOW_SYSTEMS: { name: string; logo?: string; steps: number[] }[] = [
    { name: "Zoom", logo: "/partners/zoom.png", steps: [0] },
    { name: "HubSpot", steps: [1] },
    { name: "Zendesk", logo: "/partners/zendesk.webp", steps: [2, 3] },
];

function flowSystems(index: number) {
    if (index >= FLOW.length - 1) return [0, 1, 2];
    return FLOW_SYSTEMS.map((system, systemIndex) => (system.steps.includes(index) ? systemIndex : -1)).filter((systemIndex) => systemIndex >= 0);
}

function EcosystemFlow() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [reduced, setReduced] = useState(false);
    const step = FLOW[active];
    const hot = flowSystems(active);
    const travel = Math.min(1, progress * (FLOW.length / (FLOW.length - 1)));
    const linkInto = [0, Math.min(1, travel * 2), Math.min(1, Math.max(0, travel * 2 - 1))];

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setReduced(true);
            setProgress(1);
            setActive(FLOW.length - 1);
            return;
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const track = trackRef.current;
            if (!track) return;
            const rect = track.getBoundingClientRect();
            const scrollable = Math.max(rect.height - window.innerHeight, 1);
            const next = Math.min(1, Math.max(0, -rect.top / scrollable));
            const index = next >= 1 ? FLOW.length - 1 : Math.floor(next * FLOW.length);
            setProgress(next);
            setActive((current) => (current === index ? current : index));
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

    const focusStep = (index: number) => {
        const track = trackRef.current;
        if (!track || reduced) {
            setActive(index);
            return;
        }
        const rect = track.getBoundingClientRect();
        const scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
        const top = window.scrollY + rect.top + (index / FLOW.length) * scrollable + 4;
        window.scrollTo({ top, behavior: "smooth" });
    };

    const stage = (
        <div className="rounded-panel border border-hairline bg-paper overflow-hidden shadow-chip">
            <div className="flex items-center gap-3 sm:gap-4 px-5 py-5 sm:px-8 bg-paper-muted border-b border-hairline">
                {FLOW_SYSTEMS.map((system, index) => {
                    const live = hot.includes(index);
                    const fill = linkInto[index] ?? 0;
                    return (
                        <div key={system.name} className="contents">
                            {index > 0 ? (
                                <div aria-hidden="true" className="relative hidden sm:block h-0.5 flex-1 rounded-full bg-hairline">
                                    <div className="absolute inset-y-0 left-0 rounded-full bg-link" style={{ width: `${fill * 100}%` }} />
                                    <span
                                        className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-link ring-4 ring-paper-muted"
                                        style={{ left: `calc(${fill * 100}% - 5px)` }}
                                    />
                                </div>
                            ) : null}
                            <div className={`flex flex-col items-center gap-2 min-w-0 transition-all duration-500 ${live ? "scale-105" : "opacity-45"}`}>
                                <span className={`h-14 w-20 sm:h-16 sm:w-24 rounded-2xl bg-paper border grid place-items-center px-2 ${live ? "border-link shadow-[0_0_0_6px_rgba(74,62,146,0.12)]" : "border-hairline"}`}>
                                    {system.logo ? (
                                        <Image src={system.logo} alt="" width={72} height={28} className="h-6 w-auto object-contain" />
                                    ) : (
                                        <span className="text-xs sm:text-sm font-medium text-ink-800">HubSpot</span>
                                    )}
                                </span>
                                {system.logo ? (
                                    <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-ink-300">{system.name}</span>
                                ) : (
                                    <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-transparent" aria-hidden="true">HubSpot</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
                <div role="tablist" aria-label="How a customer interaction moves across the ecosystem" className="relative flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible p-4 lg:p-6 lg:border-r border-hairline">
                    <div aria-hidden="true" className="absolute left-3 top-6 bottom-6 hidden w-0.5 rounded-full bg-hairline lg:block">
                        <div className="w-full rounded-full bg-link" style={{ height: `${progress * 100}%` }} />
                    </div>
                    {FLOW.map((item, index) => {
                        const selected = index === active;
                        const done = index < active;
                        return (
                            <button
                                key={item.title}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                onClick={() => focusStep(index)}
                                className={`relative shrink-0 lg:shrink text-left rounded-2xl border px-3 py-3 cursor-pointer transition-colors ${
                                    selected ? "border-link bg-paper-muted" : "border-transparent hover:bg-paper-muted"
                                }`}
                            >
                                <span className={`block text-[11px] font-mono tracking-[0.08em] ${selected || done ? "text-link" : "text-ink-300"}`}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="block text-sm font-medium text-ink-800 leading-snug mt-1">{item.title}</span>
                            </button>
                        );
                    })}
                </div>

                <article key={step.title} role="tabpanel" className="p-6 sm:p-8 flex flex-col justify-between gap-6 min-h-64 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]">
                    <div>
                        <p className="m-0 text-xs font-mono tracking-[0.08em] text-ink-300">{String(active + 1).padStart(2, "0")} / 05</p>
                        <h3 className="text-[clamp(22px,2.2vw,32px)] font-medium text-ink-800 m-0 mt-3 leading-tight">{step.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-3 max-w-[62ch]">{step.body}</p>
                    </div>
                    <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0" aria-label={step.stat ? `${step.stat} ${step.label}` : step.label}>
                        {step.stat ? <CountValue value={step.stat} /> : null}
                        {step.stat ? " " : ""}
                        <span className={step.stat ? "text-[18px] font-normal text-text-secondary" : ""}>{step.label}</span>
                    </p>
                </article>
            </div>
        </div>
    );

    if (reduced) return <div className="mt-10">{stage}</div>;

    return (
        <div ref={trackRef} className="relative mt-10 h-[280vh] sm:h-[340vh]">
            <div className="sticky top-20 lg:top-28">{stage}</div>
        </div>
    );
}

export function ZendeskPage() {
    const [overviewOpen, setOverviewOpen] = useState(false);
    const [comparisonOpen, setComparisonOpen] = useState(false);

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
                        <Eyebrow>Zendesk</Eyebrow>
                        <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                            Zendesk for modern <span className="sg-highlight font-medium">support operations.</span>
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                            Zendesk brings together ticketing, omnichannel CX, AI agents, quality assurance, workforce management, and a self-improving knowledge base — eliminating the middleware complexity that slows most enterprise support operations.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                            <PillCta cta={{ label: "Book a free Zendesk consultation", href: "/contact" }} />
                            <PillCta cta={{ label: "Explore the platform", href: "#zendesk-platform" }} variant="secondary" />
                        </div>
                    </div>
                    <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image
                            src="/practice-areas/customer-experience.jpg"
                            alt="Support specialists working with customers"
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
                        <Eyebrow>What is Zendesk</Eyebrow>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            Zendesk is the AI-first service platform
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            From ticketing and omnichannel support to AI agents and workforce management, Zendesk unifies customer service into one platform—continuously improving through every interaction.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Sysgrate configures, integrates, and manages Zendesk to deliver measurable outcomes from day one.
                        </p>
                    </div>
                    <div data-reveal="rise" className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                        <Image src="/partners/zendesk.webp" alt="Zendesk" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-contain p-16" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    {[
                        {
                            title: "AI that improves itself — automatically.",
                            body: "Zendesk's Resolution Learning Loop continuously improves AI accuracy from every resolved interaction.",
                        },
                        {
                            title: "Knowledge built for resolution, not just search.",
                            body: "Zendesk's Knowledge Graph connects 50,000+ knowledge bases to deliver real-time answers across AI agents, human agents, and customers.",
                        },
                        {
                            title: "Enterprise-grade. Fast to deploy.",
                            body: "Unlike legacy platforms, Zendesk is built for rapid deployment and scales seamlessly from lean teams to global operations.",
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

            <section id="zendesk-platform" className="sg-container scroll-mt-32 pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4">
                    <Eyebrow>Modern support</Eyebrow>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Zendesk for modern support
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        One platform for customer conversations, automation, workforce management, and faster resolutions.
                    </p>
                </div>
                <ProductSlideshow />
                <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                    <PillCta cta={{ label: "Book a Zendesk product demo", href: "/contact" }} />
                    <PillCta
                        cta={{ label: "Download platform overview", href: "/contact" }}
                        variant="secondary"
                        onClick={() => setOverviewOpen(true)}
                    />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[860px] flex flex-col gap-4">
                    <Eyebrow>The Connected Ecosystem — Zoom + HubSpot + Zendesk</Eyebrow>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Synchronized for Maximum Efficiency
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Sysgrate&apos;s ecosystem architecture eliminates the integration gaps between your communications, CRM, and support platforms — giving every team member a complete picture of every customer, on every interaction, without any manual data entry.
                    </p>
                </div>
                <EcosystemFlow />
                <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                    <PillCta cta={{ label: "Book an ecosystem consultation", href: "/contact" }} />
                    <PillCta
                        cta={{ label: "Download comparison table", href: "/contact" }}
                        variant="secondary"
                        onClick={() => setComparisonOpen(true)}
                    />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4">
                    <Eyebrow>Platform Comparisons</Eyebrow>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Why Zendesk Is Built for Better CX
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Sysgrate deployments are technical, not strategic. They configure defaults, not your workflows. We architect Zendesk around how your business operates — and stay to make sure it delivers.
                    </p>
                </div>
                <div data-reveal="rise" className="mt-8 overflow-x-auto rounded-card border border-hairline">
                    <table className="w-full min-w-[720px] border-collapse text-sm">
                        <thead>
                            <tr className="bg-paper-muted text-left">
                                {["Category", "Buying Direct", "With Sysgrate", "Your Advantage"].map((column) => (
                                    <th key={column} className="px-4 py-3 font-medium text-ink-800">{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row) => (
                                <tr key={row[0]} className="border-t border-hairline">
                                    <td className="px-4 py-3 font-medium text-ink-800">{row[0]}</td>
                                    <td className="px-4 py-3 text-text-secondary">{row[1]}</td>
                                    <td className="px-4 py-3 text-ink-800">{row[2]}</td>
                                    <td className="px-4 py-3 text-ink-800">{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                    <PillCta cta={{ label: "Book an ecosystem consultation", href: "/contact" }} />
                    <PillCta
                        cta={{ label: "Download comparison table", href: "/contact" }}
                        variant="secondary"
                        onClick={() => setComparisonOpen(true)}
                    />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel border border-hairline bg-paper overflow-hidden grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-64 bg-paper-card">
                        <Image src="/services/solution-design-delivery.jpg" alt="A delivery team reviewing a support programme" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col items-start gap-5">
                        <Eyebrow>Case study</Eyebrow>
                        <div className="flex flex-col sm:flex-row flex-wrap items-start gap-3">
                            <PillCta cta={{ label: "Book a free platform assessment", href: "/contact" }} />
                            <PillCta cta={{ label: "See all client stories", href: "/case-studies" }} variant="secondary" />
                            <PillCta cta={{ label: "Talk to a specialist", href: "/contact" }} variant="secondary" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        How Sysgrate Delivers
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-ink-800 m-0">
                        Full lifecycle — combined with platform licensing in a single engagement. We don&apos;t hand off after go-live.
                    </p>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Every engagement covers the full arc — from discovery and workflow design through to long-term managed operations and continuous optimisation.
                    </p>
                </div>
                <ol className="m-0 mt-10 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-5">
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        return (
                            <li key={step.number} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="w-11 h-11 rounded-2xl bg-paper-muted border border-hairline inline-flex items-center justify-center text-link">
                                        <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                    </span>
                                    <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">{step.number}</span>
                                </div>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4">{step.title}</h3>
                                <p className="text-sm font-medium text-ink-800 m-0 mt-2">{step.lede}</p>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">{step.body}</p>
                            </li>
                        );
                    })}
                </ol>
                <div data-reveal="rise" className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                    <PillCta cta={{ label: "Book a free Zendesk consultation", href: "/contact" }} />
                    <PillCta cta={{ label: "Email us directly", href: "mailto:sales@sysgrate.com" }} variant="secondary" />
                </div>
            </section>

            <div className="pb-[clamp(64px,10vw,120px)]" />

            <InquiryModal open={overviewOpen} onClose={() => setOverviewOpen(false)} {...PLATFORM_OVERVIEW} />
            <InquiryModal open={comparisonOpen} onClose={() => setComparisonOpen(false)} {...COMPARISON_TABLE} />
        </>
    );
}
