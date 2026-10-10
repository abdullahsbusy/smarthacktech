"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { shippingFor } from "@/lib/pricing";

const phone = z
  .string()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(03\d{9}|\+923\d{9})$/.test(v), "Enter a valid Pakistani mobile number (03XXXXXXXXX)");

const orderSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  city: z.string().trim().min(2, "Enter your city").max(60),
  address: z.string().trim().min(8, "Enter your full address").max(300),
  note: z.string().trim().max(300).optional(),
  items: z.array(z.object({ slug: z.string().max(100), qty: z.number().int().min(1).max(99) })).min(1, "Your cart is empty").max(50),
  accessToken: z.string().max(4000).optional(),
});

/** Resolves a customer's Supabase access token to a user id (undefined for guests or invalid tokens). */
async function userIdFromToken(token?: string) {
  if (!token) return undefined;
  const { data } = await supabaseAdmin().auth.getUser(token);
  return data.user?.id;
}

const last10 = (v: string) => v.replace(/\D/g, "").slice(-10);

export type ActionResult = { ok: true; number?: string } | { ok: false; error: string };

export async function placeOrder(input: unknown): Promise<ActionResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const o = parsed.data;

  try {
    const db = supabaseAdmin();

    // Prices always come from the database, never from the browser.
    const { data: rows, error: pErr } = await db
      .from("products")
      .select("slug, price")
      .in("slug", o.items.map((i) => i.slug))
      .eq("is_active", true);
    if (pErr) throw pErr;

    const price = new Map(rows!.map((r) => [r.slug as string, r.price as number]));
    if (o.items.some((i) => !price.has(i.slug))) return { ok: false, error: "A product in your cart is no longer available." };

    const subtotal = o.items.reduce((n, i) => n + price.get(i.slug)! * i.qty, 0);

    const { data, error } = await db.rpc("place_order", {
      p_customer: { name: o.name, phone: o.phone, email: o.email || null, city: o.city, address: o.address, note: o.note || null, payment_method: "cod" },
      p_items: o.items,
      p_shipping: shippingFor(subtotal),
    });
    if (error) {
      const m = /OUT_OF_STOCK:(.*)/.exec(error.message);
      if (m) return { ok: false, error: `Sorry, "${m[1]}" does not have enough stock.` };
      throw error;
    }
    const number = data as string;

    // Attach the order to the customer's account when they are logged in (best effort: the order itself is already placed).
    const userId = await userIdFromToken(o.accessToken).catch(() => undefined);
    if (userId) await db.from("orders").update({ user_id: userId }).eq("number", number);

    return { ok: true, number };
  } catch (e) {
    console.error("placeOrder failed", e);
    return { ok: false, error: "Could not place your order. Please try again or contact us on WhatsApp." };
  }
}

const fypSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  university: z.string().trim().max(120).optional(),
  package: z.enum(["Starter", "Standard", "Premium"]).optional(),
  idea: z.string().trim().max(1000).optional(),
});

export async function submitFypRequest(input: unknown): Promise<ActionResult> {
  const parsed = fypSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  try {
    const { error } = await supabaseAdmin().from("fyp_requests").insert(parsed.data);
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.error("submitFypRequest failed", e);
    return { ok: false, error: "Could not send your request. Please message us on WhatsApp." };
  }
}

export type TrackResult =
  | { ok: true; number: string; status: string; courier: string | null; trackingNo: string | null; total: number }
  | { ok: false; error: string };

/** Public order tracking: the order number alone is not enough, the phone number on the order must match too. */
export async function trackOrder(input: unknown): Promise<TrackResult> {
  const parsed = z
    .object({ number: z.string().trim().toUpperCase().min(3).max(40), phone: z.string().trim().min(7).max(20) })
    .safeParse(input);
  if (!parsed.success) return { ok: false, error: "Enter your order number and phone number." };
  try {
    const { data, error } = await supabaseAdmin()
      .from("orders")
      .select("number, phone, status, courier, tracking_no, total")
      .eq("number", parsed.data.number)
      .maybeSingle();
    if (error) throw error;
    if (!data || last10(data.phone) !== last10(parsed.data.phone)) {
      return { ok: false, error: "We could not find an order with those details." };
    }
    return { ok: true, number: data.number, status: data.status, courier: data.courier, trackingNo: data.tracking_no, total: data.total };
  } catch (e) {
    console.error("trackOrder failed", e);
    return { ok: false, error: "Could not look up your order right now. Please try again." };
  }
}

export type MyOrder = { number: string; status: string; total: number; date: string };

/** Orders belonging to the logged-in customer (identified by their Supabase access token). */
export async function myOrders(accessToken: string): Promise<{ ok: true; orders: MyOrder[] } | { ok: false }> {
  try {
    const userId = await userIdFromToken(accessToken);
    if (!userId) return { ok: false };
    const { data, error } = await supabaseAdmin()
      .from("orders")
      .select("number, status, total, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    const fmt = new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeZone: "Asia/Karachi" });
    return { ok: true, orders: data.map((r) => ({ number: r.number, status: r.status, total: r.total, date: fmt.format(new Date(r.created_at)) })) };
  } catch (e) {
    console.error("myOrders failed", e);
    return { ok: false };
  }
}
