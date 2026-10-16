"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Waveform canvas                                                    */
/* ------------------------------------------------------------------ */

const LAYERS = [
    { amp: 1.0, freq: 1.0, speed: 1.3, phase: 0, width: 2.2, alpha: 1 },
    { amp: 0.7, freq: 1.7, speed: -1.0, phase: 1.7, width: 1.6, alpha: 0.55 },
    { amp: 0.5, freq: 2.5, speed: 1.7, phase: 3.1, width: 1.2, alpha: 0.35 },
];

function Waveform({ levelRef }: { levelRef: React.MutableRefObject<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let w = 0;
        let h = 0;
        let raf = 0;
        let current = 0.06;
        const start = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const draw = (now: number) => {
            const t = (now - start) / 1000;
            current += (levelRef.current - current) * 0.07;
            ctx.clearRect(0, 0, w, h);

            const grad = ctx.createLinearGradient(0, 0, w, 0);
            grad.addColorStop(0, "rgba(231,154,192,0)");
            grad.addColorStop(0.28, "rgba(231,154,192,1)");
            grad.addColorStop(0.5, "rgba(154,110,172,1)");
            grad.addColorStop(0.72, "rgba(62,58,151,1)");
            grad.addColorStop(1, "rgba(62,58,151,0)");

            const mid = h / 2;
            const maxAmp = h * 0.3;

            for (const L of LAYERS) {
                ctx.beginPath();
                for (let x = 0; x <= w; x += 3) {
                    const nx = x / w;
                    const envelope = Math.pow(Math.sin(Math.PI * nx), 2.2);
                    const voice = 0.65 + 0.35 * Math.sin(t * 3.1 + nx * 9 + L.phase);
                    const y =
                        mid +
                        Math.sin(nx * Math.PI * 2 * 3 * L.freq + t * L.speed + L.phase) *
                        maxAmp *
                        L.amp *
                        current *
                        envelope *
                        voice;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = grad;
                ctx.globalAlpha = L.alpha * (0.55 + current * 0.45);
                ctx.lineWidth = L.width;
                ctx.lineCap = "round";
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            if (!reduce) raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [levelRef]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Orbit rings (inner → outer). `d` staggers the ripple so it   */
/*  travels outward from the mic.                                      */
/* ------------------------------------------------------------------ */

const RINGS = [
    { size: "clamp(150px,18vw,180px)", style: "border border-[#9A6EAC]/60", spin: "ai-hero-orbit", d: "0s", o: 0.85 },
    { size: "clamp(230px,27vw,320px)", style: "border border-dashed border-[#9A6EAC]/50", spin: "ai-hero-orbit", d: "0.1s", o: 0.65 },
    { size: "clamp(310px,36vw,470px)", style: "border border-[#E79AC0]/55", spin: "ai-hero-orbit-rev", d: "0.2s", o: 0.48 },
    { size: "clamp(390px,46vw,630px)", style: "border border-dashed border-[#E79AC0]/50", spin: "ai-hero-orbit-rev", d: "0.3s", o: 0.33 },
    { size: "clamp(470px,58vw,800px)", style: "border border-[#3E3A97]/35", spin: "ai-hero-orbit", d: "0.4s", o: 0.2 },
    { size: "clamp(550px,70vw,980px)", style: "border border-[#3E3A97]/30", spin: "ai-hero-orbit-rev", d: "0.5s", o: 0.1 },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function AiHubHero() {
    const [active, setActive] = useState(false);

    /* waveform is always moving; clicking the mic just boosts it */
    const levelRef = useRef(0.6);
    const activeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        levelRef.current = active ? 1 : 0.6;
    }, [active]);

    useEffect(
        () => () => {
            if (activeTimer.current) clearTimeout(activeTimer.current);
        },
        []
    );

    const onMicClick = () => {
        setActive(true);
        if (activeTimer.current) clearTimeout(activeTimer.current);
        activeTimer.current = setTimeout(() => setActive(false), 3600);
    };

    return (
        <section
            className="relative isolate overflow-hidden bg-paper pt-[clamp(120px,18vh,176px)] pb-[clamp(40px,7vh,72px)]"
            aria-label="AI Hub hero"
        >
            <style>{`
                @keyframes ai-hero-breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.06); }
                }
                @keyframes ai-hero-ring {
                    0%, 100% { transform: scale(1); opacity: 0.55; }
                    50% { transform: scale(1.22); opacity: 0; }
                }
                @keyframes ai-hero-orbit { to { transform: rotate(360deg); } }
                @keyframes ai-hero-wave {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                .ai-hero-mic { animation: ai-hero-breathe 4.2s ease-in-out infinite; }
                .ai-hero-mic[data-active="true"] { animation-duration: 1.4s; }
                .ai-hero-ring { animation: ai-hero-ring 4.2s ease-in-out infinite; }
                .ai-hero-ring[data-active="true"] { animation-duration: 1.4s; }
                .ai-hero-orbit { animation: ai-hero-orbit 38s linear infinite; }
                .ai-hero-orbit-rev { animation: ai-hero-orbit 56s linear infinite reverse; }
                .ai-hero-wave {
                    animation: ai-hero-wave 2.6s ease-in-out infinite;
                    animation-delay: var(--d, 0s);
                }
                .ai-hero-wave[data-active="true"] { animation-duration: 1.3s; }
                @media (prefers-reduced-motion: reduce) {
                    .ai-hero-mic, .ai-hero-ring, .ai-hero-orbit,
                    .ai-hero-orbit-rev, .ai-hero-wave { animation: none !important; }
                }
            `}</style>

            {/* ---------- Background colour washes ---------- */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
                <div
                    className="sg-drift absolute left-[-10%] top-[20%] w-[46vw] h-[46vw] max-w-180 max-h-180 rounded-full blur-3xl opacity-60"
                    style={{ background: "radial-gradient(closest-side, #F2DEEE, transparent)" }}
                />
                <div
                    className="sg-drift-slow absolute right-[-10%] top-[35%] w-[46vw] h-[46vw] max-w-180 max-h-180 rounded-full blur-3xl opacity-60"
                    style={{ background: "radial-gradient(closest-side, #DBD7F6, transparent)" }}
                />
            </div>

            <div className="sg-container relative flex flex-col items-center text-center">
                {/* ---------- Copy ---------- */}
                <span className="sg-animate-rise relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary">
                    <span className="ai-live-dot" />
                    AI Hub
                </span>

                <h1 className="sg-animate-rise sg-delay-1 relative z-10 mt-5 text-[clamp(32px,4.6vw,64px)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-800 text-balance m-0 max-w-220">
                    AI that handles{" "}
                    <span className="sg-highlight font-medium">everything</span> for you
                </h1>

                <p className="sg-animate-rise sg-delay-2 relative z-10 mt-5 text-[18px] leading-[1.55] text-text-secondary max-w-150 text-balance m-0">
                    From voice bots to smart dashboards, we turn manual workflows into scalable,
                    AI-powered experiences.
                </p>

                {/* ---------- Voice stage ---------- */}
                <div className="sg-animate-rise sg-delay-3 relative w-full max-w-245 h-[clamp(260px,34vh,330px)] -mt-[clamp(24px,4vh,48px)] -mb-[clamp(24px,4vh,48px)]">
                    {/* waveform behind the mic */}
                    <Waveform levelRef={levelRef} />

                    {/* orbit rings — outer wrapper ripples continuously, inner one spins */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        {RINGS.map((r) => (
                            /* outer layer = static fade with distance, middle = ripple, inner = slow spin */
                            <div
                                key={r.size}
                                className="absolute inset-0 m-auto"
                                style={{ width: r.size, height: r.size, opacity: r.o }}
                            >
                                <div
                                    data-active={active}
                                    className="ai-hero-wave w-full h-full"
                                    style={{ "--d": r.d } as React.CSSProperties}
                                >
                                    <div className={`${r.spin} w-full h-full rounded-full ${r.style}`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* mic */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span
                            data-active={active}
                            className="ai-hero-ring absolute inset-0 rounded-full bg-[#9A6EAC]/30 pointer-events-none"
                        />
                        <span
                            data-active={active}
                            className="ai-hero-ring absolute inset-0 rounded-full bg-[#E79AC0]/30 pointer-events-none"
                            style={{ animationDelay: active ? "0.45s" : "1.4s" }}
                        />
                        <button
                            type="button"
                            data-active={active}
                            onClick={onMicClick}
                            aria-label="Ask the AI a question"
                            aria-pressed={active}
                            className={`ai-hero-mic relative grid place-items-center w-[clamp(84px,9vw,108px)] aspect-square rounded-full cursor-pointer border transition-[background-color,box-shadow] duration-500 focus-visible:outline-none focus-visible:shadow-(--ring-focus) ${active
                                ? "bg-surface-inverse border-surface-inverse text-white shadow-[0_20px_60px_rgba(62,58,151,0.45)]"
                                : "bg-white border-white text-surface-inverse shadow-[0_20px_55px_rgba(123,90,166,0.3),0_2px_8px_rgba(0,0,0,0.05)]"
                                }`}
                        >
                            <Mic size={34} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>

                {/* ---------- CTAs ---------- */}
                <div className="sg-animate-rise sg-delay-4 relative z-10 mt-[clamp(12px,2vh,20px)] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group shrink-0"
                    >
                        <span>Book an AI readiness assessment</span>
                        <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            →
                        </span>
                    </a>

                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-white/80 backdrop-blur border border-hairline text-ink-800 text-sm font-medium hover:bg-white hover:border-link-hover/40 hover:shadow-pill hover:-translate-y-0.5 transition-all shrink-0"
                    >
                        Talk to an AI specialist
                    </a>
                </div>
            </div>
        </section>
    );
}