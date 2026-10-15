"use client";

import { useEffect, useRef, useState } from "react";

function CountValue({ value }: { value: string }) {
    const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
    const ref = useRef<HTMLSpanElement>(null);
    const [current, setCurrent] = useState(() => (match ? 0 : null));

    useEffect(() => {
        const parsed = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
        if (!parsed) return;
        const target = Number(parsed[2]);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setCurrent(target);
            return;
        }
        const node = ref.current;
        if (!node) return;
        let frame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                const duration = 1200;
                const tick = (now: number) => {
                    const progress = Math.min(1, (now - start) / duration);
                    const eased = 1 - (1 - progress) ** 3;
                    setCurrent(Math.round(target * eased));
                    if (progress < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.5 },
        );
        observer.observe(node);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    if (!match || current === null) return <>{value}</>;
    return (
        <span ref={ref}>
            {match[1]}
            {current}
            {match[3]}
        </span>
    );
}

function statTrend(value: string): "up" | "down" | "steady" {
    if (value.includes("↑")) return "up";
    if (value.includes("↓")) return "down";
    return "steady";
}

const STAT_TRENDS = {
    up: {
        line: "M0 52 C 22 50, 34 44, 50 36 S 82 16, 106 12 S 138 6, 160 4",
        area: "M0 52 C 22 50, 34 44, 50 36 S 82 16, 106 12 S 138 6, 160 4 L160 64 L0 64 Z",
        stroke: "#3E3A97",
        wash: "#EEEDF8",
        ink: "#3E3A97",
    },
    down: {
        line: "M0 8 C 22 12, 36 22, 52 30 S 84 48, 108 52 S 140 58, 160 60",
        area: "M0 8 C 22 12, 36 22, 52 30 S 84 48, 108 52 S 140 58, 160 60 L160 64 L0 64 Z",
        stroke: "#9A6EAC",
        wash: "#F8F1F6",
        ink: "#7B5AA6",
    },
    steady: {
        line: "M0 34 C 26 30, 42 40, 64 36 S 102 28, 126 34 S 148 40, 160 34",
        area: "M0 34 C 26 30, 42 40, 64 36 S 102 28, 126 34 S 148 40, 160 34 L160 64 L0 64 Z",
        stroke: "#BDB5D4",
        wash: "#F6F3FB",
        ink: "#141414",
    },
} as const;

export function StatCard({ value, label, source }: { value: string; label: string; source?: string }) {
    const trend = statTrend(value);
    const tone = STAT_TRENDS[trend];
    const gradientId = `stat-${trend}-${label.replace(/\W+/g, "").slice(0, 18)}`;

    return (
        <article
            data-reveal="rise"
            className="relative overflow-hidden rounded-card border border-hairline min-h-44 flex flex-col"
            style={{ background: `linear-gradient(180deg, #ffffff 0%, ${tone.wash} 100%)` }}
        >
            <div className="relative z-10 p-6 pb-16">
                <p
                    className="text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em] m-0"
                    style={{ color: tone.ink }}
                    aria-label={value}
                >
                    <CountValue value={value} />
                </p>
                <p className="text-sm text-text-secondary leading-snug m-0 mt-2">{label}</p>
                {source ? <p className="text-xs text-ink-300 m-0 mt-3">{source}</p> : null}
            </div>
            <svg
                viewBox="0 0 160 64"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 w-full"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={tone.stroke} stopOpacity="0.28" />
                        <stop offset="100%" stopColor={tone.stroke} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path className="sg-stat-fill" d={tone.area} fill={`url(#${gradientId})`} />
                <path
                    className="sg-stat-line"
                    d={tone.line}
                    fill="none"
                    stroke={tone.stroke}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    pathLength={1}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </article>
    );
}
