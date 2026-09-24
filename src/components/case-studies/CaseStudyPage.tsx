"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { PillCta } from "@/components/services/PillCta";

const contact = "/contact";

const STATS = [
    { value: "100%", label: "Call recording coverage", note: "Up from 0% on SIM-based setup" },
    { value: "↑30%", label: "Agent productivity improvement", note: "Typical Zoom Phone + ZRA benchmark" },
    { value: "Real-time", label: "SAP C4C data sync", note: "Zero manual post-call data entry" },
    { value: "↓40%", label: "Reporting overhead reduced", note: "Automated vs. manual log compilation" },
];

const CHALLENGES = [
    "Telemarketing agents were making outbound calls from personal SIM-based mobile devices — with no centralised call management, recording, or audit trail",
    "Call logs were fragmented and inconsistent — team leaders had no reliable way to track agent activity, call volumes, or conversation quality",
    "Zero call recording meant quality assurance and compliance monitoring were impossible to enforce at scale",
    "Customer interaction data never reached SAP C4C — agents were manually updating records sporadically, leaving the CRM incomplete and unreliable",
    "Performance management was based on agent self-reporting, not verified activity — creating blind spots across the entire sales funnel",
    "No analytics or reporting infrastructure existed to support data-driven decisions on outbound campaign performance or agent coaching",
];

const APPROACH = [
    {
        title: "Discover & Define",
        body: "Mapped Brigade's outbound sales workflow, reviewed SAP C4C data dependencies, and locked in compliance, recording, and reporting requirements before touching any technology.",
    },
    {
        title: "Evaluate & Design",
        body: "Assessed enterprise telephony platforms against Brigade's scale and SAP integration needs — selecting Zoom Phone with ZRA, then designing a custom middleware architecture for bi-directional CRM data flow.",
    },
    {
        title: "Deploy & Measure",
        body: "Rolled out in phases to protect live sales operations — validating CRM sync accuracy and recording coverage at each stage before full go-live.",
    },
];

const SOLUTION = [
    {
        eyebrow: "Cloud telephony",
        title: "Cloud telephony architecture replacing SIM-based mobile calling",
        body: "Designed a cloud-first telephony environment using Zoom Phone as the enterprise UCaaS layer — replacing fragmented SIM-based devices with a centralised, policy-managed calling platform. Architecture accounted for agent distribution across multiple cities, call routing logic, IVR configuration, and compliance recording policies at the tenant level.",
        points: [
            "Zoom Phone tenant provisioning and dial plan configuration",
            "Outbound calling policies and call queue design",
            "Compliance-grade call recording is enabled across all agent extensions",
        ],
    },
    {
        eyebrow: "Bespoke integration",
        title: "Custom middleware layer connecting Zoom Phone to SAP C4C",
        body: "Developed a purpose-built middleware integration that bi-directionally connected Zoom Phone's API with Brigade's SAP C4C (Cloud for Customer) CRM. This removed the dependency on manual data entry and ensured every call event — initiated, completed, missed, or transferred — was automatically reflected in the customer record.",
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
        body: "Deployed Zoom Revenue Accelerator on top of Zoom Phone to introduce AI-powered conversation intelligence into Brigade's telemarketing operations. ZRA provided automated transcription, sentiment analysis, keyword tracking, and structured coaching insights — giving managers a data-driven view of every sales conversation without manual review.",
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
        body: "Automated the post-call workflow to eliminate manual processes that were creating data gaps and slowing agent throughput. Every interaction — from call initiation to follow-up scheduling — was captured, logged, and surfaced within the tools agents and managers already used.",
        points: [
            "Automated follow-up task creation in SAP C4C triggered by call disposition",
            "Call outcome tagging and disposition mapping to CRM pipeline stages",
            "Reporting dashboards for outbound call volumes, connection rates, and team performance",
        ],
    },
];

const OUTCOMES = [
    {
        title: "Complete call compliance from day one",
        body: "Every outbound interaction is now recorded, timestamped, and searchable — giving Brigade's compliance and quality teams an audit-ready record of all telemarketing activity for the first time.",
    },
    {
        title: "AI coaching that scales across the team",
        body: "ZRA's conversation intelligence surfaces coaching insights automatically — sentiment trends, keyword triggers, and talk-to-listen ratios — so managers can develop agents based on data, not gut feel.",
    },
    {
        title: "SAP C4C reflects every customer conversation",
        body: "With real-time middleware sync, pipeline data in SAP C4C is now complete and accurate. Sales managers make decisions based on verified interaction data — not agent self-reporting.",
    },
    {
        title: "Agents sell more. Admin is gone.",
        body: "Automated call logging, CRM sync, and follow-up task creation freed agents from post-call manual work — measurably increasing outbound call capacity and follow-up consistency across the team.",
    },
];

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
                        <article key={stat.label} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-6">
                            <p className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] text-ink-800 m-0">{stat.value}</p>
                            <p className="text-sm font-medium text-ink-800 leading-snug m-0 mt-2">{stat.label}</p>
                            <p className="text-xs text-ink-300 m-0 mt-2">{stat.note}</p>
                        </article>
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
                <ul className="m-0 mt-8 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CHALLENGES.map((item) => (
                        <li key={item} data-reveal="rise" className="rounded-2xl border border-hairline bg-paper px-5 py-4 text-sm text-ink-800 leading-snug">
                            {item}
                        </li>
                    ))}
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
                    {APPROACH.map((step, index) => (
                        <li key={step.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7">
                            <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">0{index + 1}</span>
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-4 leading-snug">{step.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{step.body}</p>
                        </li>
                    ))}
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
                <div className="mt-10 flex flex-col gap-5">
                    {SOLUTION.map((item) => (
                        <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7 sm:p-8">
                            <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">{item.eyebrow}</p>
                            <h3 className="text-[20px] font-medium text-ink-800 m-0 mt-3 leading-snug">{item.title}</h3>
                            <p className="text-[16px] leading-[1.6] text-text-secondary m-0 mt-3 max-w-[820px]">{item.body}</p>
                            <ul className="m-0 mt-5 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-2">
                                {item.points.map((point) => (
                                    <li key={point} className="rounded-2xl bg-paper-muted px-4 py-3 text-sm text-ink-800 leading-snug">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
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
                    {OUTCOMES.map((item) => (
                        <article key={item.title} data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7 hover:-translate-y-1 hover:shadow-card transition-all">
                            <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">{item.body}</p>
                        </article>
                    ))}
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
