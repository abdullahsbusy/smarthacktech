/* Best-effort rate limiter (per warm serverless instance). Not bullet-proof
   across instances, but stops casual abuse, bots, and accidental floods.
   Ported 1:1 from the original api/_ratelimit.js. */

const buckets = new Map<string, { n: number; t: number }>();

export function clientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = (headers.get("x-forwarded-for") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return forwarded.length ? forwarded[forwarded.length - 1] : "anon";
}

/** Returns true if the caller has exceeded `max` requests in `windowMs`. */
export function limited(scope: string, headers: Headers, max: number, windowMs: number): boolean {
  const key = scope + ":" + clientIp(headers);
  const now = Date.now();
  const e = buckets.get(key);
  if (!e || now - e.t > windowMs) {
    buckets.set(key, { n: 1, t: now });
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now - v.t > windowMs) buckets.delete(k);
    }
    return false;
  }
  e.n += 1;
  return e.n > max;
}
