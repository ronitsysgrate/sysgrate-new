"use client";

import React, { useState } from "react";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/services/links";
import { EngagementCard } from "@/components/services/EngagementCard";

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

export default function HowWeEngage() {
  const [selectedOption, setSelectedOption] = useState<"journey" | "outcomes">("journey");
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
            <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.4] tracking-[-0.02em] text-ink-800 m-0">
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
        {services.map((service) => (
          <EngagementCard
            key={service.slug}
            number={service.number}
            title={service.title}
            description={service.cardDescription}
            accentColor={service.accentColor}
            bgTint={service.bgTint}
            icon={service.icon}
            href={serviceHref(service.slug)}
          />
        ))}
        <EngagementCard
          number="08"
          title="Embedded Expertise"
          description="The right expertise, embedded in your team — exactly when you need it."
          accentColor="#3E3A97"
          bgTint="#EFEFF9"
          icon="user"
        />
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
          href="/contact"
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
