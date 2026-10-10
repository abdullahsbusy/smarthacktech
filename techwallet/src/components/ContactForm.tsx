"use client";

import { waLink } from "@/lib/site";

const field = "h-11 rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

/** Opens WhatsApp with the message pre-filled, so it works before any backend exists. */
export default function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hi TechWallet, I am ${f.get("name")} (${f.get("contact")}).\n${f.get("message")}`;
    window.open(waLink(text), "_blank", "noopener");
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <input name="name" required className={field} placeholder="Your name" />
      <input name="contact" required className={field} placeholder="Phone or email" />
      <textarea name="message" required className={`${field} h-32 p-3 sm:col-span-2`} placeholder="How can we help?" />
      <button className="btn btn-primary h-12 sm:col-span-2">Send via WhatsApp</button>
    </form>
  );
}
