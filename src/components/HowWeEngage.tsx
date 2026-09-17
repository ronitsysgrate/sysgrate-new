"use client";

import React, { useState } from "react";
import {
  Compass,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
  Code2,
  GraduationCap,
  UserCheck,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

interface CopyOption {
  id: "journey" | "outcomes";
  label: string;
  badge: string;
  title: React.ReactNode;
  description: string;
}

const COPY_OPTIONS: Record<string, CopyOption> = {
  journey: {
    id: "journey",
    label: "Lifecycle Journey",
    badge: "Option 1 · Lifecycle",
    title: (
      <>
        From strategy to go-live — and{" "}
        <span className="sg-highlight font-medium">everything after</span>.
      </>
    ),
    description:
      "Whether you're starting fresh, scaling fast, or optimising what you already have — we engage at every stage of your technology journey, across CX, collaboration, AI, and modern workplace.",
  },
  outcomes: {
    id: "outcomes",
    label: "Outcome Driven",
    badge: "Option 2 · Outcomes",
    title: (
      <>
        Built around your <span className="sg-highlight font-medium">outcomes</span>.
        Not our deliverables.
      </>
    ),
    description:
      "Eight engagement models, one standard — your results. From a one-off advisory session to a fully managed service, we shape our work around what your business actually needs to move forward.",
  },
};

interface EngagementModel {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  bgTint: string;
}

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    number: "01",
    title: "Strategy & Advisory",
    description:
      "Clarity before commitment. We help you make the right technology decisions.",
    icon: Compass,
    accentColor: "#9A6EAC",
    bgTint: "bg-[#F5F0FA]",
  },
  {
    number: "02",
    title: "Solution Design & Delivery",
    description:
      "From blueprint to live — built right the first time.",
    icon: Layers,
    accentColor: "#4A3E92",
    bgTint: "bg-[#F0EFF9]",
  },
  {
    number: "03",
    title: "Platform & Systems Integration",
    description:
      "Your platforms, connected. No gaps. No workarounds.",
    icon: Network,
    accentColor: "#3E3A97",
    bgTint: "bg-[#EEEDF8]",
  },
  {
    number: "04",
    title: "Managed Operations",
    description:
      "We run it. You focus on the business.",
    icon: ShieldCheck,
    accentColor: "#26205A",
    bgTint: "bg-[#EAE8F5]",
  },
  {
    number: "05",
    title: "Experience as a Service",
    description:
      "Continuous innovation — without the overhead of building it in-house.",
    icon: Sparkles,
    accentColor: "#E79AC0",
    bgTint: "bg-[#FAF0F5]",
  },
  {
    number: "06",
    title: "Bespoke Engineering",
    description:
      "When off-the-shelf doesn't fit, we build exactly what you need.",
    icon: Code2,
    accentColor: "#7B5AA6",
    bgTint: "bg-[#F4EEF8]",
  },
  {
    number: "07",
    title: "Adoption & Enablement",
    description:
      "Technology only delivers when your people know how to use it.",
    icon: GraduationCap,
    accentColor: "#5A5372",
    bgTint: "bg-[#F2F1F6]",
  },
  {
    number: "08",
    title: "Embedded Expertise",
    description:
      "The right expertise, embedded in your team — exactly when you need it.",
    icon: UserCheck,
    accentColor: "#3E3A97",
    bgTint: "bg-[#EFEFF9]",
  },
];

export default function HowWeEngage() {
  const [selectedOption, setSelectedOption] = useState<"journey" | "outcomes">("outcomes");
  const activeCopy = COPY_OPTIONS[selectedOption];

  return (
    <section id="engage" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      {/* Section Header with Option Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-180 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
              How We Engage
            </span>
          </div>

          <div key={`title-${selectedOption}`} className="sg-animate-rise">
            <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
              {activeCopy.title}
            </h2>
          </div>

          <p
            key={`desc-${selectedOption}`}
            className="text-[18px] leading-[1.55] text-text-secondary m-0 max-w-160 sg-animate-rise"
            style={{ animationDelay: "80ms" }}
          >
            {activeCopy.description}
          </p>
        </div>

        {/* Perspective toggle switcher (Option 1 vs Option 2) */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-paper-card border border-hairline shadow-sm w-fit self-start lg:self-end">
          <button
            type="button"
            onClick={() => setSelectedOption("journey")}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              selectedOption === "journey"
                ? "bg-surface-inverse text-white shadow-pill"
                : "text-text-secondary hover:text-ink-800"
            }`}
          >
            Option 1 · Lifecycle
          </button>
          <button
            type="button"
            onClick={() => setSelectedOption("outcomes")}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              selectedOption === "outcomes"
                ? "bg-surface-inverse text-white shadow-pill"
                : "text-text-secondary hover:text-ink-800"
            }`}
          >
            Option 2 · Outcomes
          </button>
        </div>
      </div>

      {/* 8 Engagement Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {ENGAGEMENT_MODELS.map((model, idx) => {
          const Icon = model.icon;
          return (
            <div
              key={model.number}
              className="group relative bg-paper rounded-card border border-hairline p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/30 overflow-hidden"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Subtle top ambient glow on hover */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-linear-to-bl from-[#E4D8F3]/30 via-transparent to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Number tag + Icon pill */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                    {model.number}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${model.bgTint}`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2}
                      className="transition-colors"
                      style={{ color: model.accentColor }}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[19px] font-medium text-ink-800 m-0 leading-snug group-hover:text-link transition-colors">
                  {model.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mt-3 mb-0">
                  {model.description}
                </p>
              </div>

              {/* Bottom interaction cue */}
              <div className="pt-6 mt-4 border-t border-hairline/60 flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary/70 group-hover:text-link transition-colors">
                  Learn engagement
                </span>
                <div className="w-7 h-7 rounded-full bg-paper-card flex items-center justify-center text-ink-300 group-hover:bg-surface-inverse group-hover:text-white transition-all duration-200">
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory Bottom Banner */}
      <div
        className="mt-10 rounded-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-hairline/80 relative overflow-hidden"
        style={{ background: "var(--panel-gradient)" }}
      >
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-text-secondary">
            Tailored Engagement
          </span>
          <h4 className="text-lg sm:text-xl font-medium text-ink-800 m-0">
            Not sure which engagement model fits your roadmap?
          </h4>
          <p className="text-sm text-text-secondary m-0">
            Our architects assess your current estate and design a high-impact plan tailored to your timeline.
          </p>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group shrink-0"
        >
          <span>Talk to an Architect</span>
          <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
