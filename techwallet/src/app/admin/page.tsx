import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { pkr } from "@/lib/data";
import { statusStyle } from "@/lib/admin-mock";
import { supabaseAdmin } from "@/lib/supabase";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <Suspense fallback={<p className="mt-6 text-muted">Loading…</p>}>
        <DashboardContent />
      </Suspense>
    </>
  );
}

async function DashboardContent() {
  await connection();
  const db = supabaseAdmin();
  const now = Date.now();
  const startOfToday = new Date(new Date(now + 5 * 3600_000).setUTCHours(0, 0, 0, 0) - 5 * 3600_000).toISOString(); // Pakistan midnight
  const weekAgo = new Date(now - 7 * 86_400_000).toISOString();

  const [recent, week, pending, newFyp, lowStock, latestFyp] = await Promise.all([
    db.from("orders").select("number, customer_name, city, total, status, created_at").order("created_at", { ascending: false }).limit(5),
    db.from("orders").select("total, status, created_at").gte("created_at", weekAgo),
    db.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
    db.from("fyp_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("products").select("slug, name, stock").lte("stock", 10).eq("is_active", true).order("stock").limit(8),
    db.from("fyp_requests").select("name, university, idea").order("created_at", { ascending: false }).limit(1),
  ]);
  const failed = [recent, week, pending, newFyp, lowStock, latestFyp].find((r) => r.error);
  if (failed?.error) {
    return <p role="alert" className="mt-6 rounded-lg bg-accent/10 p-4 text-sm text-accent">Could not load data from Supabase: {failed.error.message}. Make sure supabase/setup.sql has been run.</p>;
  }

  const weekOrders = (week.data ?? []).filter((o) => o.status !== "cancelled");
  const stats = [
    ["Orders today", String(weekOrders.filter((o) => o.created_at >= startOfToday).length)],
    ["Revenue (7 days)", pkr(weekOrders.reduce((n, o) => n + o.total, 0))],
    ["Pending orders", String(pending.count ?? 0)],
    ["New FYP requests", String(newFyp.count ?? 0)],
  ];
  const fyp = latestFyp.data?.[0];

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-sm text-muted">{l}</p>
            <p className="mt-2 font-mono text-2xl font-semibold">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-primary">View all</Link>
          </div>
          {recent.data?.length ? (
            <ul className="divide-y divide-line text-sm">
              {recent.data.map((o) => (
                <li key={o.number} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div>
                    <Link href={`/admin/orders/${o.number}`} className="font-mono font-semibold text-primary hover:underline">{o.number}</Link>
                    <p className="text-muted">{o.customer_name} · {o.city}</p>
                  </div>
                  <div className="text-right"><p className="font-mono">{pkr(o.total)}</p><span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusStyle[o.status]}`}>{o.status}</span></div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-center text-sm text-muted">No orders yet.</p>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Low stock</h2>
            {lowStock.data?.length ? (
              <ul className="mt-3 space-y-2 text-sm">
                {lowStock.data.map((p) => (
                  <li key={p.slug} className="flex justify-between gap-3"><span className="truncate">{p.name}</span><span className="font-mono text-accent">{p.stock}</span></li>
                ))}
              </ul>
            ) : <p className="mt-3 text-sm text-muted">Everything is well stocked.</p>}
          </section>
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Latest FYP request</h2>
            {fyp ? (
              <>
                <p className="mt-3 text-sm font-medium">{fyp.name}{fyp.university ? ` · ${fyp.university}` : ""}</p>
                <p className="mt-1 text-sm text-muted">{fyp.idea}</p>
              </>
            ) : <p className="mt-3 text-sm text-muted">No requests yet.</p>}
          </section>
        </div>
      </div>
    </>
  );
}
