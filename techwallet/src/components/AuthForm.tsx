"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const field = "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const login = mode === "login";
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    setError(undefined);
    setNotice(undefined);
    setBusy(true);
    const auth = supabaseBrowser().auth;

    if (login) {
      const { error } = await auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      router.push("/account");
      return;
    }

    if (password.length < 8) {
      setBusy(false);
      return setError("Password must be at least 8 characters.");
    }
    const { data, error } = await auth.signUp({
      email,
      password,
      options: { data: { name: String(f.get("name") ?? "").trim(), phone: String(f.get("phone") ?? "").trim() } },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (data.session) router.push("/account");
    else setNotice("Account created. Check your email to confirm it, then log in.");
  }

  return (
    <div className="container-x max-w-md py-16">
      <div className="rounded-2xl border border-line bg-surface p-8">
        <h1 className="text-2xl font-bold tracking-tight">{login ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-1 text-sm text-muted">{login ? "Log in to see your orders and saved details." : "Track orders and check out faster."}</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {!login && <label className="block text-sm">Full name<input name="name" required className={field} autoComplete="name" /></label>}
          <label className="block text-sm">Email<input name="email" type="email" required className={field} autoComplete="email" /></label>
          {!login && <label className="block text-sm">Mobile number<input name="phone" inputMode="tel" required className={field} autoComplete="tel" /></label>}
          <label className="block text-sm">Password<input name="password" type="password" required className={field} autoComplete={login ? "current-password" : "new-password"} /></label>
          {error && <p role="alert" className="rounded-lg bg-accent/10 p-3 text-sm text-accent">{error}</p>}
          {notice && <p role="status" className="rounded-lg bg-success/10 p-3 text-sm text-success">{notice}</p>}
          <button disabled={busy} className="btn btn-primary h-12 w-full">{busy ? "Please wait…" : login ? "Log in" : "Create account"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">
          {login ? "New here? " : "Already have an account? "}
          <Link href={login ? "/register" : "/login"} className="font-semibold text-primary hover:underline">{login ? "Create an account" : "Log in"}</Link>
        </p>
      </div>
    </div>
  );
}
