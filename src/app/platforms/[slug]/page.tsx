import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { PlatformView } from "@/components/platforms/PlatformView";
import { getPlatform, PLATFORMS } from "@/content/platforms/pages";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return PLATFORMS.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getPlatform(slug);
    if (!page) return { title: "Platforms · Sysgrate" };
    return { title: `${page.name} · Sysgrate`, description: page.summary };
}

export default async function PlatformDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const page = getPlatform(slug);
    if (!page) notFound();

    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <PlatformView page={page} />
        </main>
    );
}
