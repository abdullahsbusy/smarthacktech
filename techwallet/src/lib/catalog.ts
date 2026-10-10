import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { products as staticProducts, type Product } from "./data";
import { supabaseAdmin } from "./supabase";

const COLUMNS = "slug, name, category, brand, price, compare_price, stock, tag, short, specs";

type Row = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  compare_price: number | null;
  stock: number;
  tag: string | null;
  short: string;
  specs: [string, string][] | null;
};

const toProduct = (r: Row): Product => ({
  slug: r.slug,
  name: r.name,
  category: r.category,
  brand: r.brand,
  price: r.price,
  compare: r.compare_price ?? undefined,
  stock: r.stock,
  tag: r.tag ?? undefined,
  short: r.short,
  specs: r.specs ?? [],
});

/** Active products for the storefront. Falls back to the bundled list if the database is unreachable or empty. */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");
  try {
    const { data, error } = await supabaseAdmin()
      .from("products")
      .select(COLUMNS)
      .eq("is_active", true)
      .order("created_at")
      .order("name");
    if (error) throw error;
    if (data?.length) return (data as Row[]).map(toProduct);
  } catch (e) {
    console.error("catalog: using bundled products", e);
  }
  return staticProducts;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

/** Every product (including hidden ones), uncached. Admin only. */
export async function getAllProductsForAdmin(): Promise<(Product & { active: boolean })[]> {
  const { data, error } = await supabaseAdmin()
    .from("products")
    .select(`${COLUMNS}, is_active`)
    .order("created_at")
    .order("name");
  if (error) throw error;
  return (data as (Row & { is_active: boolean })[]).map((r) => ({ ...toProduct(r), active: r.is_active }));
}
