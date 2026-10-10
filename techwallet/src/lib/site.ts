// Store-wide settings. Replace the placeholders before launch.
export const SITE = {
  name: "TechWallet",
  whatsapp: "923001234567", // international format, no + or spaces
  whatsappDisplay: "0300-1234567",
  email: "support@techwallet.pk",
};

export const waLink = (text = "") => `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
