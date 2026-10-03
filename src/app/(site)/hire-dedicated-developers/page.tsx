import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/dedicated.json, rendered by the shared master page.
const page = createHirePage("dedicated");

export const generateMetadata = page.generateMetadata;
export default page.Page;
