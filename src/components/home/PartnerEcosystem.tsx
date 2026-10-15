"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface EcosystemPartner {
  name: string;
  src: string;
  focus: string;
}

// Partners from PartnerLogoStrip that don't already have an accreditation card.
// The `focus` captions are placeholders: edit them to match how you work with each one.
const ECOSYSTEM: EcosystemPartner[] = [
  { name: "Avaya", src: "/logos/avaya.png", focus: "Contact centre" },
  { name: "Genesys", src: "/logos/genesys.webp", focus: "Contact centre" },
  { name: "Cisco", src: "/logos/cisco.png", focus: "Collaboration" },
  { name: "Microsoft Teams", src: "/logos/teams.png", focus: "Collaboration" },
  { name: "Azure", src: "/logos/azure.png", focus: "Cloud" },
  { name: "AWS Lambda", src: "/logos/lambda.svg", focus: "Serverless" },
  { name: "Salesforce", src: "/logos/salesforce.svg", focus: "CRM" },
  { name: "Poly", src: "/logos/poly.png", focus: "Devices" },
];

export default function PartnerEcosystem() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const state = inView ? "is-in" : "";

  return (
    <div ref={rootRef} className="mt-16">
      <div data-reveal="rise" className={`max-w-[640px] mb-6 ${state}`}>
        <h3 className="text-[22px] font-normal leading-snug tracking-[-0.01em] text-ink-800 m-0">
          Built to work across your existing stack
        </h3>
        <p className="text-[15px] leading-relaxed text-text-secondary mt-2 mb-0">
          We also integrate with the contact centre, collaboration, and cloud platforms below.
        </p>
      </div>

      <ul
        aria-label="Other technology partners"
        className={`sg-wipe list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-[20px] border border-hairline bg-hairline ${state}`}
      >
        {ECOSYSTEM.map((p, i) => {
          const d = 300 + i * 70; // let the frame wipe in first, then stagger the cells
          return (
            <li
              key={p.name}
              data-reveal="rise"
              className={`bg-paper-muted ${state}`}
              style={{ transitionDelay: `${d}ms, ${d}ms, 0s, 0s` }}
            >
              <div className="group flex h-full flex-col items-center justify-center gap-3 px-6 py-9 transition-colors duration-300 hover:bg-paper">
                <div className="h-[34px] flex items-center">
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={160}
                    height={48}
                    style={{ width: "auto", height: "100%" }}
                    className="object-contain opacity-55 grayscale transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
                <span className="text-[13px] text-text-secondary transition-colors duration-300 group-hover:text-ink-800">
                  {p.focus}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}