"use client";

import Image from "next/image";
import { useState } from "react";
import { type SolutionPage } from "@/content/solutions/pages";

export function WorkplaceDeliver({ offerings }: { offerings: SolutionPage["offerings"] }) {
    const rooms = offerings.filter((item) => item.image);
    const [active, setActive] = useState(0);
    const current = rooms[active] ?? rooms[0];

    if (!current?.image) return null;

    return (
        <div className="sg-container mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] gap-5 lg:gap-6 items-stretch">
                <div
                    data-reveal="rise"
                    className="group/room relative min-h-[280px] sm:min-h-[380px] lg:min-h-[560px] rounded-panel overflow-hidden bg-paper-card shadow-chip"
                >
                    {rooms.map((item, index) =>
                        item.image ? (
                            <Image
                                key={item.title}
                                src={item.image.src}
                                alt={item.image.alt}
                                fill
                                sizes="(min-width: 1024px) 58vw, 100vw"
                                className={`object-cover transition-opacity duration-500 ${
                                    index === active ? "opacity-100" : "opacity-0"
                                }`}
                                priority={index === 0}
                            />
                        ) : null,
                    )}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
                        style={{
                            background: "linear-gradient(180deg, rgba(38,32,90,0) 0%, rgba(38,32,90,0.55) 100%)",
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 pb-8 sm:pb-10">
                        <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/70 m-0">
                            {String(active + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-[clamp(20px,2.4vw,32px)] font-medium text-white m-0 mt-2 leading-snug">
                            {current.title}
                        </h3>
                    </div>
                    {rooms.length > 1 ? (
                        <div
                            className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/20"
                            aria-hidden="true"
                        >
                            <span
                                key={active}
                                className="block h-full origin-left bg-white motion-safe:animate-[sg-progress_6s_linear_forwards] group-hover/room:[animation-play-state:paused]"
                                onAnimationEnd={(event) => {
                                    if (event.animationName !== "sg-progress") return;
                                    setActive((index) => (index + 1) % rooms.length);
                                }}
                            />
                        </div>
                    ) : null}
                </div>

                <div
                    data-reveal="rise"
                    data-delay="1"
                    className="flex flex-col gap-2 rounded-panel border border-hairline bg-paper p-2 sm:p-3"
                    role="tablist"
                    aria-label="Workplace environments"
                >
                    {rooms.map((item, index) => {
                        const on = index === active;
                        return (
                            <button
                                key={item.title}
                                type="button"
                                role="tab"
                                aria-selected={on}
                                onClick={() => setActive(index)}
                                className={`text-left rounded-[28px] px-4 py-4 sm:px-5 transition-all cursor-pointer ${
                                    on
                                        ? "bg-paper-muted border border-hairline shadow-chip"
                                        : "border border-transparent hover:bg-paper-muted/70"
                                }`}
                            >
                                <div className="flex items-start gap-3.5">
                                    {item.image ? (
                                        <span className="relative w-14 h-14 rounded-2xl overflow-hidden bg-paper-card shrink-0 hidden sm:block">
                                            <Image
                                                src={item.image.src}
                                                alt=""
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        </span>
                                    ) : null}
                                    <span className="min-w-0 flex-1">
                                        <span className="flex items-center gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-300">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className={`text-[16px] font-medium leading-snug ${on ? "text-ink-800" : "text-text-secondary"}`}>
                                                {item.title}
                                            </span>
                                        </span>
                                        <span
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                                on ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <span className="overflow-hidden">
                                                <span className="block text-sm text-text-secondary leading-relaxed">
                                                    {item.body}
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
