"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { updateLeadStatus } from "./queries";
import { LEAD_STATUS_VALUES } from "./lead-sources";
import type { SaveState } from "@/server/content/types";

/**
 * Admin action: set a lead's lifecycle status (New → Contacted → In Progress →
 * Won/Lost). Auth-guarded; validates the status against the known set.
 */
export async function updateLeadStatusAction(id: string, status: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!LEAD_STATUS_VALUES.includes(status)) {
    return { ok: false, message: "Unknown status." };
  }
  try {
    const ok = await updateLeadStatus(id, status);
    if (!ok) return { ok: false, message: "Lead not found." };
    revalidatePath("/admin");
    return { ok: true, message: "Status updated." };
  } catch (err) {
    console.error("updateLeadStatusAction failed:", err);
    return { ok: false, message: "Something went wrong while updating." };
  }
}
