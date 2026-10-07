import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/ai.json, rendered by the shared master page.
const page = createHirePage("ai");

export const generateMetadata = page.generateMetadata;
export default page.Page;
