import { getSession } from "@/server/auth/session";
import { getLeadById, type LeadResume } from "@/server/contact/queries";
import { resumeUrlFromMessage } from "@/server/contact/lead-sources";
import { authenticatedDownloadUrl } from "@/server/cloudinary";

// Fetching + streaming the file needs the Node.js runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/resume?leadId=<id>&mode=view|download — admin-only. Streams a
// career applicant's resume from Cloudinary so it's delivered behind auth and
// with the right Content-Disposition (inline to view, attachment to download).
// Uses a signed Cloudinary URL, which bypasses the default block on delivering
// raw PDF/ZIP files.
export async function GET(request: Request) {
  if (!(await getSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("leadId") ?? "";
  const mode = searchParams.get("mode") === "download" ? "download" : "view";

  const lead = await getLeadById(leadId);
  if (!lead) return new Response("Not found", { status: 404 });

  // Prefer the structured resume field; fall back to the legacy "Resume: <url>"
  // line stored in the message on older applications.
  let resume: LeadResume | null = lead.resume?.url ? lead.resume : null;
  if (!resume) {
    const url = resumeUrlFromMessage(lead.message);
    if (url) {
      const filename = decodeURIComponent(url.split("/").pop() || "resume");
      resume = { url, filename, type: "" };
    }
  }
  if (!resume?.url) return new Response("No resume on file", { status: 404 });

  // Fetch via the authenticated download endpoint (bypasses Cloudinary's PDF/ZIP
  // delivery block); fall back to the raw delivery URL if URL generation failed.
  const authUrl = authenticatedDownloadUrl(resume.url);
  let upstream = await fetch(authUrl).catch(() => null);
  if ((!upstream || !upstream.ok) && authUrl !== resume.url) {
    upstream = await fetch(resume.url).catch(() => null);
  }
  if (!upstream || !upstream.ok) {
    console.error(
      `Resume proxy: Cloudinary fetch failed (${upstream?.status ?? "network error"}) for lead ${leadId}.`
    );
    return new Response("Resume is currently unavailable.", { status: 502 });
  }

  // Guard against Cloudinary returning an error/HTML page with a 200 status —
  // streaming that as a PDF is exactly what produces "Failed to load document".
  const upstreamType = upstream.headers.get("content-type") ?? "";
  if (/text\/html/i.test(upstreamType)) {
    return new Response("Resume is currently unavailable.", { status: 502 });
  }

  // Buffer the whole file. fetch() transparently decompresses gzip/br responses,
  // so we must NOT reuse the upstream Content-Length (that's the compressed size
  // and would truncate the download). Returning a Buffer lets Response set the
  // correct length itself. Resumes are capped at 5 MB, so buffering is cheap.
  const body = Buffer.from(await upstream.arrayBuffer());

  const filename = (resume.filename || "resume").replace(/["\r\n]/g, "");
  const contentType = resume.type || upstreamType || "application/octet-stream";
  const disposition = mode === "download" ? "attachment" : "inline";

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${disposition}; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
