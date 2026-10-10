import InfoPage from "@/components/InfoPage";
import ContactForm from "@/components/ContactForm";
import { SITE, waLink } from "@/lib/site";

export const metadata = { title: "Contact | TechWallet" };

const box = "rounded-xl border border-line bg-surface p-5";

export default function Contact() {
  return (
    <InfoPage title="Contact us" intro="Questions about a component, an order or your FYP? We usually reply within a few hours.">
      <div className="grid gap-4 sm:grid-cols-2">
        <a href={waLink()} target="_blank" rel="noopener" className={`${box} transition hover:border-primary/50`}><p className="text-sm font-semibold text-primary">WhatsApp</p><p className="mt-1 font-mono !text-ink">{SITE.whatsappDisplay}</p></a>
        <div className={box}><p className="text-sm font-semibold text-primary">Email</p><p className="mt-1 font-mono !text-ink">{SITE.email}</p></div>
        <div className={box}><p className="text-sm font-semibold text-primary">Hours</p><p className="mt-1 !text-ink">Mon–Sat, 10am – 8pm</p></div>
        <div className={box}><p className="text-sm font-semibold text-primary">Location</p><p className="mt-1 !text-ink">Your city, Pakistan</p></div>
      </div>
      <h2>Send a message</h2>
      <ContactForm />
    </InfoPage>
  );
}
