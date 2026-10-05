"use client";

import { useEffect, useRef, useState } from "react";
import {
    Activity,
    BarChart3,
    CircleDot,
    FlaskConical,
    GraduationCap,
    Hammer,
    Handshake,
    ClipboardList,
    PenTool,
    Repeat,
    Rocket,
    Search,
    type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services/types";

const STEP_ICONS: [string, LucideIcon][] = [
    ["discover", Search],
    ["onboard", ClipboardList],
    ["prepare", ClipboardList],
    ["plan", ClipboardList],
    ["mapping", BarChart3],
    ["analyse", BarChart3],
    ["baseline", BarChart3],
    ["design", PenTool],
    ["architect", PenTool],
    ["specify", PenTool],
    ["define", PenTool],
    ["build", Hammer],
    ["test", FlaskConical],
    ["uat", FlaskConical],
    ["deploy", Rocket],
    ["go-live", Rocket],
    ["handover", Rocket],
    ["align", Handshake],
    ["enable", GraduationCap],
    ["reinforce", Repeat],
    ["operate", Activity],
    ["sustain", Activity],
    ["monitor", Activity],
];

function stepIcon(title: string): LucideIcon {
    const lower = title.toLowerCase();
    return STEP_ICONS.find(([keyword]) => lower.includes(keyword))?.[1] ?? CircleDot;
}

export function ProcessSteps({
    process,
    accentColor,
    bgTint,
}: {
    process: NonNullable<Service["process"]>;
    accentColor: string;
    bgTint: string;
}) {
    const listRef = useRef<HTMLOListElement>(null);
    const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [progress, setProgress] = useState(0);
    const [reached, setReached] = useState(-1);
    const [shown, setShown] = useState(-1);
    const [hovered, setHovered] = useState<number | null>(null);
    const total = process.steps.length;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const frame = requestAnimationFrame(() => {
                setProgress(1);
                setReached(total - 1);
                setShown(total - 1);
            });
            return () => cancelAnimationFrame(frame);
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const list = listRef.current;
            if (!list) return;
            const viewport = window.innerHeight;
            const line = viewport * 0.6;
            const rect = list.getBoundingClientRect();
            setProgress(Math.min(1, Math.max(0, (line - rect.top) / rect.height)));

            let lastReached = -1;
            let lastShown = -1;
            nodeRefs.current.forEach((node, index) => {
                if (!node) return;
                const box = node.getBoundingClientRect();
                const center = box.top + box.height / 2;
                if (center < line) lastReached = index;
                if (box.top < viewport * 0.9) lastShown = index;
            });
            setReached(lastReached);
            setShown((current) => Math.max(current, lastShown));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [total]);

    return (
        <section id="process" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-40">
            <div className="max-w-180 flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {process.eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {process.title}
                </h2>
                <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                    {process.intro}
                </p>
            </div>

            <ol ref={listRef} className="relative mt-14 list-none p-0 m-0">
                <div
                    aria-hidden="true"
                    className="absolute top-5 bottom-5 lg:top-7 lg:bottom-7 left-5 lg:left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-hairline overflow-hidden"
                >
                    <div
                        className="h-full w-full origin-top transition-transform duration-150 ease-out"
                        style={{ background: accentColor, transform: `scaleY(${progress})` }}
                    />
                </div>

                {process.steps.map((step, index) => {
                    const Icon = stepIcon(step.title);
                    const left = index % 2 === 0;
                    const isReached = index <= reached;
                    const isShown = index <= shown;
                    const isHovered = hovered === index;

                    return (
                        <li
                            key={`${step.number}-${step.title}`}
                            className="relative grid grid-cols-[40px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] gap-x-5 lg:gap-x-10 pb-8 lg:pb-4 last:pb-0"
                        >
                            <div className="col-start-1 lg:col-start-2 row-start-1 flex justify-center">
                                <span
                                    ref={(node) => {
                                        nodeRefs.current[index] = node;
                                    }}
                                    className={`relative z-10 w-10 h-10 lg:w-14 lg:h-14 rounded-full grid place-items-center border-2 transition-all duration-500 ${
                                        isHovered ? "scale-110" : ""
                                    }`}
                                    style={{
                                        backgroundColor: isReached ? accentColor : "var(--color-paper)",
                                        borderColor: isReached ? accentColor : "var(--color-hairline)",
                                        boxShadow: isReached ? `0 0 0 6px ${bgTint}` : "none",
                                    }}
                                >
                                    <Icon
                                        className="w-4.5 h-4.5 lg:w-5.5 lg:h-5.5 transition-colors duration-500"
                                        strokeWidth={2}
                                        style={{ color: isReached ? "#ffffff" : "var(--color-ink-300)" }}
                                    />
                                </span>
                            </div>

                            <div
                                className={`col-start-2 row-start-1 ${
                                    left ? "lg:col-start-1" : "lg:col-start-3"
                                } transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                                    isShown
                                        ? "opacity-100 translate-x-0 translate-y-0"
                                        : `opacity-0 translate-y-6 lg:translate-y-0 ${
                                              left ? "lg:-translate-x-10" : "lg:translate-x-10"
                                          }`
                                }`}
                            >
                                <article
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={`rounded-card border bg-paper p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
                                        left ? "lg:items-end lg:text-right" : ""
                                    }`}
                                    style={{
                                        borderColor: isReached ? `${accentColor}55` : "var(--color-hairline)",
                                    }}
                                >
                                    <span
                                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider font-mono w-fit"
                                        style={{ backgroundColor: bgTint, color: accentColor }}
                                    >
                                        {step.number}
                                    </span>
                                    <h3 className="text-[19px] font-medium text-ink-800 m-0">{step.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed m-0">{step.body}</p>
                                </article>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
