"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { myOrders, type MyOrder } from "@/app/actions";
import { pkr } from "@/lib/data";
import { statusStyle } from "@/lib/admin-mock";

type Profile = { email: string; name?: string; phone?: string };

export default function AccountView() {
  const router = useRouter();
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  const [profile, setProfile] = useState<Profile>();
  const [orders, setOrders] = useState<MyOrder[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabaseBrowser().auth.getSession();
      if (!alive) return;
      const session = data.session;
      if (!session) return setState("out");
      const meta = session.user.user_metadata as { name?: string; phone?: string };
      setProfile({ email: session.user.email ?? "", name: meta.name, phone: meta.phone });
      setState("in");
      const res = await myOrders(session.access_token);
      if (alive && res.ok) setOrders(res.orders);
    })();
    return () => { alive = false; };
  }, []);

  async function logout() {
    await supabaseBrowser().auth.signOut();
    router.push("/login");
  }

  if (state === "loading") return <div className="container-x py-24 text-center text-muted">Loading your account…</div>;
  if (state === "out") {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <p className="mt-2 text-muted">Log in to see your orders, or track a parcel with just your order number.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="btn btn-primary h-12 px-6">Log in</Link>
          <Link href="/track" className="btn btn-outline h-12 px-6">Track an order</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-bold tracking-tight">My account</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit space-y-4 rounded-xl border border-line bg-surface p-5 text-sm">
          <div>
            <p className="font-semibold">{profile?.name || "Customer"}</p>
            <p className="text-muted">{profile?.email}</p>
            {profile?.phone && <p className="font-mono text-muted">{profile.phone}</p>}
          </div>
          <button onClick={logout} className="btn btn-outline h-10 w-full">Log out</button>
        </aside>

        <section className="overflow-hidden rounded-xl border border-line bg-surface">
          <h2 className="border-b border-line px-5 py-4 font-semibold">Order history</h2>
          {orders.length ? (
            <ul className="divide-y divide-line text-sm">
              {orders.map((o) => (
                <li key={o.number} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div><Link href={`/order/${o.number}`} className="font-mono font-semibold text-primary hover:underline">{o.number}</Link><p className="text-muted">{o.date}</p></div>
                  <div className="text-right"><p className="font-mono">{pkr(o.total)}</p><span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusStyle[o.status]}`}>{o.status}</span></div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-10 text-center text-sm text-muted">No orders yet. <Link href="/shop" className="font-semibold text-primary">Start shopping</Link></p>
          )}
        </section>
      </div>
    </div>
  );
}
