export type Stat = { value: string; label: string; note?: string };
export type Block = { title: string; lede?: string; body: string; points?: string[] };
export type CompareRow = { category: string; direct: string; sysgrate: string; advantage: string };

export type PlatformPage = {
    slug: string;
    name: string;
    eyebrow: string;
    headline: string;
    highlight: string;
    summary: string;
    image: { src: string; alt: string };
    primaryCta: string;
    secondaryCta: string;
    stats: Stat[];
    introTitle: string;
    introBody: string[];
    pillars: { title: string; body: string }[];
    capabilitiesTitle: string;
    capabilitiesIntro: string;
    capabilities: Block[];
    processTitle?: string;
    processIntro?: string;
    process?: { title: string; lede: string; body: string }[];
    integrationsTitle?: string;
    integrationsIntro?: string;
    integrations?: { title: string; body: string }[];
    comparison?: { title: string; intro: string; rows: CompareRow[] };
};

const contact = "/contact";

export const PLATFORMS: PlatformPage[] = [
    {
        slug: "amazon-connect",
        name: "Amazon Connect",
        eyebrow: "AWS",
        headline: "Seamless CX. Delivered with Amazon Connect.",
        highlight: "Amazon Connect",
        summary:
            "Cloud contact centre design, migration, AI integration, and 24/7 managed operations — by a certified AWS Service Delivery Partner with deep CRM integration expertise and a proven track record worldwide.",
        image: {
            src: "/practice-areas/customer-experience.jpg",
            alt: "Contact centre agents working across an AI-assisted platform",
        },
        primaryCta: "Book a free assessment",
        secondaryCta: "Explore our services",
        stats: [
            { value: "50+", label: "Contact centres deployed", note: "Certified Service Delivery Partner" },
            { value: "6 wks", label: "Average go-live from day one" },
            { value: "24/7", label: "Managed operations" },
            { value: "↓24%", label: "Inbound call volume via AI self-service" },
        ],
        introTitle: "The cloud contact center built for enterprise scale",
        introBody: [
            "Amazon Connect is AWS's omnichannel cloud contact center — built to deliver superior customer experiences at any scale. It combines AI, real-time analytics, and flexible routing in a single, pay-as-you-go platform.",
            "Sysgrate is a certified Amazon Connect Service Delivery Partner — meaning we've been validated by AWS for expertise in deploying and managing Amazon Connect solutions across industries.",
        ],
        pillars: [
            {
                title: "No upfront infrastructure cost",
                body: "Pure cloud: spin up a fully functional contact centre in hours. Pay per minute, per agent — never for capacity you're not using.",
            },
            {
                title: "AI built in from day one",
                body: "Contact Lens, Amazon Lex, and Bedrock — native AI for sentiment analysis, virtual agents, and automated call summaries.",
            },
            {
                title: "Connects to your entire stack",
                body: "Salesforce, HubSpot, Zendesk, ServiceNow — pre-built integrations that go live without months of custom development.",
            },
        ],
        capabilitiesTitle: "Every call. Every chat. Fully analysed. Automatically.",
        capabilitiesIntro:
            "Amazon Connect's native AI services — Contact Lens, Amazon Lex, Bedrock, and Voice ID — work together to surface intelligence that was previously buried in unstructured conversation data.",
        capabilities: [
            {
                title: "Contact Lens",
                lede: "Conversational analytics & quality management",
                body: "Contact Lens uses machine learning to analyse every call and chat in real time — detecting customer sentiment, identifying compliance risks, and surfacing coaching opportunities for supervisors before the interaction even ends.",
                points: [
                    "Real-time sentiment scoring and escalation alerts",
                    "Automated call transcription — 100% of interactions, not samples",
                    "Keyword and phrase detection for compliance monitoring",
                    "AI-generated call summaries — reducing after-call work by up to 40%",
                ],
            },
            {
                title: "Amazon Lex",
                lede: "Conversational AI & intelligent self-service",
                body: "Amazon Lex brings the same deep learning technology behind Alexa to your contact centre — enabling natural language IVR, AI-powered chatbots, and intelligent self-service that understands intent, not just keywords.",
                points: [
                    "Natural language understanding — no touch-tone menus required",
                    "Multi-turn conversation handling across voice and chat",
                    "Seamless escalation to a human agent with full context preserved",
                    "Supports 8+ languages — including English, Hindi, Arabic, and Malay",
                ],
            },
            {
                title: "Amazon Bedrock & Generative AI",
                lede: "Generative AI for agent assistance & automation",
                body: "Amazon Bedrock brings foundation models into the contact centre — powering real-time agent assistance, knowledge base search, and automated post-call processing.",
                points: [
                    "Real-time agent assist during live calls",
                    "AI-generated post-call summaries and next-step recommendations",
                    "Automated CRM data population from conversation content",
                    "Generative AI for email and chat response drafting",
                ],
            },
            {
                title: "Voice ID",
                lede: "Biometric voice authentication",
                body: "Amazon Connect Voice ID verifies customer identity through their voice — eliminating knowledge-based authentication questions and reducing average handle time.",
                points: [
                    "Passive voice enrolment during natural conversation",
                    "Real-time identity verification — no questions, no friction",
                    "Fraud risk detection and suspicious voice flagging",
                    "Particularly high-value in BFSI and regulated environments",
                ],
            },
            {
                title: "Real-time & historical analytics",
                lede: "Dashboards built for action",
                body: "Real-time supervisor dashboards, historical reporting, and streaming analytics via Amazon Kinesis — feeding QuickSight, custom BI tools, or third-party platforms.",
                points: [
                    "Live queue, agent, and channel performance dashboards",
                    "Kinesis data streams for real-time CRM and BI integration",
                    "Custom historical reports aligned to your SLA and KPI framework",
                ],
            },
            {
                title: "Customer Profiles & Wisdom",
                lede: "Single customer view",
                body: "Customer Profiles unifies CRM, order, and business data into one view. Connect Wisdom surfaces relevant knowledge and suggested responses before the agent needs to search.",
                points: [
                    "Unified profile from Salesforce, HubSpot, SAP, and more",
                    "Full interaction history across all channels",
                    "AI-powered next-best-action recommendations during live calls",
                ],
            },
        ],
        processTitle: "How we build your Amazon Connect journey",
        processIntro:
            "Every deployment follows a methodology refined across 50+ deployments. Every integration is built to production standards, and every managed service is backed by an SLA.",
        process: [
            {
                title: "Strategy & Advisory",
                lede: "Discovery before deployment.",
                body: "We audit your current contact centre, map your call flows, assess CRM dependencies, and define success metrics — before any architecture or platform decisions are made.",
            },
            {
                title: "Solution Design & Delivery",
                lede: "Built for your business, not a template.",
                body: "Architecture design, IVR flow build, AI configuration, and full CRM integration — delivered using our pre-built tooling to go live 30–50% faster than DIY AWS deployment.",
            },
            {
                title: "Platform & Systems Integration",
                lede: "Amazon Connect connected to your entire stack.",
                body: "Pre-built connectors and custom middleware. Your agents have full customer context before they say hello.",
            },
            {
                title: "Managed Operations",
                lede: "24/7 management — long after go-live.",
                body: "Proactive monitoring, SLA-backed support, quarterly optimisation reviews, and continuous improvement.",
            },
        ],
        integrationsTitle: "Amazon Connect connects to your entire technology stack",
        integrationsIntro: "Pre-built native integrations and Sysgrate-developed connectors for the most common enterprise stacks.",
        integrations: [
            { title: "HubSpot CRM", body: "Screen pops, automatic call logging, contact timeline sync, and deal pipeline updates — triggered by every Amazon Connect interaction." },
            { title: "Salesforce", body: "CTI adapter, Service Cloud Voice integration, case auto-creation, and a real-time agent workspace embedded directly into Salesforce." },
            { title: "Zendesk", body: "Ticket auto-creation, an agent widget for call handling inside Zendesk, and full conversation sync with contact history preserved." },
            { title: "ServiceNow", body: "Incident auto-creation, CMDB lookup during live calls, and workflow triggering based on call disposition and outcome." },
            { title: "Amazon QuickSight", body: "Real-time and historical contact centre dashboards via Kinesis data streams — configurable to your SLA and KPI framework." },
            { title: "Microsoft Teams", body: "Expert finder, escalation routing, and agent collaboration directly from within the Amazon Connect agent workspace." },
        ],
    },
    {
        slug: "zoom",
        name: "Zoom",
        eyebrow: "Zoom Platinum Partner",
        headline: "One platform. Smarter conversations. Powered by Zoom.",
        highlight: "Powered by Zoom",
        summary:
            "Zoom brings contact centre, telephony, meetings, and collaboration into one platform — with a unified experience and built-in generative AI. Sysgrate, a Zoom Platinum Partner, delivers it end to end.",
        image: {
            src: "/practice-areas/employee-experience.jpg",
            alt: "Teams collaborating across Zoom phone, meetings, and chat",
        },
        primaryCta: "Book a Zoom consultation",
        secondaryCta: "See client stories",
        stats: [
            { value: "↓30%", label: "Average handle time with Zoom AI assist", note: "Zoom platform benchmark" },
            { value: "↑25%", label: "Agent productivity with ZRA coaching", note: "Sysgrate deployment data" },
            { value: "100%", label: "Interaction coverage with AI quality management", note: "vs. 2–5% sampled QA" },
            { value: "1 app", label: "Replaces phone, contact centre, meetings, and chat", note: "vs. 4+ disconnected tools" },
        ],
        introTitle: "Voice, CX, collaboration, and AI",
        introBody: [
            "When most people think of Zoom, they think of video meetings. The platform has evolved far beyond that. Today, Zoom provides a single cloud application for business telephony, contact centre, AI collaboration, webinars, virtual agents, and workforce management.",
            "For enterprises, that familiarity is a strategic advantage: lower training costs, higher adoption, and faster time to value than any multi-vendor alternative.",
        ],
        pillars: [
            {
                title: "One app. Not four platforms bolted together.",
                body: "Contact centre, phone, meetings, and chat — all in a single application. Agents, employees, and supervisors use the same interface.",
            },
            {
                title: "AI Companion — embedded, not added on.",
                body: "Meeting summaries, real-time transcription, chat composition, and conversation intelligence without a separate AI licence or integration.",
            },
            {
                title: "Cloud-native. Infinitely scalable.",
                body: "No on-premise hardware. Zoom scales across geographies, languages, and channels — from a 10-person team to a 10,000-seat operation.",
            },
        ],
        capabilitiesTitle: "Zoom powers every interaction in your enterprise",
        capabilitiesIntro: "From the first customer call to the last internal meeting — products that share AI, analytics, and a common interface.",
        capabilities: [
            {
                title: "Zoom Contact Center",
                lede: "An AI-native omnichannel contact centre",
                body: "Voice, video, chat, email, SMS, and social unified in a single agent workspace, built on the same infrastructure as Zoom's collaboration suite.",
                points: [
                    "Omnichannel routing — voice, video, chat, email, SMS, social",
                    "Native AI with generative summaries and real-time assist",
                    "Built-in WFM and quality management",
                    "CRM integration — Salesforce, HubSpot, Zendesk, ServiceNow",
                ],
            },
            {
                title: "Zoom Virtual Agent",
                lede: "Self-service that resolves",
                body: "An AI-powered virtual agent that handles complex, multi-turn conversations across chat and voice, and escalates to a live agent with full context.",
                points: [
                    "Natural language understanding — not keyword matching",
                    "Seamless escalation to Zoom Contact Center",
                    "Generative AI responses from your knowledge base",
                    "Multilingual — English, Hindi, Arabic, Malay, and more",
                ],
            },
            {
                title: "Zoom Phone",
                lede: "Enterprise cloud telephony",
                body: "Voice calling, call recording, voicemail transcription, and AI conversation intelligence that replaces on-premise PBX.",
                points: [
                    "Cloud PBX replacement — no hardware, no planned downtime",
                    "Zoom Revenue Accelerator for sales conversation intelligence",
                    "Auto-attendant, call queues, hunt groups, and IVR",
                    "Direct Routing and PSTN calling across 50+ countries",
                ],
            },
            {
                title: "Zoom Workplace",
                lede: "AI-powered collaboration",
                body: "Meetings, team chat, whiteboard, and calendar in a single application, with Zoom AI Companion embedded throughout.",
                points: [
                    "AI-powered meeting summaries and action items",
                    "Persistent team chat with thread summarisation",
                    "Zoom Rooms for meeting room video",
                    "Works natively with Zoom Phone and Zoom Contact Center",
                ],
            },
        ],
        processTitle: "How Sysgrate delivers Zoom",
        processIntro: "We are a Zoom Platinum Partner — certified across Contact Center, Phone, Virtual Agent, and Workplace.",
        process: [
            {
                title: "Strategy & Advisory",
                lede: "Platform selection before platform purchase.",
                body: "We help enterprises evaluate the right Zoom products — with a business case, TCO analysis, and implementation roadmap before any licence is committed.",
            },
            {
                title: "Solution Design & Delivery",
                lede: "Configured for your business. Deployed without disruption.",
                body: "Tenant provisioning, dial plan design, contact flow build, AI configuration, and user onboarding — delivered with our accelerators for faster go-live.",
            },
            {
                title: "Platform & Systems Integration",
                lede: "Zoom connected to your entire stack.",
                body: "CRM, ITSM, analytics, and HR platforms integrated so every agent has full context and every interaction is automatically logged.",
            },
            {
                title: "Managed Operations",
                lede: "24/7 management — ongoing, not one-off.",
                body: "SLA-backed monitoring, proactive support, and quarterly optimisation reviews. We stay accountable for the outcomes, not just the deployment milestone.",
            },
        ],
    },
    {
        slug: "zendesk",
        name: "Zendesk",
        eyebrow: "Zendesk",
        headline: "Zendesk for modern support operations.",
        highlight: "modern support",
        summary:
            "Zendesk brings together ticketing, omnichannel CX, AI agents, quality assurance, workforce management, and a self-improving knowledge base — eliminating the middleware complexity that slows most enterprise support operations.",
        image: {
            src: "/practice-areas/artificial-intelligence.jpg",
            alt: "Support specialist working in a unified service workspace",
        },
        primaryCta: "Book a free Zendesk consultation",
        secondaryCta: "See client stories",
        stats: [
            { value: "80%", label: "Of interactions AI agents can automate end-to-end" },
            { value: "1,800+", label: "Pre-built marketplace integrations" },
            { value: "50,000+", label: "Service knowledge bases in the Knowledge Graph" },
            { value: "30–50%", label: "Faster deployment than a default setup", note: "With Sysgrate" },
        ],
        introTitle: "The AI-first service platform",
        introBody: [
            "From ticketing and omnichannel support to AI agents and workforce management, Zendesk unifies customer service into one platform — continuously improving through every interaction.",
            "Sysgrate configures, integrates, and manages Zendesk to deliver measurable outcomes from day one.",
        ],
        pillars: [
            {
                title: "AI that improves itself — automatically.",
                body: "Zendesk’s Resolution Learning Loop continuously improves AI accuracy from every resolved interaction.",
            },
            {
                title: "Knowledge built for resolution, not just search.",
                body: "Zendesk’s Knowledge Graph connects 50,000+ knowledge bases to deliver real-time answers across AI agents, human agents, and customers.",
            },
            {
                title: "Enterprise-grade. Fast to deploy.",
                body: "Unlike legacy platforms, Zendesk is built for rapid deployment and scales from lean teams to global operations.",
            },
        ],
        capabilitiesTitle: "One platform for conversations, automation, and faster resolutions",
        capabilitiesIntro: "Customer conversations, AI agents, workforce management, and knowledge — configured around how your business actually operates.",
        capabilities: [
            {
                title: "Zendesk AI Agents",
                body: "AI agents resolve customer issues autonomously across voice, chat, email, social, and messaging. They reason through complex queries, access live data, and improve with every interaction.",
                points: [
                    "Automate up to 80% of customer interactions end-to-end",
                    "AI Agent Builder — no-code custom agent creation",
                    "Resolution Learning Loop — continuous self-improvement",
                    "Federated search across knowledge bases and connected data",
                ],
            },
            {
                title: "Zendesk Copilot",
                body: "A proactive AI assistant in the agent workspace — suggested responses, relevant articles, and next-best actions, without leaving the ticket.",
                points: [
                    "Real-time response suggestions from ticket context",
                    "AI-generated ticket summaries",
                    "Autonomous actions in Jira, Slack, and CRM systems",
                    "AI Reasoning Controls — transparency into decisions",
                ],
            },
            {
                title: "Zendesk for Contact Centre",
                body: "AI-native voice alongside every digital channel in one agent workspace. Transcription, sentiment, and after-call work are built in.",
                points: [
                    "AI-powered voice with real-time transcription",
                    "Intelligent IVR — personalised, not static touch-tone",
                    "Automated after-call work",
                    "Unified agent workspace — voice and digital together",
                ],
            },
            {
                title: "Quality assurance & workforce management",
                body: "QA scores every interaction — human and AI. WFM forecasts demand, optimises scheduling, and manages adherence.",
                points: [
                    "Custom QA scorecards across all interactions",
                    "AI-powered demand forecasting",
                    "Real-time adherence and intraday management",
                    "Omnichannel live monitoring — queues, agents, SLAs",
                ],
            },
        ],
        processTitle: "How Sysgrate delivers Zendesk",
        processIntro: "Full lifecycle — combined with platform licensing in a single engagement. We don't hand off after go-live.",
        process: [
            {
                title: "Strategy & Advisory",
                lede: "Workflow design before platform configuration.",
                body: "Channel mapping, SLA architecture, automation logic, integration scoping, and AI readiness — before any licence is purchased.",
            },
            {
                title: "Solution Design & Delivery",
                lede: "Configured for your workflows. 30–50% faster.",
                body: "SLA policies, routing rules, IVR design, AI agent setup, knowledge base build, and QA scorecards — deployed with our accelerators.",
            },
            {
                title: "Ecosystem integration",
                lede: "Zendesk + Zoom + HubSpot — one connected system.",
                body: "Bi-directional sync across all three — automated call logging, ticket creation, CRM updates, and priority routing.",
            },
            {
                title: "Managed Operations",
                lede: "24/7 support. Continuous improvement.",
                body: "Platform administration, AI agent tuning, SLA monitoring, and quarterly reviews — with priority partner escalation.",
            },
        ],
        comparison: {
            title: "Why Zendesk is built for better CX with Sysgrate",
            intro: "We architect Zendesk around how your business operates — and stay to make sure it delivers.",
            rows: [
                { category: "Licensing", direct: "Standard vendor pricing", sysgrate: "Partner pricing — 0% markup", advantage: "10–25% lower cost" },
                { category: "Deployment", direct: "Basic setup — platform defaults", sysgrate: "Strategic workflow implementation", advantage: "30–50% faster" },
                { category: "Integrations", direct: "Minimal — manual setup", sysgrate: "Full Zoom + HubSpot + Zendesk sync", advantage: "Unified workflows" },
                { category: "Automation", direct: "None included", sysgrate: "RevOps + CX workflow engineering", advantage: "2–5× efficiency gain" },
                { category: "Support", direct: "Standard vendor queues", sysgrate: "Priority partner escalation", advantage: "40–60% faster resolution" },
            ],
        },
    },
];

export function platformHref(slug: string) {
    return `/platforms/${slug}`;
}

export function getPlatform(slug: string) {
    return PLATFORMS.find((page) => page.slug === slug);
}

export { contact };
