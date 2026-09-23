import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { strategyAdvisory } from "@/content/services/strategy-advisory";

export const metadata: Metadata = {
    title: `${strategyAdvisory.title} · Sysgrate`,
    description: strategyAdvisory.summary,
};

export default function ServicesIndexPage() {
    return <ServicePage service={strategyAdvisory} />;
}
