"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/services/links";

type NavChild = { href: string; label: string };

type NavMenu = {
    eyebrow: string;
    columns: NavChild[][];
    width: string;
    feature: { src: string; label: string; href: string };
};

type NavItem = { href: string; label: string; menu?: NavMenu };

const SOLUTION_LINKS: NavChild[] = [
    { href: "/solutions", label: "Customer Experience" },
    { href: "/solutions/employee-experience", label: "Employee Experience" },
    { href: "/solutions/modern-workplace", label: "Modern Workplace" },
];

const SERVICE_LINKS: NavChild[] = services.map((item) => ({
    href: serviceHref(item.slug),
    label: item.title,
}));

const NAV_LINKS: NavItem[] = [
    {
        href: "/solutions",
        label: "Solutions",
        menu: {
            eyebrow: "Practice areas",
            columns: [SOLUTION_LINKS],
            width: "w-[30rem]",
            feature: {
                src: "/practice-areas/customer-experience.jpg",
                label: "View All Solutions",
                href: "/solutions",
            },
        },
    },
    {
        href: "/services",
        label: "Services",
        menu: {
            eyebrow: "Core services",
            columns: [SERVICE_LINKS.slice(0, 4), SERVICE_LINKS.slice(4)],
            width: "w-[42rem]",
            feature: {
                src: "/services/strategy-advisory.jpg",
                label: "View All Services",
                href: "/services",
            },
        },
    },
    {
        href: "/platforms",
        label: "Platforms",
        menu: {
            eyebrow: "Platform details",
            columns: [[
                { href: "/platforms/amazon-connect", label: "Amazon Connect" },
                { href: "/platforms/zoom", label: "Zoom" },
                { href: "/platforms/zendesk", label: "Zendesk" },
            ]],
            width: "w-[30rem]",
            feature: {
                src: "/practice-areas/customer-experience.jpg",
                label: "View all platforms",
                href: "/platforms",
            },
        },
    },
    { href: "/ai", label: "AI Hub" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
];

function isActive(pathname: string, href: string) {
    const [path] = href.split("#");
    return pathname === path || pathname.startsWith(`${path}/`);
}

function isChildActive(pathname: string, href: string) {
    return pathname === href.split("#")[0];
}

// Two stacked copies of the label inside a one-line window: hovering slides the
// stack up by exactly half its height, so the second copy rolls into place.
function RollingLabel({ children }: { children: string }) {
    return (
        <span className="block h-[1.4em] overflow-hidden">
            <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/roll:-translate-y-1/2">
                <span className="block h-[1.4em] leading-[1.4]">{children}</span>
                <span className="block h-[1.4em] leading-[1.4]" aria-hidden="true">
                    {children}
                </span>
            </span>
        </span>
    );
}

function MegaMenu({ menu, pathname }: { menu: NavMenu; pathname: string }) {
    return (
        // pt-3 (not mt-3) keeps the gap below the pill bar inside the hover area.
        <div
            className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 max-w-[calc(100vw-2rem)] ${menu.width}`}
        >
            <div className="sg-menu-in flex gap-4 p-4 rounded-[28px] bg-paper border border-hairline/70 shadow-float">
                <div className="flex-1 min-w-0">
                    <p className="m-0 px-3 text-[11px] font-medium tracking-[0.08em] uppercase text-text-secondary/60">
                        {menu.eyebrow}
                    </p>
                    <div className="mt-2 flex gap-2">
                        {menu.columns.map((column, index) => (
                            <ul key={index} className="flex-1 m-0 p-0 list-none flex flex-col gap-0.5">
                                {column.map((child) => (
                                    <li key={child.label}>
                                        <Link
                                            href={child.href}
                                            className={`group/roll block px-3 py-2 rounded-2xl text-[13.5px] font-medium no-underline transition-colors ${
                                                isChildActive(pathname, child.href)
                                                    ? "text-ink-800 bg-paper-muted"
                                                    : "text-text-secondary hover:text-ink-800 hover:bg-paper-muted"
                                            }`}
                                        >
                                            <RollingLabel>{child.label}</RollingLabel>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>

                <div className="relative w-44 shrink-0 rounded-[20px] overflow-hidden">
                    <Image
                        src={menu.feature.src}
                        alt=""
                        fill
                        sizes="176px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink-800/60 via-ink-800/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center">
                        <Link
                            href={menu.feature.href}
                            className="group/roll inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white/95 text-ink-800 text-xs font-medium shadow-pill no-underline hover:bg-white transition-colors"
                        >
                            <RollingLabel>{menu.feature.label}</RollingLabel>
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileNav({
    pathname,
    onOpenChange,
}: {
    pathname: string;
    onOpenChange: (open: boolean) => void;
}) {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState<string | null>(null);

    const updateOpen = (next: boolean) => {
        setOpen(next);
        onOpenChange(next);
    };

    return (
        <>
            <button
                onClick={() => updateOpen(!open)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/60 text-ink-800 relative z-50 pointer-events-auto"
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
                <>
                    {/* Mobile backdrop blur */}
                    <div
                        className="fixed inset-0 z-40 bg-black/35 backdrop-blur-md md:hidden pointer-events-auto"
                        onClick={() => updateOpen(false)}
                        aria-hidden="true"
                    />

                    <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/80 flex flex-col gap-1.5 pointer-events-auto sg-menu-in z-50">
                        {NAV_LINKS.map((item) => (
                            <div key={item.href} className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <Link
                                        href={item.href}
                                        onClick={() => updateOpen(false)}
                                        className={`flex-1 px-4 py-3 rounded-2xl hover:bg-paper-muted font-medium text-[15px] no-underline ${
                                            isActive(pathname, item.href) ? "text-ink-800" : "text-text-secondary"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                    {item.menu && (
                                        <button
                                            onClick={() =>
                                                setExpanded((current) =>
                                                    current === item.label ? null : item.label
                                                )
                                            }
                                            className="w-10 h-10 grid place-items-center rounded-full text-text-secondary hover:bg-paper-muted"
                                            aria-label={`Show ${item.label} pages`}
                                            aria-expanded={expanded === item.label}
                                        >
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${
                                                    expanded === item.label ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>
                                    )}
                                </div>

                                {item.menu && expanded === item.label && (
                                    <div className="mt-1 mb-1 ml-4 pl-3 border-l border-hairline flex flex-col gap-0.5">
                                        {item.menu.columns.flat().map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                onClick={() => updateOpen(false)}
                                                className={`px-3 py-2 rounded-xl text-[14px] no-underline hover:bg-paper-muted ${
                                                    isChildActive(pathname, child.href)
                                                        ? "text-ink-800 font-medium"
                                                        : "text-text-secondary"
                                                }`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [navHovered, setNavHovered] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();

    const isBlurred = navHovered || Boolean(openMenu);

    const navItem =
        "inline-flex items-center gap-1 px-4.5 py-2 rounded-full text-sm font-medium transition-all no-underline";
    const navActive = `${navItem} bg-white text-ink-800 shadow-pill`;
    const navOpen = `${navItem} bg-white/80 text-ink-800`;
    const navIdle = `${navItem} text-text-secondary hover:text-ink-800 hover:bg-white/80`;

    const navClass = (item: NavItem) => {
        if (isActive(pathname, item.href)) return navActive;
        return openMenu === item.label ? navOpen : navIdle;
    };

    useEffect(() => {
        let lastY = window.scrollY;

        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 20);

            const delta = y - lastY;
            if (Math.abs(delta) < 8) return;

            if (y < 80 || delta < 0) {
                setHidden(false);
            } else {
                setHidden(true);
            }
            lastY = y;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setOpenMenu(null);
        setNavHovered(false);
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    }, []);

    const hoverOption = (item: NavItem) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setNavHovered(true);
        if (item.menu) {
            setOpenMenu(item.label);
        } else {
            setOpenMenu(null);
        }
    };

    // Small delay so the pointer can travel across the gap between the pill bar and the panel.
    const closeSoon = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setOpenMenu(null);
            setNavHovered(false);
        }, 140);
    };

    const dismiss = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenMenu(null);
        setNavHovered(false);
    };

    const active = NAV_LINKS.find((item) => item.label === openMenu);
    const concealed = hidden && !openMenu && !mobileOpen;

    return (
        <>
            {/* Full-screen backdrop blur overlay */}
            <div
                className={`hidden md:block fixed inset-0 z-40 bg-black/25 backdrop-blur-md transition-all duration-300 ${
                    isBlurred
                        ? "opacity-100 pointer-events-auto visible"
                        : "opacity-0 pointer-events-none invisible"
                }`}
                onClick={dismiss}
                aria-hidden="true"
            />

            <header
                className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-[clamp(20px,5vw,64px)] pointer-events-none transition-[padding,transform] duration-300 ${
                    scrolled ? "py-4" : "py-5"
                } ${concealed ? "-translate-y-[calc(100%+2.5rem)]" : "translate-y-0"}`}
            >
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 -top-px -bottom-8 -z-10 backdrop-blur-lg transition-opacity duration-200 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.7)_42%,rgba(255,255,255,0)_100%)] [mask-image:linear-gradient(to_bottom,#000_0%,#000_28%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_28%,transparent_100%)] ${
                        scrolled ? "opacity-100" : "opacity-0"
                    }`}
                />

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
                    className="hidden md:flex relative items-center gap-1 p-1.5 rounded-full bg-white/75 shadow-pill backdrop-blur-md border border-white/40 pointer-events-auto"
                    aria-label="Main Navigation"
                    onMouseEnter={() => {
                        if (closeTimer.current) clearTimeout(closeTimer.current);
                        setNavHovered(true);
                    }}
                    onMouseLeave={closeSoon}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") dismiss();
                    }}
                >
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={navClass(item)}
                            onMouseEnter={() => hoverOption(item)}
                            onFocus={() => hoverOption(item)}
                            aria-haspopup={item.menu ? "true" : undefined}
                            aria-expanded={item.menu ? openMenu === item.label : undefined}
                        >
                            {item.label}
                            {item.menu && (
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        openMenu === item.label ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                />
                            )}
                        </Link>
                    ))}

                    {active?.menu && <MegaMenu menu={active.menu} pathname={pathname} />}
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

                    <MobileNav key={pathname} pathname={pathname} onOpenChange={setMobileOpen} />
                </div>
            </header>
        </>
    );
}
