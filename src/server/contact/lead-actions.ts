"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { deleteLead, getLeadById, restoreLead, trashLead, updateLeadStatus } from "./queries";
import { LEAD_STATUS_VALUES, resumeUrlFromMessage } from "./lead-sources";
import { destroyAssetByUrl } from "@/server/cloudinary";
import type { SaveState } from "@/server/content/types";

// Admin pages that show leads and must refresh after any lead mutation.
const LEAD_PATHS = ["/admin", "/admin/careers", "/admin/bin"];
function revalidateLeadPaths() {
  for (const path of LEAD_PATHS) revalidatePath(path);
}

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
    revalidateLeadPaths();
    return { ok: true, message: "Status updated." };
  } catch (err) {
    console.error("updateLeadStatusAction failed:", err);
    return { ok: false, message: "Something went wrong while updating." };
  }
}

/**
 * Admin action: move a lead to the Bin (soft delete). Auth-guarded. The resume
 * (if any) is kept so a binned career application can still be restored intact.
 */
export async function trashLeadAction(id: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  try {
    const ok = await trashLead(id);
    if (!ok) return { ok: false, message: "Lead not found." };
    revalidateLeadPaths();
    return { ok: true, message: "Moved to Bin." };
  } catch (err) {
    console.error("trashLeadAction failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}

/** Admin action: restore a lead from the Bin. Auth-guarded. */
export async function restoreLeadAction(id: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  try {
    const ok = await restoreLead(id);
    if (!ok) return { ok: false, message: "Lead not found." };
    revalidateLeadPaths();
    return { ok: true, message: "Restored." };
  } catch (err) {
    console.error("restoreLeadAction failed:", err);
    return { ok: false, message: "Something went wrong while restoring." };
  }
}

/**
 * Admin action: permanently delete a lead (from the Bin). Auth-guarded. Also
 * removes an attached resume from Cloudinary (best-effort) so it doesn't leave
 * an orphaned file behind.
 */
export async function deleteLeadAction(id: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  try {
    // Grab the resume link before deleting so we can clean it up afterwards.
    const lead = await getLeadById(id);
    const resumeUrl = lead?.resume?.url || resumeUrlFromMessage(lead?.message);

    const ok = await deleteLead(id);
    if (!ok) return { ok: false, message: "Lead not found." };

    if (resumeUrl) {
      // Best-effort — the lead is already gone, so a cleanup failure is fine.
      await destroyAssetByUrl(resumeUrl).catch(() => {});
    }

    revalidateLeadPaths();
    return { ok: true, message: "Deleted permanently." };
  } catch (err) {
    console.error("deleteLeadAction failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
