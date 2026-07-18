/**
 * Client-side location capture for lead forms.
 *
 * Requests the visitor's precise location via the browser Geolocation API (shows
 * a permission prompt), then reverse-geocodes the coordinates to a readable
 * place name using BigDataCloud's free, no-key client endpoint.
 *
 * Returns `null` if the browser has no geolocation, the user denies the prompt,
 * or it times out — callers should submit anyway and let the server fall back to
 * IP-based geolocation. Never throws.
 */

export type CapturedLocation = {
  lat: number;
  lng: number;
  accuracy: number | null;
  city?: string;
  region?: string;
  country?: string;
  label?: string;
};

function getPosition(timeoutMs: number): Promise<GeolocationPosition | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 60_000 }
    );
  });
}

export async function captureClientLocation(timeoutMs = 8000): Promise<CapturedLocation | null> {
  const pos = await getPosition(timeoutMs);
  if (!pos) return null;

  const { latitude: lat, longitude: lng, accuracy } = pos.coords;
  const out: CapturedLocation = { lat, lng, accuracy: accuracy ?? null };

  // Reverse-geocode to a readable place name (best-effort; keep coords if it fails).
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const d = (await res.json()) as {
        city?: string;
        locality?: string;
        principalSubdivision?: string;
        countryName?: string;
      };
      out.city = d.city || d.locality || undefined;
      out.region = d.principalSubdivision || undefined;
      out.country = d.countryName || undefined;
      out.label = [out.city, out.region, out.country].filter(Boolean).join(", ") || undefined;
    }
  } catch {
    // coords-only is fine; the server can still store/geocode them.
  }

  return out;
}
