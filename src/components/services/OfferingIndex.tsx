"use client";

import { useEffect, useRef, useState } from "react";
import {
    Boxes,
    Cable,
    ChevronLeft,
    ChevronRight,
    Cpu,
    Headphones,
    LayoutDashboard,
    MessagesSquare,
    Shield,
    Sparkles,
    Workflow,
    type LucideIcon,
} from "lucide-react";
import type { Offering, Service } from "@/content/services/types";
import { PillCta } from "./PillCta";

const VISUAL_ICONS: LucideIcon[] = [
    Boxes,
    Cable,
    Cpu,
    LayoutDashboard,
    MessagesSquare,
    Workflow,
    Sparkles,
    Shield,
    Headphones,
];

function OfferingMark({
    offering,
    index,
    accentColor,
}: {
    offering: Offering;
    index: number;
    accentColor: string;
}) {
    const icons = [0, 1, 2].map(
        (offset) => VISUAL_ICONS[(index + offset) % VISUAL_ICONS.length],
    );

    return (
        <div className="flex items-center justify-between gap-6 lg:flex-col lg:items-end lg:justify-start lg:pt-1">
            <span
                className="text-[clamp(64px,8vw,104px)] leading-none font-medium tracking-[-0.04em]"
                style={{ color: accentColor }}
            >
                {offering.number}
            </span>
            <div className="flex gap-2 shrink-0">
                {icons.map((Icon, iconIndex) => (
                    <span
                        key={iconIndex}
                        className="w-11 h-11 rounded-2xl bg-paper shadow-chip flex items-center justify-center"
                    >
                        <Icon size={18} strokeWidth={2} style={{ color: accentColor }} />
                    </span>
                ))}
            </div>
        </div>
    );
}

export function OfferingIndex({ service }: { service: Service }) {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    const count = service.offerings.length;
    const offering = service.offerings[active] ?? service.offerings[0];

    const go = (index: number) => {
        if (count === 0) return;
        setActive((index + count) % count);
    };

    useEffect(() => {
        const id = window.location.hash.replace("#", "");
        const index = service.offerings.findIndex((item) => item.id === id);
        if (index < 0) return;
        const frame = requestAnimationFrame(() => setActive(index));
        return () => cancelAnimationFrame(frame);
    }, [service.offerings]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 },
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    if (!offering) return null;

    const hold = () => setPaused(true);
    const release = () => setPaused(false);

    return (
        <section
            ref={sectionRef}
            id="offerings"
            className="sg-container scroll-mt-28 pt-[clamp(72px,10vw,128px)] pb-4"
            aria-roledescription="carousel"
            aria-label={service.offeringsIntro.title}
            onMouseEnter={hold}
            onMouseLeave={release}
            onFocus={hold}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) release();
            }}
        >
            {service.offerings.map((item) => (
                <span key={item.id} id={item.id} className="sr-only" />
            ))}

            <div className="max-w-180 flex flex-col gap-4 mb-8 md:mb-10">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {service.offeringsIntro.eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {service.offeringsIntro.title}
                </h2>
                <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                    {service.offeringsIntro.body}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="m-0 font-mono text-sm tracking-[0.08em] text-ink-300">
                    {offering.number}
                    <span className="mx-2 text-ink-200">/</span>
                    {String(count).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => go(active - 1)}
                        className="w-11 h-11 rounded-full bg-paper border border-hairline text-ink-800 shadow-chip cursor-pointer grid place-items-center hover:shadow-pill transition-shadow"
                        aria-label="Previous offering"
                    >
                        <ChevronLeft size={18} strokeWidth={2} />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(active + 1)}
                        className="w-11 h-11 rounded-full bg-paper border border-hairline text-ink-800 shadow-chip cursor-pointer grid place-items-center hover:shadow-pill transition-shadow"
                        aria-label="Next offering"
                    >
                        <ChevronRight size={18} strokeWidth={2} />
                    </button>
                </div>
            </div>
            <div className="h-px w-full bg-hairline overflow-hidden mb-6 md:mb-8" aria-hidden="true">
                <div
                    key={offering.id}
                    className="h-full w-full origin-left motion-safe:animate-[sg-progress_7s_linear_forwards]"
                    onAnimationEnd={() => go(active + 1)}
                    style={{
                        background: service.accentColor,
                        animationPlayState: paused || !inView ? "paused" : "running",
                    }}
                />
            </div>

            <div
                key={offering.id}
                id={`offering-panel-${offering.id}`}
                className="rounded-panel p-7 md:p-10 lg:p-12 motion-safe:animate-[sg-rise_0.45s_cubic-bezier(0.22,0.61,0.36,1)_both]"
                style={{
                    background: `linear-gradient(165deg, ${service.bgTint} 0%, #ffffff 72%)`,
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_auto] gap-8 lg:gap-16 items-start">
                    <div className="flex flex-col gap-5 min-w-0">
                        <h3 className="text-[clamp(24px,2.4vw,36px)] font-medium text-ink-800 m-0 leading-tight">
                            {offering.title}
                        </h3>
                        <p className="text-[18px] font-medium text-ink-800 m-0 leading-snug max-w-160">
                            {offering.lede}
                        </p>
                        <p className="text-[16px] leading-[1.65] text-text-secondary m-0 max-w-170">
                            {offering.body}
                        </p>
                        <div className="pt-1">
                            <p className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary m-0 mb-4">
                                {offering.includedLabel}
                            </p>
                            <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                                {offering.included.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 text-sm leading-relaxed text-ink-800"
                                    >
                                        <span
                                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: service.accentColor }}
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                            <PillCta cta={offering.primaryCta} />
                            {offering.secondaryCta ? (
                                <PillCta cta={offering.secondaryCta} variant="secondary" />
                            ) : null}
                        </div>
                    </div>
                    <OfferingMark
                        offering={offering}
                        index={active}
                        accentColor={service.accentColor}
                    />
                </div>

                {offering.table ? (
                    <div className="mt-10 overflow-x-auto rounded-card border border-hairline bg-paper">
                        <table className="w-full min-w-160 border-collapse text-left">
                            <thead>
                                <tr className="bg-paper-muted">
                                    {offering.table.columns.map((column) => (
                                        <th
                                            key={column}
                                            className="px-5 py-4 text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {offering.table.rows.map((row) => (
                                    <tr key={row[0]} className="border-t border-hairline">
                                        {row.map((cell, cellIndex) => (
                                            <td
                                                key={`${row[0]}-${cellIndex}`}
                                                className={`px-5 py-4 text-sm leading-relaxed align-top ${
                                                    cellIndex === 0
                                                        ? "font-medium text-ink-800"
                                                        : "text-text-secondary"
                                                }`}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
