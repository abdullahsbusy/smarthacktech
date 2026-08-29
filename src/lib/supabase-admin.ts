/* Server-only Supabase REST helper, ported 1:1 from the original api/_supabase.js.
   Uses the service_role key — this module must never be imported from a
   client component. Env: SUPABASE_URL, SUPABASE_SERVICE_KEY. */

function base() {
  return (process.env.SUPABASE_URL || "").replace(/\/$/, "");
}
function key() {
  return process.env.SUPABASE_SERVICE_KEY || "";
}
export function supabaseConfigured() {
  return !!(base() && key());
}

/** Fire-and-forget insert; never throws (logging must not break the app). */
export async function sbInsert(table: string, row: Record<string, unknown>): Promise<boolean> {
  if (!supabaseConfigured()) return false;
  try {
    const r = await fetch(`${base()}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key(),
        Authorization: `Bearer ${key()}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/** Query rows. `path` is a PostgREST path, e.g. "leads?select=*&order=created_at.desc&limit=200" */
export async function sbSelect<T = unknown>(path: string): Promise<T[]> {
  if (!supabaseConfigured()) throw new Error("Supabase is not configured.");
  const r = await fetch(`${base()}/rest/v1/${path}`, {
    headers: { apikey: key(), Authorization: `Bearer ${key()}` },
  });
  if (!r.ok) throw new Error(`Supabase query failed (${r.status})`);
  return r.json();
}
