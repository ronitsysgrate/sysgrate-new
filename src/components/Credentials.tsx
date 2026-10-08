import React from "react";
import { Cloud, Headset, Phone, type LucideIcon } from "lucide-react";

interface Award {
  id: string;
  number: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  accentColor: string;
  bgTint: string;
}

const AWARDS: Award[] = [
  {
    id: "aws",
    number: "01",
    title: "AWS Partner",
    detail:
      "Partner status for the cloud platforms we build on, including Amazon Connect contact centres.",
    icon: Cloud,
    accentColor: "#3E3A97",
    bgTint: "bg-[#EFEFF9]",
  },
  {
    id: "zendesk",
    number: "02",
    title: "Zendesk Partner",
    detail:
      "Partner status for the customer service platform that connects agents, tickets, and the wider experience stack.",
    icon: Headset,
    accentColor: "#7B5AA6",
    bgTint: "bg-[#F4EEF8]",
  },
  {
    id: "zoom",
    number: "03",
    title: "Zoom Platinum",
    detail:
      "2025 Zoom Up Partner Program. Platinum for Phone deployment services, and Platinum Reseller for Customer Experience Suite.",
    icon: Phone,
    accentColor: "#9A6EAC",
    bgTint: "bg-[#F5F0FA]",
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      <div className="max-w-[720px] flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
          Accreditations
        </span>

        <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
          Validated by the{" "}
          <span className="sg-highlight font-medium">Industry&apos;s Best</span>.
        </h2>

        <p className="text-[18px] leading-[1.55] text-text-secondary m-0 max-w-[640px]">
          Partner recognition with the platforms behind our contact centre, customer service, and collaboration work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {AWARDS.map((award) => {
          const Icon = award.icon;
          return (
            <div
              key={award.id}
              className="group relative bg-paper rounded-card border border-hairline p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/35 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#E4D8F3]/30 via-transparent to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                  {award.number}
                </span>
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${award.bgTint}`}
                >
                  <Icon size={20} strokeWidth={2} style={{ color: award.accentColor }} />
                </div>
              </div>

              <h3 className="text-[18px] font-medium text-ink-800 m-0 leading-snug group-hover:text-link transition-colors">
                {award.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mt-3.5 mb-0">
                {award.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
