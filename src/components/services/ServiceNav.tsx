import Link from "next/link";
import { services } from "@/content/services";
import { service as serviceHref } from "@/content/services/links";
import { EngagementCard } from "./EngagementCard";

const PARENT_SLUG = "strategy-advisory";

export function ServiceNav({ currentSlug }: { currentSlug: string }) {
    const subpages = services.filter((item) => item.slug !== PARENT_SLUG);
    const onParent = currentSlug === PARENT_SLUG;

    return (
        <section className="sg-container pt-[clamp(48px,6vw,80px)]" aria-label="Services">
            <div className="flex flex-col gap-3 mb-8">
                {onParent ? (
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                        Services
                    </span>
                ) : (
                    <Link
                        href="/services"
                        className="inline-flex items-center w-fit text-sm font-medium text-link hover:text-link-hover no-underline transition-colors"
                    >
                        ← Strategy & Advisory
                    </Link>
                )}
            </div>

            <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subpages.map((item) => (
                    <EngagementCard
                        key={item.slug}
                        number={item.number}
                        title={item.title}
                        description={item.cardDescription}
                        accentColor={item.accentColor}
                        bgTint={item.bgTint}
                        icon={item.icon}
                        href={serviceHref(item.slug)}
                        active={item.slug === currentSlug}
                    />
                ))}
            </nav>
        </section>
    );
}
