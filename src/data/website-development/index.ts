export { ecommerceDevelopmentContent } from "./ecommerceDevelopment";
export { softwareDevelopmentContent } from "./softwareDevelopment";
export { websiteDevelopmentContent } from "./websiteDevelopment";
export { wordpressDevelopmentContent } from "./wordpressDevelopment";
export { default as webApplicationDevelopmentContent } from "./webApplicationDevelopment.json";
export { default as websiteRedesignContent } from "./websiteRedesign.json";
export { default as websiteMaintenanceContent } from "./websiteMaintenance.json";

import { ecommerceDevelopmentContent } from "./ecommerceDevelopment";
import { softwareDevelopmentContent } from "./softwareDevelopment";
import { websiteDevelopmentContent } from "./websiteDevelopment";
import { wordpressDevelopmentContent } from "./wordpressDevelopment";
import webApplicationDevelopmentContent from "./webApplicationDevelopment.json";
import websiteRedesignContent from "./websiteRedesign.json";
import websiteMaintenanceContent from "./websiteMaintenance.json";

import type { Service } from "./types";

export type {
  Service,
  ServiceBuildCard,
  ServiceChallenge,
  ServiceOutcomeStat,
  ServiceProcessStep,
  ServiceTechStack,
} from "./types";

export const services: Service[] = [
  websiteDevelopmentContent,
  ecommerceDevelopmentContent,
  wordpressDevelopmentContent,
  softwareDevelopmentContent,
  webApplicationDevelopmentContent as Service,
  websiteRedesignContent as Service,
  websiteMaintenanceContent as Service,
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
