"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Award,
    Building2,
    Handshake,
    Headset,
    HeartHandshake,
    Layers,
    MessageSquareQuote,
    Microscope,
    Sparkles,
    Target,
    Users,
    type LucideIcon,
} from "lucide-react";

const OFFICES = ["Singapore", "India", "Malaysia", "UAE"];

const PRACTICES: {
    index: string;
    title: string;
    detail: string;
    icon: LucideIcon;
    image: string;
    alt: string;
}[] = [
    {
        index: "01",
        title: "Customer Experience",
        detail: "Contact centre, conversational AI, omnichannel",
        icon: Headset,
        image: "/practice-areas/customer-experience.jpg",
        alt: "Contact centre agents working across an AI-assisted platform",
    },
    {
        index: "02",
        title: "Digital Workplace",
        detail: "UCaaS, Zoom, Microsoft Teams, SBC",
        icon: Users,
        image: "/practice-areas/employee-experience.jpg",
        alt: "Teams collaborating across voice, chat, and video",
    },
    {
        index: "03",
        title: "Modern Workplace",
        detail: "AV integration, boardrooms, smart spaces",
        icon: Building2,
        image: "/practice-areas/modern-workplace.jpg",
        alt: "A boardroom set up for hybrid meetings",
    },
    {
        index: "04",
        title: "Artificial Intelligence",
        detail: "Agents, analytics, automation, Nexus",
        icon: Sparkles,
        image: "/practice-areas/artificial-intelligence.jpg",
        alt: "A specialist working with an AI-assisted workspace",
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

const VALUES: { title: string; icon: LucideIcon }[] = [
    { title: "Outcomes before deliverables", icon: Target },
    { title: "Honest advice, even when it’s hard to give", icon: MessageSquareQuote },
    { title: "Specialist depth over generalist breadth", icon: Microscope },
    { title: "People — our team and our clients’ teams — always first", icon: HeartHandshake },
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

const SLIDE_MS = 7000;

function PracticeSlideshow() {
    const [active, setActive] = useState(0);
    const [inView, setInView] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);
    const practice = PRACTICES[active];
    const Icon = practice.icon;
    const playing = autoplay && inView;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setAutoplay(false);
        }
    }, []);

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
        if (!playing) return;
        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % PRACTICES.length);
        }, SLIDE_MS);
        return () => window.clearInterval(timer);
    }, [playing, active]);

    const show = (index: number) => {
        setActive((index + PRACTICES.length) % PRACTICES.length);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        let next = active;
        if (event.key === "ArrowRight") next = (active + 1) % PRACTICES.length;
        else if (event.key === "ArrowLeft") next = (active + PRACTICES.length - 1) % PRACTICES.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = PRACTICES.length - 1;
        else return;
        event.preventDefault();
        show(next);
        document.getElementById(`practice-tab-${next}`)?.focus();
    };

    return (
        <div
            ref={rootRef}
            className="relative mt-10 overflow-hidden rounded-panel bg-ink-800 aspect-[3/4] sm:aspect-[16/10] lg:aspect-[2/1] min-h-[440px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Four practice areas"
            onKeyDown={onKeyDown}
        >
            {PRACTICES.map((item, index) => (
                <div
                    key={item.title}
                    aria-hidden={index !== active}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                        index === active ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={item.image}
                        alt={index === active ? item.alt : ""}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1440px) 1312px, 100vw"
                        className="object-cover"
                    />
                </div>
            ))}

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 72% 62% at 50% 46%, rgba(18,14,36,0.72) 0%, rgba(18,14,36,0.34) 52%, rgba(18,14,36,0.58) 100%)",
                }}
            />

            <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-16 text-center">
                <div
                    id="practice-slide"
                    role="tabpanel"
                    aria-labelledby={`practice-tab-${active}`}
                    key={practice.title}
                    className="max-w-[760px] text-white motion-safe:animate-[sg-rise_0.5s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                >
                    <span className="mx-auto w-12 h-12 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md inline-flex items-center justify-center">
                        <Icon size={20} strokeWidth={2} className="text-white" aria-hidden />
                    </span>
                    <p className="m-0 mt-5 text-xs font-semibold tracking-[0.18em] text-white/75 font-mono">
                        {practice.index}
                    </p>
                    <h3 className="m-0 mt-3 text-[clamp(32px,4.4vw,64px)] font-normal leading-[1.05] tracking-[-0.03em]">
                        {practice.title}
                    </h3>
                    <p className="m-0 mx-auto mt-4 max-w-[520px] text-[clamp(16px,1.5vw,20px)] leading-relaxed text-white/88">
                        {practice.detail}
                    </p>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-4 pb-5 sm:px-6 sm:pb-6">
                <div
                    role="tablist"
                    aria-label="Practice areas"
                    className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2"
                >
                    {PRACTICES.map((item, index) => {
                        const selected = index === active;
                        return (
                            <button
                                key={item.title}
                                id={`practice-tab-${index}`}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                aria-controls="practice-slide"
                                tabIndex={selected ? 0 : -1}
                                onClick={() => show(index)}
                                className={`relative overflow-hidden rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                                    selected
                                        ? "bg-white text-ink-800"
                                        : "border border-white/30 bg-white/15 text-white hover:bg-white/25"
                                }`}
                            >
                                <span className="sm:hidden">{item.index}</span>
                                <span className="hidden sm:inline">{item.title}</span>
                                {selected ? (
                                    <span
                                        className="absolute left-3 right-3 bottom-1 h-0.5 overflow-hidden rounded-full bg-ink-800/15"
                                        aria-hidden
                                    >
                                        <span
                                            key={`${item.title}-${playing}`}
                                            className="block h-full origin-left bg-ink-800/70 motion-safe:animate-[sg-progress_7s_linear_forwards]"
                                            style={{ animationPlayState: playing ? "running" : "paused" }}
                                        />
                                    </span>
                                ) : null}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
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

                    <div className="sg-animate-rise sg-delay-2 relative w-full h-[350px] sm:h-[372px] lg:h-[424px] rounded-panel border border-hairline bg-paper-card shadow-chip overflow-hidden">
                        <Image
                            src="/practice-areas/employee-experience.jpg"
                            alt="A Sysgrate specialist on a video call with a distributed team"
                            fill
                            priority
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                        />
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

                <PracticeSlideshow />
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

                <div
                    data-reveal="rise"
                    className="relative isolate mt-[clamp(48px,7vw,88px)] overflow-hidden rounded-panel bg-surface-inverse px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 text-white"
                >
                    <div
                        aria-hidden
                        className="sg-drift pointer-events-none absolute -top-32 -left-24 -z-10 w-[min(520px,80vw)] aspect-square rounded-full bg-[#E79AC0]/35 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="sg-drift-slow pointer-events-none absolute -bottom-40 -right-20 -z-10 w-[min(560px,85vw)] aspect-square rounded-full bg-[#3E3A97]/70 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
                    />

                    <div className="flex flex-col items-center text-center gap-4 max-w-170 mx-auto">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium tracking-[0.08em] uppercase text-white/85">
                            <Sparkles size={14} strokeWidth={2} aria-hidden />
                            Our values
                        </span>
                        <h2 className="m-0 text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.1] tracking-[-0.03em]">
                            The principles behind{" "}
                            <span className="bg-[linear-gradient(90deg,#F4B9D6_0%,#C9A8E4_55%,#A9A6F2_100%)] bg-clip-text text-transparent font-medium">
                                every engagement
                            </span>
                            .
                        </h2>
                    </div>

                    <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                        {VALUES.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <article
                                    key={value.title}
                                    data-reveal="rise"
                                    data-delay={index > 0 ? String(index) : undefined}
                                    className="h-full"
                                >
                                    <div className="sg-values-card group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/[0.06] backdrop-blur-md p-6 sm:p-7 flex flex-col transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.11] hover:border-white/35 hover:shadow-[0_24px_60px_rgba(8,6,30,0.45)]">
                                        <span
                                            aria-hidden
                                            className="pointer-events-none absolute right-5 top-3 select-none text-[88px] font-medium leading-none tracking-[-0.06em] text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.12]"
                                        >
                                            0{index + 1}
                                        </span>
                                        <span
                                            className="sg-values-icon relative w-13 h-13 rounded-2xl inline-flex items-center justify-center text-white shadow-[0_10px_28px_rgba(231,154,192,0.35)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                                            style={{ background: "var(--accent-gradient)" }}
                                        >
                                            <Icon size={22} strokeWidth={2} aria-hidden />
                                        </span>
                                        <p className="relative m-0 mt-8 text-[11px] font-semibold tracking-[0.16em] uppercase text-white/55 font-mono">
                                            Value 0{index + 1}
                                        </p>
                                        <h3 className="relative m-0 mt-2 text-[clamp(19px,1.6vw,22px)] font-medium leading-snug text-white">
                                            {value.title}
                                        </h3>
                                        <span
                                            aria-hidden
                                            className="mt-auto pt-8 block"
                                        >
                                            <span className="block h-0.5 w-10 rounded-full bg-[linear-gradient(90deg,#E79AC0_0%,#9A6EAC_52%,#A9A6F2_100%)] transition-[width] duration-500 ease-out group-hover:w-full" />
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
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
