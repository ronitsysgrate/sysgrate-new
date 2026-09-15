"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

interface SlideOption {
    id: number;
    tag: string;
    title: React.ReactNode;
    description: string;
    card: {
        heading: string;
        body: string;
        metric: string;
        metricLabel: string;
        tint: string; // gradient used on the card face
    };
}

const SLIDES: SlideOption[] = [
    {
        id: 1,
        tag: "01",
        title: (
            <>
                We are the AI and experience{" "}
                <span className="sg-highlight font-medium">technology backbone</span>{" "}
                behind the best-run enterprises.
            </>
        ),
        description:
            "Specialist system integrator for cloud contact centre, unified communications, and modern workplace technology.",
        card: {
            heading: "Cloud contact centre",
            body: "Migration, routing design, and day-two operations across Genesys, NICE, and Amazon Connect.",
            metric: "40+",
            metricLabel: "enterprise migrations delivered",
            tint: "linear-gradient(145deg, #F7F2FD 0%, #E7DDF7 100%)",
        },
    },
    {
        id: 2,
        tag: "02",
        title: (
            <>
                <span className="sg-highlight font-medium">Experience-led.</span>{" "}
                <span className="sg-highlight font-medium">AI-powered.</span> Built to
                perform.
            </>
        ),
        description:
            "We design, deploy, and manage cloud contact centres, enterprise collaboration platforms, and intelligent workplace solutions for businesses.",
        card: {
            heading: "Unified communications",
            body: "Voice, meetings, and messaging consolidated onto one platform your people actually use.",
            metric: "99.98%",
            metricLabel: "managed platform availability",
            tint: "linear-gradient(145deg, #FDF2F8 0%, #EDD9EC 100%)",
        },
    },
    {
        id: 3,
        tag: "03",
        title: (
            <>
                What if your cloud contact centre, collaboration platform, and workspaces
                technology all worked in{" "}
                <span className="sg-highlight font-medium">sync</span> — powered by{" "}
                <span className="sg-highlight font-medium">AI</span>?
            </>
        ),
        description:
            "We design, integrate, and manage AI-native solutions across CX, unified communications, and modern workplace — for enterprises worldwide.",
        card: {
            heading: "Applied AI",
            body: "Agent assist, summarisation, and quality scoring wired into the systems you already run.",
            metric: "6 weeks",
            metricLabel: "from pilot to production",
            tint: "linear-gradient(145deg, #F2F4FE 0%, #DAD9F7 100%)",
        },
    },
    {
        id: 4,
        tag: "04",
        title: (
            <>
                We build AI-native contact center, collaboration &amp; workplace
                experiences — and turn them into your{" "}
                <span className="sg-highlight font-medium">competitive edge</span>.
            </>
        ),
        description: "Designed, integrated, and managed for enterprises worldwide.",
        card: {
            heading: "Modern workplace",
            body: "Meeting rooms, endpoints, and identity managed as one estate, not a pile of tickets.",
            metric: "24/7",
            metricLabel: "follow-the-sun support desk",
            tint: "linear-gradient(145deg, #F4F7FC 0%, #DFE6F5 100%)",
        },
    },
];

const AUTOPLAY_INTERVAL = 7000;

/** Where a card sits in the deck, based on how far it is behind the front card. */
function deckStyle(offset: number, total: number): React.CSSProperties {
    const isLeaving = offset === total - 1;

    if (isLeaving) {
        // The card that just left the front: drops downward and fades,
        // then re-enters at the back of the stack on the next advance.
        return {
            transform: "translate3d(0, 90px, 0) scale(0.86) rotate(4deg)",
            opacity: 0,
            zIndex: 10,
        };
    }

    return {
        transform: `translate3d(${offset * 10}px, ${offset * 22}px, 0) scale(${1 - offset * 0.05
            }) rotate(${offset % 2 === 0 ? -offset * 1.5 : offset * 1.5}deg)`,
        opacity: offset === 0 ? 1 : 1 - offset * 0.25,
        zIndex: 40 - offset * 10,
    };
}

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const progressRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        progressRef.current = 0;
        lastTimeRef.current = Date.now();
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
        progressRef.current = 0;
        lastTimeRef.current = Date.now();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === "INPUT") return;
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    useEffect(() => {
        if (isPaused) return;

        lastTimeRef.current = Date.now();
        const interval = 50;

        const timer = setInterval(() => {
            const now = Date.now();
            const delta = now - lastTimeRef.current;
            lastTimeRef.current = now;

            progressRef.current += (delta / AUTOPLAY_INTERVAL) * 100;

            if (progressRef.current >= 100) {
                nextSlide();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [currentSlide, isPaused, nextSlide]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailInput || !emailInput.includes("@")) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setSubmittedEmail(emailInput);
            setIsSubmitting(false);
            setEmailInput("");
        }, 600);
    };

    const active = SLIDES[currentSlide];

    return (
        <section
            className="relative h-screen min-h-dvh flex flex-col isolate overflow-hidden pt-[clamp(76px,10vh,96px)] bg-paper"
            aria-roledescription="carousel"
            aria-label="Sysgrate Value Propositions"
        >
            {/* Video stage */}
            <div
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src="/hero-bars.mp4"
                    className="w-full h-full object-cover opacity-90 scale-105"
                />

                {/* Readability wash: strong under the copy, clear over the video */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(100deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.80) 32%, rgba(255,255,255,0.30) 58%, rgba(255,255,255,0.06) 100%)",
                    }}
                />
                {/* Soft top/bottom blend into the page */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 22%, transparent 70%, rgba(246,243,251,0.90) 100%)",
                    }}
                />
                {/* Faint brand tint — kept low so the video reads through */}
                <div
                    className="absolute inset-0 mix-blend-soft-light"
                    style={{
                        background:
                            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(228,216,243,0.55) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="sg-container flex-1 min-h-0 flex flex-col justify-between pb-[clamp(16px,2.5vh,28px)] relative z-10">
                <div className="flex-1 min-h-0 flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(32px,6vw,88px)] w-full">
                        <div className="flex flex-col items-start text-left gap-[clamp(14px,2vh,20px)] w-full">
                            <div key={`title-${currentSlide}`} className="sg-animate-rise">
                                <h1 className="text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.12] tracking-[-0.02em] text-ink-800 text-balance m-0">
                                    {active.title}
                                </h1>
                            </div>

                            <p
                                key={`desc-${currentSlide}`}
                                className="text-[18px] leading-[1.55] text-text-secondary max-w-145 sg-animate-rise"
                                style={{ animationDelay: "100ms" }}
                            >
                                {active.description}
                            </p>

                            <div
                                className="w-full max-w-130 sg-animate-rise"
                                style={{ animationDelay: "180ms" }}
                            >
                                {submittedEmail ? (
                                    <div className="p-3.5 px-5 rounded-full bg-[#E4D8F3]/60 border border-link-hover/40 text-surface-inverse flex items-center justify-between gap-3 shadow-sm">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-link-hover text-white flex items-center justify-center text-xs font-bold">
                                                ✓
                                            </span>
                                            <span className="text-sm font-medium truncate">
                                                Callback requested for{" "}
                                                <strong className="font-semibold">{submittedEmail}</strong>
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setSubmittedEmail(null)}
                                            className="shrink-0 text-xs text-text-secondary hover:text-ink-800 underline underline-offset-2 cursor-pointer"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex items-center gap-2 p-1.5 pl-5 bg-white/95 backdrop-blur-md border border-white/85 rounded-full shadow-[0_14px_40px_rgba(38,32,90,0.12),0_2px_8px_rgba(0,0,0,0.04)] focus-within:shadow-[0_18px_48px_rgba(123,90,166,0.20)] focus-within:border-link-hover/40 max-w-145 w-full transition-all relative mx-auto"
                                    >
                                        <div className="pl-1 text-link-hover">
                                            <svg
                                                className="w-5 h-5 opacity-75"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.8}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            placeholder="Your email address"
                                            className="border-0 bg-transparent outline-none text-base text-ink-800 placeholder:text-ink-300 flex-1 min-w-0 py-2 px-1"
                                            aria-label="Your email address"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center justify-center h-11 pl-4.5 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-[0_18px_40px_rgba(38,32,90,0.20)] hover:shadow-[0_22px_48px_rgba(38,32,90,0.28)] hover:-translate-y-0.5 transition-all group cursor-pointer"
                                        >
                                            <span>{isSubmitting ? "Submitting..." : "Get a call back"}</span>
                                            <span className="w-7.5 h-7.5 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-xs font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                                ↗
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Card deck — shuffles in step with the copy */}
                        <div className="flex justify-center w-full">
                            <div
                                className="relative w-full max-w-105 h-100 sg-deck"
                                aria-live="polite"
                            >
                                {SLIDES.map((slide, i) => {
                                    const offset =
                                        (i - currentSlide + SLIDES.length) % SLIDES.length;
                                    const isFront = offset === 0;

                                    return (
                                        <article
                                            key={slide.id}
                                            className="sg-deck-card absolute inset-0 rounded-panel border border-white/90 shadow-float overflow-hidden p-8 md:p-10 flex flex-col justify-between"
                                            style={{
                                                ...deckStyle(offset, SLIDES.length),
                                                backgroundImage: slide.card.tint,
                                            }}
                                            aria-hidden={!isFront}
                                            {...(!isFront ? { inert: "" as unknown as boolean } : {})}
                                        >
                                            <div className="flex flex-col gap-3">
                                                <span className="text-xs font-medium text-link tracking-wide">
                                                    {slide.tag} / {SLIDES.length.toString().padStart(2, "0")}
                                                </span>
                                                <h2 className="text-2xl font-medium text-ink-800 leading-snug m-0">
                                                    {slide.card.heading}
                                                </h2>
                                                <p className="text-[15px] leading-relaxed text-text-secondary m-0">
                                                    {slide.card.body}
                                                </p>
                                            </div>

                                            <div className="flex items-end justify-between gap-4 pt-6 border-t border-white/70">
                                                <div>
                                                    <div className="text-[34px] leading-none font-medium text-surface-inverse">
                                                        {slide.card.metric}
                                                    </div>
                                                    <div className="text-[13px] text-text-secondary mt-2 max-w-45">
                                                        {slide.card.metricLabel}
                                                    </div>
                                                </div>
                                                <span className="w-10 h-10 rounded-full bg-white/80 text-ink-800 grid place-items-center text-sm shadow-pill">
                                                    ↗
                                                </span>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div
                        className="flex items-center gap-2 p-2"
                        role="group"
                        aria-label="Carousel controls"
                    >
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="w-8.5 h-8.5 rounded-full border-0 cursor-pointer bg-transparent text-text-secondary hover:bg-white hover:text-ink-800 hover:shadow-pill grid place-items-center transition-all"
                            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                            title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                        >
                            {isPaused ? (
                                <Play size={16} strokeWidth={2} />
                            ) : (
                                <Pause size={16} strokeWidth={2} />
                            )}
                        </button>

                        <button
                            onClick={prevSlide}
                            className="w-8.5 h-8.5 rounded-full border-0 cursor-pointer bg-transparent text-text-secondary hover:bg-white hover:text-ink-800 hover:shadow-pill grid place-items-center transition-all"
                            aria-label="Previous option"
                        >
                            <ChevronLeft size={18} strokeWidth={2} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-8.5 h-8.5 rounded-full border-0 cursor-pointer bg-transparent text-text-secondary hover:bg-white hover:text-ink-800 hover:shadow-pill grid place-items-center transition-all"
                            aria-label="Next option"
                        >
                            <ChevronRight size={18} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}