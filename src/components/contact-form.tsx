"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, SERVICE_OPTIONS, type ContactFormValues } from "@/lib/schemas/contact";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-[13px] border border-(--line) bg-black/40 px-4 py-3.5 text-(--ink) transition-colors placeholder:text-(--muted) focus:border-(--c5) focus:bg-black/60 focus:shadow-[0_0_0_3px_rgba(47,168,239,.14),0_8px_28px_-12px_rgba(47,168,239,.35)] focus:outline-none";
const labelClass = "text-[0.85rem] tracking-[.4px] text-(--muted)";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", service: defaultService ?? "", message: "", _gotcha: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus({ kind: "idle", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ kind: "ok", message: "Thanks — we'll be in touch shortly." });
        reset();
        return;
      }
      if (res.status === 503) {
        // email service not configured yet — fall back to the visitor's own client
        const subject = encodeURIComponent(`New enquiry — ${values.service || "HackTech"} — ${values.name}`);
        const body = encodeURIComponent(
          `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "-"}\nService: ${values.service}\n\n${values.message}`
        );
        window.location.assign(`mailto:contact.hacktechzone@gmail.com?subject=${subject}&body=${body}`);
        setStatus({ kind: "ok", message: "Opening your email client to send this instead…" });
        return;
      }
      setStatus({ kind: "error", message: data.error || "Something went wrong — please try again." });
    } catch {
      setStatus({ kind: "error", message: "Network error — please check your connection and try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* honeypot — real users never see or fill this in */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        {...register("_gotcha")}
      />

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>Full name</label>
          <input id="name" placeholder="Ahmed Raza" className={inputClass} {...register("name")} />
          {errors.name && <p className="text-sm text-(--bad)">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Work email</label>
          <input id="email" type="email" placeholder="you@company.pk" className={inputClass} {...register("email")} />
          {errors.email && <p className="text-sm text-(--bad)">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className={labelClass}>
          Company / University <span className="text-(--muted)">(optional)</span>
        </label>
        <input id="company" placeholder="Company or university" className={inputClass} {...register("company")} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className={labelClass}>What do you need?</label>
        <select
          id="service"
          className={inputClass + " appearance-none bg-[position:calc(100%-20px)_22px,calc(100%-14px)_22px] bg-[size:6px_6px] bg-no-repeat"}
          {...register("service")}
        >
          <option value="" disabled>Choose a service</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <p className="text-sm text-(--bad)">{errors.service.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>What are you trying to solve?</label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about your project, goals and timeline…"
          className={inputClass + " min-h-[130px] resize-y"}
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-(--bad)">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="hackPrimary" size="hack" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Sending…" : "Get my quote"}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className={
          "min-h-[1.2em] text-[0.95rem] " +
          (status.kind === "error" ? "text-(--bad)" : "text-(--ok)")
        }
      >
        {status.message}
      </p>
    </form>
  );
}
