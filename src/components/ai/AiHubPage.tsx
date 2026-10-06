"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Cpu, TrendingUp } from "lucide-react";

const contact = "/contact";
const platforms = "/platforms";
const bespoke = "/services/bespoke-engineering";
const services = "/services";

const RAIL = [
    { id: "reporting", label: "Reporting" },
    { id: "voice", label: "Voice" },
    { id: "emergency", label: "Emergency" },
    { id: "capabilities", label: "Capabilities" },
];

function delay(index: number): CSSProperties {
    return { "--i": index } as CSSProperties;
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
            <p className="ai-note">
                Callback requested for <strong className="font-semibold text-white">{email}</strong>.
            </p>
        );
    }

    return (
        <form onSubmit={onSubmit} className="ai-callback">
            <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                className="ai-input"
            />
            <button type="submit" className="ai-cta ai-cta-primary">
                <span>Get a call back</span>
                <span className="ai-cta-arrow" aria-hidden="true">
                    ↗
                </span>
            </button>
        </form>
    );
}

function AiCta({
    label,
    href,
    variant = "primary",
}: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
}) {
    const className = variant === "primary" ? "ai-cta ai-cta-primary" : "ai-cta ai-cta-secondary";
    const inner =
        variant === "primary" ? (
            <>
                <span>{label}</span>
                <span className="ai-cta-arrow" aria-hidden="true">
                    ↗
                </span>
            </>
        ) : (
            <span>{label}</span>
        );

    if (href.startsWith("#")) {
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

type Exchange = { ask: string; answer: string };

function LiveChat({
    title,
    status,
    exchanges,
}: {
    title: string;
    status: string;
    exchanges: Exchange[];
}) {
    const [shown, setShown] = useState(0);
    const [typing, setTyping] = useState(false);
    const [active, setActive] = useState(false);
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = root.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => setActive(entry.isIntersecting),
            { threshold: 0.35 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!active) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setShown(exchanges.length * 2);
            setTyping(false);
            return;
        }

        let timer = 0;
        let step = 0;
        const total = exchanges.length * 2;
        const later = (fn: () => void, ms: number) => {
            timer = window.setTimeout(fn, ms);
        };
        const tick = () => {
            if (step % 2 === 1) {
                setTyping(true);
                later(() => {
                    setTyping(false);
                    step += 1;
                    setShown(step);
                    if (step >= total) {
                        later(() => {
                            step = 0;
                            setShown(0);
                            later(tick, 900);
                        }, 4200);
                    } else {
                        later(tick, 1800);
                    }
                }, 1600);
                return;
            }
            step += 1;
            setShown(step);
            later(tick, 1600);
        };
        later(tick, 700);
        return () => window.clearTimeout(timer);
    }, [active, exchanges]);

    const messages = exchanges
        .flatMap((item) => [
            { role: "user" as const, text: item.ask },
            { role: "bot" as const, text: item.answer },
        ])
        .slice(0, shown);

    return (
        <div ref={root} className="ai-terminal">
            <span className="ai-edge" aria-hidden="true" />
            <div className="ai-terminal-sweep" aria-hidden="true" />
            <div className="ai-terminal-body">
                <div className="flex items-center justify-between gap-3">
                    <p className="m-0 text-sm font-medium text-white">{title}</p>
                    <span className="ai-status">
                        <span className="ai-live-dot" aria-hidden="true" />
                        {status}
                    </span>
                </div>
                <div className="ai-feed">
                    {messages.map((message, index) => (
                        <div
                            key={`${message.role}-${index}`}
                            className={`ai-bubble ai-msg ${message.role === "user" ? "ai-msg-user" : "ai-msg-bot"}`}
                        >
                            <span className="ai-msg-who">{message.role === "user" ? "You" : "AI assistant"}</span>
                            {message.text}
                        </div>
                    ))}
                    {typing ? (
                        <div className="ai-typing self-start inline-flex items-center gap-1 px-4 py-3 rounded-2xl bg-white text-ink-800" aria-label="Assistant is typing">
                            <span />
                            <span />
                            <span />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function OrbitalCore() {
    return (
        <div className="ai-orbital" aria-hidden="true">
            <div className="ai-ring" />
            <div className="ai-ring ai-ring-b" />
            <div className="ai-ring ai-ring-c" />
            <div className="ai-spin">
                <span className="ai-node" style={{ top: "6%", left: "48%" }} />
                <span className="ai-node ai-node-violet" style={{ top: "68%", left: "88%" }} />
            </div>
            <div className="ai-spin ai-spin-slow">
                <span className="ai-node" style={{ top: "18%", left: "8%" }} />
                <span className="ai-node ai-node-violet" style={{ top: "78%", left: "22%" }} />
                <span className="ai-node" style={{ top: "40%", left: "92%" }} />
            </div>
            <div className="ai-core" />
        </div>
    );
}

function SectionRail() {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const pick = () => {
            const mark = window.innerHeight * 0.42;
            const current = RAIL.find((item) => {
                const node = document.getElementById(item.id);
                if (!node) return false;
                const rect = node.getBoundingClientRect();
                return rect.top <= mark && rect.bottom >= mark;
            });
            setActive(current?.id ?? null);
        };
        pick();
        window.addEventListener("scroll", pick, { passive: true });
        window.addEventListener("resize", pick);
        return () => {
            window.removeEventListener("scroll", pick);
            window.removeEventListener("resize", pick);
        };
    }, []);

    return (
        <nav className="ai-rail" aria-label="On this page">
            {RAIL.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={active === item.id ? "is-active" : undefined} aria-current={active === item.id ? "true" : undefined}>
                    <span className="ai-rail-dot" aria-hidden="true" />
                    <span className="ai-rail-label">{item.label}</span>
                </a>
            ))}
        </nav>
    );
}

function Reveal({
    as: Tag = "div",
    kind = "ai-fade",
    index = 0,
    className,
    spot = false,
    children,
}: {
    as?: "div" | "h1" | "h2" | "h3" | "p" | "article" | "li";
    kind?: "ai-clip" | "ai-fade" | "ai-item";
    index?: number;
    className?: string;
    spot?: boolean;
    children: ReactNode;
}) {
    const clip = kind === "ai-clip";
    return (
        <Tag data-reveal={kind} className={className} style={delay(index)}>
            {clip ? <span>{children}</span> : children}
            {spot ? <span className="ai-edge" aria-hidden="true" /> : null}
        </Tag>
    );
}

const STATS = [
    { value: "↓80%", label: "Reduction in manual report generation time" },
    { value: "24/7", label: "AI-powered self-service across voice and digital" },
    { value: "Seconds", label: "To generate reports that previously took minutes" },
    { value: "Zero", label: "Manual navigation — natural language does the work" },
];

const REPORTING_DOES = [
    "Natural language query interface embedded in the Contact Center dashboard",
    "AI intent recognition converts user questions into live report queries across agent, queue, and performance modules",
    "Instant insights on agent performance, queue statistics, login/logout activity, and skill-based reports",
    "Automates report discovery — eliminating manual navigation through multiple reporting screens",
    "Conversational follow-up — users can refine queries and drill into results through a chat-style interface",
];

const REPORTING_CHAT: Exchange[] = [
    { ask: "How many calls were handled today?", answer: "1,284 calls handled today across every queue. The peak landed at 11:40." },
    { ask: "Which agents are currently active?", answer: "42 agents are logged in. 36 are on a call and 6 are available." },
    { ask: "Show me queue abandonment rates for the past 7 days.", answer: "Abandonment averaged 4.8% this week, down from 6.1% the week before." },
    { ask: "Which agent handled the most calls this week?", answer: "Desk 14 handled 312 calls — the highest on the floor." },
    { ask: "What is the average handle time across all queues today?", answer: "Average handle time today is 4m 12s, 38 seconds under target." },
];

const VOICE_DELIVERS = [
    "AI-powered voice bots built on Amazon Lex — natural language IVR that understands intent, not just keywords",
    "Chatbot development for web, WhatsApp, and digital channels — connected to backend systems for live data retrieval",
    "Conversational workflow design — multi-turn conversation handling with contextual memory across interactions",
    "Intelligent routing — AI-driven call routing based on intent, customer history, and agent skill matching",
    "Personalised interactions — customer data from CRM surfaced in real time to personalise every automated interaction",
    "Full backend and channel integration — connecting voice bots to CRM, ticketing, and enterprise systems",
];

const VOICE_CHAT: Exchange[] = [
    { ask: "What is the status of my order?", answer: "Resolved without an agent. Your order is out for delivery and due this afternoon." },
    { ask: "Can you tell me my account balance?", answer: "Authenticated via voice. Your balance was read back instantly." },
    { ask: "I'd like to schedule an appointment.", answer: "Booked for Thursday at 2pm, confirmed, and synced to the CRM." },
    { ask: "I need to make a payment.", answer: "Guided through a secure voice workflow. The payment is complete." },
    { ask: "This is more complicated than I expected.", answer: "Routed to the right agent, with the full conversation already loaded." },
];

const EMERGENCY_DOES = [
    "Natural language query interface for incident and emergency blast reporting — no manual filtering required",
    "AI-based query interpretation converts conversational questions into structured data queries in real time",
    "Instant insights on incident completion status, failed blast attempts, and response durations",
    "Organisation-wise emergency statistics — cross-department and cross-region reporting through a single query",
    "Trend identification — AI surfaces patterns in incomplete incidents, response failures, and operational anomalies",
    "Automated report generation — dynamic summaries produced from natural language requests, not manual report builds",
];

const EMERGENCY_CHAT: Exchange[] = [
    { ask: "How many emergency incidents were partially completed today?", answer: "6 incidents are partially completed. 2 are still open in the north region." },
    { ask: "Show failed blast reports for this week.", answer: "11 failed blasts this week. Most clustered between 02:00 and 04:00." },
    { ask: "What is the average response duration across all incidents this month?", answer: "Average response this month is 3m 40s." },
    { ask: "Which organisation had the highest number of incomplete incidents?", answer: "Operations North, with 9 incomplete incidents." },
    { ask: "Show me all failed blast attempts in the last 24 hours.", answer: "4 failed attempts in the last 24 hours. The latest was 18 minutes ago." },
];

const CAPABILITIES = [
    {
        number: "01",
        title: "Agent Assist & Real-Time Coaching",
        body: "AI surfaces relevant knowledge articles, suggested responses, and next-best-action recommendations to agents during live customer interactions — reducing AHT and improving first-contact resolution simultaneously.",
    },
    {
        number: "02",
        title: "Speech & Text Analytics",
        body: "AI-powered transcription, sentiment analysis, keyword detection, and compliance monitoring across 100% of recorded interactions — turning unstructured conversation data into actionable intelligence.",
    },
    {
        number: "03",
        title: "Conversational AI for CX",
        body: "Virtual agents and intelligent IVR that resolve customer queries through natural conversation — across voice, chat, email, WhatsApp, and social, 24 hours a day without human intervention.",
    },
    {
        number: "04",
        title: "AI Workflow Automation",
        body: "Intelligent automation across CRM, ITSM, and contact centre workflows — triggered by AI analysis of interaction outcomes, customer intent, and operational signals, without manual rule-writing.",
    },
    {
        number: "05",
        title: "Predictive Analytics & Forecasting",
        body: "AI-driven demand forecasting, agent scheduling optimisation, and performance trend analysis — giving operations leaders the data to make proactive decisions before problems become incidents.",
    },
];

const STEPS = [
    {
        number: "01",
        title: "Use-case discovery & prioritisation",
        body: "We identify where AI will move the needle — scoring use cases by ROI potential, implementation complexity, and data readiness before any build begins.",
    },
    {
        number: "02",
        title: "Solution design & platform selection",
        body: "Architecture design, platform selection, and integration planning — built around your existing infrastructure and the specific AI capability required.",
    },
    {
        number: "03",
        title: "Build, test, and deploy to production",
        body: "Development, QA, and production deployment — with performance baselines set before go-live and improvement tracked from day one.",
    },
];

function StorySection({
    id,
    title,
    kicker,
    paragraphs,
    chatTitle,
    chatStatus,
    exchanges,
    listTitle,
    items,
    impactTitle,
    impactBody,
    techTitle,
    techBody,
    prompt,
    primary,
    secondary,
}: {
    id: string;
    title: string;
    kicker: string;
    paragraphs: string[];
    chatTitle: string;
    chatStatus: string;
    exchanges: Exchange[];
    listTitle: string;
    items: string[];
    impactTitle: string;
    impactBody: string;
    techTitle: string;
    techBody: string;
    prompt: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
}) {
    return (
        <section id={id} className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,5vw,56px)] items-center">
                <div className="flex flex-col gap-4">
                    <Reveal as="h2" kind="ai-clip" className="ai-title-sm">
                        {title}
                    </Reveal>
                    <Reveal as="p" className="ai-kicker" index={1}>
                        {kicker}
                    </Reveal>
                    {paragraphs.map((paragraph, index) => (
                        <Reveal key={paragraph} as="p" className="ai-lead" index={index + 2}>
                            {paragraph}
                        </Reveal>
                    ))}
                </div>
                <Reveal index={1}>
                    <LiveChat title={chatTitle} status={chatStatus} exchanges={exchanges} />
                </Reveal>
            </div>

            <div className="ai-sequence mt-14">
                <Reveal as="h3" kind="ai-clip" className="ai-card-title">
                    {listTitle}
                </Reveal>
                <div className="ai-sequence-list">
                    <span className="ai-sequence-rail" aria-hidden="true">
                        <span className="ai-sequence-pulse" />
                    </span>
                    <ol className="ai-sequence-steps">
                    {items.map((item, index) => (
                        <li
                            key={item}
                            className="ai-sequence-step"
                            data-reveal="ai-item"
                            style={delay(index)}
                        >
                            <span className="ai-sequence-index">{String(index + 1).padStart(2, "0")}</span>
                            <p>
                                <span className="ai-sequence-roll">
                                    <span className="ai-sequence-roll-sizer">{item}</span>
                                    <span className="ai-sequence-roll-track">
                                        <span>{item}</span>
                                        <span aria-hidden="true">{item}</span>
                                    </span>
                                </span>
                            </p>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <Reveal as="article" kind="ai-item" spot className="ai-glass p-7">
                    <span className="ai-pair-icon" aria-hidden="true">
                        <TrendingUp size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="ai-card-title">Business impact</h3>
                    <p className="ai-kicker mt-3">{impactTitle}</p>
                    <p className="ai-muted mt-2">{impactBody}</p>
                </Reveal>
                <Reveal as="article" kind="ai-item" index={1} spot className="ai-glass p-7">
                    <span className="ai-pair-icon" aria-hidden="true">
                        <Cpu size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="ai-card-title">Technical depth</h3>
                    <p className="ai-kicker mt-3">{techTitle}</p>
                    <p className="ai-muted mt-2">{techBody}</p>
                </Reveal>
            </div>

            <div className="flex flex-col gap-4 mt-8">
                <Reveal as="p" className="ai-prompt">
                    {prompt}
                </Reveal>
                <div className="flex flex-wrap gap-3">
                    <AiCta label={primary.label} href={primary.href} />
                    <AiCta label={secondary.label} href={secondary.href} variant="secondary" />
                </div>
            </div>
        </section>
    );
}

export default function AiHubPage() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const previous = document.body.style.background;
        document.body.style.background = "#070b18";
        return () => {
            document.body.style.background = previous;
        };
    }, []);

    useEffect(() => {
        const root = document.querySelector(".ai-world");
        if (!root) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const reveal = () => {
            const view = window.innerHeight || document.documentElement.clientHeight;
            root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
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

    useEffect(() => {
        const root = document.querySelector<HTMLElement>(".ai-world");
        const hero = heroRef.current;
        if (!root) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const boxes = ".ai-glass, .ai-terminal";
        const onMove = (event: PointerEvent) => {
            root.style.setProperty("--gx", `${event.clientX}px`);
            root.style.setProperty("--gy", `${event.clientY}px`);

            const target = event.target;
            const card = target instanceof Element ? target.closest<HTMLElement>(boxes) : null;
            root.classList.toggle("is-card", Boolean(card));
            if (card) {
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                card.style.setProperty("--my", `${event.clientY - rect.top}px`);
            }

            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            hero.style.setProperty("--px", `${(x / rect.width - 0.5) * 18}px`);
            hero.style.setProperty("--py", `${(y / rect.height - 0.5) * 14}px`);
        };
        const onLeave = () => {
            root.classList.remove("is-card");
            root.style.setProperty("--gx", "-400px");
            root.style.setProperty("--gy", "-400px");
        };

        window.addEventListener("pointermove", onMove);
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return (
        <>
            <div className="ai-atmosphere" aria-hidden="true">
                <div className="ai-grid" />
                <div className="ai-orb ai-orb-a" />
                <div className="ai-orb ai-orb-b" />
                <div className="ai-orb ai-orb-c" />
                <div className="ai-scan" />
            </div>

            <div className="ai-stage">
                <div className="ai-cursor" aria-hidden="true" />
                <SectionRail />

                <section ref={heroRef} className="ai-hero sg-container pt-[clamp(120px,16vw,168px)]">
                    <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(28px,5vw,64px)]">
                        <div className="flex flex-col items-start gap-5">
                            <Reveal kind="ai-item" className="ai-eyebrow">
                                AI Hub
                            </Reveal>
                            <Reveal as="h1" kind="ai-clip" index={1} className="ai-display">
                                AI that handles <span className="ai-highlight">everything</span> for you
                            </Reveal>
                            <Reveal as="p" className="ai-lead" index={2}>
                                From voice bots to smart dashboards — we turn manual workflows into scalable, AI-powered experiences.
                            </Reveal>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                                <AiCta label="Book an AI readiness assessment" href={contact} />
                                <AiCta label="Talk to an AI specialist" href={contact} variant="secondary" />
                            </div>
                        </div>
                        <div className="ai-hero-visual">
                            <OrbitalCore />
                            <LiveChat title="Contact centre assistant" status="Live" exchanges={REPORTING_CHAT} />
                        </div>
                    </div>
                </section>

                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <Reveal className="ai-eyebrow">What you get</Reveal>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        {STATS.map((stat, index) => (
                            <Reveal key={stat.label} as="article" kind="ai-item" index={index} spot className="ai-glass ai-stat">
                                <p className="ai-stat-value">{stat.value}</p>
                                <p className="ai-muted mt-2">{stat.label}</p>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                    <div className="max-w-[760px] flex flex-col gap-4">
                        <Reveal as="h2" kind="ai-clip" className="ai-title">
                            AI in production — already driving real results.
                        </Reveal>
                        <div className="ai-beam" aria-hidden="true" />
                        <Reveal as="p" className="ai-lead" index={1}>
                            From voice to reporting, our AI is already solving real problems across CX operations.
                        </Reveal>
                        <CallbackForm />
                    </div>
                </section>

                <StorySection
                    id="reporting"
                    title="AI-Powered Natural Language Reporting"
                    kicker="Ask a question. Get the report—no manual navigation required."
                    paragraphs={[
                        "A conversational AI assistant embedded directly in the contact center dashboard — enabling supervisors to query live data using plain English. No manual filters. No multiple screens.",
                        "It interprets natural-language questions and instantly pulls insights into agent performance, queue metrics, routing, and activity — all within a chat-style interface.",
                    ]}
                    chatTitle="Natural language reporting"
                    chatStatus="Live demo"
                    exchanges={REPORTING_CHAT}
                    listTitle="What it does"
                    items={REPORTING_DOES}
                    impactTitle="Reports in seconds — not minutes"
                    impactBody="Supervisors who previously spent time navigating dashboards and building filters now get instant answers — freeing operational time for coaching, quality management, and decision-making."
                    techTitle="Intent recognition + dynamic query generation"
                    techBody="AI-driven intent recognition translates conversational input into structured API queries — handling ambiguity, multi-entity questions, and follow-up queries without scripted decision trees."
                    prompt="Want AI-powered reporting inside your Contact Center?"
                    primary={{ label: "Talk to our AI team", href: contact }}
                    secondary={{ label: "See platform details", href: platforms }}
                />

                <StorySection
                    id="voice"
                    title="AI-Powered Voice Bots & Chatbots"
                    kicker="Self-service that actually resolves — not just deflects."
                    paragraphs={[
                        "AI-powered voice and chatbots automate customer interactions across voice and digital channels — reducing agent workload, improving first-contact resolution, and enabling 24/7 self-service with natural, multi-turn conversations. Integrated with backend systems and CRMs, they deliver personalised, context-aware experiences that resolve—not deflect.",
                    ]}
                    chatTitle="Voicebot live transcript"
                    chatStatus="Active call"
                    exchanges={VOICE_CHAT}
                    listTitle="What we deliver"
                    items={VOICE_DELIVERS}
                    impactTitle="Reduce inbound volume. Scale without headcount."
                    impactBody="AI voice bots handle repeatable, high-volume interactions 24/7 — reducing the contact volume that reaches human agents and allowing support teams to focus on complex, high-value interactions."
                    techTitle="Amazon Lex + Lambda + Connect — fully integrated"
                    techBody="Amazon Lex for NLU, Lambda for backend logic, Amazon Connect for call flow orchestration — fully integrated with CRM, ticketing, and enterprise data sources for real-time resolution."
                    prompt="Ready to automate customer interactions with AI?"
                    primary={{ label: "Book an AI voice bot consultation", href: contact }}
                    secondary={{ label: "See platform details", href: platforms }}
                />

                <StorySection
                    id="emergency"
                    title="AI-Powered Reporting for Emergency Communications"
                    kicker="Critical incident intelligence — available the moment it's needed, without manual data retrieval."
                    paragraphs={[
                        "An AI-powered reporting module for emergency communications platforms — enabling teams to query live incident data using natural language, without navigating complex dashboards. In time-critical situations, it delivers instant insights on incident status, failures, response times, and organisation-wide metrics through a simple conversational interface.",
                    ]}
                    chatTitle="Incident assistant"
                    chatStatus="Live"
                    exchanges={EMERGENCY_CHAT}
                    listTitle="What it does"
                    items={EMERGENCY_DOES}
                    impactTitle="Faster decisions in critical moments."
                    impactBody="In emergency operations, manual report retrieval is a liability. AI-powered natural language reporting gives teams the data they need in seconds — enabling faster escalations, more accurate incident management, and real-time operational oversight."
                    techTitle="NLP query engine + dynamic report generation"
                    techBody="AI query interpretation layer translates natural language into structured database queries — handling multi-entity questions, time-range specifications, and cross-organisation aggregations without predefined report templates."
                    prompt="Interested in AI-powered reporting for your operational platform?"
                    primary={{ label: "Talk to our AI engineering team", href: contact }}
                    secondary={{ label: "Explore Bespoke Engineering", href: bespoke }}
                />

                <section id="capabilities" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                    <div className="max-w-[760px] flex flex-col gap-4">
                        <Reveal as="h2" kind="ai-clip" className="ai-title">
                            AI runs across all your operations
                        </Reveal>
                        <Reveal as="p" className="ai-lead" index={1}>
                            Helping you to automate workflows, improve decisions, and scale.
                        </Reveal>
                        <Reveal as="p" className="ai-lead" index={2}>
                            These are the additional AI capabilities we bring to every engagement.
                        </Reveal>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                        {CAPABILITIES.map((item, index) => (
                            <Reveal key={item.number} as="article" kind="ai-item" index={index % 3} spot className="ai-glass ai-cap">
                                <span className="ai-cap-orbit" aria-hidden="true">
                                    <span />
                                </span>
                                <span className="ai-index mt-4">{item.number}</span>
                                <h3 className="ai-card-title">{item.title}</h3>
                                <p className="ai-muted mt-2.5">{item.body}</p>
                            </Reveal>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <Reveal as="p" className="ai-prompt">
                            Want to explore what AI can do for your specific environment?
                        </Reveal>
                        <div className="flex flex-wrap gap-3">
                            <AiCta label="Book an AI readiness assessment" href={contact} />
                            <AiCta label="Explore AI Services" href={services} variant="secondary" />
                        </div>
                    </div>
                </section>

                <section id="methodology" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                    <div className="max-w-[820px] flex flex-col gap-4">
                        <Reveal className="ai-eyebrow">Our AI methodology</Reveal>
                        <Reveal as="p" className="ai-lead" index={1}>
                            We follow three simple rules — decide the goal first, build it to work from day one, and track results from the start. Our AI is easy to understand, easy to check, and keeps getting better — not something confusing over time.
                        </Reveal>
                    </div>
                    <div className="ai-steps mt-10" data-reveal="ai-fade">
                        <span className="ai-step-pulse" aria-hidden="true" />
                        <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-5">
                            {STEPS.map((step, index) => (
                                <Reveal key={step.number} as="li" kind="ai-item" index={index} spot className="ai-glass p-7">
                                    <span className="ai-index">Step {step.number}</span>
                                    <h3 className="ai-card-title">{step.title}</h3>
                                    <p className="ai-muted mt-2.5">{step.body}</p>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                    <div className="mt-8">
                        <CallbackForm />
                    </div>
                </section>

                <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                    <Reveal spot className="ai-glass ai-close flex flex-col items-start gap-5">
                        <h2 className="ai-title">Ready to use AI in business?</h2>
                        <div className="relative flex flex-wrap gap-3">
                            <AiCta label="Talk to an AI specialist" href={contact} />
                            <AiCta label="See our AI capabilities" href="#capabilities" variant="secondary" />
                            <AiCta label="Explore AI Services" href={services} variant="secondary" />
                        </div>
                    </Reveal>
                </section>
            </div>
        </>
    );
}
