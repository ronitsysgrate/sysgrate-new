import { adoptionEnablement } from "./adoption-enablement";
import { bespokeEngineering } from "./bespoke-engineering";
import { experienceAsAService } from "./experience-as-a-service";
import { managedOperations } from "./managed-operations";
import { platformIntegration } from "./platform-integration";
import { solutionDesign } from "./solution-design";
import { strategyAdvisory } from "./strategy-advisory";
import type { Service } from "./types";

export const services: Service[] = [
    strategyAdvisory,
    solutionDesign,
    platformIntegration,
    managedOperations,
    experienceAsAService,
    bespokeEngineering,
    adoptionEnablement,
];

export function getService(slug: string) {
    return services.find((service) => service.slug === slug);
}
