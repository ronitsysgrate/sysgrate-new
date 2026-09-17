"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "what-we-do",
    question: "What does Sysgrate actually do?",
    answer:
      "We design, build, and manage customer experience and unified communications platforms — contact centers, telephony, collaboration tools, and the integrations that connect them to your CRM and internal systems. Some clients bring us in for a single implementation; others hand us ongoing management of the whole platform.",
  },
  {
    id: "platforms",
    question: "Which platforms and vendors do you work with?",
    answer:
      "Zoom, Amazon Connect, Microsoft Teams, Avaya, and the session border controllers and CRM systems that sit around them — Salesforce, Zendesk, HubSpot, and proprietary internal systems. We're certified across each ecosystem directly, so the recommendation is based on your requirements rather than which platform we're most familiar with.",
  },
  {
    id: "vs-large-si",
    question: "How is this different from working with a large systems integrator?",
    answer:
      "The engineers who scope your project are the ones who build and support it — you're not handed off to a delivery team after the sale. We also hold direct certifications across multiple platforms rather than reselling one, and our managed services extend past go-live, so the same team is accountable for how the platform performs afterward.",
  },
  {
    id: "regions",
    question: "Where do you operate?",
    answer:
      "We have offices and delivery teams across Singapore, India, Malaysia, and the UAE, covering Asia-Pacific and the Middle East. That means on-site support in your time zone, plus familiarity with local carrier environments and compliance requirements.",
  },
  {
    id: "engagement",
    question: "What does a typical engagement look like?",
    answer:
      "It starts with a conversation about what you're trying to solve, not a scoped proposal. From there we can run a fixed-scope implementation, an embedded team working alongside yours, or a fully managed operations model — whichever fits how you want to work. Most projects go live 30–50% faster than a standard bespoke build, using accelerators and templates refined across 500+ deployments.",
  },
  {
    id: "after-go-live",
    question: "What happens after go-live?",
    answer:
      "For clients on a managed or XaaS engagement, our team stays accountable for outcomes like CSAT, average handle time, and platform performance — not just uptime. If you'd rather manage it in-house after launch, we hand over documentation and can stay on for support as needed.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <section id="faq" className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)] relative">
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
        {/* Section Header */}
        <div className="lg:w-[380px] shrink-0 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            Common Questions
          </span>

          <h2 className="text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
            Questions we hear{" "}
            <span className="sg-highlight font-medium">before the call</span>.
          </h2>

          <p className="text-[16px] leading-[1.6] text-text-secondary m-0 max-w-[420px]">
            Don&rsquo;t see what you&rsquo;re looking for? Send it to us directly and a specialist will answer.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex-1 flex flex-col divide-y divide-hairline border-t border-b border-hairline">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-2">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-4 text-left cursor-pointer group"
                >
                  <span className="text-[16px] sm:text-[17px] font-medium text-ink-800 group-hover:text-link transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full bg-paper-card border border-hairline flex items-center justify-center text-ink-800 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus size={15} strokeWidth={2.2} />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-[15px] leading-relaxed text-text-secondary m-0 pb-5 pr-10 max-w-[620px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
