import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Platforms · Sysgrate",
    description:
        "Amazon Connect, Zoom, and Zendesk — deployed, integrated, and managed by Sysgrate.",
};

export default function PlatformsPage() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <section className="sg-container pt-[clamp(120px,16vw,168px)] pb-[clamp(64px,10vw,120px)]">
                <div className="max-w-190 flex flex-col gap-4 sg-animate-rise">
                    <h1 className="text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink-800 m-0">
                        The platforms we <span className="sg-highlight font-medium">deploy</span>, integrate, and run.
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12">
                <Link
                    href="/platforms/amazon-connect"
                    className="grid grid-cols-1 rounded-card border border-hairline bg-paper overflow-hidden no-underline hover:-translate-y-1 hover:shadow-card transition-all"
                >
                    <div className="relative min-h-56 bg-paper-card">
                        <Image
                            src="/practice-areas/customer-experience.jpg"
                            alt=""
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-center gap-3">
                        <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">AWS</p>
                        <h2 className="text-[clamp(24px,2.4vw,36px)] font-medium text-ink-800 m-0 leading-tight">
                            Amazon Connect. Deployed right. Managed long-term.
                        </h2>
                        <span className="text-sm font-medium text-link">Seamless CX. Delivered with Amazon Connect. →</span>
                    </div>
                </Link>
                <Link
                    href="/platforms/zoom"
                    className="grid grid-cols-1 rounded-card border border-hairline bg-paper overflow-hidden no-underline hover:-translate-y-1 hover:shadow-card transition-all"
                >
                    <div className="relative min-h-56 bg-paper-card">
                        <Image
                            src="/practice-areas/employee-experience.jpg"
                            alt=""
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-center gap-3">
                        <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">Zoom</p>
                        <h2 className="text-[clamp(24px,2.4vw,36px)] font-medium text-ink-800 m-0 leading-tight">
                            One platform. Smarter conversations. Powered by Zoom.
                        </h2>
                        <span className="text-sm font-medium text-link">Book a Zoom consultation →</span>
                    </div>
                </Link>
                <Link
                    href="/platforms/zendesk"
                    className="grid grid-cols-1 rounded-card border border-hairline bg-paper overflow-hidden no-underline hover:-translate-y-1 hover:shadow-card transition-all"
                >
                    <div className="relative min-h-56 bg-paper-card">
                        <Image
                            src="/practice-areas/artificial-intelligence.jpg"
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 30vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-center gap-3">
                        <p className="text-xs font-medium tracking-[0.08em] uppercase text-ink-300 m-0">Zendesk</p>
                        <h2 className="text-[clamp(24px,2.4vw,36px)] font-medium text-ink-800 m-0 leading-tight">
                            Zendesk for modern support operations.
                        </h2>
                        <span className="text-sm font-medium text-link">Book a free Zendesk consultation →</span>
                    </div>
                </Link>
                </div>
            </section>
        </main>
    );
}
