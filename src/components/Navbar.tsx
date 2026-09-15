"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-[clamp(20px,5vw,64px)] py-5 pointer-events-none transition-all duration-200 ${
                scrolled ? "py-4" : "py-5"
            }`}
        >
            {/* Brand logo */}
            <a
                href="#"
                className="inline-flex items-center gap-2.5 no-underline pointer-events-auto group"
            >
                <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                    <Image
                        src="/sysgrate-mark.png"
                        alt="Sysgrate Logo Mark"
                        width={32}
                        height={32}
                        className="w-8 h-auto object-contain"
                        priority
                    />
                </div>
                <span className="font-semibold text-xl tracking-tight text-ink-800 group-hover:text-link transition-colors">
                    Sysgrate
                </span>
            </a>

            {/* Desktop Navigation Pill Bar */}
            <nav
                className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/75 shadow-pill backdrop-blur-md border border-white/40 pointer-events-auto"
                aria-label="Main Navigation"
            >
                <a
                    href="#solutions"
                    className="inline-flex items-center px-4.5 py-2 rounded-full text-sm font-medium bg-white text-ink-800 shadow-pill transition-all"
                >
                    Solutions
                </a>
                <a
                    href="#operations"
                    className="inline-flex items-center px-4.5 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-ink-800 hover:bg-white/80 transition-all"
                >
                    Operations
                </a>
                <a
                    href="#ai"
                    className="inline-flex items-center px-4.5 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-ink-800 hover:bg-white/80 transition-all"
                >
                    AI &amp; Automation
                </a>
                <a
                    href="#global"
                    className="inline-flex items-center px-4.5 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-ink-800 hover:bg-white/80 transition-all"
                >
                    Global
                </a>
            </nav>

            {/* Action CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 pointer-events-auto">
                <a
                    href="#contact"
                    className="inline-flex items-center justify-center h-11 pl-5 pr-1.5 rounded-full bg-white text-ink-800 shadow-pill hover:bg-paper-muted hover:shadow-md transition-all group"
                >
                    <span className="font-medium text-sm">Get Started</span>
                    <span className="w-7.5 h-7.5 rounded-full bg-paper-muted inline-grid place-items-center ml-2 text-sm font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                    </span>
                </a>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/60 text-ink-800"
                    aria-label="Toggle Navigation Menu"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/80 flex flex-col gap-3 pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200">
                    <a
                        href="#solutions"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-2xl hover:bg-paper-muted text-ink-800 font-medium text-[15px]"
                    >
                        Solutions
                    </a>
                    <a
                        href="#operations"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-2xl hover:bg-paper-muted text-text-secondary font-medium text-[15px]"
                    >
                        Operations
                    </a>
                    <a
                        href="#ai"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-2xl hover:bg-paper-muted text-text-secondary font-medium text-[15px]"
                    >
                        AI &amp; Automation
                    </a>
                    <a
                        href="#global"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-2xl hover:bg-paper-muted text-text-secondary font-medium text-[15px]"
                    >
                        Global
                    </a>
                </div>
            )}
        </header>
    );
}