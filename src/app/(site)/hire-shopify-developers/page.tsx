import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/shopify.json, rendered by the shared master page.
const page = createHirePage("shopify");

export const generateMetadata = page.generateMetadata;
export default page.Page;
