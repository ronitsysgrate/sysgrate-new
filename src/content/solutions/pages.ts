export type Stat = { value: string; label: string; source?: string };
export type Offering = { title: string; body: string };
export type Story = { sector?: string; title: string; body: string };
export type LinkItem = { label: string; href: string };

export type SolutionPage = {
    slug: "solutions" | "employee-experience" | "modern-workplace";
    eyebrow: string;
    headline: string;
    highlight: string;
    alternate?: string;
    summary: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    image: { src: string; alt: string };
    statsEyebrow: string;
    stats: Stat[];
    solveEyebrow: string;
    solveTitle: string;
    solveBody: string[];
    deliverEyebrow: string;
    deliverTitle: string;
    deliverIntro: string;
    offerings: Offering[];
    midCtas: LinkItem[];
    platformsEyebrow: string;
    platformsTitle: string;
    platformsIntro: string;
    platforms: string[];
    capabilities?: { title: string; items: string[] };
    stories: Story[];
    closeLinks: LinkItem[];
    alternateHero?: { title: string; body: string; ctas: LinkItem[] };
    roomNote?: string;
};

const contact = "/contact";
const stories = "/#case-studies";

export const SOLUTION_PAGES: SolutionPage[] = [
    {
        slug: "solutions",
        eyebrow: "Customer Centre",
        headline: "Smarter contact centres. Better outcomes.",
        highlight: "Better outcomes",
        alternate: "We make your contact centre more efficient—without compromising experience.",
        summary:
            "We design, implement, and manage AI-powered cloud contact centre solutions that reduce costs, improve CSAT, and deliver seamless customer experiences — across every channel, in every market.",
        primaryCta: { label: "Book a CX consultation", href: contact },
        secondaryCta: { label: "Download capability deck", href: contact },
        image: {
            src: "/practice-areas/customer-experience.jpg",
            alt: "Contact centre agents working across an AI-assisted platform",
        },
        statsEyebrow: "What our CX clients typically achieve",
        stats: [
            { value: "↓40%", label: "Average handle time" },
            { value: "↑25%", label: "CSAT uplift" },
            { value: "24/7", label: "AI self-service coverage" },
            { value: "Weeks", label: "Not months to go-live" },
        ],
        solveEyebrow: "What we solve",
        solveTitle: "Built for how customers actually connect today",
        solveBody: [
            "Your customers move across channels without thinking—your contact centre needs to keep up.",
            "We help you create a seamless, omnichannel experience by connecting systems, streamlining workflows, and enabling faster resolutions.",
            "With deep experience across cloud and CX technologies, we guide you in choosing and implementing the right approach for your business.",
            "Whether you’re transforming your contact centre or enhancing what you already have, we help you make it work—efficiently and at scale.",
        ],
        deliverEyebrow: "What we deliver in CX",
        deliverTitle: "Six capabilities. One connected experience.",
        deliverIntro:
            "Most CX problems don't come from a single gap — they come from platforms that don't talk to each other. Everything we build is integrated by design, so your contact centre, CRM, AI layer, and workforce tools all move as one.",
        offerings: [
            {
                title: "Cloud Contact Center",
                body: "Migrate, build, or modernise your contact centre on Amazon Connect, Avaya, or Zoom Contact Center — designed for scale, compliance, and AI readiness from day one.",
            },
            {
                title: "Omnichannel Engagement",
                body: "Unify voice, email, live chat, WhatsApp, and social media into a single agent desktop — so every customer interaction is seamless, regardless of channel.",
            },
            {
                title: "Conversational AI & Virtual Agents",
                body: "Deploy AI-powered virtual agents and intelligent IVR that resolve, not just deflect, customer queries across voice and digital channels, 24 hours a day.",
            },
            {
                title: "Workforce Engagement Management",
                body: "Give supervisors the tools to monitor, coach, and improve agent performance — with call recording, speech analytics, quality management, and WFM all in one platform.",
            },
            {
                title: "CRM & ITSM Integration",
                body: "Connect your contact centre to Zendesk, HubSpot, Salesforce, or SAP — so agents have full customer context at every interaction, and CRM data stays accurate automatically.",
            },
            {
                title: "Outbound Campaigns & Dialers",
                body: "Run compliant, efficient outbound campaigns with progressive, preview, and predictive dialling — integrated with your CRM and powered by AI conversation analytics.",
            },
        ],
        midCtas: [
            { label: "Talk to a CX specialist", href: contact },
            { label: "See client stories", href: stories },
        ],
        platformsEyebrow: "Platforms",
        platformsTitle: "Platform-agnostic. Best-in-class.",
        platformsIntro:
            "We work across all major CX platforms — recommending the right stack for your business, not the one we're incentivised to sell.",
        platforms: [
            "Amazon Connect",
            "Avaya Experience Platform",
            "Zoom Contact Center",
            "Zendesk",
            "HubSpot",
            "Salesforce Service Cloud",
            "SAP C4C",
            "AWS Lex & Bedrock",
        ],
        capabilities: {
            title: "Core Contact Centre Capabilities",
            items: [
                "Skills-based routing",
                "Workforce Management",
                "Inbound, outbound, and blended calling",
                "Analytics, real-time and historical dashboards, and reporting",
                "Speech-enabled IVR and Intelligent Virtual Agents (IVAs)",
                "Predictive, progressive, power, preview, and manual dialling",
                "CTI screen pop",
                "Call recording",
                "Caller identification",
                "Campaign and list management",
                "Web callback",
                "Do Not Call compliance",
                "Screen recording",
                "CRM integration",
                "Agent scripting",
                "Agent assistance",
                "Post-call surveys",
                "Virtual assistants",
                "Quality assurance",
                "Speech analytics",
            ],
        },
        stories: [
            { sector: "Automotive", title: "Cycle & Carriage — AWS Connect OBC migration", body: "Read" },
            { sector: "Healthcare", title: "Fullerton Health — Zendesk + Zoom CC rollout", body: "Read" },
            { sector: "Telecoms", title: "[ Client 03 ] — Omnichannel transformation", body: "Read" },
        ],
        closeLinks: [
            { label: "Elevate your CX", href: contact },
            { label: "See all client stories", href: stories },
            { label: "Explore our platforms", href: "#platforms" },
        ],
    },
    {
        slug: "employee-experience",
        eyebrow: "Employee Experience",
        headline: "Enterprise collaboration and UCaaS — designed for how your teams actually work.",
        highlight: "actually work",
        alternate: "Smarter tools. Faster team performance. Unified communications that actually work.",
        summary:
            "Fragmented communication slows your business down. We connect your teams, tools, and workflows—so work moves faster, everywhere.",
        primaryCta: { label: "Request a UC assessment", href: contact },
        secondaryCta: { label: "Download capability deck", href: contact },
        image: {
            src: "/practice-areas/employee-experience.jpg",
            alt: "Team collaborating across voice, chat, and video",
        },
        statsEyebrow: "What enterprises achieve with a modern digital workplace",
        stats: [
            { value: "↑30%", label: "Employee productivity uplift", source: "McKinsey, 2024" },
            { value: "↓25%", label: "Reduction in IT communication costs", source: "Gartner" },
            { value: "89%", label: "Many employees use personal tools when company tools fail them", source: "Diversified Technology Survey" },
            { value: "Weeks", label: "Not months — our typical deployment timeline", source: "Sysgrate delivery benchmark" },
        ],
        solveEyebrow: "What we solve",
        solveTitle: "Fix what’s slowing your teams down",
        solveBody: [
            "Poor connectivity, scattered tools, and unreliable systems create delays your business can’t afford.",
            "We streamline your communication infrastructure—so teams collaborate better, respond faster, and keep work moving without disruption.",
        ],
        deliverEyebrow: "What we deliver",
        deliverTitle: "Everything your workforce needs to communicate, collaborate, and perform.",
        deliverIntro:
            "From UCaaS deployment to SBC architecture and managed UC operations — built around your infrastructure, your compliance needs, and your people.",
        offerings: [
            {
                title: "UCaaS Design & Deployment",
                body: "End-to-end Zoom Phone and Microsoft Teams Direct Routing deployment — from dial plan design and tenant provisioning to number porting and user onboarding, delivered without business disruption.",
            },
            {
                title: "Session Border Controller (SBC)",
                body: "Ribbon SBC design, configuration, and management — providing secure, reliable SIP trunking and voice gateway architecture for enterprise telephony environments worldwide.",
            },
            {
                title: "PBX to Cloud Migration",
                body: "Structured migration from legacy on-premise PBX — Avaya, Cisco, NEC, or any vendor — to a modern cloud telephony platform, with zero-downtime cutover planning and full user enablement.",
            },
            {
                title: "Collaboration Platform Integration",
                body: "Deep integration between your collaboration platform and business systems — CRM, ITSM, HR, and productivity tools — so your people spend less time switching apps and more time doing actual work.",
            },
            {
                title: "Managed UC Operations",
                body: "24×7 monitoring, SLA-backed support, and proactive management of your UCaaS environment — so your IT team isn't firefighting telephony issues instead of driving business value.",
            },
            {
                title: "AI-Enhanced Collaboration",
                body: "Zoom AI Companion, Teams Copilot, Zoom Revenue Accelerator, and conversational intelligence — AI capabilities embedded into your collaboration platform to boost every meeting, call, and interaction.",
            },
        ],
        midCtas: [
            { label: "Talk to a UC specialist", href: contact },
            { label: "View platform details", href: "#platforms" },
        ],
        platformsEyebrow: "Platforms we work with",
        platformsTitle: "Best-in-class platforms. Delivered by certified specialists.",
        platformsIntro:
            "We work across all major UCaaS and collaboration platforms — recommending the right stack for your organisation, not the one we're incentivised to sell.",
        platforms: [
            "Zoom Phone",
            "Zoom Revenue Accelerator",
            "Microsoft Teams Direct Routing",
            "Ribbon SBC",
            "Avaya Cloud Office",
            "Poly Devices",
            "AudioCodes SBC",
            "Cisco Webex",
        ],
        stories: [
            {
                title: "Brigade Group — Zoom Phone + ZRA + SAP C4C integration",
                body: "Replaced SIM-based calling with enterprise UCaaS. 100% call recording coverage, real-time CRM sync, and AI conversation intelligence from day one.",
            },
            {
                title: "[ Client name ] — [ Platform ] deployment",
                body: "[ One-line outcome statement. Keep it specific and measurable. ]",
            },
            {
                title: "[ Client name ] — [ Platform ] deployment",
                body: "[ One-line outcome statement. Keep it specific and measurable. ]",
            },
        ],
        closeLinks: [
            { label: "See the platform in action", href: "#platforms" },
            { label: "See all client stories", href: stories },
            { label: "Explore our platforms", href: "#platforms" },
        ],
    },
    {
        slug: "modern-workplace",
        eyebrow: "Modern Workplace",
        headline: "Meeting rooms that just work.",
        highlight: "just work",
        summary:
            "Complicated setups, unreliable AV, and constant IT support requests disrupt productivity and frustrate teams. We build intuitive, fully integrated meeting spaces with unified communications, conferencing systems, and smart controls—so every meeting starts on time and runs smoothly.",
        primaryCta: { label: "Evaluate your workplace", href: contact },
        secondaryCta: { label: "Download capability deck", href: contact },
        image: {
            src: "/practice-areas/modern-workplace.jpg",
            alt: "Integrated meeting room with conferencing and smart controls",
        },
        alternateHero: {
            title: "Intelligent spaces for better work",
            body: "Workspaces should enable productivity—not slow it down with technical friction and poor user experience. We create AI-enabled, integrated workplace environments with smart AV, automation, and collaboration tools that improve efficiency and user experience.",
            ctas: [
                { label: "Evaluate your workplace", href: contact },
                { label: "View our projects", href: stories },
            ],
        },
        statsEyebrow: "What a well-designed workplace environment delivers",
        stats: [
            { value: "↑30%", label: "Increase in meeting effectiveness with AV-integrated spaces", source: "Applied Global Solutions" },
            { value: "73%", label: "Some employees say poor meeting room tech reduces productivity", source: "Microsoft Work Trend Index" },
            { value: "40%", label: "Many meeting rooms go unused due to poor booking and AV reliability", source: "Gartner" },
            { value: "1 day", label: "Our typical AV room fit-out per space — minimal disruption", source: "Sysgrate delivery benchmark" },
        ],
        roomNote:
            "Every room reflects how your business works. A boardroom that impresses. A meeting room that connects every participant, in every location, without friction. A command centre where decisions happen faster. We build all three — and everything in between — with AV infrastructure that your teams will never notice because it just works.",
        solveEyebrow: "What we deliver",
        solveTitle: "From boardroom to building — we integrate it all.",
        solveBody: [
            "AV design, installation, integration, and managed operations across every workspace type — delivered by certified specialists who've run every environment we build.",
        ],
        deliverEyebrow: "What we deliver",
        deliverTitle: "From boardroom to building — we integrate it all.",
        deliverIntro:
            "AV design, installation, integration, and managed operations across every workspace type — delivered by certified specialists who've run every environment we build.",
        offerings: [
            {
                title: "Boardrooms & Executive Suites",
                body: "High-impact AV environments for leadership meetings, investor presentations, and client engagements — with premium displays, intelligent audio, and one-touch video conferencing built in from day one.",
            },
            {
                title: "Hybrid Meeting Rooms",
                body: "Intelligently designed collaboration spaces where remote and in-room participants are equal — with pro-grade PTZ cameras, beam-forming microphones, and platform-agnostic one-touch join for Zoom, Teams, and beyond.",
            },
            {
                title: "Video Walls & Large Format Displays",
                body: "LED video walls, LCD display arrays, and large-format screens for lobbies, operations floors, trading rooms, and public-facing environments — designed for 24/7 reliability and maximum visual impact.",
            },
            {
                title: "Command & Operations Centres",
                body: "Mission-critical AV environments for NOCs, SOCs, and operations floors — with multi-source video switching, redundant display infrastructure, and control room automation built for continuous operation.",
            },
            {
                title: "Digital Signage",
                body: "Dynamic, content-managed digital signage for internal communications, wayfinding, lobby displays, and brand environments — cloud-managed, scalable, and integrated with your workplace platforms.",
            },
            {
                title: "Training Rooms & Auditoriums",
                body: "Purpose-built AV for learning and large-format presentation environments — with interactive displays, lecture capture, distributed audio, and live streaming capability for hybrid and in-person audiences.",
            },
        ],
        midCtas: [
            { label: "Talk to an AV specialist", href: contact },
            { label: "View our projects", href: stories },
        ],
        platformsEyebrow: "Platforms",
        platformsTitle: "Best-in-class hardware. Best-in-class integration.",
        platformsIntro:
            "We are brand-agnostic and vendor-certified — recommending the right technology for each space, not the easiest to sell.",
        platforms: [
            "Poly (HP)",
            "Crestron",
            "Barco",
            "Samsung LED",
            "LG Commercial Displays",
            "Zoom Rooms",
            "Microsoft Teams Rooms",
            "Logitech",
            "Yealink",
            "QSC Audio",
            "Shure",
            "BrightSign",
            "Jabra",
            "Neat",
        ],
        stories: [
            {
                title: "[ Client name ] — [ Platform ] deployment",
                body: "[ One-line outcome statement. Keep it specific and measurable. ]",
            },
            {
                title: "[ Client name ] — [ Platform ] deployment",
                body: "[ One-line outcome statement. Keep it specific and measurable. ]",
            },
            {
                title: "[ Client name ] — [ Platform ] deployment",
                body: "[ One-line outcome statement. Keep it specific and measurable. ]",
            },
        ],
        closeLinks: [
            { label: "Discuss your AV requirement", href: contact },
            { label: "See all client stories", href: stories },
            { label: "Explore our platforms", href: "#platforms" },
        ],
    },
];

export function solutionHref(slug: SolutionPage["slug"]) {
    return slug === "solutions" ? "/solutions" : `/solutions/${slug}`;
}
