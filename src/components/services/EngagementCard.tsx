import Link from "next/link";
import {
    Code2,
    Compass,
    GraduationCap,
    Layers,
    Network,
    ShieldCheck,
    Sparkles,
    UserCheck,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/services/types";

const ICONS: Record<IconName | "user", LucideIcon> = {
    compass: Compass,
    layers: Layers,
    network: Network,
    shield: ShieldCheck,
    sparkles: Sparkles,
    code: Code2,
    graduation: GraduationCap,
    user: UserCheck,
};

export function EngagementCard({
    number,
    title,
    description,
    accentColor,
    bgTint,
    icon,
    href,
    active = false,
}: {
    number: string;
    title: string;
    description: string;
    accentColor: string;
    bgTint: string;
    icon: IconName | "user";
    href?: string;
    active?: boolean;
}) {
    const Icon = ICONS[icon];
    const className = active
        ? "group relative bg-surface-inverse text-white rounded-card border border-surface-inverse p-7 flex flex-col justify-between overflow-hidden"
        : "group relative bg-paper rounded-card border border-hairline p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/30 overflow-hidden";

    const body = (
        <>
            <div
                className={`absolute top-0 right-0 w-28 h-28 rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-bl ${
                    active ? "from-white/10" : "from-[#E4D8F3]/30"
                } via-transparent to-transparent`}
            />
            <div>
                <div className="flex items-center justify-between mb-6">
                    <span
                        className={`text-xs font-semibold tracking-wider font-mono ${
                            active ? "text-white/60" : "text-ink-300"
                        }`}
                    >
                        {number}
                    </span>
                    <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                            backgroundColor: active ? "rgba(255,255,255,0.12)" : bgTint,
                        }}
                    >
                        <Icon
                            size={20}
                            strokeWidth={2}
                            style={{ color: active ? "#ffffff" : accentColor }}
                        />
                    </div>
                </div>
                <h3
                    className={`text-[19px] font-medium m-0 leading-snug transition-colors ${
                        active ? "text-white" : "text-ink-800 group-hover:text-link"
                    }`}
                >
                    {title}
                </h3>
                <p
                    className={`text-sm leading-relaxed mt-3 mb-0 ${
                        active ? "text-white/75" : "text-text-secondary"
                    }`}
                >
                    {description}
                </p>
            </div>
            <div
                className={`pt-6 mt-4 border-t flex items-center justify-between ${
                    active ? "border-white/15" : "border-hairline/60"
                }`}
            >
                <span
                    className={`text-xs font-medium transition-colors ${
                        active ? "text-white/80" : "text-text-secondary/70 group-hover:text-link"
                    }`}
                >
                    {active ? "Current service" : "Learn engagement"}
                </span>
                <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                        active
                            ? "bg-white text-ink-800"
                            : "bg-paper-card text-ink-300 group-hover:bg-surface-inverse group-hover:text-white"
                    }`}
                >
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                </div>
            </div>
        </>
    );

    if (!href) {
        return <div className={className}>{body}</div>;
    }

    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`${className} no-underline`}
        >
            {body}
        </Link>
    );
}
