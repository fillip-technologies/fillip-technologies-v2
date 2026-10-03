import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/nodejs.json, rendered by the shared master page.
const page = createHirePage("nodejs");

export const generateMetadata = page.generateMetadata;
export default page.Page;
