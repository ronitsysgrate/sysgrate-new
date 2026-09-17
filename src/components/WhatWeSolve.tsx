"use client";

import React, { useState } from "react";

interface PracticeArea {
  id: string;
  tag: string;
  tabLabel: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Swap in the real asset — path is a placeholder. */
  imageSrc: string;
  imageAlt: string;
}

const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "cx",
    tag: "01 · Customer Experience",
    tabLabel: "Customer Experience",
    title: "Smarter contact centres. Happier customers. Powered by AI.",
    description:
      "We implement and manage cloud contact centre platforms — Amazon Connect, Avaya, and Zoom Contact Center — integrated with AI virtual agents, omnichannel engagement, and real-time analytics to reduce costs and raise CSAT.",
    primaryCta: { label: "See CX solutions", href: "#cx" },
    secondaryCta: { label: "Book a CX consultation", href: "#contact" },
    imageSrc: "/practice-areas/customer-experience.jpg",
    imageAlt: "Contact centre agents working across an AI-assisted platform",
  },
  {
    id: "employee-experience",
    tag: "02 · Employee Experience",
    tabLabel: "Employee Experience",
    title: "Your teams connected. Every call, meeting, and message — seamless.",
    description:
      "We deploy and integrate enterprise collaboration technology — Zoom Phone, Microsoft Teams Direct Routing, and Ribbon SBC — so your workforce stays productive whether they're in the office, on-site, or working remotely.",
    primaryCta: { label: "See collaboration solutions", href: "#employee-experience" },
    secondaryCta: { label: "Book a consultation", href: "#contact" },
    imageSrc: "/practice-areas/employee-experience.jpg",
    imageAlt: "Team collaborating across voice, chat, and video in one workspace",
  },
  {
    id: "workplace",
    tag: "03 · Modern Workplace",
    tabLabel: "Modern Workplace",
    title: "Intelligent workplaces designed for the way people actually work.",
    description:
      "From AI-enabled boardrooms and hybrid meeting spaces to video walls and command centres — we integrate smart AV technology that transforms how your teams collaborate in the physical world.",
    primaryCta: { label: "Explore workplace solutions", href: "#workplace" },
    secondaryCta: { label: "Book a consultation", href: "#contact" },
    imageSrc: "/practice-areas/modern-workplace.jpg",
    imageAlt: "AI-enabled boardroom with a video wall and hybrid meeting setup",
  },
];

const AI_PRACTICE = {
  tag: "Artificial Intelligence",
  title: "AI built into your business — not bolted on top of it.",
  description:
    "From intelligent virtual assistants and AI chatbots to voice bots, conversational analytics, and agentic AI workflows — we design and deploy AI solutions that integrate with your existing platforms and deliver outcomes your business can measure from day one.",
  primaryCta: { label: "Explore AI solutions", href: "#ai" },
  secondaryCta: { label: "Book an AI readiness assessment", href: "#contact" },
  imageSrc: "/practice-areas/artificial-intelligence.jpg",
  imageAlt: "Conversational AI assistant handling a customer interaction",
};

export default function WhatWeSolve() {
  const [activeId, setActiveId] = useState(PRACTICE_AREAS[0].id);
  const active =
    PRACTICE_AREAS.find((p) => p.id === activeId) ?? PRACTICE_AREAS[0];

  return (
    <section id="solve" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      <div className="max-w-170 flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
          What We Solve
        </span>
        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
          Four practice areas. One partner.
        </h2>
      </div>

      {/* Tab switcher: Customer Experience / Employee Experience / Modern Workplace */}
      <div className="flex flex-wrap gap-2 mt-8" role="tablist" aria-label="Practice areas">
        {PRACTICE_AREAS.map((area) => {
          const isActive = area.id === activeId;
          return (
            <button
              key={area.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium cursor-pointer transition-all ${
                isActive
                  ? "bg-surface-inverse border border-surface-inverse text-white"
                  : "bg-paper border border-hairline text-text-secondary hover:text-ink-800 hover:border-ink-200"
              }`}
              onClick={() => setActiveId(area.id)}
            >
              {area.tabLabel}
            </button>
          );
        })}
      </div>

      <div
        className="mt-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-[clamp(28px,5vw,56px)] sg-animate-rise"
        key={active.id}
      >
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-paper-card text-text-secondary text-xs font-medium tracking-[0.06em]">
            {active.tag}
          </span>
          <h3 className="text-[clamp(20px,2.2vw,30px)] font-medium text-ink-800 m-0 leading-tight">
            {active.title}
          </h3>
          <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
            {active.description}
          </p>
          <div className="flex items-center flex-wrap gap-5 mt-1">
            <a
              href={active.primaryCta.href}
              className="text-sm font-medium text-link hover:text-link-hover transition-colors"
            >
              {active.primaryCta.label} →
            </a>
            <a
              href={active.secondaryCta.href}
              className="inline-flex items-center justify-center h-13 pl-6.5 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-[0_18px_40px_rgba(38,32,90,0.20)] hover:shadow-[0_22px_48px_rgba(38,32,90,0.28)] hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{active.secondaryCta.label}</span>
              <span className="w-9.5 h-9.5 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-1.5 text-base font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Image slot */}
        <div className="w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
          <img
            src={active.imageSrc}
            alt={active.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Artificial Intelligence — standalone gradient stripe */}
      <div
        className="mt-[clamp(64px,10vw,120px)] rounded-panel p-8 md:p-10 overflow-hidden relative"
        style={{ background: "var(--accent-gradient)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-[clamp(28px,5vw,56px)] relative z-1">
          <div className="flex flex-col items-start gap-4 text-white">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium tracking-[0.06em] uppercase">
              {AI_PRACTICE.tag}
            </span>
            <h3 className="text-[clamp(20px,2.2vw,30px)] font-medium text-white m-0 leading-tight">
              {AI_PRACTICE.title}
            </h3>
            <p className="text-[18px] leading-[1.55] text-white/90 m-0">
              {AI_PRACTICE.description}
            </p>
            <div className="flex items-center flex-wrap gap-5 mt-1">
              <a
                href={AI_PRACTICE.primaryCta.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {AI_PRACTICE.primaryCta.label} →
              </a>
              <a
                href={AI_PRACTICE.secondaryCta.href}
                className="inline-flex items-center justify-center h-13 px-6.5 rounded-full bg-white text-ink-800 shadow-pill hover:bg-paper-muted hover:-translate-y-0.5 transition-all font-medium text-sm cursor-pointer"
              >
                <span>{AI_PRACTICE.secondaryCta.label}</span>
              </a>
            </div>
          </div>

          <div className="w-full aspect-4/3 rounded-panel overflow-hidden bg-white/15 border border-white/25 backdrop-blur-md relative z-1">
            <img
              src={AI_PRACTICE.imageSrc}
              alt={AI_PRACTICE.imageAlt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}