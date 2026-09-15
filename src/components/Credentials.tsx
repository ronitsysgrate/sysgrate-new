"use client";

import React from "react";
import {
  Award,
  ShieldCheck,
  BadgeCheck,
  Network,
  Cloud,
  CheckCircle2,
} from "lucide-react";

interface Credential {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  tags: string[];
  featured?: boolean;
  accentGradient: string;
}

const CREDENTIALS: Credential[] = [
  {
    id: "zoom-platinum",
    badge: "Premier Status",
    title: "Zoom Platinum Partner",
    highlight: "Zoom Platinum Partner — Asia-Pacific",
    description:
      "Highest partner tier recognition for architecture, deployment, and ongoing management of Zoom Phone, Zoom Contact Center, and Modern Workplace collaboration suites across APAC enterprises.",
    icon: Award,
    tags: ["Zoom Phone", "Contact Center", "Direct Routing", "Asia-Pacific"],
    featured: true,
    accentGradient: "from-[#3E3A97]/20 via-[#7B5AA6]/20 to-[#E79AC0]/20",
  },
  {
    id: "multi-platform",
    badge: "Certified Engineering",
    title: "Multi-Platform Partner Ecosystem",
    highlight: "Certified AWS, Avaya, Microsoft Teams, Ribbon & AudioCodes SBC Partner",
    description:
      "Certified across enterprise voice routing, session border controllers, legacy telephony bridges, and modern cloud contact centers. We hold direct technical accreditations across every ecosystem we build on.",
    icon: ShieldCheck,
    tags: ["AWS", "Avaya", "MS Teams", "Ribbon", "AudioCodes"],
    accentGradient: "from-[#26205A]/15 via-[#4A3E92]/10 to-[#9A6EAC]/15",
  },
  {
    id: "leadership",
    badge: "Proven Heritage",
    title: "20+ Years CX & UC Leadership",
    highlight: "Leadership team with 20+ years of CX & UC industry experience",
    description:
      "Our principal architects and delivery directors have guided enterprise communications through every major evolution—from legacy on-prem PBX and TDM to omnichannel cloud and agentic AI.",
    icon: BadgeCheck,
    tags: ["20+ Years Experience", "Enterprise Architecture", "C-Suite Advisory"],
    accentGradient: "from-[#7B5AA6]/15 via-[#E4D8F3]/40 to-[#DBD7F6]/40",
  },
  {
    id: "integration",
    badge: "Core Capability",
    title: "Deep Systems Integration",
    highlight: "Deep software & systems integration expertise",
    description:
      "We build custom middleware, CTI connectors, and bidirectional pipelines synchronizing customer data across Salesforce, Zendesk, HubSpot, and proprietary internal banking/ERP backends.",
    icon: Network,
    tags: ["REST & GraphQL", "CRM Sync", "Event-Driven", "CTI Screen-Pop"],
    accentGradient: "from-[#3E3A97]/15 via-[#26205A]/10 to-[#9A6EAC]/15",
  },
  {
    id: "amazon-connect",
    badge: "Cloud Contact Centre",
    title: "Proven Amazon Connect Delivery",
    highlight: "Proven Amazon Connect delivery across APAC",
    description:
      "Production-hardened AWS contact center architectures with multi-country telephony routing, custom Lex AI voicebots, Lambda microservice flows, and high-availability enterprise resilience.",
    icon: Cloud,
    tags: ["Amazon Connect", "Amazon Lex", "Lambda Flows", "Cross-Border APAC"],
    accentGradient: "from-[#E79AC0]/20 via-[#9A6EAC]/15 to-[#3E3A97]/20",
  },
];

export default function Credentials() {
  const featured = CREDENTIALS.find((c) => c.featured);
  const secondary = CREDENTIALS.filter((c) => !c.featured);

  return (
    <section id="credentials" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-[720px] flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            Accreditations &amp; Heritage
          </span>

          <h2 className="text-[clamp(28px,3.5vw,52px)] font-normal leading-[1.12] tracking-[-0.02em] text-ink-800 m-0">
            Certified. Experienced.{" "}
            <span className="sg-highlight font-medium">Proven</span>.
          </h2>

          <p className="text-[18px] leading-[1.55] text-text-secondary m-0 max-w-[620px]">
            Enterprise certifications, tier-1 partner tier recognition, and two decades of engineering leadership across Asia-Pacific and the Middle East.
          </p>
        </div>

        {/* Quick Trust Stat Pills */}
        <div className="flex items-center flex-wrap gap-2 self-start lg:self-end">
          <div className="px-4 py-2 rounded-full bg-paper border border-hairline shadow-sm text-xs font-medium text-text-secondary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Tier-1 Platinum Status</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-paper border border-hairline shadow-sm text-xs font-medium text-text-secondary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7B5AA6] inline-block" />
            <span>20+ Years CX Experience</span>
          </div>
        </div>
      </div>

      {/* Featured Zoom Platinum Hero Card */}
      {featured && (
        <div className="mt-10 sg-animate-rise">
          <div className="group relative bg-paper rounded-panel border border-hairline p-8 sm:p-10 md:p-12 overflow-hidden transition-all duration-300 hover:shadow-float hover:border-[#9A6EAC]/40">
            {/* Ambient Background Gradient Art */}
            <div
              className={`absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl ${featured.accentGradient} opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none rounded-panel`}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-8">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-surface-inverse text-white shadow-pill">
                    <featured.icon size={13} strokeWidth={2.2} />
                    {featured.badge}
                  </span>
                  <span className="text-xs font-mono font-medium text-ink-300 uppercase tracking-wider">
                    Asia-Pacific
                  </span>
                </div>

                <h3 className="text-[clamp(24px,2.6vw,36px)] font-medium text-ink-800 m-0 leading-[1.2] group-hover:text-link transition-colors">
                  {featured.highlight}
                </h3>

                <p className="text-base text-text-secondary leading-relaxed m-0 max-w-[620px]">
                  {featured.description}
                </p>

                {/* Capability Tags */}
                <div className="flex items-center flex-wrap gap-2 pt-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-paper-card text-text-secondary border border-hairline"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Graphical Badge Card on Right */}
              <div className="hidden lg:flex flex-col justify-between h-[220px] rounded-card bg-white/80 backdrop-blur-md border border-white/90 p-7 shadow-chip">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#7B5AA6] font-semibold tracking-wider">
                    Zoom Certified Ecosystem
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#EAE8F5] flex items-center justify-center text-[#26205A]">
                    <CheckCircle2 size={16} strokeWidth={2.4} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-2xl font-bold text-ink-800 tracking-tight">
                    Platinum Tier
                  </div>
                  <p className="text-xs text-text-secondary m-0">
                    Validated for multi-thousand seat enterprise deployments with end-to-end SLA support.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-link">
                  <span>Explore Zoom practice</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Secondary Credential Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {secondary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group relative bg-paper rounded-card border border-hairline p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35 overflow-hidden"
            >
              {/* Subtle ambient accent glow on hover */}
              <div
                className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${item.accentGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-bl-full pointer-events-none`}
              />

              <div>
                {/* Top: Badge + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-paper-card text-text-secondary border border-hairline">
                    {item.badge}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-paper-card flex items-center justify-center text-ink-800 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#EAE8F5] group-hover:text-surface-inverse">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                </div>

                {/* Highlight Title */}
                <h4 className="text-[17px] font-medium text-ink-800 m-0 leading-snug group-hover:text-link transition-colors">
                  {item.highlight}
                </h4>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed mt-3 mb-0">
                  {item.description}
                </p>
              </div>

              {/* Tags at bottom */}
              <div className="pt-5 mt-5 border-t border-hairline/80 flex items-center flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-paper-muted text-ink-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
