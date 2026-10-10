"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { ADMIN_COOKIE, ADMIN_MAX_AGE_S, createAdminToken, passwordMatches, verifyAdminToken } from "@/lib/admin-auth";
import { categories } from "@/lib/data";

export type FormState = { error?: string; ok?: boolean };

async function requireAdmin() {
  if (!(await verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value))) throw new Error("Not authorised");
}

export async function adminLogin(_: FormState, formData: FormData): Promise<FormState> {
  if (!process.env.ADMIN_PASSWORD) return { error: "ADMIN_PASSWORD is not set on the server." };
  if (!(await passwordMatches(String(formData.get("password") ?? "")))) return { error: "Wrong password." };
  (await cookies()).set(ADMIN_COOKIE, await createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_MAX_AGE_S,
  });
  redirect("/admin");
}

export async function adminLogout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

const STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"] as const;

const orderUpdate = z.object({
  number: z.string().min(1).max(40),
  status: z.enum(STATUSES),
  courier: z.string().trim().max(40).optional(),
  tracking_no: z.string().trim().max(60).optional(),
});

export async function updateOrder(formData: FormData): Promise<void> {
  await requireAdmin();
  const p = orderUpdate.parse(Object.fromEntries(formData));
  const db = supabaseAdmin();

  const { data: current, error: gErr } = await db
    .from("orders")
    .select("id, status, order_items(product_id, qty)")
    .eq("number", p.number)
    .single();
  if (gErr) throw gErr;

  const { error } = await db
    .from("orders")
    .update({
      status: p.status,
      courier: p.courier || null,
      tracking_no: p.tracking_no || null,
      // Cash on delivery is collected when the parcel is delivered.
      ...(p.status === "delivered" ? { payment_status: "paid" } : {}),
    })
    .eq("number", p.number);
  if (error) throw error;

  // Cancelling an order puts its items back on the shelf.
  if (p.status === "cancelled" && current.status !== "cancelled") {
    for (const it of current.order_items as { product_id: string; qty: number }[]) {
      const { data: prod } = await db.from("products").select("stock").eq("id", it.product_id).single();
      if (prod) await db.from("products").update({ stock: prod.stock + it.qty }).eq("id", it.product_id);
    }
    updateTag("products");
  }
  updateTag("orders");
  redirect(`/admin/orders/${p.number}`);
}

const FYP_STATUSES = ["new", "contacted", "in_progress", "done"] as const;

export async function updateFypStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const p = z.object({ id: z.uuid(), status: z.enum(FYP_STATUSES) }).parse(Object.fromEntries(formData));
  const { error } = await supabaseAdmin().from("fyp_requests").update({ status: p.status }).eq("id", p.id);
  if (error) throw error;
  redirect("/admin/fyp");
}

const productSchema = z.object({
  originalSlug: z.string().optional(),
  name: z.string().trim().min(2, "Enter a product name").max(160),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug can only use lowercase letters, numbers and dashes"),
  brand: z.string().trim().min(1).max(60),
  category: z.enum(categories.map((c) => c.slug) as [string, ...string[]]),
  tag: z.string().trim().max(30).optional(),
  price: z.coerce.number().int().min(0, "Enter a price"),
  compare: z.coerce.number().int().min(0).optional().or(z.literal("").transform(() => undefined)),
  stock: z.coerce.number().int().min(0, "Enter stock"),
  short: z.string().trim().max(300),
  specs: z.string().max(4000),
  active: z.string().optional(),
});

export async function saveProduct(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const p = parsed.data;

  const specs = p.specs
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(":");
      return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, ""];
    });

  const row = {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    tag: p.tag || null,
    price: p.price,
    compare_price: p.compare || null,
    stock: p.stock,
    short: p.short,
    specs,
    is_active: p.active === "on",
  };

  const db = supabaseAdmin();
  const { error } = p.originalSlug
    ? await db.from("products").update(row).eq("slug", p.originalSlug)
    : await db.from("products").insert(row);
  if (error) return { error: error.code === "23505" ? "That slug is already used by another product." : "Could not save the product." };

  updateTag("products");
  redirect("/admin/products");
}
