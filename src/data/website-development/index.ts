export { ecommerceDevelopmentContent } from "./ecommerceDevelopment";
export { softwareDevelopmentContent } from "./softwareDevelopment";
export { websiteDevelopmentContent } from "./websiteDevelopment";
export { wordpressDevelopmentContent } from "./wordpressDevelopment";

import { ecommerceDevelopmentContent } from "./ecommerceDevelopment";
import { softwareDevelopmentContent } from "./softwareDevelopment";
import { websiteDevelopmentContent } from "./websiteDevelopment";
import { wordpressDevelopmentContent } from "./wordpressDevelopment";

export type {
  Service,
  ServiceBuildCard,
  ServiceChallenge,
  ServiceOutcomeStat,
  ServiceProcessStep,
  ServiceTechStack,
} from "./types";

export const services = [
  websiteDevelopmentContent,
  ecommerceDevelopmentContent,
  wordpressDevelopmentContent,
  softwareDevelopmentContent,
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
