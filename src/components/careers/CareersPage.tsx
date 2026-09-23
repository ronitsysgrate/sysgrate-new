"use client";

import { useEffect, type ReactNode } from "react";
import {
    BadgeCheck,
    Banknote,
    Brain,
    Clock,
    Gift,
    Globe2,
    Heart,
    Layers,
    HeartPulse,
    MessageSquare,
    Palmtree,
    PartyPopper,
    Shield,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Zap,
    type LucideIcon,
} from "lucide-react";

const APPLY_HREF =
    "mailto:sales@sysgrate.com?subject=Open%20application%20at%20Sysgrate";

function roleApplyHref(title: string) {
    return `mailto:sales@sysgrate.com?subject=${encodeURIComponent(`Application — ${title}`)}`;
}

/**
 * Drop live openings in here. Each one renders above the open-application card.
 */
const OPEN_ROLES: {
    title: string;
    team: string;
    location: string;
    type: string;
    summary: string;
}[] = [
    {
        title: "Solutions Architect, Customer Experience",
        team: "Customer Experience",
        location: "Singapore",
        type: "Full-time",
        summary:
            "Design contact centre and conversational AI deployments that go live — and stay owned by the people who scoped them.",
    },
    {
        title: "UC Voice Engineer",
        team: "Digital Workplace",
        location: "India",
        type: "Full-time",
        summary:
            "Implement Zoom and Microsoft Teams voice, SBCs, and the integrations that make enterprise calling work in production.",
    },
    {
        title: "AV Integration Specialist",
        team: "Modern Workplace",
        location: "UAE",
        type: "Full-time",
        summary:
            "Deliver boardrooms and smart spaces — from room design through commissioning — for rooms people use every day.",
    },
    {
        title: "AI Solutions Engineer",
        team: "Artificial Intelligence",
        location: "Malaysia",
        type: "Full-time",
        summary:
            "Build the intelligence layer on live engagements: agents, analytics, and automation sitting on real platforms.",
    },
    {
        title: "Managed Operations Engineer",
        team: "Managed Operations",
        location: "India",
        type: "Full-time",
        summary:
            "Keep deployed platforms healthy after go-live — monitoring, change, and the incidents that actually reach a client.",
    },
    {
        title: "Adoption Consultant",
        team: "Adoption & Enablement",
        location: "Singapore",
        type: "Full-time",
        summary:
            "Help client teams use what we deploy. Training, change, and the habits that turn a go-live into an outcome.",
    },
];

const REASONS: { title: string; body: string; icon: LucideIcon; tint: string; accent: string }[] = [
    {
        title: "Real problems. Real impact.",
        body: "You’ll work on live enterprise deployments used by thousands of people every day. No busy work. No sandbox projects that never ship.",
        icon: Target,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        title: "Depth over breadth.",
        body: "We specialise deliberately. You’ll go deep on the platforms and problems that matter — not stretched thin across everything.",
        icon: Layers,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "Grow fast. Stay sharp.",
        body: "Certifications, cross-market exposure, and a team that shares knowledge openly. We invest in your growth because your expertise is our product.",
        icon: TrendingUp,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
    {
        title: "AI is the work — not a feature.",
        body: "Every engagement we run has an AI layer. You’ll build with and alongside AI from day one — not watch it from a distance.",
        icon: Sparkles,
        tint: "bg-[#F0EFF9]",
        accent: "#4A3E92",
    },
    {
        title: "Four markets. One team.",
        body: "Singapore, India, Malaysia, UAE — a genuinely diverse team with cross-market collaboration baked in, not bolted on.",
        icon: Globe2,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "Honest, flat culture.",
        body: "We say what we think. We give credit where it’s due. And we hold ourselves to the same standard we’d expect from the best team we’ve worked with.",
        icon: MessageSquare,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
];

const PERKS: { title: string; body: string; icon: LucideIcon; tint: string; accent: string }[] = [
    {
        title: "Competitive compensation",
        body: "Market-benchmarked salaries reviewed annually — plus performance-based incentives that reward results, not just presence.",
        icon: Banknote,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        title: "Health & wellness cover",
        body: "Comprehensive medical insurance for you and your dependents — covering hospitalisation, outpatient care, and wellness benefits.",
        icon: HeartPulse,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "Certifications — fully funded",
        body: "Zoom, AWS, Avaya, Microsoft, and more — we pay for every certification you pursue. Your credentials are our credentials.",
        icon: BadgeCheck,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
    {
        title: "Cross-market exposure",
        body: "Work across geographies — with real opportunities to collaborate across markets and build a regional career.",
        icon: Globe2,
        tint: "bg-[#F0EFF9]",
        accent: "#4A3E92",
    },
    {
        title: "Flexible working",
        body: "We foster a strong in-office culture while enabling flexibility where it matters. Our focus is simple — delivering outcomes, wherever the work gets done.",
        icon: Clock,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "Generous leave",
        body: "Annual leave, personal days, and market-specific public holidays — with a culture that actually encourages you to use them.",
        icon: Palmtree,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
    {
        title: "Referral rewards",
        body: "Bring great people in, and we reward you for it. Our referral programme pays out when your referral passes probation.",
        icon: Gift,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
];

const PATH: { index: string; title: string; body: string }[] = [
    {
        index: "01",
        title: "Onboard & orient",
        body: "Structured onboarding, platform access, and a dedicated buddy to get you up to speed in your first 30 days.",
    },
    {
        index: "02",
        title: "Build your depth",
        body: "Hands-on project work, certification milestones, and regular 1:1s to build expertise in your core practice area.",
    },
    {
        index: "03",
        title: "Lead & expand",
        body: "Take ownership of workstreams, mentor junior team members, and start operating across markets as your impact grows.",
    },
    {
        index: "04",
        title: "Shape the direction",
        body: "Senior contributors at Sysgrate help define how we grow — practice area strategy, hiring, and client relationships.",
    },
];

const CERTIFICATIONS = [
    "Zoom Certified Professional & Administrator",
    "AWS Solutions Architect & Connect Specialist",
    "Microsoft Teams Voice Engineer",
    "Avaya Certified Implementation Specialist",
    "AI & ML fundamentals — AWS, Google, Anthropic",
];

const REVIEW_POINTS = [
    "Goal-setting aligned to practice area OKRs",
    "360-degree peer and manager feedback",
    "Transparent promotion criteria — no surprises",
];

const LIFE: { title: string; body: string; icon: LucideIcon; tint: string; accent: string }[] = [
    {
        title: "Collaborative, not hierarchical",
        body: "Ideas come from everywhere at Sysgrate. Junior engineers challenge senior architects. Everyone’s voice counts on a project.",
        icon: Users,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        title: "Knowledge sharing is built in",
        body: "Internal learning sessions, project debriefs, and an open culture where what you know is shared — not hoarded.",
        icon: Brain,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "Genuinely diverse team",
        body: "Four markets, multiple cultures, many perspectives. Diversity at Sysgrate is how we think better — not a value on a poster.",
        icon: Globe2,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
    {
        title: "Fast-moving, never chaotic",
        body: "We move quickly on the things that matter — but with process and structure that keeps quality high and burnout low.",
        icon: Zap,
        tint: "bg-[#F0EFF9]",
        accent: "#4A3E92",
    },
    {
        title: "Wins are celebrated",
        body: "Project go-lives, certifications, client renewals — we stop to recognise the team behind every milestone, big or small.",
        icon: PartyPopper,
        tint: "bg-[#FAF0F5]",
        accent: "#E79AC0",
    },
    {
        title: "Psychological safety",
        body: "You can raise concerns, disagree with a decision, and ask for help — without fear. That’s not a policy here. It’s just how we work.",
        icon: Shield,
        tint: "bg-[#EEEDF8]",
        accent: "#3E3A97",
    },
    {
        title: "Outcomes over deliverables",
        body: "We measure ourselves by what actually changes for our clients — not what we checked off a list.",
        icon: Target,
        tint: "bg-[#F4EEF8]",
        accent: "#7B5AA6",
    },
    {
        title: "Honest, even when it’s hard",
        body: "We give each other straight answers — because comfortable ones don’t move anyone forward.",
        icon: MessageSquare,
        tint: "bg-[#F0EFF9]",
        accent: "#4A3E92",
    },
    {
        title: "People first — always",
        body: "Our team and our clients’ teams are the reason outcomes happen. We treat both accordingly.",
        icon: Heart,
        tint: "bg-[#FAF0F5]",
        accent: "#9A6EAC",
    },
];

const HIRE_STEPS = [
    {
        index: "01",
        title: "Apply",
        body: "Send your CV and a short note on what excites you about the role. No cover letter essays required.",
    },
    {
        index: "02",
        title: "Intro call",
        body: "A 30-minute conversation with our hiring team — to understand your background and answer your questions honestly.",
    },
    {
        index: "03",
        title: "Technical round",
        body: "A practical discussion relevant to the role. We assess depth and thinking, not how well you’ve memorised interview answers.",
    },
    {
        index: "04",
        title: "Final & offer",
        body: "A conversation with senior leadership, followed by a clear and fair offer. We move quickly for the right people.",
    },
];

const OFFICES = [
    { city: "Singapore", region: "Asia-Pacific" },
    { city: "India", region: "Asia-Pacific" },
    { city: "Malaysia", region: "Asia-Pacific" },
    { city: "UAE", region: "Middle East" },
];

function JumpLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group"
        >
            <span>{children}</span>
            <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-y-0.5 transition-transform">
                ↓
            </span>
        </a>
    );
}

function MailLink({ children }: { children: ReactNode }) {
    return (
        <a
            href={APPLY_HREF}
            className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group"
        >
            <span>{children}</span>
            <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
            </span>
        </a>
    );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a href={href} className="text-sm font-medium text-link hover:text-link-hover transition-colors">
            {children}
        </a>
    );
}

function JoinTeam() {
    return (
        <div data-reveal="rise" className="pt-8">
            <JumpLink href="#roles">Join our team</JumpLink>
        </div>
    );
}

export default function CareersPage() {
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
                if (rect.top < viewHeight * 0.92 && rect.bottom > 32) {
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
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                            We’re hiring
                        </span>
                        <h1 className="text-[clamp(34px,4.4vw,64px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                            Come build something you’re{" "}
                            <span className="sg-highlight font-medium">proud of</span>.
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                            We hire specialists — people who go deep, think independently, and
                            care about outcomes as much as the process. If that sounds like you,
                            we’d love to talk.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-1">
                            <JumpLink href="#roles">See open roles</JumpLink>
                            <TextLink href="#culture">Our culture</TextLink>
                        </div>
                    </div>

                    <div className="sg-animate-rise sg-delay-2 relative overflow-hidden rounded-panel bg-surface-inverse text-white p-8 sm:p-10 shadow-chip">
                        <div className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-gradient-to-br from-[#E79AC0]/40 via-[#9A6EAC]/20 to-transparent blur-2xl" />
                        <p className="relative text-xs font-medium tracking-[0.08em] uppercase text-white/60 m-0">
                            The work
                        </p>
                        <ul className="relative mt-6 m-0 p-0 list-none flex flex-col gap-5">
                            {["Deep work", "Live deployments", "Four markets"].map((line, index) => (
                                <li key={line} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-5 last:border-b-0 last:pb-0">
                                    <span className="text-[clamp(26px,3vw,36px)] font-normal tracking-[-0.03em] leading-none">
                                        {line}
                                    </span>
                                    <span className="text-xs font-semibold tracking-wider text-white/45 font-mono">
                                        0{index + 1}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="why" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Why Sysgrate
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        What makes this a place worth building your{" "}
                        <span className="sg-highlight font-medium">career</span>?
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {REASONS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                data-reveal="rise"
                                data-delay={index % 3 === 0 ? undefined : String((index % 3))}
                                className="group rounded-card border border-hairline bg-paper p-7 h-full transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35"
                            >
                                <span
                                    className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.tint}`}
                                >
                                    <Icon size={20} strokeWidth={2} style={{ color: item.accent }} />
                                </span>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-6 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">
                                    {item.body}
                                </p>
                            </article>
                        );
                    })}
                </div>
                <JoinTeam />
            </section>

            <section id="perks" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Perks &amp; benefits
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        What you get for doing{" "}
                        <span className="sg-highlight font-medium">great work</span>.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        We believe the best people deserve more than a competitive salary. Here’s
                        what working at Sysgrate actually looks like — beyond the job description.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {PERKS.map((perk, index) => {
                        const Icon = perk.icon;
                        const wide = index === PERKS.length - 1;
                        return (
                            <article
                                key={perk.title}
                                data-reveal="rise"
                                data-delay={index % 3 === 0 ? undefined : String(index % 3)}
                                className={`group rounded-card border border-hairline bg-paper p-7 h-full transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35 ${
                                    wide ? "md:col-span-2 lg:col-span-3" : ""
                                }`}
                            >
                                <div className={wide ? "md:flex md:items-start md:gap-6" : ""}>
                                    <span
                                        className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${perk.tint}`}
                                    >
                                        <Icon size={20} strokeWidth={2} style={{ color: perk.accent }} />
                                    </span>
                                    <div>
                                        <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-6 md:mt-0 leading-snug">
                                            {perk.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5 max-w-[720px]">
                                            {perk.body}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <JoinTeam />
            </section>

            <section id="growth" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(28px,5vw,64px)] items-start">
                    <div className="lg:sticky lg:top-32">
                        <div data-reveal="rise" className="flex flex-col items-start gap-4">
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                                Career growth
                            </span>
                            <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                                We don’t just hire you. We invest in where you’re{" "}
                                <span className="sg-highlight font-medium">going</span>.
                            </h2>
                            <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                                At Sysgrate, your career path is shaped by your ambition, not your
                                job title. Whether you want to go deeper as a technical specialist
                                or grow into leadership, there is a clear path, and we’ll help you
                                walk it.
                            </p>
                        </div>
                    </div>
                    <ol className="relative m-0 p-0 list-none flex flex-col gap-4">
                        {PATH.map((step, index) => (
                            <li
                                key={step.title}
                                data-reveal="rise"
                                data-delay={index > 0 ? String(Math.min(index, 3)) : undefined}
                                className="rounded-card border border-hairline bg-paper p-6 sm:p-7 grid grid-cols-[auto_1fr] gap-4 items-start"
                            >
                                <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono pt-1">
                                    {step.index}
                                </span>
                                <div>
                                    <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                                        {step.body}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
                    <article data-reveal="rise" className="rounded-card border border-hairline bg-paper p-7 sm:p-8">
                        <h3 className="text-[20px] font-medium text-ink-800 m-0">Certification pathways</h3>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            We build your certification roadmap from day one — aligned to the
                            platforms you work on and the career direction you’re aiming for.
                        </p>
                        <ul className="m-0 mt-5 p-0 list-none flex flex-col gap-2.5">
                            {CERTIFICATIONS.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-ink-800">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7B5AA6] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article
                        data-reveal="rise"
                        data-delay="1"
                        className="rounded-card border border-hairline bg-paper p-7 sm:p-8 flex flex-col"
                    >
                        <h3 className="text-[20px] font-medium text-ink-800 m-0">
                            Performance reviews — yearly
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2">
                            Structured annual reviews with clear criteria, honest feedback, and
                            direct alignment between your performance and your compensation growth.
                        </p>
                        <ul className="m-0 mt-5 p-0 list-none flex flex-col gap-2.5">
                            {REVIEW_POINTS.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-ink-800">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3E3A97] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>

                <article
                    data-reveal="rise"
                    className="mt-5 rounded-card bg-surface-inverse text-white p-7 sm:p-9"
                >
                    <h3 className="text-[20px] font-medium m-0">Two tracks — specialist or leadership</h3>
                    <p className="text-[15px] leading-relaxed text-white/80 m-0 mt-2 max-w-[720px]">
                        Not everyone wants to manage people. At Sysgrate, you can build a senior
                        career as a deep technical specialist or grow into a leadership role — and
                        we support both equally.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                        <p className="m-0 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                            Principal / Lead Engineer track for technical depth
                        </p>
                        <p className="m-0 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                            Practice Lead / Director track for people leadership
                        </p>
                    </div>
                </article>
                <JoinTeam />
            </section>

            <section id="culture" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Life at Sysgrate
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        More than a job description.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        We work hard on what matters — and we make space for what makes work
                        sustainable and enjoyable. Here’s what day-to-day life actually looks like.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {LIFE.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                data-reveal="rise"
                                data-delay={index % 3 === 0 ? undefined : String(index % 3)}
                                className="group rounded-card border border-hairline bg-paper p-7 h-full transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35"
                            >
                                <span
                                    className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.tint}`}
                                >
                                    <Icon size={20} strokeWidth={2} style={{ color: item.accent }} />
                                </span>
                                <h3 className="text-[18px] font-medium text-ink-800 m-0 mt-6 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">
                                    {item.body}
                                </p>
                            </article>
                        );
                    })}
                </div>
                <JoinTeam />
            </section>

            <section id="roles" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Open positions
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        Roles open across our{" "}
                        <span className="sg-highlight font-medium">practices</span>.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        Specialist seats on live enterprise deployments. If one of these is the
                        work you want to go deep on, apply directly.
                    </p>
                </div>

                {OPEN_ROLES.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                        {OPEN_ROLES.map((role, index) => (
                            <article
                                key={role.title}
                                data-reveal="rise"
                                data-delay={index % 2 === 0 ? undefined : "1"}
                                className="group rounded-card border border-hairline bg-paper p-7 h-full flex flex-col transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35"
                            >
                                <p className="text-xs font-medium tracking-[0.06em] uppercase text-ink-300 m-0">
                                    {role.team}
                                </p>
                                <h3 className="text-[20px] font-medium text-ink-800 m-0 mt-3 leading-snug">
                                    {role.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed m-0 mt-2.5">
                                    {role.summary}
                                </p>
                                <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                                    <p className="text-sm text-text-secondary m-0">
                                        {role.location} · {role.type}
                                    </p>
                                    <a
                                        href={roleApplyHref(role.title)}
                                        className="text-sm font-medium text-link hover:text-link-hover shrink-0"
                                    >
                                        Apply →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : null}

                <div
                    data-reveal="rise"
                    className="mt-10 rounded-panel border border-hairline/80 px-8 py-12 sm:px-12 flex flex-col items-start gap-5"
                    style={{ background: "var(--panel-gradient)" }}
                >
                    <h3 className="text-[clamp(22px,2.4vw,32px)] font-normal tracking-[-0.02em] text-ink-800 m-0">
                        Don’t see the right role?
                    </h3>
                    <p className="text-[16px] leading-relaxed text-text-secondary m-0 max-w-[560px]">
                        A short note and your CV is enough. Tell us the practice you’d like to
                        go deep on — customer experience, digital workplace, modern workplace, or AI.
                    </p>
                    <MailLink>Send an open application</MailLink>
                </div>
            </section>

            <section id="process" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="max-w-[720px] flex flex-col gap-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        How we hire
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        A straightforward process. No surprises.
                    </h2>
                </div>
                <ol className="mt-10 m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {HIRE_STEPS.map((step, index) => (
                        <li
                            key={step.title}
                            data-reveal="rise"
                            data-delay={index > 0 ? String(Math.min(index, 3)) : undefined}
                            className="rounded-card border border-hairline bg-paper p-6 flex flex-col gap-3"
                        >
                            <span className="w-11 h-11 rounded-full bg-paper-card border border-hairline inline-flex items-center justify-center text-xs font-semibold tracking-wider text-link">
                                {step.index}
                            </span>
                            <h3 className="text-[18px] font-medium text-ink-800 m-0">{step.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0">{step.body}</p>
                        </li>
                    ))}
                </ol>
                <JoinTeam />
            </section>

            <section id="offices" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-32">
                <div data-reveal="rise" className="flex flex-col gap-4 max-w-[640px]">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        4 offices
                    </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {OFFICES.map((office, index) => (
                        <article
                            key={office.city}
                            data-reveal="rise"
                            data-delay={index > 0 ? String(Math.min(index, 3)) : undefined}
                            className="rounded-card border border-hairline bg-paper px-5 py-6"
                        >
                            <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">
                                {office.region}
                            </p>
                            <h3 className="text-[22px] font-medium text-ink-800 m-0 mt-2">{office.city}</h3>
                        </article>
                    ))}
                </div>
            </section>

            <section className="sg-container pt-[clamp(40px,6vw,72px)] pb-[clamp(64px,10vw,120px)]">
                <div
                    data-reveal="rise"
                    className="relative overflow-hidden rounded-panel border border-hairline/80 px-8 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20 flex flex-col items-start md:items-center md:text-center gap-5"
                    style={{ background: "var(--panel-gradient)" }}
                >
                    <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#E79AC0]/25 via-[#9A6EAC]/20 to-transparent blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#3E3A97]/15 via-transparent to-transparent blur-2xl" />
                    <h2 className="relative z-10 text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0 max-w-[760px]">
                        Your next move starts here.
                    </h2>
                    <p className="relative z-10 text-[17px] sm:text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                        Great work happens with great people. We’re building a team that’s serious
                        about technology and even more serious about outcomes.
                    </p>
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-1">
                        <JumpLink href="#roles">See all open roles</JumpLink>
                        <MailLink>Send an open application</MailLink>
                    </div>
                </div>
            </section>
        </>
    );
}
