import type { Service } from "@/content/services/types";
import { PillCta } from "./PillCta";

export function ServiceClose({ service }: { service: Service }) {
    const { close } = service;

    return (
        <section id="close" className="sg-container pt-[clamp(64px,10vw,120px)] pb-[clamp(64px,10vw,120px)] scroll-mt-40">
            <div
                className="relative overflow-hidden rounded-panel border border-hairline/80 px-8 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20 flex flex-col items-center text-center gap-6"
                style={{ background: "var(--panel-gradient)" }}
            >
                <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#E79AC0]/25 via-[#9A6EAC]/20 to-transparent blur-2xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#3E3A97]/15 via-transparent to-transparent blur-2xl" />

                <h2 className="relative z-10 text-[clamp(28px,3.6vw,52px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0 max-w-[760px]">
                    {close.title}
                </h2>
                <p className="relative z-10 text-[17px] sm:text-[18px] leading-[1.6] text-text-secondary m-0 max-w-[620px]">
                    {close.body}
                </p>
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 mt-2 flex-wrap">
                    <PillCta cta={close.primaryCta} />
                    {close.secondaryCta ? (
                        <PillCta cta={close.secondaryCta} variant="secondary" />
                    ) : null}
                    {close.tertiaryCta ? (
                        <PillCta cta={close.tertiaryCta} variant="secondary" />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
