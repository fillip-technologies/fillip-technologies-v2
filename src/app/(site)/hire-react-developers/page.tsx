import { createHirePage } from "@/components/hire-developers/HireDeveloperPage";

// Content: src/data/hire-developers/react.json, rendered by the shared master page.
const page = createHirePage("react");

export const generateMetadata = page.generateMetadata;
export default page.Page;
