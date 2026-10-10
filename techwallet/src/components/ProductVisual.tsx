// Clean technical placeholder until real product photos are added.
export default function ProductVisual({ category, className = "" }: { category: string; className?: string }) {
  const stroke = "#2fa8ef";
  return (
    <div className={`grid place-items-center bg-tint ${className}`}>
      <svg viewBox="0 0 120 90" className="h-3/5 w-3/5" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {category === "raspberry-pi" || category === "kits" ? (
          <>
            <rect x="14" y="14" width="92" height="62" rx="6" />
            <rect x="26" y="26" width="24" height="24" rx="2" />
            <rect x="60" y="26" width="16" height="14" rx="2" />
            <path d="M84 24v28M92 24v28M26 62h60" />
          </>
        ) : category === "sensors" ? (
          <>
            <rect x="34" y="12" width="52" height="40" rx="6" />
            <circle cx="60" cy="32" r="10" />
            <path d="M44 52v26M60 52v26M76 52v26" />
          </>
        ) : category === "motors" ? (
          <>
            <rect x="22" y="26" width="52" height="38" rx="6" />
            <path d="M74 45h26" />
            <circle cx="100" cy="45" r="5" />
            <path d="M22 36h-8M22 54h-8" />
          </>
        ) : category === "displays" ? (
          <>
            <rect x="14" y="16" width="92" height="58" rx="5" />
            <rect x="22" y="24" width="76" height="42" rx="2" />
            <path d="M32 38h30M32 48h46" />
          </>
        ) : category === "power" ? (
          <>
            <rect x="16" y="22" width="88" height="46" rx="5" />
            <rect x="26" y="32" width="20" height="26" rx="2" />
            <path d="M58 34h36M58 46h36M58 58h24" />
          </>
        ) : (
          <>
            <rect x="26" y="8" width="68" height="74" rx="6" />
            <rect x="44" y="22" width="32" height="26" rx="2" />
            <path d="M16 20h10M16 32h10M16 44h10M16 56h10M94 20h10M94 32h10M94 44h10M94 56h10M46 62h28" />
          </>
        )}
      </svg>
    </div>
  );
}
