import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/services/links";

const linkClass =
    "text-[13px] leading-snug text-white/70 hover:text-white transition-colors no-underline focus-visible:outline-none focus-visible:text-white";

const OFFICES = [
    { label: "Singapore", href: "/contact#offices" },
    { label: "India", href: "/contact#offices" },
    { label: "Malaysia", href: "/contact#offices" },
    { label: "UAE", href: "/contact#offices" },
];

const COLUMNS: {
    title: string;
    links: { label: string; href: string }[];
    wide?: boolean;
    order: string;
    span?: string;
}[] = [
    {
        title: "Practices",
        order: "order-1",
        links: [
            { label: "Customer Experience", href: "/solutions" },
            { label: "Employee Experience", href: "/solutions/employee-experience" },
            { label: "Modern Workplace", href: "/solutions/modern-workplace" },
            { label: "Artificial Intelligence", href: "/ai" },
        ],
    },
    {
        title: "Services",
        wide: true,
        order: "order-3 lg:order-2",
        span: "col-span-2 lg:col-span-1",
        links: services.map((item) => ({
            label: item.title,
            href: serviceHref(item.slug),
        })),
    },
    {
        title: "Company",
        order: "order-2 lg:order-3",
        links: [
            { label: "Platforms", href: "/platforms" },
            { label: "Case studies", href: "/case-studies" },
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Insights", href: "/insights" },
            { label: "FAQ", href: "/#faq" },
        ],
    },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
            <a href={href} className={linkClass}>
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className={linkClass}>
            {children}
        </Link>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto bg-surface-inverse text-white">
            <div className="sg-container py-8 sm:py-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link href="/" className="inline-flex items-center gap-2.5 no-underline shrink-0 group">
                            <Image
                                src="/sysgrate-mark.png"
                                alt=""
                                width={28}
                                height={28}
                                className="w-7 h-7 object-contain transition-transform group-hover:scale-105 duration-200"
                            />
                            <span className="font-semibold text-lg tracking-tight text-white group-hover:text-white/80 transition-colors">
                                Sysgrate
                            </span>
                        </Link>
                        <span className="hidden md:block w-px h-4 bg-white/20" aria-hidden="true" />
                        <p className="hidden md:block text-[13px] text-white/60 m-0 truncate">
                            AI-native CX, communications, and workplace.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="mailto:sales@sysgrate.com"
                            className="text-[13px] font-medium text-white/70 hover:text-white transition-colors no-underline"
                        >
                            sales@sysgrate.com
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center h-9 pl-4 pr-1 rounded-full bg-white text-ink-800 shadow-pill hover:shadow-md transition-all group no-underline shrink-0"
                        >
                            <span className="font-medium text-[13px]">Get Started</span>
                            <span className="w-7 h-7 rounded-full bg-paper-muted inline-grid place-items-center ml-2 text-sm font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>

                <nav
                    aria-label="Footer"
                    className="mt-8 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-[1fr_1.6fr_1fr] gap-x-8 gap-y-8"
                >
                    {COLUMNS.map((column) => (
                        <div key={column.title} className={`${column.order} ${column.span ?? ""}`}>
                            <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/40 m-0">
                                {column.title}
                            </p>
                            <ul
                                className={`m-0 mt-3 p-0 list-none gap-x-6 gap-y-2 ${
                                    column.wide ? "grid grid-cols-2" : "flex flex-col"
                                }`}
                            >
                                {column.links.map((item) => (
                                    <li key={item.label}>
                                        <FooterLink href={item.href}>{item.label}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13px] text-white/45 m-0">© {year} Sysgrate</p>
                    <p className="text-[13px] text-white/45 m-0 flex flex-wrap gap-x-3 gap-y-1">
                        {OFFICES.map((office) => (
                            <FooterLink key={office.label} href={office.href}>
                                {office.label}
                            </FooterLink>
                        ))}
                    </p>
                </div>
            </div>
        </footer>
    );
}
