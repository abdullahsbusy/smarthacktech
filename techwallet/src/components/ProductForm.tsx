"use client";

import Link from "next/link";
import { useActionState } from "react";
import ImageUpload from "./ImageUpload";
import { categories, type Product } from "@/lib/data";
import { saveProduct, type FormState } from "@/app/admin-actions";

const field = "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function ProductForm({ product }: { product?: Product & { active?: boolean } }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProduct, {});
  return (
    <form action={action} className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-line bg-surface p-6 sm:grid-cols-2">
      {product && <input type="hidden" name="originalSlug" value={product.slug} />}
      <label className="block text-sm sm:col-span-2">Name<input name="name" required defaultValue={product?.name} className={field} /></label>
      <label className="block text-sm">Slug<input name="slug" required defaultValue={product?.slug} className={`${field} font-mono`} placeholder="esp32-devkit-v1" /></label>
      <label className="block text-sm">Brand<input name="brand" required defaultValue={product?.brand ?? "Generic"} className={field} /></label>
      <label className="block text-sm">Category
        <select name="category" defaultValue={product?.category} className={field}>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </label>
      <label className="block text-sm">Tag (optional)<input name="tag" defaultValue={product?.tag} className={field} placeholder="Best seller" /></label>
      <label className="block text-sm">Price (Rs)<input name="price" type="number" min={0} required defaultValue={product?.price} className={`${field} font-mono`} /></label>
      <label className="block text-sm">Compare-at price (Rs)<input name="compare" type="number" min={0} defaultValue={product?.compare} className={`${field} font-mono`} /></label>
      <label className="block text-sm">Stock<input name="stock" type="number" min={0} required defaultValue={product?.stock ?? 0} className={`${field} font-mono`} /></label>
      <label className="flex items-center gap-2 pt-7 text-sm">
        <input name="active" type="checkbox" defaultChecked={product?.active ?? true} className="h-4 w-4 accent-[#2fa8ef]" /> Visible in the store
      </label>
      <label className="block text-sm sm:col-span-2">Short description
        <textarea name="short" defaultValue={product?.short} className={`${field} h-24 py-3`} />
      </label>
      <label className="block text-sm sm:col-span-2">Specifications (one per line, Name: Value)
        <textarea name="specs" defaultValue={product?.specs.map(([k, v]) => `${k}: ${v}`).join("\n")} className={`${field} h-36 py-3 font-mono`} />
      </label>
      <ImageUpload />
      {state.error && <p role="alert" className="rounded-lg bg-accent/10 p-3 text-sm text-accent sm:col-span-2">{state.error}</p>}
      <div className="flex gap-3 sm:col-span-2">
        <button disabled={pending} className="btn btn-primary h-11">{pending ? "Saving…" : "Save product"}</button>
        <Link href="/admin/products" className="btn btn-outline h-11">Cancel</Link>
      </div>
    </form>
  );
}
