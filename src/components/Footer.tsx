import Link from "next/link";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/services/links";

const linkClass =
    "group/link inline-flex items-center gap-1.5 text-[14px] leading-snug text-white/70 hover:text-white transition-colors no-underline focus-visible:outline-none focus-visible:text-white";

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
}[] = [
    {
        title: "Practices",
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
        links: services.map((item) => ({
            label: item.title,
            href: serviceHref(item.slug),
        })),
    },
    {
        title: "Company",
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
    const inner = (
        <>
            <span>{children}</span>
            <span aria-hidden="true" className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[12px]">
                →
            </span>
        </>
    );
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
            <a href={href} className={linkClass}>
                {inner}
            </a>
        );
    }
    return (
        <Link href={href} className={linkClass}>
            {inner}
        </Link>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto relative overflow-hidden text-white bg-[#1c1848]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[520px] rounded-full bg-[#9A6EAC]/35 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-120px] left-[-8%] h-[320px] w-[420px] rounded-full bg-[#3E3A97]/50 blur-3xl"
            />

            <div className="sg-container relative pt-12 pb-8 sm:pt-16">
                <nav
                    aria-label="Footer"
                    className="grid grid-cols-2 lg:grid-cols-[1fr_1.7fr_1fr] gap-x-8 gap-y-10 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-md px-6 py-8 sm:px-8"
                >
                    {COLUMNS.map((column) => (
                        <div key={column.title} className={column.wide ? "col-span-2 lg:col-span-1" : ""}>
                            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/40 m-0">
                                {column.title}
                            </p>
                            <ul
                                className={`m-0 mt-4 p-0 list-none gap-x-8 gap-y-2.5 ${
                                    column.wide ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col"
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

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13px] text-white/45 m-0">© {year} Sysgrate</p>
                    <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
                        {OFFICES.map((office) => (
                            <li key={office.label}>
                                <Link
                                    href={office.href}
                                    className="inline-flex items-center h-8 px-3.5 rounded-full border border-white/15 text-[13px] text-white/70 no-underline hover:text-white hover:border-white/40 transition-colors"
                                >
                                    {office.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
