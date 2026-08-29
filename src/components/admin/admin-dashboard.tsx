"use client";

import { useState, type FormEvent } from "react";
import "./admin.css";

/* KAIRA CRM dashboard. Ported 1:1 from admin.html's inline script, as a
   React component driven by state instead of manual DOM manipulation.
   POSTs the password to /api/admin on every load/refresh, matching the
   original's session-less, re-auth-per-request design. */

type Lead = {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  tier?: "Hot" | "Warm" | "Cold";
  budget?: string;
  timeline?: string;
  created_at?: string;
};
type Stats = {
  opens?: number;
  messages?: number;
  blueprints?: number;
  audits?: number;
  leads?: number;
  conversion?: number;
  Hot?: number;
  Warm?: number;
  Cold?: number;
};
type Trend = { day: string; count: number };
type DashboardData = { leads: Lead[]; stats: Stats; trend: Trend[] };

async function loadDashboard(password: string): Promise<DashboardData> {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed");
  return data;
}

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSigningIn(true);
    setLoginError("");
    try {
      const d = await loadDashboard(password);
      setData(d);
    } catch (err) {
      setLoginError((err as Error)?.message || "Sign in failed.");
      setPassword("");
    } finally {
      setSigningIn(false);
    }
  }

  async function refresh() {
    try {
      const d = await loadDashboard(password);
      setData(d);
    } catch (err) {
      alert((err as Error)?.message);
    }
  }

  function logout() {
    setPassword("");
    setData(null);
  }

  return (
    <div className="adm">
      <div className="wrap">
        <div className="brand">
          <span className="orb" />
          <div>
            <b>KAIRA</b>
            <span>HackTech CRM &amp; Analytics</span>
          </div>
        </div>

        {!data ? (
          <div className="login">
            <h2>Team sign in</h2>
            <p>Enter the admin password to view leads &amp; analytics.</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Admin password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" type="submit" disabled={signingIn}>
                {signingIn ? "Signing in…" : "Sign in"}
              </button>
              <div className="err">{loginError}</div>
            </form>
          </div>
        ) : (
          <Dashboard data={data} onRefresh={refresh} onLogout={logout} />
        )}
      </div>
    </div>
  );
}

function Dashboard({ data, onRefresh, onLogout }: { data: DashboardData; onRefresh: () => void; onLogout: () => void }) {
  const s = data.stats || {};
  const cards: [string, string | number][] = [
    ["Conversations", s.opens || 0],
    ["Messages", s.messages || 0],
    ["Blueprints", s.blueprints || 0],
    ["Audits", s.audits || 0],
    ["Leads", s.leads || 0],
    ["Conversion", `${s.conversion || 0}%`],
  ];
  const tiers: ("Hot" | "Warm" | "Cold")[] = ["Hot", "Warm", "Cold"];
  const trend = data.trend || [];
  const max = Math.max(1, ...trend.map((x) => x.count));
  const leads = data.leads || [];

  return (
    <>
      <div className="top">
        <h2 style={{ margin: 0, fontSize: 18 }}>Dashboard</h2>
        <div className="actions">
          <button className="ghost" onClick={onRefresh}>↻ Refresh</button>
          <button className="ghost" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="cards">
        {cards.map(([label, value]) => (
          <div className="stat" key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="row2">
        <div className="panel">
          <h3>Lead Quality</h3>
          <div className="tiers">
            {tiers.map((t) => (
              <div className={`tier tier--${t}`} key={t}>
                <b>{s[t] || 0}</b>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Leads · last 7 days</h3>
          <div className="bars">
            {trend.map((x) => (
              <div className="b" key={x.day}>
                <div className="bar" style={{ height: Math.round((x.count / max) * 72) }} />
                <small>{x.day}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Company</th><th>Tier</th><th>Budget</th><th>Timeline</th><th>When</th>
            </tr>
          </thead>
          <tbody>
            {leads.length ? (
              leads.map((l) => {
                const when = l.created_at
                  ? new Date(l.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "";
                return (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td className="muted">{l.email}</td>
                    <td>{l.company || "—"}</td>
                    <td><span className={`pill pill--${l.tier || "Cold"}`}>{l.tier || "—"}</span></td>
                    <td className="muted">{l.budget || "—"}</td>
                    <td className="muted">{l.timeline || "—"}</td>
                    <td className="muted">{when}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="muted" style={{ textAlign: "center", padding: 24 }}>
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
