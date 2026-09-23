"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact Us" },
];

function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileNav({ pathname }: { pathname: string }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen((current) => !current)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/60 text-ink-800"
                aria-label="Toggle Navigation Menu"
                aria-expanded={open}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {open ? (
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

            {open && (
                <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/80 flex flex-col gap-3 pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200">
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`px-4 py-3 rounded-2xl hover:bg-paper-muted font-medium text-[15px] ${
                                isActive(pathname, item.href) ? "text-ink-800" : "text-text-secondary"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const navItem =
        "inline-flex items-center px-4.5 py-2 rounded-full text-sm font-medium transition-all";
    const navActive = `${navItem} bg-white text-ink-800 shadow-pill`;
    const navIdle = `${navItem} text-text-secondary hover:text-ink-800 hover:bg-white/80`;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-[clamp(20px,5vw,64px)] py-5 pointer-events-none transition-all duration-200 ${scrolled ? "py-4" : "py-5"
                }`}
        >
            {/* Brand logo */}
            <Link
                href="/"
                className="inline-flex items-center gap-2.5 no-underline pointer-events-auto group"
            >
                <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                    <Image
                        src="/sysgrate-mark.png"
                        alt="Sysgrate Logo Mark"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                        priority
                    />
                </div>
                <span className="font-semibold text-xl tracking-tight text-ink-800 group-hover:text-link transition-colors">
                    Sysgrate
                </span>
            </Link>

            {/* Desktop Navigation Pill Bar */}
            <nav
                className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/75 shadow-pill backdrop-blur-md border border-white/40 pointer-events-auto"
                aria-label="Main Navigation"
            >
                {NAV_LINKS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={isActive(pathname, item.href) ? navActive : navIdle}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Action CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 pointer-events-auto">
                <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-11 pl-5 pr-1.5 rounded-full bg-white text-ink-800 shadow-pill hover:bg-paper-muted hover:shadow-md transition-all group"
                >
                    <span className="font-medium text-sm">Get Started</span>
                    <span className="w-7.5 h-7.5 rounded-full bg-paper-muted inline-grid place-items-center ml-2 text-sm font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                    </span>
                </a>

                <MobileNav key={pathname} pathname={pathname} />
            </div>
        </header>
    );
}