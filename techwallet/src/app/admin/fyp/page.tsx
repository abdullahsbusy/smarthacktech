import { Suspense } from "react";
import { connection } from "next/server";
import { statusStyle } from "@/lib/admin-mock";
import { supabaseAdmin } from "@/lib/supabase";
import { fmtDate } from "@/lib/format";
import { updateFypStatus } from "@/app/admin-actions";

const STATUSES = ["new", "contacted", "in_progress", "done"];

export default function AdminFyp() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">FYP requests</h1>
      <Suspense fallback={<p className="mt-6 text-muted">Loading…</p>}>
        <FypList />
      </Suspense>
    </>
  );
}

async function FypList() {
  await connection();
  const { data, error } = await supabaseAdmin().from("fyp_requests").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) return <p role="alert" className="mt-6 rounded-lg bg-accent/10 p-4 text-sm text-accent">Could not load requests: {error.message}</p>;
  if (!data.length) return <p className="mt-6 text-muted">No requests yet.</p>;
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {data.map((r) => (
        <div key={r.id} className="rounded-xl border border-line bg-surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div><p className="font-semibold">{r.name}</p><p className="text-sm text-muted">{r.university ? `${r.university} · ` : ""}<span className="font-mono">{r.phone}</span></p></div>
            <span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusStyle[r.status] ?? "bg-tint text-muted"}`}>{r.status.replace("_", " ")}</span>
          </div>
          {r.idea && <p className="mt-3 text-sm">{r.idea}</p>}
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{r.package ?? "No"} package · <span className="font-normal normal-case text-muted">{fmtDate(r.created_at)}</span></p>
            <form action={updateFypStatus} className="flex gap-2">
              <input type="hidden" name="id" value={r.id} />
              <select name="status" defaultValue={r.status} className="h-9 rounded-lg border border-line bg-surface px-2 text-xs">
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <button className="btn btn-outline h-9 px-3 text-xs">Save</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
