"use client";

import { useState, useTransition } from "react";
import { trackOrder, type TrackResult } from "@/app/actions";

const field = "h-11 rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";
const steps = ["Order placed", "Confirmed", "Packed", "Shipped", "Delivered"];
// pending=order placed; the rest map onto the same step list.
const stepIndex: Record<string, number> = { pending: 0, confirmed: 1, packed: 2, shipped: 3, delivered: 4 };

export default function TrackForm() {
  const [result, setResult] = useState<TrackResult>();
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    start(async () => setResult(await trackOrder({ number: f.get("order"), phone: f.get("phone") })));
  }

  const current = result?.ok ? (stepIndex[result.status] ?? -1) : -1;

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
        <input name="order" required className={field} placeholder="Order number (e.g. TW-1001)" />
        <input name="phone" required className={field} placeholder="Phone number" inputMode="tel" />
        <button disabled={pending} className="btn btn-primary h-12 sm:col-span-2">{pending ? "Looking up…" : "Track order"}</button>
      </form>

      {result && !result.ok && <p role="alert" className="mt-6 rounded-lg bg-accent/10 p-3 text-sm text-accent">{result.error}</p>}

      {result?.ok && (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm text-muted">Order <span className="font-mono font-semibold text-ink">{result.number}</span></p>
          {result.status === "cancelled" ? (
            <p className="mt-4 rounded-lg bg-accent/10 p-3 text-sm text-accent">This order was cancelled. Contact us on WhatsApp if this is a mistake.</p>
          ) : (
            <ol className="mt-5 grid grid-cols-5 gap-2">
              {steps.map((s, i) => (
                <li key={s} className="text-center">
                  <span className={`mx-auto grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${i <= current ? "bg-primary-dark text-white" : "bg-tint text-muted"}`}>{i <= current ? "✓" : i + 1}</span>
                  <span className={`mt-2 block text-xs ${i <= current ? "font-semibold text-ink" : "text-muted"}`}>{s}</span>
                </li>
              ))}
            </ol>
          )}
          {(result.courier || result.trackingNo) && (
            <p className="mt-6 rounded-lg bg-tint p-3 text-sm">
              Courier: <span className="font-semibold">{result.courier ?? "to be assigned"}</span>
              {result.trackingNo && <> · Tracking no: <span className="font-mono font-semibold">{result.trackingNo}</span></>}
            </p>
          )}
        </div>
      )}
    </>
  );
}
