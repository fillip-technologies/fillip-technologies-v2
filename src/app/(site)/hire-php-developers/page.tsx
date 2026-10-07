import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/php.json, rendered by the shared master page.
const page = createHirePage("php");

export const generateMetadata = page.generateMetadata;
export default page.Page;
