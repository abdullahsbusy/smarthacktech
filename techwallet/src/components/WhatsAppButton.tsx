import { waLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Hi TechWallet, I need help with ")}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-12 items-center gap-2 rounded-full bg-[#1f9d55] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#188046]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
        <path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12Z" />
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
