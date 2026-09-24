"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { PillCta } from "@/components/services/PillCta";

const TYPES = ["All", "Blog", "Case Studies", "Whitepapers", "Webinars", "News"] as const;
const TOPICS = [
    "All topics",
    "Customer Experience",
    "Digital Workplace",
    "Modern Workplace",
    "Artificial Intelligence",
    "Amazon Connect",
    "Zoom",
    "Zendesk",
    "HubSpot",
] as const;

type TypeFilter = (typeof TYPES)[number];
type TopicFilter = (typeof TOPICS)[number];

const ARTICLE = {
    type: "Blog" as const,
    topics: ["Artificial Intelligence", "Customer Experience"] as TopicFilter[],
    kicker: "Blog · AI · Customer Experience",
    title: "Agentic AI in the contact centre — what it actually means for enterprise CX leaders in 2025.",
    meta: "May 2026 · 8 min read · Sysgrate AI Practice",
    excerpt:
        "Beyond the buzzword — how agentic AI differs from scripted automation, what it means for agent headcount, and the three questions every CX leader should ask before buying an AI platform.",
};

const PARTNERS = [
    { name: "Zoom", src: "/partners/zoom.png" },
    { name: "AWS", src: "/partners/aws.png" },
    { name: "Microsoft Teams", src: "/partners/teams.png" },
    { name: "Avaya", src: "/partners/avaya.png" },
    { name: "Zendesk", src: "/partners/zendesk.webp" },
    { name: "Salesforce", src: "/partners/salesforce.svg" },
    { name: "Cisco", src: "/partners/cisco.png" },
    { name: "Poly", src: "/partners/poly.png" },
    { name: "Genesys", src: "/partners/genesys.webp" },
    { name: "Azure", src: "/partners/azure.png" },
];

function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        if (!email.trim()) return;
        setSent(true);
    }

    if (sent) {
        return <p className="text-sm text-ink-800 m-0">You&apos;re on the list for The Sysgrate Briefing.</p>;
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-[520px]">
            <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Work email address"
                aria-label="Work email address"
                className="h-12 flex-1 rounded-full border border-hairline bg-paper px-5 text-sm text-ink-800 outline-none placeholder:text-ink-300 focus-visible:border-link"
            />
            <button type="submit" className="h-12 px-6 rounded-full bg-surface-inverse text-white text-sm font-medium cursor-pointer">
                Subscribe
            </button>
        </form>
    );
}

export default function InsightsPage() {
    const [type, setType] = useState<TypeFilter>("All");
    const [topic, setTopic] = useState<TopicFilter>("All topics");

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

    const typeMatch = type === "All" || type === ARTICLE.type;
    const topicMatch = topic === "All topics" || ARTICLE.topics.includes(topic);
    const visible = typeMatch && topicMatch;

    return (
        <>
            <section className="sg-container pt-[clamp(120px,16vw,168px)]">
                <div className="max-w-[760px] flex flex-col gap-4 sg-animate-rise">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Insights
                    </span>
                    <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                        Enterprise AI & CX <span className="sg-highlight font-medium">Insights</span>, News, Whitepapers, and Events
                    </h1>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Research, analysis, and perspective on CX, AI, digital workplace, and modern workplace technology — from Sysgrate&apos;s specialists worldwide.
                    </p>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Content type">
                        {TYPES.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setType(item)}
                                aria-pressed={type === item}
                                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${
                                    type === item ? "bg-surface-inverse text-white" : "bg-paper border border-hairline text-text-secondary hover:text-ink-800"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <label className="flex items-center gap-3 text-sm text-text-secondary w-fit">
                        All topics
                        <select
                            value={topic}
                            onChange={(event) => setTopic(event.target.value as TopicFilter)}
                            aria-label="Filter by topic"
                            className="h-11 rounded-full border border-hairline bg-paper px-4 text-sm text-ink-800 outline-none"
                        >
                            {TOPICS.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </section>

            <section className="sg-container pt-[clamp(40px,6vw,72px)]">
                {visible ? (
                    <article data-reveal="rise" className="rounded-panel border border-hairline bg-paper overflow-hidden grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="relative min-h-[240px] bg-paper-card">
                            <Image
                                src="/practice-areas/artificial-intelligence.jpg"
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-8 sm:p-10 flex flex-col items-start gap-4">
                            <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">{ARTICLE.kicker}</p>
                            <h2 className="text-[clamp(24px,3vw,36px)] font-normal leading-[1.2] tracking-[-0.02em] text-ink-800 m-0">{ARTICLE.title}</h2>
                            <p className="text-sm text-ink-300 m-0">{ARTICLE.meta}</p>
                            <p className="text-[17px] leading-[1.6] text-text-secondary m-0">{ARTICLE.excerpt}</p>
                            <Link href="/contact" className="text-sm font-medium text-link no-underline hover:text-link-hover">
                                Read the article →
                            </Link>
                        </div>
                    </article>
                ) : (
                    <p className="text-[18px] text-text-secondary m-0">Nothing in this filter yet. The first piece is a blog on agentic AI and customer experience.</p>
                )}

                <ul className="m-0 mt-8 p-0 list-none flex flex-wrap gap-2">
                    {["Blogs", "Case studies", "Whitepapers", "Webinars", "News & Press"].map((label) => (
                        <li key={label} className="px-4 py-2 rounded-full bg-paper border border-hairline text-sm text-ink-800">
                            {label}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel bg-paper-muted border border-hairline px-8 py-10 sm:px-12 flex flex-col gap-4 max-w-[860px]">
                    <h2 className="text-[clamp(26px,3.2vw,40px)] font-normal tracking-[-0.02em] text-ink-800 m-0">The Sysgrate Briefing.</h2>
                    <p className="text-[17px] leading-[1.6] text-text-secondary m-0">
                        Monthly insights on CX, AI, digital workplace, and modern workplace technology — delivered to enterprise technology leaders across APAC and the Middle East. No fluff. No vendor content. Just practitioner perspective.
                    </p>
                    <SubscribeForm />
                    <p className="text-xs text-ink-300 m-0">Free. Monthly · No spam · Unsubscribe anytime</p>
                </div>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-3">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Partners
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal tracking-[-0.02em] text-ink-800 m-0">Our technology partners</h2>
                    <p className="text-[17px] leading-[1.6] text-text-secondary m-0">
                        We work with the world&apos;s leading cloud, AI, and communication technology providers — certified at the highest levels to deliver outcomes your business can measure.
                    </p>
                </div>
                <ul className="m-0 mt-8 p-0 list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {PARTNERS.map((partner) => (
                        <li key={partner.name} className="rounded-2xl border border-hairline bg-paper h-24 flex items-center justify-center px-4">
                            <Image src={partner.src} alt={partner.name} width={120} height={40} className="max-h-8 w-auto object-contain" />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)]">
                <div data-reveal="rise" className="rounded-panel border border-hairline bg-paper px-8 py-12 flex flex-col items-start gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal tracking-[-0.02em] text-ink-800 m-0 max-w-[720px]">
                        Found something useful? Talk to the team behind it.
                    </h2>
                    <p className="text-[17px] leading-[1.6] text-text-secondary m-0 max-w-[680px]">
                        Every article on this page comes from practitioners who design and deliver this technology every day. If something you&apos;ve read is relevant to a challenge your organisation is facing, we&apos;d love to hear about it.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <PillCta cta={{ label: "Talk to a specialist", href: "/contact" }} />
                        <PillCta cta={{ label: "Book a free consultation", href: "/contact" }} variant="secondary" />
                    </div>
                </div>
            </section>
        </>
    );
}
