"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { PillCta } from "@/components/services/PillCta";

const contact = "/contact";
const platforms = "/platforms";
const bespoke = "/services/bespoke-engineering";
const services = "/services";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            {children}
        </span>
    );
}

type Exchange = { ask: string; answer: string };

function LiveChat({
    title,
    status,
    exchanges,
    tone = "dark",
}: {
    title: string;
    status: string;
    exchanges: Exchange[];
    tone?: "dark" | "light";
}) {
    const [shown, setShown] = useState(0);
    const [typing, setTyping] = useState(false);
    const [active, setActive] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const dark = tone === "dark";

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

    const messages = exchanges.flatMap((item) => [
        { role: "user" as const, text: item.ask },
        { role: "bot" as const, text: item.answer },
    ]).slice(0, shown);

    return (
        <div ref={root} className={dark ? "ai-console" : "rounded-card border border-hairline bg-paper shadow-chip"}>
            <div className="relative flex flex-col gap-4 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                    <p className={`m-0 text-sm font-medium ${dark ? "text-white" : "text-ink-800"}`}>{title}</p>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.06em] uppercase ${dark ? "bg-white/10 text-white" : "bg-paper-muted text-text-secondary border border-hairline"}`}>
                        <span className="ai-live-dot" aria-hidden="true" />
                        {status}
                    </span>
                </div>
                <div className="flex h-[340px] flex-col justify-end gap-3 overflow-hidden">
                    {messages.map((message) => (
                        <div
                            key={message.text}
                            className={`ai-bubble max-w-[88%] px-4 py-3 text-sm leading-snug ${
                                message.role === "user"
                                    ? "self-end rounded-2xl rounded-br-md bg-white/15 text-white"
                                    : "self-start rounded-2xl rounded-bl-md bg-white text-ink-800"
                            }`}
                        >
                            <span className={`block text-[10px] font-medium tracking-[0.08em] uppercase mb-1 ${message.role === "user" ? "opacity-60" : "text-ink-300"}`}>
                                {message.role === "user" ? "You" : "AI assistant"}
                            </span>
                            {message.text}
                        </div>
                    ))}
                    {typing ? (
                        <div className={`ai-typing self-start inline-flex items-center gap-1 px-4 py-3 rounded-2xl ${dark ? "bg-white text-ink-800" : "bg-paper-muted text-ink-800"}`} aria-label="Assistant is typing">
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

export default function AiHubPage() {
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
                        <Eyebrow>AI Hub</Eyebrow>
                        <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                            AI that handles <span className="sg-highlight font-medium">everything</span> for you
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                            From voice bots to smart dashboards — we turn manual workflows into scalable, AI-powered experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                            <PillCta cta={{ label: "Book an AI readiness assessment", href: contact }} />
                            <PillCta cta={{ label: "Talk to an AI specialist", href: contact }} variant="secondary" />
                        </div>
                    </div>
                    <LiveChat
                        title="Contact centre assistant"
                        status="Live"
                        exchanges={REPORTING_CHAT}
                    />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <Eyebrow>What you get</Eyebrow>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {STATS.map((stat) => (
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0">{stat.value}</p>
                            <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{stat.label}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        AI in production — already driving real results.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        From voice to reporting, our AI is already solving real problems across CX operations.
                    </p>
                    <CallbackForm />
                </div>
            </section>

            <section id="reporting" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,5vw,56px)] items-start">
                    <div data-reveal="rise" className="flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            AI-Powered Natural Language Reporting
                        </h2>
                        <p className="text-[18px] font-medium text-ink-800 m-0">
                            Ask a question. Get the report—no manual navigation required.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            A conversational AI assistant embedded directly in the contact center dashboard — enabling supervisors to query live data using plain English. No manual filters. No multiple screens.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            It interprets natural-language questions and instantly pulls insights into agent performance, queue metrics, routing, and activity — all within a chat-style interface.
                        </p>
                    </div>
                    <div data-reveal="rise">
                        <LiveChat title="Natural language reporting" status="Live demo" exchanges={REPORTING_CHAT} />
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-[20px] font-medium text-ink-800 m-0">What it does</h3>
                    <ul className="m-0 mt-5 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-3">
                        {REPORTING_DOES.map((item) => (
                            <li key={item} className="rounded-2xl border border-hairline bg-paper px-4 py-3 text-sm text-ink-800 leading-snug">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                    <article className="rounded-card border border-hairline bg-paper p-7">
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">Business impact</h3>
                        <p className="text-[16px] font-medium text-ink-800 m-0 mt-3">Reports in seconds — not minutes</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            Supervisors who previously spent time navigating dashboards and building filters now get instant answers — freeing operational time for coaching, quality management, and decision-making.
                        </p>
                    </article>
                    <article className="rounded-card border border-hairline bg-paper p-7">
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">Technical depth</h3>
                        <p className="text-[16px] font-medium text-ink-800 m-0 mt-3">Intent recognition + dynamic query generation</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            AI-driven intent recognition translates conversational input into structured API queries — handling ambiguity, multi-entity questions, and follow-up queries without scripted decision trees.
                        </p>
                    </article>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                    <p className="text-[18px] text-ink-800 m-0">Want AI-powered reporting inside your Contact Center?</p>
                    <div className="flex flex-wrap gap-3">
                        <PillCta cta={{ label: "Talk to our AI team", href: contact }} />
                        <PillCta cta={{ label: "See platform details", href: platforms }} variant="secondary" />
                    </div>
                </div>
            </section>

            <section id="voice" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,5vw,56px)] items-start">
                    <div data-reveal="rise" className="flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            AI-Powered Voice Bots & Chatbots
                        </h2>
                        <p className="text-[18px] font-medium text-ink-800 m-0">
                            Self-service that actually resolves — not just deflects.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            AI-powered voice and chatbots automate customer interactions across voice and digital channels — reducing agent workload, improving first-contact resolution, and enabling 24/7 self-service with natural, multi-turn conversations. Integrated with backend systems and CRMs, they deliver personalised, context-aware experiences that resolve—not deflect.
                        </p>
                    </div>
                    <div data-reveal="rise">
                        <LiveChat title="Voicebot live transcript" status="Active call" exchanges={VOICE_CHAT} />
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-[20px] font-medium text-ink-800 m-0">What we deliver</h3>
                    <ul className="m-0 mt-5 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-3">
                        {VOICE_DELIVERS.map((item) => (
                            <li key={item} className="rounded-2xl border border-hairline bg-paper px-4 py-3 text-sm text-ink-800 leading-snug">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                    <article className="rounded-card border border-hairline bg-paper p-7">
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">Business impact</h3>
                        <p className="text-[16px] font-medium text-ink-800 m-0 mt-3">Reduce inbound volume. Scale without headcount.</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            AI voice bots handle repeatable, high-volume interactions 24/7 — reducing the contact volume that reaches human agents and allowing support teams to focus on complex, high-value interactions.
                        </p>
                    </article>
                    <article className="rounded-card border border-hairline bg-paper p-7">
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">Technical depth</h3>
                        <p className="text-[16px] font-medium text-ink-800 m-0 mt-3">Amazon Lex + Lambda + Connect — fully integrated</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            Amazon Lex for NLU, Lambda for backend logic, Amazon Connect for call flow orchestration — fully integrated with CRM, ticketing, and enterprise data sources for real-time resolution.
                        </p>
                    </article>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                    <p className="text-[18px] text-ink-800 m-0">Ready to automate customer interactions with AI?</p>
                    <div className="flex flex-wrap gap-3">
                        <PillCta cta={{ label: "Book an AI voice bot consultation", href: contact }} />
                        <PillCta cta={{ label: "See platform details", href: platforms }} variant="secondary" />
                    </div>
                </div>
            </section>

            <section id="emergency" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,5vw,56px)] items-start">
                    <div data-reveal="rise" className="flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            AI-Powered Reporting for Emergency Communications
                        </h2>
                        <p className="text-[18px] font-medium text-ink-800 m-0">
                            Critical incident intelligence — available the moment it&apos;s needed, without manual data retrieval.
                        </p>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            An AI-powered reporting module for emergency communications platforms — enabling teams to query live incident data using natural language, without navigating complex dashboards. In time-critical situations, it delivers instant insights on incident status, failures, response times, and organisation-wide metrics through a simple conversational interface.
                        </p>
                    </div>
                    <div data-reveal="rise">
                        <LiveChat title="Incident assistant" status="Live" exchanges={EMERGENCY_CHAT} />
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-[20px] font-medium text-ink-800 m-0">What it does</h3>
                    <ul className="m-0 mt-5 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-3">
                        {EMERGENCY_DOES.map((item) => (
                            <li key={item} className="rounded-2xl border border-hairline bg-paper px-4 py-3 text-sm text-ink-800 leading-snug">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                    <article className="rounded-card border border-hairline bg-paper p-7">
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">Business impact</h3>
                        <p className="text-[16px] font-medium text-ink-800 m-0 mt-3">Faster decisions in critical moments.</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            In emergency operations, manual report retrieval is a liability. AI-powered natural language reporting gives teams the data they need in seconds — enabling faster escalations, more accurate incident management, and real-time operational oversight.
                        </p>
                    </article>
                    <article className="rounded-card border border-hairline bg-paper p-7">
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">Technical depth</h3>
                        <p className="text-[16px] font-medium text-ink-800 m-0 mt-3">NLP query engine + dynamic report generation</p>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            AI query interpretation layer translates natural language into structured database queries — handling multi-entity questions, time-range specifications, and cross-organisation aggregations without predefined report templates.
                        </p>
                    </article>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                    <p className="text-[18px] text-ink-800 m-0">Interested in AI-powered reporting for your operational platform?</p>
                    <div className="flex flex-wrap gap-3">
                        <PillCta cta={{ label: "Talk to our AI engineering team", href: contact }} />
                        <PillCta cta={{ label: "Explore Bespoke Engineering", href: bespoke }} variant="secondary" />
                    </div>
                </div>
            </section>

            <section id="capabilities" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        AI runs across all your operations
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Helping you to automate workflows, improve decisions, and scale.
                    </p>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        These are the additional AI capabilities we bring to every engagement.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {CAPABILITIES.map((item) => (
                        <article
                            key={item.number}
                            data-reveal="rise"
                            className="rounded-card border border-hairline bg-paper p-7 flex flex-col hover:-translate-y-1 hover:shadow-card transition-all"
                        >
                            <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">{item.number}</span>
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                        </article>
                    ))}
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    <p className="text-[18px] text-ink-800 m-0">Want to explore what AI can do for your specific environment?</p>
                    <div className="flex flex-wrap gap-3">
                        <PillCta cta={{ label: "Book an AI readiness assessment", href: contact }} />
                        <PillCta cta={{ label: "Explore AI Services", href: services }} variant="secondary" />
                    </div>
                </div>
            </section>

            <section id="methodology" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[820px] flex flex-col gap-4">
                    <Eyebrow>Our AI methodology</Eyebrow>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        We follow three simple rules — decide the goal first, build it to work from day one, and track results from the start. Our AI is easy to understand, easy to check, and keeps getting better — not something confusing over time.
                    </p>
                </div>
                <ol className="m-0 mt-10 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-5">
                    {STEPS.map((step) => (
                        <li key={step.number} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                            <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">Step {step.number}</span>
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{step.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{step.body}</p>
                        </li>
                    ))}
                </ol>
                <div className="mt-8">
                    <CallbackForm />
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel bg-paper-muted border border-hairline px-8 py-12 sm:px-12 flex flex-col items-start gap-5">
                    <h2 className="text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Ready to use AI in business?
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <PillCta cta={{ label: "Talk to an AI specialist", href: contact }} />
                        <PillCta cta={{ label: "See our AI capabilities", href: "#capabilities" }} variant="secondary" />
                        <PillCta cta={{ label: "Explore AI Services", href: services }} variant="secondary" />
                    </div>
                </div>
            </section>
        </>
    );
}
