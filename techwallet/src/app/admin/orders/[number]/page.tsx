import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pkr } from "@/lib/data";
import { statusStyle } from "@/lib/admin-mock";
import { supabaseAdmin } from "@/lib/supabase";
import { fmtDate } from "@/lib/format";
import { updateOrder } from "@/app/admin-actions";

const STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];
const COURIERS = ["Leopards", "TCS", "PostEx", "Trax", "M&P"];
const box = "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function OrderDetail({ params }: PageProps<"/admin/orders/[number]">) {
  return (
    <Suspense fallback={<p className="text-muted">Loading order…</p>}>
      <OrderDetailContent params={params} />
    </Suspense>
  );
}

async function OrderDetailContent({ params }: { params: PageProps<"/admin/orders/[number]">["params"] }) {
  const { number } = await params;
  const { data: o } = await supabaseAdmin()
    .from("orders")
    .select("*, order_items(name, price, qty)")
    .eq("number", number)
    .maybeSingle();
  if (!o) notFound();

  return (
    <>
      <Link href="/admin/orders" className="text-sm font-semibold text-primary">← Orders</Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-2xl font-bold">{o.number}</h1>
        <span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusStyle[o.status]}`}>{o.status}</span>
        <span className="rounded bg-tint px-2 py-0.5 text-xs font-medium uppercase text-muted">{o.payment_method} · {o.payment_status}</span>
      </div>
      <p className="text-sm text-muted">{fmtDate(o.created_at)}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Items</h2>
            <ul className="mt-3 divide-y divide-line text-sm">
              {o.order_items.map((i: { name: string; price: number; qty: number }) => (
                <li key={i.name} className="flex justify-between py-2.5"><span>{i.qty} × {i.name}</span><span className="font-mono">{pkr(i.price * i.qty)}</span></li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-mono">{pkr(o.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-mono">{o.shipping ? pkr(o.shipping) : "Free"}</dd></div>
              <div className="flex justify-between font-semibold"><dt>Total (COD)</dt><dd className="font-mono">{pkr(o.total)}</dd></div>
            </dl>
          </section>
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Customer</h2>
            <p className="mt-3 text-sm">{o.customer_name}</p>
            <p className="text-sm text-muted">{o.city} · <span className="font-mono">{o.phone}</span>{o.email ? ` · ${o.email}` : ""}</p>
            <p className="mt-2 text-sm text-muted">{o.address}</p>
            {o.note && <p className="mt-2 rounded-lg bg-tint p-3 text-sm">Note: {o.note}</p>}
          </section>
        </div>

        <form action={updateOrder} className="h-fit space-y-4 rounded-xl border border-line bg-surface p-5">
          <input type="hidden" name="number" value={o.number} />
          <h2 className="font-semibold">Update order</h2>
          <label className="block text-sm">Status
            <select name="status" defaultValue={o.status} className={box}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="block text-sm">Courier
            <select name="courier" defaultValue={o.courier ?? ""} className={box}>
              <option value="">Not assigned</option>
              {COURIERS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block text-sm">Tracking number<input name="tracking_no" defaultValue={o.tracking_no ?? ""} className={`${box} font-mono`} /></label>
          <button className="btn btn-primary h-11 w-full">Save changes</button>
        </form>
      </div>
    </>
  );
}
