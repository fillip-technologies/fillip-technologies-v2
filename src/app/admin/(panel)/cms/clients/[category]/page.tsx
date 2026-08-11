import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getClientCategory,
  clientCategoryKey,
  clientCategoryDefaults,
} from "@/server/content/client-sections";
import { getContentData } from "@/server/content/queries";
import { saveClientCategory } from "@/server/content/actions";
import SectionEditor from "../../SectionEditor";

export default async function EditClientCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = getClientCategory(categoryId);
  if (!category) notFound();

  const data = await getContentData(
    clientCategoryKey(category.id),
    clientCategoryDefaults(category)
  );

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/clients" className="hover:text-heading">
          Trusted By Clients
        </Link>{" "}
        / {category.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {category.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{category.description}</p>

      <SectionEditor
        onSave={saveClientCategory.bind(null, category.id)}
        fields={[]}
        list={{
          name: "logos",
          label: "Client logos",
          itemNoun: "logo",
          default: [],
          itemFields: [
            { name: "image", label: "Logo", type: "image" },
            { name: "alt", label: "Name / alt text", type: "text" },
          ],
        }}
        initial={data}
      />
    </section>
  );
}
