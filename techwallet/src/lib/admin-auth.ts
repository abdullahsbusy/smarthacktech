// Admin session: a signed, expiring cookie. Uses Web Crypto so it works in both proxy.ts and server actions.
export const ADMIN_COOKIE = "tw_admin";
const MAX_AGE_S = 60 * 60 * 12;

const enc = new TextEncoder();

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function createAdminToken() {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE_S);
  return `${exp}.${await sign(`admin.${exp}`)}`;
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(`admin.${exp}`));
}

export async function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // fail closed when no password is configured
  return safeEqual(await sign(`pw.${input}`), await sign(`pw.${expected}`));
}

export const ADMIN_MAX_AGE_S = MAX_AGE_S;
