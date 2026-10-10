"use client";

import { useState, useTransition } from "react";
import { submitFypRequest } from "@/app/actions";

const field = "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function FypForm() {
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();

  if (sent) {
    return (
      <div className="mt-6 rounded-xl bg-tint p-6 text-center">
        <p className="font-semibold">Request received ✓</p>
        <p className="mt-1 text-sm text-muted">We will contact you on WhatsApp shortly.</p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError(undefined);
    start(async () => {
      const res = await submitFypRequest({
        name: f.get("name"),
        phone: f.get("phone"),
        university: f.get("university"),
        package: f.get("package") || undefined,
        idea: f.get("idea"),
      });
      if (res.ok) setSent(true);
      else setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
      <input name="name" required className={field} placeholder="Full name" autoComplete="name" />
      <input name="phone" required inputMode="tel" className={field} placeholder="WhatsApp number (03XX-XXXXXXX)" autoComplete="tel" />
      <input name="university" className={field} placeholder="University" />
      <select name="package" className={field} defaultValue="">
        <option value="">Package (optional)</option>
        <option>Starter</option><option>Standard</option><option>Premium</option>
      </select>
      <textarea name="idea" className={`${field} h-28 py-3 sm:col-span-2`} placeholder="Describe your project idea" />
      {error && <p role="alert" className="rounded-lg bg-accent/10 p-3 text-sm text-accent sm:col-span-2">{error}</p>}
      <button disabled={pending} className="btn btn-primary h-12 disabled:opacity-60 sm:col-span-2">{pending ? "Sending…" : "Send request"}</button>
    </form>
  );
}
