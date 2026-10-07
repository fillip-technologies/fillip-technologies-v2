import "server-only";

import { revalidatePath } from "next/cache";

/**
 * Refresh everything that shows the hover menus after a menu change: every page
 * (the navbar lives in the root layout), the /services hub (whose groups mirror
 * the menu) and the cached nav API routes the menus fetch from.
 */
export function revalidateMenus(): void {
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/api/whatwedo/categories");
  revalidatePath("/api/solutions/categories");
}
