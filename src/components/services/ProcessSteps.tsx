import type { Service } from "@/content/services/types";

export function ProcessSteps({ process }: { process: NonNullable<Service["process"]> }) {
    const wide = process.steps.length >= 5 ? "xl:grid-cols-5" : "xl:grid-cols-4";

    return (
        <section id="process" className="sg-container pt-[clamp(64px,10vw,120px)] scroll-mt-40">
            <div className="max-w-180 flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {process.eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {process.title}
                </h2>
                <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                    {process.intro}
                </p>
            </div>

            <ol className={`grid grid-cols-1 md:grid-cols-2 ${wide} gap-4 mt-10 list-none p-0 m-0`}>
                {process.steps.map((step) => (
                    <li
                        key={`${step.number}-${step.title}`}
                        className="rounded-card border border-hairline bg-paper p-6 flex flex-col gap-3"
                    >
                        <span className="text-xs font-semibold tracking-wider text-ink-300 font-mono">
                            {step.number}
                        </span>
                        <h3 className="text-[18px] font-medium text-ink-800 m-0">{step.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed m-0">{step.body}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
