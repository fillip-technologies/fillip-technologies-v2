import "server-only";

/**
 * Resolves the location to store on a lead.
 *
 *  1. If the client sent precise browser-GPS coordinates (already reverse-geocoded
 *     on the client), use those.
 *  2. Otherwise fall back to IP-based geolocation from the request IP, via the
 *     free, no-key `ipwho.is` service.
 *
 * Always best-effort: any failure returns `null` so a lead is never blocked or
 * lost because location lookup failed.
 */

export type LeadLocation = {
  source: "gps" | "ip";
  label: string; // human-readable, e.g. "Patna, Bihar, India"
  city?: string;
  region?: string;
  country?: string;
  lat?: number;
  lng?: number;
  accuracy?: number | null; // GPS accuracy in metres
  ip?: string;
  isp?: string;
};

/** Location shape the client posts (browser GPS, reverse-geocoded client-side). */
export type ClientLocation = {
  lat?: number;
  lng?: number;
  accuracy?: number | null;
  city?: string;
  region?: string;
  country?: string;
  label?: string;
};

const clean = (v: unknown): string | undefined => {
  const s = typeof v === "string" ? v.trim() : "";
  return s || undefined;
};

const label = (parts: (string | undefined)[]): string =>
  parts.filter(Boolean).join(", ");

/** Best-effort client IP from the common proxy headers. */
function clientIp(request: Request): string | null {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? request.headers.get("cf-connecting-ip");
}

/** Local/private addresses can't be geolocated (e.g. localhost in dev). */
function isPrivateIp(ip: string): boolean {
  return (
    ip === "::1" ||
    ip === "localhost" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("::ffff:127.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

/** Normalise a client-sent GPS location into a LeadLocation (or null if unusable). */
function fromClient(client: ClientLocation | null | undefined): LeadLocation | null {
  if (!client) return null;
  const lat = typeof client.lat === "number" ? client.lat : undefined;
  const lng = typeof client.lng === "number" ? client.lng : undefined;
  if (lat === undefined || lng === undefined) return null;
  const city = clean(client.city);
  const region = clean(client.region);
  const country = clean(client.country);
  return {
    source: "gps",
    label: clean(client.label) || label([city, region, country]) || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    city,
    region,
    country,
    lat,
    lng,
    accuracy: typeof client.accuracy === "number" ? client.accuracy : null,
  };
}

/** IP → approximate location via ipwho.is (free, no key). */
async function fromIp(request: Request): Promise<LeadLocation | null> {
  try {
    const ip = clientIp(request);
    if (!ip || isPrivateIp(ip)) return null;
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const d = (await res.json()) as Record<string, unknown> & {
      success?: boolean;
      connection?: { isp?: string };
    };
    if (!d?.success) return null;
    const city = clean(d.city);
    const region = clean(d.region);
    const country = clean(d.country);
    return {
      source: "ip",
      label: label([city, region, country]) || ip,
      city,
      region,
      country,
      lat: typeof d.latitude === "number" ? d.latitude : undefined,
      lng: typeof d.longitude === "number" ? d.longitude : undefined,
      ip,
      isp: clean(d.connection?.isp),
    };
  } catch {
    return null;
  }
}

export async function resolveLeadLocation(
  client: ClientLocation | null | undefined,
  request: Request
): Promise<LeadLocation | null> {
  return fromClient(client) ?? (await fromIp(request));
}
