import Image from "next/image";
import type { Service } from "@/content/services/types";
import { PillCta } from "./PillCta";

function Headline({ text, highlight }: { text: string; highlight: string }) {
    const index = text.indexOf(highlight);
    if (index === -1) return <>{text}</>;
    let end = index + highlight.length;
    while (end < text.length && /[.,]/.test(text[end])) end += 1;
    return (
        <>
            {text.slice(0, index)}
            <span className="sg-highlight font-medium">{text.slice(index, end)}</span>
            {text.slice(end)}
        </>
    );
}

export function ServiceHero({ service }: { service: Service }) {
    return (
        <section className="sg-container pt-[clamp(120px,16vw,168px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(28px,5vw,64px)]">
                <div className="flex flex-col items-start gap-5">
                    <h1 className="text-[clamp(34px,4.4vw,64px)] font-normal leading-[1.35] tracking-[-0.03em] text-ink-800 m-0">
                        <Headline text={service.headline} highlight={service.highlight} />
                    </h1>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0 max-w-140">
                        {service.summary}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
                        <PillCta cta={service.primaryCta} />
                        <PillCta cta={service.secondaryCta} variant="secondary" />
                    </div>
                </div>
                <div className="relative w-full aspect-4/3 rounded-panel overflow-hidden bg-paper-card shadow-chip">
                    <Image
                        src={service.heroImage.src}
                        alt={service.heroImage.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
