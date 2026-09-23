"use client";

import React, { useState } from "react";
import {
  Award,
  Scale,
  Target,
  Zap,
  Globe2,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

interface Differentiator {
  number: string;
  title: string;
  highlightWords?: string;
  sysgrateAdvantage: string;
  competitorLabel: string;
  competitorDrawback: string;
  icon: LucideIcon;
  accentColor: string;
  bgTint: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    number: "01",
    title: "Specialist depth — not account management dressed as delivery",
    sysgrateAdvantage:
      "The engineers who scope your engagement at Sysgrate are the engineers who deliver it. Certified on Zoom, AWS, Avaya, Microsoft, and Zendesk — not generalists managed by a practice lead who was last on tools five years ago.",
    competitorLabel: "Large SI Reality",
    competitorDrawback:
      "Senior consultants sell the work. Junior contractors deliver it. You meet the senior team once.",
    icon: Award,
    accentColor: "#7B5AA6",
    bgTint: "bg-[#F4EEF8]",
  },
  {
    number: "02",
    title: "Platform-agnostic — we recommend what's right, not what we're incentivised to sell",
    sysgrateAdvantage:
      "We hold certifications across every major platform we work with — which means we can genuinely recommend Amazon Connect over Zoom, or HubSpot over Salesforce, based entirely on your requirements. Not on which vendor is paying our margin this quarter.",
    competitorLabel: "OEM Professional Services",
    competitorDrawback:
      "Recommends the vendor's own platform. Every time. Without exception.",
    icon: Scale,
    accentColor: "#3E3A97",
    bgTint: "bg-[#EEEDF8]",
  },
  {
    number: "03",
    title: "Accountable beyond go-live — not a project closed and an invoice sent",
    sysgrateAdvantage:
      "Our managed operations, XaaS, and embedded expertise models exist because we believe accountability should not end at the go-live milestone. We measure ourselves against the outcomes we committed to — CSAT, AHT, adoption, and platform performance — long after the project is formally closed.",
    competitorLabel: "Large SI Reality",
    competitorDrawback:
      "The delivery team moves to the next project. Your platform performance is somebody else's problem.",
    icon: Target,
    accentColor: "#26205A",
    bgTint: "bg-[#EAE8F5]",
  },
  {
    number: "04",
    title: "30–50% faster delivery — built into how we work, not promised at bid",
    sysgrateAdvantage:
      "Pre-built contact flow templates, IVR migration tooling, CRM integration accelerators, and a delivery methodology refined across 500+ projects. We go live faster not because we take shortcuts — but because we have done this enough times to know exactly where the time goes and how to recover it.",
    competitorLabel: "Large SI Reality",
    competitorDrawback:
      "Bespoke project plan. Standard methodology. Six months to go-live. Budget overrun on scope change.",
    icon: Zap,
    accentColor: "#E79AC0",
    bgTint: "bg-[#FAF0F5]",
  },
  {
    number: "05",
    title: "Regional presence — APAC and Middle East, not a global firm managing you from London",
    sysgrateAdvantage:
      "Offices in Singapore, India, Malaysia, and the UAE — with engineers, architects, and project managers who understand the compliance requirements, carrier environments, and operational realities of the markets your business operates in. We can be on-site when it matters, in the time zone that makes sense.",
    competitorLabel: "Global SI Reality",
    competitorDrawback:
      "Your project is run from a delivery centre three time zones away by a team that has never set foot in your market.",
    icon: Globe2,
    accentColor: "#4A3E92",
    bgTint: "bg-[#F0EFF9]",
  },
  {
    number: "06",
    title: "One point of accountability — not five vendors and a systems integrator blaming each other",
    sysgrateAdvantage:
      "When we design, build, integrate, and manage a solution — we own every layer of it. There is no finger-pointing between the platform vendor, the integrator, and the managed services provider. One team. One SLA. One point of accountability for its performance.",
    competitorLabel: "Multi-Vendor Model",
    competitorDrawback:
      "The contact centre vendor blames the CRM partner. The CRM partner blames the network. Nobody owns the outcome.",
    icon: CheckCircle2,
    accentColor: "#9A6EAC",
    bgTint: "bg-[#F5F0FA]",
  },
];

export default function WhySysgrate() {
  const [showDrawbacks, setShowDrawbacks] = useState(false);

  return (
    <section id="why-sysgrate" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-[760px] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
              Why Sysgrate
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-paper-card border border-hairline text-xs font-semibold text-[#7B5AA6]">
              Differentiator over large SIs
            </span>
          </div>

          <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
            We manage outcomes,{" "}
            <span className="sg-highlight font-medium">not just accounts</span>.
          </h2>

          <p className="text-[18px] leading-[1.55] text-text-secondary m-0 max-w-[680px]">
            We combine consulting, engineering, and ongoing enablement to help organisations realise value—not just complete implementations.
          </p>
        </div>

        {/* Contrast view toggle */}
        <div className="flex items-center gap-2 self-start lg:self-end">
          <button
            type="button"
            onClick={() => setShowDrawbacks(!showDrawbacks)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border border-hairline bg-paper text-text-secondary hover:text-ink-800 shadow-sm transition-all cursor-pointer"
          >
            <span>{showDrawbacks ? "Hide" : "Show"} Large SI Contrast</span>
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                showDrawbacks ? "bg-[#7B5AA6]" : "bg-ink-300"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 6 Differentiator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {DIFFERENTIATORS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="group relative bg-paper rounded-card border border-hairline p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35 overflow-hidden"
            >
              {/* Subtle ambient accent glow */}
              <div
                className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#E4D8F3]/30 via-transparent to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div>
                {/* Header: Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                    {item.number}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.bgTint}`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2}
                      className="transition-colors"
                      style={{ color: item.accentColor }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug group-hover:text-link transition-colors">
                  {item.title}
                </h3>

                {/* Sysgrate Advantage */}
                <p className="text-sm text-text-secondary leading-relaxed mt-3.5 mb-0">
                  {item.sysgrateAdvantage}
                </p>
              </div>

              {/* The Competitor Contrast Box */}
              {showDrawbacks && (
                <div className="mt-6 pt-4 border-t border-hairline/80">
                  <div className="p-3.5 rounded-2xl bg-paper-card/90 border border-hairline/90 flex flex-col gap-1.5 transition-colors group-hover:bg-white group-hover:shadow-sm">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-rose-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                      <span>{item.competitorLabel}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed m-0 font-normal">
                      {item.competitorDrawback}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Proof-point callout banner */}
      <div
        className="mt-10 rounded-panel p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-hairline/80 relative overflow-hidden"
        style={{ background: "var(--panel-gradient)" }}
      >
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-text-secondary">
            The Sysgrate Commitment
          </span>
          <h4 className="text-lg sm:text-xl font-medium text-ink-800 m-0">
            One team. One SLA. Direct engineer access on day one.
          </h4>
          <p className="text-sm text-text-secondary m-0">
            Learn how our unified delivery model outperforms multi-tier system integrator contracts.
          </p>
        </div>

        <a
          href="/contact"
          className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group shrink-0"
        >
          <span>Schedule an Architecture Review</span>
          <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
