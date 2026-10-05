import Link from "next/link";
import {
    ArrowUpRight,
    Brain,
    Code2,
    Compass,
    Headset,
    Layers,
    Monitor,
    Network,
    RefreshCw,
    ServerCog,
    UserCheck,
    type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services/types";

const RELATED_ICONS: Record<string, LucideIcon> = {
    "Strategy & Advisory": Compass,
    "Solution Design & Delivery": Layers,
    "Platform & Systems Integration": Network,
    "Managed Operations": ServerCog,
    "Experience as a Service": RefreshCw,
    "Bespoke Engineering": Code2,
    "Embedded Expertise": UserCheck,
    "AI Hub": Brain,
    "Customer Experience": Headset,
    "Digital Workplace": Monitor,
};

export function RelatedServices({ service }: { service: Service }) {
    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div className="max-w-180 flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    Related services
                </span>
                <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                    {service.relatedIntro}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                {service.related.map((item) => {
                    const Icon = RELATED_ICONS[item.title] ?? ArrowUpRight;
                    return (
                        <Link
                            key={item.href + item.title}
                            href={item.href}
                            className="group rounded-card border border-hairline bg-paper p-7 flex flex-col gap-3 no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/30"
                        >
                            <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-1"
                                style={{ backgroundColor: service.bgTint }}
                            >
                                <Icon size={20} strokeWidth={2} style={{ color: service.accentColor }} />
                            </div>
                            <h3 className="text-[19px] font-medium text-ink-800 m-0 leading-snug group-hover:text-link transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0 flex-1">
                                {item.blurb}
                            </p>
                            <span className="text-sm font-medium text-link mt-2">Learn more →</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
