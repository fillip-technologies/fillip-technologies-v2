import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/nextjs.json, rendered by the shared master page.
const page = createHirePage("nextjs");

export const generateMetadata = page.generateMetadata;
export default page.Page;
