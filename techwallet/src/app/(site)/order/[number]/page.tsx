import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { pkr } from "@/lib/data";

export default function OrderPage({ params }: PageProps<"/order/[number]">) {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading your order…</div>}>
      <OrderContent params={params} />
    </Suspense>
  );
}

async function OrderContent({ params }: { params: PageProps<"/order/[number]">["params"] }) {
  const { number } = await params;
  const { data: order } = await supabaseAdmin()
    .from("orders")
    .select("number, customer_name, status, subtotal, shipping, total, created_at, order_items(name, price, qty)")
    .eq("number", number)
    .maybeSingle();
  if (!order) notFound();

  return (
    <div className="container-x max-w-2xl py-16">
      <div className="rounded-2xl border border-line bg-surface p-8">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success">✓</div>
        <h1 className="text-2xl font-bold tracking-tight">Thank you, {order.customer_name.split(" ")[0]}!</h1>
        <p className="mt-2 text-muted">
          Your order <span className="font-mono font-semibold text-ink">{order.number}</span> has been received. We will confirm it on WhatsApp shortly. Pay cash on delivery.
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
          {order.order_items.map((i: { name: string; price: number; qty: number }) => (
            <li key={i.name} className="flex justify-between py-3"><span>{i.qty} × {i.name}</span><span className="font-mono">{pkr(i.price * i.qty)}</span></li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-mono">{order.shipping ? pkr(order.shipping) : "Free"}</dd></div>
          <div className="flex justify-between text-base font-semibold"><dt>Total to pay</dt><dd className="font-mono">{pkr(order.total)}</dd></div>
        </dl>
        <Link href="/shop" className="btn btn-primary mt-8 h-12 px-6">Continue shopping</Link>
      </div>
    </div>
  );
}
