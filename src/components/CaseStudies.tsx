"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * NOTE: no case-study copy or testimonials were supplied yet — every value
 * below is a placeholder so the section is easy to spot and swap out.
 * Wire this to real client outcomes/testimonials before it ships.
 */
const CASE_STUDIES = [
  {
    outcomeValue: "38%",
    outcomeCaption: "Increase in resolved-first-contact rate",
    outcomeClient: "Global Retail — Contact Centre Modernization",
    quote:
      "They rebuilt our contact centre around one connected platform instead of six disconnected tools. Our agents stopped fighting the software and started using it.",
    avatarSrc: "/case-studies/avatar-placeholder-1.png",
    name: "Jordan Lee",
    role: "VP of Customer Operations, Global Retail",
    primaryCta: { label: "Read the full case study", href: "#case-studies" },
  },
  {
    outcomeValue: "2.4x",
    outcomeCaption: "Faster time-to-market on new releases",
    outcomeClient: "Fintech Scale-up — Platform Engineering",
    quote:
      "We went from quarterly releases to shipping every two weeks without breaking anything. The team finally trusts the pipeline.",
    avatarSrc: "/case-studies/avatar-placeholder-2.png",
    name: "Amara Chen",
    role: "Head of Engineering, Fintech Scale-up",
    primaryCta: { label: "Read the full case study", href: "#case-studies" },
  },
  {
    outcomeValue: "61%",
    outcomeCaption: "Reduction in manual reconciliation hours",
    outcomeClient: "Manufacturing Group — Finance Automation",
    quote:
      "What used to take our finance team three days a month now takes an afternoon. That time went straight back into forecasting.",
    avatarSrc: "/case-studies/avatar-placeholder-3.png",
    name: "Priya Nair",
    role: "Director of Finance, Manufacturing Group",
    primaryCta: { label: "Read the full case study", href: "#case-studies" },
  },
  {
    outcomeValue: "99.98%",
    outcomeCaption: "Uptime since migration, up from 99.5%",
    outcomeClient: "Healthcare Network — Cloud Migration",
    quote:
      "Reliability was non-negotiable for us. They took that seriously from day one and it shows in every incident report since.",
    avatarSrc: "/case-studies/avatar-placeholder-4.png",
    name: "Marcus Webb",
    role: "CTO, Healthcare Network",
    primaryCta: { label: "Read the full case study", href: "#case-studies" },
  },
];

export default function CaseStudies() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; dragging: boolean }>({
    startX: 0,
    dragging: false,
  });

  const total = CASE_STUDIES.length;

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % total) + total) % total);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6500);
    return () => clearInterval(id);
  }, [isPaused, total]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  // Touch / pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, dragging: true };
    setIsPaused(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    const threshold = 50;
    if (delta > threshold) goPrev();
    else if (delta < -threshold) goNext();
    dragState.current.dragging = false;
    setIsPaused(false);
  };

  return (
    <section
      id="case-studies"
      className="sg-container pt-[clamp(64px,10vw,120px)] relative pb-[clamp(64px,10vw,120px)]"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-170 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            Case Studies
          </span>
          <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
            Real outcomes. In their own words.
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full bg-paper shadow-chip flex items-center justify-center text-ink-800 hover:bg-paper-muted hover:-translate-y-0.5 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full bg-paper shadow-chip flex items-center justify-center text-ink-800 hover:bg-paper-muted hover:-translate-y-0.5 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="mt-8 relative overflow-hidden rounded-panel"
        style={{ background: "var(--panel-gradient)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {CASE_STUDIES.map((cs, i) => (
            <div
              key={i}
              className="w-full shrink-0 p-8 md:p-10"
              aria-hidden={i !== index}
            >
              <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1px_1.15fr] items-center gap-[clamp(28px,5vw,56px)]">
                <div className="flex flex-col gap-2.5">
                  <span className="text-[clamp(40px,5vw,64px)] font-medium text-ink-800 leading-none tracking-[-0.02em]">
                    {cs.outcomeValue}
                  </span>
                  <p className="text-base text-text-secondary m-0">
                    {cs.outcomeCaption}
                  </p>
                  <span className="text-xs text-ink-300 uppercase tracking-[0.06em] font-medium">
                    {cs.outcomeClient}
                  </span>
                </div>

                <div className="hidden md:block w-px self-stretch bg-black/10" aria-hidden="true" />

                <div className="flex flex-col gap-5">
                  <p className="text-[18px] font-normal text-ink-800 leading-normal m-0">
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3.5">
                    <img
                      className="w-12 h-12 rounded-full object-cover shadow-chip shrink-0"
                      src={cs.avatarSrc}
                      alt={cs.name}
                    />
                    <div>
                      <span className="block font-semibold text-ink-800 text-sm">
                        {cs.name}
                      </span>
                      <span className="block text-text-secondary text-xs">
                        {cs.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-5 mt-1">
                    <a
                      href={cs.primaryCta.href}
                      className="text-sm font-medium text-link hover:text-link-hover transition-colors"
                    >
                      {cs.primaryCta.label} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrow controls, overlaid */}
        <div className="flex md:hidden items-center justify-center gap-4 pb-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full bg-white shadow-chip flex items-center justify-center text-ink-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full bg-white shadow-chip flex items-center justify-center text-ink-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {CASE_STUDIES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-link" : "w-2 bg-ink-200 hover:bg-ink-300"
              }`}
          />
        ))}
      </div>
    </section>
  );
}