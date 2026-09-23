import Link from "next/link";
import type { Cta } from "@/content/services/types";

type Variant = "primary" | "secondary";

export function PillCta({
    cta,
    variant = "primary",
}: {
    cta: Cta;
    variant?: Variant;
}) {
    const className =
        variant === "primary"
            ? "inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-full bg-surface-inverse text-white text-sm font-medium shadow-pill hover:shadow-card hover:-translate-y-0.5 transition-all group"
            : "inline-flex items-center justify-center h-12 px-6 rounded-full bg-paper border border-hairline text-ink-800 text-sm font-medium shadow-sm hover:shadow-chip hover:-translate-y-0.5 transition-all";

    const inner =
        variant === "primary" ? (
            <>
                <span>{cta.label}</span>
                <span className="w-8 h-8 rounded-full bg-white text-ink-800 inline-flex items-center justify-center ml-2 text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                </span>
            </>
        ) : (
            <span>{cta.label}</span>
        );

    if (cta.href.startsWith("#")) {
        return (
            <a href={cta.href} className={className}>
                {inner}
            </a>
        );
    }

    return (
        <Link href={cta.href} className={className}>
            {inner}
        </Link>
    );
}
