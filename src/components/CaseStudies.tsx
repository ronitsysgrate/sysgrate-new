"use client";

import React from "react";

/**
 * NOTE: no case-study copy or testimonial was supplied yet — every value
 * below is a placeholder so the section is easy to spot and swap out.
 * Wire this to real client outcomes before it ships.
 */
const CASE_STUDY = {
  outcomeValue: "38%",
  outcomeCaption: "Increase in resolved-first-contact rate",
  outcomeClient: "Global Retail — Contact Centre Modernization",
  quote:
    "They rebuilt our contact centre around one connected platform instead of six disconnected tools. Our agents stopped fighting the software and started using it.",
  avatarSrc: "/case-studies/avatar-placeholder.jpg",
  name: "Jordan Lee",
  role: "VP of Customer Operations, Global Retail",
  primaryCta: { label: "Read the full case study", href: "#case-studies" },
  secondaryCta: { label: "See all case studies", href: "#case-studies" },
};

export default function CaseStudies() {
  return (
    <section id="case-studies" className="sg-container pt-[clamp(64px,10vw,120px)] relative pb-[clamp(64px,10vw,120px)]">
      <div className="max-w-[680px] flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
          Case Studies
        </span>
        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
          Real outcomes. In their own words.
        </h2>
      </div>

      <div
        className="mt-8 rounded-panel p-8 md:p-10 overflow-hidden sg-animate-rise"
        style={{ background: "var(--panel-gradient)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1px_1.15fr] items-center gap-[clamp(28px,5vw,56px)]">
          <div className="flex flex-col gap-2.5">
            <span className="text-[clamp(40px,5vw,64px)] font-medium text-ink-800 leading-none tracking-[-0.02em]">
              {CASE_STUDY.outcomeValue}
            </span>
            <p className="text-base text-text-secondary m-0">
              {CASE_STUDY.outcomeCaption}
            </p>
            <span className="text-xs text-ink-300 uppercase tracking-[0.06em] font-medium">
              {CASE_STUDY.outcomeClient}
            </span>
          </div>

          <div className="hidden md:block w-px self-stretch bg-black/10" aria-hidden="true" />

          <div className="flex flex-col gap-5">
            <p className="text-[18px] font-normal text-ink-800 leading-[1.5] m-0">
              &ldquo;{CASE_STUDY.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3.5">
              <img
                className="w-12 h-12 rounded-full object-cover shadow-chip shrink-0"
                src={CASE_STUDY.avatarSrc}
                alt={CASE_STUDY.name}
              />
              <div>
                <span className="block font-semibold text-ink-800 text-sm">
                  {CASE_STUDY.name}
                </span>
                <span className="block text-text-secondary text-xs">
                  {CASE_STUDY.role}
                </span>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-5 mt-1">
              <a
                href={CASE_STUDY.primaryCta.href}
                className="text-sm font-medium text-link hover:text-link-hover transition-colors"
              >
                {CASE_STUDY.primaryCta.label} →
              </a>
              <a
                href={CASE_STUDY.secondaryCta.href}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-ink-800 shadow-pill hover:bg-paper-muted hover:-translate-y-0.5 transition-all text-sm font-medium"
              >
                <span>{CASE_STUDY.secondaryCta.label}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
