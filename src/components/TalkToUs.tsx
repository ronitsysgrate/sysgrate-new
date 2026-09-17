"use client";

import React from "react";
import { Phone, FileText } from "lucide-react";

export default function TalkToUs() {
  return (
    <section id="talk-to-us" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      <div
        className="relative overflow-hidden rounded-panel border border-hairline/80 px-8 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20 flex flex-col items-center text-center gap-6"
        style={{ background: "var(--panel-gradient)" }}
      >
        {/* Ambient accent glow, consistent with rest of site */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#E79AC0]/25 via-[#9A6EAC]/20 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#3E3A97]/15 via-transparent to-transparent blur-2xl" />

        <h2 className="relative z-10 text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0 max-w-[720px]">
          Let&rsquo;s talk about what you&rsquo;re trying to solve.
        </h2>

        <p className="relative z-10 text-[17px] sm:text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[560px]">
          No sales pitch. No runaround. Just a straight conversation with the
          right specialist — CX, collaboration, workplace, or AI.
        </p>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="#book-a-call"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all"
          >
            <Phone size={16} strokeWidth={2.2} />
            <span>Book a call</span>
          </a>

          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-paper border border-hairline text-ink-800 text-sm font-medium shadow-sm hover:shadow-chip hover:-translate-y-0.5 transition-all"
          >
            <FileText size={16} strokeWidth={2.2} />
            <span>Fill out a form</span>
          </a>
        </div>
      </div>
    </section>
  );
}
