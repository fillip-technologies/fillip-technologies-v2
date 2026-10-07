import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/wordpress.json, rendered by the shared master page.
const page = createHirePage("wordpress");

export const generateMetadata = page.generateMetadata;
export default page.Page;
