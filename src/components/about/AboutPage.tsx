"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import {
    Award,
    Building2,
    Handshake,
    Headset,
    Layers,
    Sparkles,
    Users,
    type LucideIcon,
} from "lucide-react";

const CHANNELS = ["Voice", "Email", "Chat", "Social"];

const OFFICES = ["Singapore", "India", "Malaysia", "UAE"];

const PRACTICES: {
    index: string;
    title: string;
    detail: string;
    icon: LucideIcon;
    tint: string;
    accent: string;
    featured?: boolean;
}[] = [
    {
        index: "01",
        title: "Customer Experience",
        detail: "Contact centre, conversational AI, omnichannel",
        icon: Headset,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        index: "02",
        title: "Digital Workplace",
        detail: "UCaaS, Zoom, Microsoft Teams, SBC",
        icon: Users,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        index: "03",
        title: "Modern Workplace",
        detail: "AV integration, boardrooms, smart spaces",
        icon: Building2,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
    {
        index: "04",
        title: "Artificial Intelligence",
        detail: "Agents, analytics, automation, Nexus",
        icon: Sparkles,
        tint: "bg-white/15",
        accent: "#ffffff",
        featured: true,
    },
];

const PILLARS: {
    title: string;
    body: string;
    icon: LucideIcon;
    tint: string;
    accent: string;
}[] = [
    {
        title: "Specialist depth",
        body: "Certified engineers and architects — not generalists. Every project is led by the people who know the platform best.",
        icon: Award,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        title: "Full-service delivery",
        body: "Business analysts, architects, and engineers working together — solutions tailored to your specific business objectives.",
        icon: Layers,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "World-class partnerships",
        body: "Certified partnerships across Zoom, AWS, Avaya, Microsoft Teams, and Ribbon — giving you access to the best platforms, delivered right.",
        icon: Handshake,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
];

const PARTNERS = ["Zoom", "AWS", "Avaya", "Microsoft Teams", "Ribbon"];

const STATEMENTS = [
    {
        index: "01",
        label: "Vision",
        body: "To be the world’s most trusted AI-focused system integrator — where every client outcome is a reference we’re proud to share.",
    },
    {
        index: "02",
        label: "Mission",
        body: "To help enterprises communicate better, collaborate smarter, and perform faster — by integrating AI-native technology that works in the real world, not just on slides.",
    },
    {
        index: "03",
        label: "Our dream",
        body: "To be globally recognised as the integrator that closes the gap between what enterprise technology promises and what it actually delivers — for clients of every size.",
    },
];

const VALUES = [
    "Outcomes before deliverables",
    "Honest advice, even when it’s hard to give",
    "Specialist depth over generalist breadth",
    "People — our team and our clients’ teams — always first",
];

/**
 * Names and the two open titles are slots. Drop real people in here
 * without changing the layout.
 */
const LEADERS: { name: string; title: string; bio: string }[] = [
    {
        name: "Name",
        title: "Founder & CEO",
        bio: "A career in customer experience and unified communications, and the decision to build Sysgrate around specialist delivery. Leads the company so every engagement is owned by people who stay with the outcome.",
    },
    {
        name: "Name",
        title: "Head of Delivery",
        bio: "Technical depth across the platforms we deploy, from architecture through engineering and go-live. Projects stay with the people who know the stack, rather than being handed off after the sale.",
    },
    {
        name: "Name",
        title: "Director, Markets",
        bio: "Regional experience across Singapore, India, Malaysia, and the UAE, built through long-running client relationships. Brings sector context into the work alongside the technical team.",
    },
];

const SECTORS = [
    "Banking & Financial Services",
    "Healthcare",
    "Real Estate",
    "Retail & E-commerce",
    "Telecommunications",
    "Government & Public Sector",
    "Education",
    "Hospitality",
    "Manufacturing",
    "Professional Services",
];

function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
    const className =
        "inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group";
    const inner = (
        <>
            <span>{children}</span>
            <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
            </span>
        </>
    );
    if (href.startsWith("mailto:")) {
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

function TextLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-link hover:text-link-hover transition-colors"
        >
            {children}
        </Link>
    );
}

export default function AboutPage() {
    useEffect(() => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const reveal = () => {
            const viewHeight = window.innerHeight || document.documentElement.clientHeight;
            nodes.forEach((node) => {
                if (node.classList.contains("is-in")) return;
                if (reduce) {
                    node.classList.add("is-in");
                    return;
                }
                const rect = node.getBoundingClientRect();
                if (rect.top < viewHeight * 0.9 && rect.bottom > 48) {
                    node.classList.add("is-in");
                }
            });
        };

        reveal();
        window.addEventListener("scroll", reveal, { passive: true });
        window.addEventListener("scrollend", reveal);
        window.addEventListener("resize", reveal);
        return () => {
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("scrollend", reveal);
            window.removeEventListener("resize", reveal);
        };
    }, []);

    return (
        <>
            <section className="sg-container pt-[clamp(120px,16vw,168px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] items-center gap-[clamp(32px,5vw,72px)]">
                    <div className="flex flex-col items-start gap-5 sg-animate-rise">
                        <h1 className="text-[clamp(34px,4.4vw,64px)] font-normal leading-[1.35] tracking-[-0.03em] text-ink-800 m-0">
                            We are Sysgrate — where systems meet{" "}
                            <span className="sg-highlight font-medium">intelligence</span>.
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                            Derived from “System” and “Integrate”, Sysgrate was built to help
                            organisations communicate smarter. We specialise in designing safe,
                            scalable, and seamless communication environments — across voice,
                            email, chat, social, and every channel in between — powered by AI
                            and delivered end-to-end.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-1">
                            <PrimaryLink href="/contact">Contact us</PrimaryLink>
                            <TextLink href="/case-studies">See our work →</TextLink>
                        </div>
                    </div>

                    <div className="sg-animate-rise sg-delay-2 relative rounded-panel border border-hairline bg-paper-card p-7 sm:p-9 shadow-chip overflow-hidden">
                        <div className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-gradient-to-br from-[#E79AC0]/30 via-[#E4D8F3]/40 to-transparent blur-2xl" />
                        <p className="relative text-xs font-medium tracking-[0.08em] uppercase text-text-secondary m-0">
                            Every channel in between
                        </p>
                        <ul className="relative mt-4 m-0 p-0 list-none">
                            {CHANNELS.map((channel, index) => (
                                <li
                                    key={channel}
                                    className="flex items-baseline justify-between gap-4 border-b border-hairline py-4 last:border-b-0"
                                >
                                    <span className="text-[clamp(26px,3vw,40px)] font-normal tracking-[-0.03em] text-ink-800 leading-none">
                                        {channel}
                                    </span>
                                    <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                                        0{index + 1}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="relative text-sm text-text-secondary m-0 mt-2">
                            Powered by AI. Delivered end to end.
                        </p>
                    </div>
                </div>
            </section>

            <section id="who" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(28px,5vw,72px)] items-start">
                    <div className="lg:sticky lg:top-32">
                        <p
                            data-reveal="rise"
                            className="text-[clamp(44px,5.4vw,80px)] font-normal leading-[0.92] tracking-[-0.04em] text-ink-800 m-0"
                        >
                            System
                            <span className="block text-ink-300">+</span>
                            Integrate
                        </p>
                    </div>
                    <div data-reveal="rise" data-delay="1" className="flex flex-col gap-5 pt-2">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                            Who we are
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,44px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            That’s not just our name — it’s our{" "}
                            <span className="sg-highlight font-medium">entire model</span>.
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Sysgrate draws its name from “System” and “Integrate” — and that
                            combination defines everything we do. We work with enterprises to
                            bring together the right platforms, the right integrations, and the
                            right expertise across customer experience, employee collaboration,
                            and intelligent workplace environments. With offices across
                            Singapore, India, Malaysia, and the UAE, we deliver to global
                            standards with regional depth.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {OFFICES.map((office) => (
                                <span
                                    key={office}
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper border border-hairline text-sm font-medium text-ink-800"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B5AA6]" />
                                    {office}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="practices" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Our four practice areas
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        One partner across the environments your people and customers actually use.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    {PRACTICES.map((practice, index) => {
                        const Icon = practice.icon;
                        if (practice.featured) {
                            return (
                                <article
                                    key={practice.title}
                                    data-reveal="rise"
                                    data-delay={index > 0 ? String(index) : undefined}
                                    className="relative overflow-hidden rounded-card p-7 sm:p-8 text-white h-full"
                                    style={{ background: "var(--accent-gradient)" }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold tracking-wider text-white/70 font-mono">
                                            {practice.index}
                                        </span>
                                        <span className="w-11 h-11 rounded-2xl bg-white/15 inline-flex items-center justify-center">
                                            <Icon size={20} strokeWidth={2} className="text-white" />
                                        </span>
                                    </div>
                                    <h3 className="text-[22px] font-medium m-0 mt-8 leading-snug">
                                        {practice.title}
                                    </h3>
                                    <p className="text-[16px] leading-relaxed text-white/85 m-0 mt-2">
                                        {practice.detail}
                                    </p>
                                </article>
                            );
                        }
                        return (
                            <article
                                key={practice.title}
                                data-reveal="rise"
                                data-delay={index > 0 ? String(index) : undefined}
                                className="group rounded-card border border-hairline bg-paper p-7 sm:p-8 shadow-sm h-full transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                                        {practice.index}
                                    </span>
                                    <span
                                        className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${practice.tint}`}
                                    >
                                        <Icon size={20} strokeWidth={2} style={{ color: practice.accent }} />
                                    </span>
                                </div>
                                <h3 className="text-[22px] font-medium text-ink-800 m-0 mt-8 leading-snug">
                                    {practice.title}
                                </h3>
                                <p className="text-[16px] leading-relaxed text-text-secondary m-0 mt-2">
                                    {practice.detail}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section id="why" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(28px,5vw,64px)] items-start">
                    <div className="lg:sticky lg:top-32">
                    <div data-reveal="rise" className="flex flex-col items-start gap-5">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                            Why Sysgrate
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            A team built to go{" "}
                            <span className="sg-highlight font-medium">deep</span> — not wide.
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            Our specialists bring strong technical expertise and broad platform
                            knowledge across the solutions we deploy. As a full-service
                            integrator, we partner with the world’s leading technology vendors
                            to deliver unrivalled contact centre, collaboration, and workplace
                            solutions — from business analysis and architecture through to
                            engineering and go-live.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {PARTNERS.map((partner) => (
                                <span
                                    key={partner}
                                    className="px-3 py-1 rounded-full bg-paper-card border border-hairline text-xs font-medium text-text-secondary"
                                >
                                    {partner}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
                            <PrimaryLink href="/contact">Book a consultation</PrimaryLink>
                            <TextLink href="/case-studies">View client stories →</TextLink>
                        </div>
                    </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {PILLARS.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <article
                                    key={pillar.title}
                                    data-reveal="rise"
                                    data-delay={index > 0 ? String(index) : undefined}
                                    className="group rounded-card border border-hairline bg-paper p-7 flex gap-5 transition-shadow duration-300 hover:-translate-y-1 hover:shadow-card hover:border-[#9A6EAC]/35"
                                >
                                    <span
                                        className={`shrink-0 w-11 h-11 rounded-2xl inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${pillar.tint}`}
                                    >
                                        <Icon size={20} strokeWidth={2} style={{ color: pillar.accent }} />
                                    </span>
                                    <div>
                                        <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                                            {pillar.body}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="vision" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[640px]">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                        What we are here to do
                    </span>
                </div>

                <ol className="relative mt-10 m-0 p-0 list-none flex flex-col gap-5">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-[21px] top-6 bottom-6 w-px bg-hairline hidden sm:block"
                    >
                        <div
                            data-reveal="line"
                            className="h-full w-full bg-[linear-gradient(180deg,#E79AC0_0%,#9A6EAC_52%,#3E3A97_100%)]"
                        />
                    </div>
                    {STATEMENTS.map((item, index) => (
                        <li
                            key={item.label}
                            data-reveal="rise"
                            data-delay={index > 0 ? String(index) : undefined}
                            className="relative grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-4 items-start"
                        >
                            <span className="relative z-10 hidden sm:grid w-11 h-11 rounded-full bg-paper border border-hairline shadow-chip place-items-center text-[11px] font-semibold tracking-wider text-link">
                                {item.index}
                            </span>
                            <article
                                className={`rounded-card border border-hairline p-7 sm:p-9 ${
                                    index === 2 ? "bg-surface-inverse text-white" : "bg-paper"
                                }`}
                            >
                                <p
                                    className={`text-xs font-medium tracking-[0.08em] uppercase m-0 ${
                                        index === 2 ? "text-white/65" : "text-ink-300"
                                    }`}
                                >
                                    <span className="sm:hidden mr-2 font-mono">{item.index}</span>
                                    {item.label}
                                </p>
                                <p
                                    className={`text-[clamp(20px,2.3vw,30px)] font-normal leading-[1.3] tracking-[-0.02em] m-0 mt-3 ${
                                        index === 2 ? "text-white" : "text-ink-800"
                                    }`}
                                >
                                    {item.body}
                                </p>
                            </article>
                        </li>
                    ))}
                </ol>

                <div data-reveal="rise" className="mt-12">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                        Our values
                    </span>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {VALUES.map((value, index) => (
                            <article
                                key={value}
                                data-reveal="rise"
                                data-delay={index > 0 ? String(index) : undefined}
                                className="rounded-card bg-paper-muted border border-hairline/80 px-6 py-5 flex gap-4 items-start"
                            >
                                <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono pt-0.5">
                                    0{index + 1}
                                </span>
                                <p className="text-[16px] font-medium text-ink-800 leading-snug m-0">
                                    {value}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="people" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        People behind the work
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Meet the leadership team.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    {LEADERS.map((person, index) => (
                        <article
                            key={person.title}
                            data-reveal="rise"
                            data-delay={index > 0 ? String(index) : undefined}
                            className="group rounded-card border border-hairline bg-paper p-7 flex flex-col h-full transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35"
                        >
                            <span className="w-14 h-14 rounded-full bg-paper-card border border-hairline inline-flex items-center justify-center text-ink-300">
                                <Users size={22} strokeWidth={1.75} />
                            </span>
                            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-ink-300 m-0 mt-6">
                                {person.name}
                            </p>
                            <h3 className="text-[20px] font-medium text-ink-800 m-0 mt-1 leading-snug">
                                {person.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 mt-3">
                                {person.bio}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="sectors" className="pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="sg-container">
                    <div data-reveal="rise" className="max-w-[760px] flex flex-col gap-4">
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                            Sector experience that speaks for itself.
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                            We have designed and delivered solutions across a wide range of
                            industries — bringing sector-specific context to every engagement,
                            not just technical expertise.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
                            <PrimaryLink href="/contact">Talk to a specialist</PrimaryLink>
                            <TextLink href="/case-studies">See client stories →</TextLink>
                        </div>
                    </div>
                </div>

                <div
                    className="sg-marquee relative mt-10 overflow-hidden py-2"
                    role="region"
                    aria-label="Industries we work in"
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[clamp(24px,8vw,88px)] z-10 bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-[clamp(24px,8vw,88px)] z-10 bg-gradient-to-l from-white to-transparent" />
                    <ul className="sg-marquee-track m-0 p-0 list-none items-center">
                        {[...SECTORS, ...SECTORS].map((sector, index) => (
                            <li
                                key={`${sector}-${index}`}
                                aria-hidden={index >= SECTORS.length}
                                className={`shrink-0 px-5 py-3 rounded-full bg-paper border border-hairline text-sm font-medium text-ink-800 shadow-sm ${
                                    index >= SECTORS.length ? "sg-marquee-clone" : ""
                                }`}
                            >
                                {sector}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="careers" className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div
                    data-reveal="rise"
                    className="relative overflow-hidden rounded-panel border border-hairline/80 px-8 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20 flex flex-col items-start md:items-center md:text-center gap-5"
                    style={{ background: "var(--panel-gradient)" }}
                >
                    <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#E79AC0]/25 via-[#9A6EAC]/20 to-transparent blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#3E3A97]/15 via-transparent to-transparent blur-2xl" />
                    <h2 className="relative z-10 text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0 max-w-[720px]">
                        Great work happens with{" "}
                        <span className="sg-highlight font-medium">great people</span>.
                    </h2>
                    <p className="relative z-10 text-[17px] sm:text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[560px]">
                        We’re growing and always looking for people who care deeply about
                        technology and outcomes.
                    </p>
                    <div className="relative z-10 mt-1">
                        <PrimaryLink href="/careers">
                            See open roles
                        </PrimaryLink>
                    </div>
                </div>
            </section>
        </>
    );
}
