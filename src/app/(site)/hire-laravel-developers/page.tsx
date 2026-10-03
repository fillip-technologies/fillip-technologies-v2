import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/laravel.json, rendered by the shared master page.
const page = createHirePage("laravel");

export const generateMetadata = page.generateMetadata;
export default page.Page;
