import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/python.json, rendered by the shared master page.
const page = createHirePage("python");

export const generateMetadata = page.generateMetadata;
export default page.Page;
