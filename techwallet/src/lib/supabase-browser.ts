"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

/** Browser client for customer login. Uses the public anon key only; the session is kept in localStorage. */
export function supabaseBrowser() {
  client ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  return client;
}

export async function getAccessToken() {
  const { data } = await supabaseBrowser().auth.getSession();
  return data.session?.access_token;
}
