"use client";

import { useEffect, useState } from "react";
import {
    Boxes,
    Cable,
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

function OfferingVisual({
    offering,
    index,
    accentColor,
    bgTint,
}: {
    offering: Offering;
    index: number;
    accentColor: string;
    bgTint: string;
}) {
    const icons = [0, 1, 2].map(
        (offset) => VISUAL_ICONS[(index + offset) % VISUAL_ICONS.length],
    );

    return (
        <div
            className="relative min-h-[280px] rounded-panel p-8 flex flex-col justify-between overflow-hidden"
            style={{
                background: `linear-gradient(165deg, ${bgTint} 0%, #ffffff 78%)`,
            }}
        >
            <span
                className="text-[72px] leading-none font-medium tracking-[-0.04em]"
                style={{ color: accentColor }}
            >
                {offering.number}
            </span>
            <div className="flex items-end justify-between gap-4">
                <p className="text-[18px] font-medium text-ink-800 m-0 leading-snug max-w-[220px]">
                    {offering.title}
                </p>
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
        </div>
    );
}

function OfferingBlock({
    offering,
    index,
    accentColor,
    bgTint,
}: {
    offering: Offering;
    index: number;
    accentColor: string;
    bgTint: string;
}) {
    const flip = index % 2 === 1;

    return (
        <article id={offering.id} className="scroll-mt-40 flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <div className={`flex flex-col gap-4 ${flip ? "lg:order-2" : ""}`}>
                    <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                        {offering.number}
                    </span>
                    <h3 className="text-[clamp(22px,2.4vw,32px)] font-medium text-ink-800 m-0 leading-tight">
                        {offering.title}
                    </h3>
                    <p className="text-[17px] font-medium text-ink-800 m-0 leading-snug">
                        {offering.lede}
                    </p>
                    <p className="text-[16px] leading-[1.6] text-text-secondary m-0">
                        {offering.body}
                    </p>
                    <div>
                        <p className="text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary m-0 mb-3">
                            {offering.includedLabel}
                        </p>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                            {offering.included.map((item) => (
                                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-800">
                                    <span
                                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ backgroundColor: accentColor }}
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
                <div className={flip ? "lg:order-1" : ""}>
                    <OfferingVisual
                        offering={offering}
                        index={index}
                        accentColor={accentColor}
                        bgTint={bgTint}
                    />
                </div>
            </div>

            {offering.table ? (
                <div className="overflow-x-auto rounded-card border border-hairline">
                    <table className="w-full min-w-[640px] border-collapse text-left">
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
        </article>
    );
}

export function OfferingIndex({ service }: { service: Service }) {
    const [activeId, setActiveId] = useState(service.offerings[0]?.id ?? "");

    useEffect(() => {
        const nodes = service.offerings
            .map((offering) => document.getElementById(offering.id))
            .filter((node): node is HTMLElement => node !== null);

        if (nodes.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target.id) setActiveId(visible.target.id);
            },
            { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.4] },
        );

        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, [service.offerings]);

    return (
        <section id="offerings" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-40">
            <div className="max-w-180 flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {service.offeringsIntro.eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {service.offeringsIntro.title}
                </h2>
                <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                    {service.offeringsIntro.body}
                </p>
            </div>

            <div className="lg:hidden sticky top-20 z-30 mt-8 -mx-1">
                <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                    {service.offerings.map((offering) => {
                        const active = offering.id === activeId;
                        return (
                            <a
                                key={offering.id}
                                href={`#${offering.id}`}
                                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                                    active
                                        ? "bg-surface-inverse text-white border-surface-inverse"
                                        : "bg-paper text-text-secondary border-hairline"
                                }`}
                            >
                                {offering.number} {offering.title}
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 items-start">
                <nav className="hidden lg:block" aria-label="Offerings">
                    <div className="sticky top-28 flex flex-col gap-1">
                        {service.offerings.map((offering) => {
                            const active = offering.id === activeId;
                            return (
                                <a
                                    key={offering.id}
                                    href={`#${offering.id}`}
                                    className={`rounded-2xl px-4 py-3 text-sm leading-snug no-underline transition-colors ${
                                        active
                                            ? "bg-surface-inverse text-white"
                                            : "text-text-secondary hover:bg-paper-muted hover:text-ink-800"
                                    }`}
                                >
                                    <span className="font-mono text-xs mr-2 opacity-70">
                                        {offering.number}
                                    </span>
                                    {offering.title}
                                </a>
                            );
                        })}
                    </div>
                </nav>

                <div className="flex flex-col gap-16">
                    {service.offerings.map((offering, index) => (
                        <OfferingBlock
                            key={offering.id}
                            offering={offering}
                            index={index}
                            accentColor={service.accentColor}
                            bgTint={service.bgTint}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
