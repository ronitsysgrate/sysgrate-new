import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AiHubHero from "@/components/ai/AiHubHero";
import StatGrid from "@/components/ai/StatGrid";
import { CallbackForm } from "@/components/CallbackForm";

export const metadata: Metadata = {
    title: "AI Hub | Sysgrate",
    description:
        "From voice bots to smart dashboards — we turn manual workflows into scalable, AI-powered experiences.",
};

const stats = [
    { value: "↓80%", label: "Reduction in manual report generation time" },
    { value: "24/7", label: "AI-powered self-service across voice and digital" },
    { value: "Seconds", label: "To generate reports that previously took minutes" },
    { value: "Zero", label: "Manual navigation — natural language does the work" },
];

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <AiHubHero />

            <section className="sg-container pt-[clamp(32px,5vw,64px)]">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    What you get
                </span>

                <StatGrid stats={stats} />
            </section>

            <section className="sg-container pt-[clamp(64px,10vw,120px)] pb-(--section-gap)">
                <div className="max-w-190 flex flex-col gap-4">
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                        AI in production — already driving real results.
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-text-secondary m-0">
                        From voice to reporting, our AI is already solving real problems across CX operations.
                    </p>
                </div>

                <div className="mt-8">
                    <CallbackForm />
                </div>
            </section>
        </main>
    );
}