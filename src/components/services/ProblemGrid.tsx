import { FileWarning, GitFork, Unplug } from "lucide-react";
import type { Service } from "@/content/services/types";

const PAIN_ICONS = [Unplug, GitFork, FileWarning];

export function ProblemGrid({ service }: { service: Service }) {
    const { problem, accentColor, bgTint } = service;

    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div className="max-w-180 flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {problem.eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {problem.title}
                </h2>
                <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                    {problem.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                {problem.pains.map((pain, index) => {
                    const Icon = PAIN_ICONS[index % PAIN_ICONS.length];
                    return (
                        <article
                            key={pain.title}
                            className="rounded-card border border-hairline bg-paper-muted p-7 flex flex-col gap-4"
                        >
                            <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                                style={{ backgroundColor: bgTint }}
                            >
                                <Icon size={20} strokeWidth={2} style={{ color: accentColor }} />
                            </div>
                            <h3 className="text-[19px] font-medium text-ink-800 m-0 leading-snug">
                                {pain.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed m-0">
                                {pain.body}
                            </p>
                        </article>
                    );
                })}
            </div>

            <a
                href="#close"
                className="inline-flex items-center mt-8 text-sm font-medium text-link hover:text-link-hover transition-colors"
            >
                Get a call back →
            </a>
        </section>
    );
}
