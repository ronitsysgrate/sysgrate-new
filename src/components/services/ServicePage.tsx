import Navbar from "@/components/Navbar";
import type { Service } from "@/content/services/types";
import { ComparisonTable } from "./ComparisonTable";
import { OfferingIndex } from "./OfferingIndex";
import { ProblemGrid } from "./ProblemGrid";
import { ProcessSteps } from "./ProcessSteps";
import { RelatedServices } from "./RelatedServices";
import { ServiceClose } from "./ServiceClose";
import { ServiceHero } from "./ServiceHero";
import { ServiceNav } from "./ServiceNav";

export function ServicePage({ service }: { service: Service }) {
    return (
        <main className="min-h-screen overflow-x-clip">
            <Navbar />
            <ServiceHero service={service} />
            <ServiceNav currentSlug={service.slug} />
            <ProblemGrid service={service} />
            <OfferingIndex service={service} />
            {service.comparison ? <ComparisonTable comparison={service.comparison} /> : null}
            {service.process ? <ProcessSteps process={service.process} /> : null}
            <RelatedServices service={service} />
            <ServiceClose service={service} />
        </main>
    );
}
