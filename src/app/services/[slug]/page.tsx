import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { getService, services } from "@/content/services";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) return { title: "Services · Sysgrate" };

    return {
        title: `${service.title} · Sysgrate`,
        description: service.summary,
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    if (slug === "strategy-advisory") redirect("/services");

    const service = getService(slug);
    if (!service) notFound();

    return <ServicePage service={service} />;
}
