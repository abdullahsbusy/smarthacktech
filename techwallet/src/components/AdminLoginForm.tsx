"use client";

import { useActionState } from "react";
import { adminLogin, type FormState } from "@/app/admin-actions";

const field = "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(adminLogin, {});
  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block text-sm">Password<input name="password" type="password" required autoComplete="current-password" className={field} /></label>
      {state.error && <p role="alert" className="rounded-lg bg-accent/10 p-3 text-sm text-accent">{state.error}</p>}
      <button disabled={pending} className="btn btn-primary h-11 w-full">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
