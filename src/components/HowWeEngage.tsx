import React from "react";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/links";
import { EngagementCard } from "@/components/services/EngagementCard";

export default function HowWeEngage() {
  return (
    <section id="engage" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      <div className="flex flex-col gap-4 pb-2 max-w-180">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
          How We Engage
        </span>

        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.4] tracking-[-0.02em] text-ink-800 m-0">
          From strategy to go-live — and{" "}
          <span className="sg-highlight font-medium">everything after</span>.
        </h2>

        <p className="text-[18px] leading-[1.55] text-text-secondary m-0 max-w-160">
          Whether you&apos;re starting fresh, scaling fast, or optimising what you already have — we engage at every stage of your technology journey, across CX, collaboration, AI, and modern workplace.
        </p>
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
