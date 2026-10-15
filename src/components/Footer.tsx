import type { ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/links";

type FooterColumn = {
    title: string;
    links: { label: string; href: string }[];
    split?: boolean;
};

const COLUMNS: FooterColumn[] = [
    {
        title: "Solutions",
        links: [
            { label: "Customer Experience", href: "/solutions" },
            { label: "Employee Experience", href: "/solutions/employee-experience" },
            { label: "Modern Workplace", href: "/solutions/modern-workplace" },
        ],
    },
    {
        title: "Services",
        split: true,
        links: [
            ...services.map((item) => ({
                label: item.title,
                href: serviceHref(item.slug),
            })),
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Insights", href: "/insights" },
            { label: "Case studies", href: "/case-studies" },
            { label: "AI Hub", href: "/ai" },
            { label: "Platforms", href: "/platforms" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Offices", href: "/contact#offices" },
        ],
    },
];

const LEGAL = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
];

type SocialIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

function XIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M14.23 10.16 21.7 2h-1.77l-6.48 7.09L8.16 2H2.3l7.83 10.73L2.3 22h1.77l6.85-7.5L15.84 22h5.86l-7.47-11.84Zm-2.42 2.65-.8-1.07L4.7 3.3h2.72l5.1 6.89.8 1.07 6.62 8.94h-2.72l-5.41-7.39Z" />
        </svg>
    );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...iconProps} {...props}>
            <path d="M14 8.5h2.2V6h-2.2C11.8 6 10 7.8 10 10v1.5H8v2.5h2V19h2.6v-5H15l.6-2.5h-2.9V10c0-.8.7-1.5 1.3-1.5Z" />
        </svg>
    );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...iconProps} {...props}>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 10.5V16M8 8h.01M12 16v-3.2a2 2 0 0 1 4 0V16M12 13.2V16" />
        </svg>
    );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...iconProps} {...props}>
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="M4 7l8 6 8-6" />
        </svg>
    );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...iconProps} {...props}>
            <path d="M8.5 4.5h-2A1.5 1.5 0 0 0 5 6v1.2c0 6.2 5.1 11.3 11.3 11.3H17.5A1.5 1.5 0 0 0 19 17v-2l-3.2-1.2-1.3 1.3a9 9 0 0 1-4.1-4.1l1.3-1.3L8.5 4.5Z" />
        </svg>
    );
}

const SOCIAL: { label: string; href: string; Icon: SocialIcon }[] = [
    { label: "X", href: "https://x.com/sysgrate", Icon: XIcon },
    {
        label: "Facebook",
        href: "https://www.facebook.com/people/Sysgrate-Technologies/100089606004653/",
        Icon: FacebookIcon,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/sysgrate-technologies",
        Icon: LinkedInIcon,
    },
    { label: "Email", href: "mailto:sales@sysgrate.com", Icon: MailIcon },
];

function FooterLink({ href, children, underline = false }: { href: string; children: ReactNode; underline?: boolean }) {
    const className = `text-[14px] leading-snug text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white ${underline ? "underline underline-offset-[3px] decoration-white/30 hover:decoration-white" : "no-underline"
        }`;

    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
        return (
            <a
                href={href}
                className={className}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-auto overflow-hidden bg-[#1c1848] text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-[-10%] h-105 w-130 rounded-full bg-[#9A6EAC]/30 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-30 left-[-8%] h-80 w-105 rounded-full bg-[#3E3A97]/45 blur-3xl"
            />
            <div className="sg-container relative z-10 pt-8 sm:pt-12">
                <div className="rounded-[28px] border border-white/10 bg-surface-inverse px-6 py-8 shadow-[0_24px_60px_-28px_rgba(8,6,28,0.55)] sm:rounded-[32px] sm:px-10 sm:py-10 lg:px-12">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-136 lg:max-w-90">
                            <Link href="/" className="inline-flex items-center gap-2.5 no-underline group">
                                <Image
                                    src="/logos/sysgrate-mark.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
                                />
                                <span className="text-[20px] font-semibold tracking-tight text-white">Sysgrate</span>
                            </Link>
                            <p className="m-0 mt-4 text-[14px] leading-[1.6] text-white/65">
                                Sysgrate helps enterprises design and run AI&#8209;native customer and workplace experiences — end to end.
                            </p>
                            <ul className="m-0 mt-5 flex list-none flex-wrap items-center gap-x-4 gap-y-3 p-0">
                                {SOCIAL.map(({ label, href, Icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            aria-label={label}
                                            {...(href.startsWith("http")
                                                ? { target: "_blank", rel: "noopener noreferrer" }
                                                : {})}
                                            className="inline-flex text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
                                        >
                                            <Icon className="h-4.5 w-4.5" />
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href="tel:+6583467679"
                                        aria-label="Call +65 8346 7679"
                                        className="inline-flex items-center gap-2 text-[14px] leading-none text-white/75 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
                                    >
                                        <PhoneIcon className="h-4.5 w-4.5" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <nav
                            aria-label="Footer"
                            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-5 sm:gap-x-8 lg:gap-x-10"
                        >
                            {COLUMNS.map((column) => (
                                <div key={column.title} className={column.split ? "col-span-2" : undefined}>
                                    <p className="m-0 text-[14px] font-semibold text-white">{column.title}</p>
                                    <ul
                                        className={`m-0 mt-4 list-none p-0 ${column.split ? "grid grid-flow-col gap-x-6 gap-y-2.5 sm:gap-x-8" : "flex flex-col gap-2.5"
                                            }`}
                                        style={
                                            column.split
                                                ? { gridTemplateRows: `repeat(${Math.ceil(column.links.length / 2)}, auto)` }
                                                : undefined
                                        }
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
                    </div>

                    <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
                        <p className="m-0 text-[13px] text-white/50">© {year} Sysgrate. All rights reserved.</p>
                        <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
                            {LEGAL.map((item) => (
                                <li key={item.label}>
                                    <FooterLink href={item.href} underline>
                                        {item.label}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <p
                aria-hidden="true"
                className="pointer-events-none relative z-0 m-0 px-(--gutter-page) pb-3 text-center text-[min(16vw,240px)] font-semibold leading-[1.15] tracking-[-0.06em] text-[#5c56b8] select-none"
            >
                Sysgrate
            </p>
        </footer>
    );
}
