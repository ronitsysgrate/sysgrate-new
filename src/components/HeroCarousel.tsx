"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

interface SlideOption {
    id: number;
    tag: string;
    title: React.ReactNode;
    description: string;
}

const SLIDES: SlideOption[] = [
    {
        id: 1,
        tag: "01",
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
    },
    {
        id: 3,
        tag: "03",
        title: (
            <>
                We are the AI and experience{" "}
                <span className="sg-highlight font-medium">technology backbone</span>{" "}
                behind the best-run enterprises.
            </>
        ),
        description:
            "Specialist system integrator for cloud contact centre, unified communications, and modern workplace technology.",
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
        description:
            "Designed, integrated, and managed for enterprises worldwide.",
    },
];

const AUTOPLAY_INTERVAL = 7000;

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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-roledescription="carousel"
            aria-label="Sysgrate Value Propositions"
        >
            {/* Video stage & ambient overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/hero-bars.mp4"
                    className="w-full h-full object-cover opacity-35 saturate-115 contrast-105 scale-105 transition-opacity duration-500"
                />
                <div
                    className="absolute inset-0 backdrop-blur-[18px]"
                    style={{
                        background:
                            "radial-gradient(ellipse 95% 65% at 50% -10%, rgba(228, 216, 243, 0.42) 0%, transparent 70%), radial-gradient(circle 540px at 85% 30%, rgba(242, 222, 238, 0.35) 0%, transparent 80%), linear-gradient(180deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.84) 50%, rgba(246, 243, 251, 0.95) 100%)",
                    }}
                />
            </div>

            {/* Ambient colorful glow */}
            <div
                aria-hidden="true"
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#E79AC0]/20 via-[#9A6EAC]/15 to-[#3E3A97]/10 blur-[100px] rounded-full pointer-events-none z-1"
            />

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
                                className="text-[18px] leading-[1.55] text-text-secondary max-w-[580px] sg-animate-rise"
                                style={{ animationDelay: "100ms" }}
                            >
                                {active.description}
                            </p>

                            <div
                                className="w-full max-w-[520px] sg-animate-rise"
                                style={{ animationDelay: "180ms" }}
                            >
                                {submittedEmail ? (
                                    <div className="p-3.5 px-5 rounded-full bg-[#E4D8F3]/60 border border-[#7B5AA6]/40 text-surface-inverse flex items-center justify-between gap-3 shadow-sm">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#7B5AA6] text-white flex items-center justify-center text-xs font-bold">
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
                                        className="flex items-center gap-2 p-1.5 pl-5 bg-white/95 backdrop-blur-md border border-white/85 rounded-full shadow-[0_14px_40px_rgba(38,32,90,0.12),0_2px_8px_rgba(0,0,0,0.04)] focus-within:shadow-[0_18px_48px_rgba(123,90,166,0.20)] focus-within:border-[#7B5AA6]/40 max-w-[580px] w-full transition-all relative mx-auto"
                                    >
                                        <div className="pl-1 text-[#7B5AA6]">
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

                        <div
                            className="flex justify-center w-full sg-animate-rise"
                            style={{ animationDelay: "260ms" }}
                        >
                            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-panel shadow-float overflow-hidden w-full max-w-[420px] h-[400px] p-8 md:p-10 flex flex-col gap-8">
                                {/* Glass preview card inner placeholder */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div
                        className="flex items-center gap-2 p-2 sg-animate-rise"
                        style={{ animationDelay: "320ms" }}
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