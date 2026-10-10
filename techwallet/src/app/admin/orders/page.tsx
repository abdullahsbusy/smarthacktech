import { Suspense } from "react";
import Link from "next/link";
import { pkr } from "@/lib/data";
import { statusStyle } from "@/lib/admin-mock";
import { supabaseAdmin } from "@/lib/supabase";
import { fmtDate } from "@/lib/format";

const STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

export default function Orders({ searchParams }: PageProps<"/admin/orders">) {
  return (
    <Suspense fallback={<p className="text-muted">Loading orders…</p>}>
      <OrdersContent searchParams={searchParams} />
    </Suspense>
  );
}

async function OrdersContent({ searchParams }: { searchParams: PageProps<"/admin/orders">["searchParams"] }) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" && STATUSES.includes(sp.status) ? sp.status : "";
  let query = supabaseAdmin()
    .from("orders")
    .select("number, customer_name, city, total, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) query = query.eq("status", status);
  const { data, error } = await query;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <form className="flex gap-2">
          <select name="status" defaultValue={status} className="h-10 rounded-lg border border-line bg-surface px-3 text-sm">
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="btn btn-outline h-10 px-3">Filter</button>
        </form>
      </div>
      {error && <p role="alert" className="mt-6 rounded-lg bg-accent/10 p-4 text-sm text-accent">Could not load orders: {error.message}</p>}
      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-paper text-muted">
            <tr><th className="px-5 py-3 font-medium">Order</th><th className="px-5 py-3 font-medium">Customer</th><th className="px-5 py-3 font-medium">Date</th><th className="px-5 py-3 font-medium">Total</th><th className="px-5 py-3 font-medium">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data?.map((o) => (
              <tr key={o.number} className="hover:bg-paper">
                <td className="px-5 py-3 font-mono font-semibold"><Link href={`/admin/orders/${o.number}`} className="text-primary hover:underline">{o.number}</Link></td>
                <td className="px-5 py-3">{o.customer_name}<span className="block text-muted">{o.city}</span></td>
                <td className="px-5 py-3 text-muted">{fmtDate(o.created_at)}</td>
                <td className="px-5 py-3 font-mono">{pkr(o.total)}</td>
                <td className="px-5 py-3"><span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusStyle[o.status]}`}>{o.status}</span></td>
              </tr>
            ))}
            {!data?.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-muted">No orders found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
