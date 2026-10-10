"use client";

import { useEffect, useRef, useState } from "react";

type Img = { id: string; name: string; url: string };
const MAX_MB = 5;

/** UI-only uploader: previews files locally. Saving to Supabase Storage is wired up with the backend. */
export default function ImageUpload() {
  const input = useRef<HTMLInputElement>(null);
  const [imgs, setImgs] = useState<Img[]>([]);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => () => imgs.forEach((i) => URL.revokeObjectURL(i.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  function addFiles(files: FileList | null) {
    if (!files) return;
    setError(undefined);
    const next: Img[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) { setError(`${f.name} is not an image.`); continue; }
      if (f.size > MAX_MB * 1024 * 1024) { setError(`${f.name} is larger than ${MAX_MB} MB.`); continue; }
      next.push({ id: `${f.name}-${f.size}-${f.lastModified}`, name: f.name, url: URL.createObjectURL(f) });
    }
    setImgs((cur) => [...cur, ...next.filter((n) => !cur.some((c) => c.id === n.id))]);
  }

  function remove(id: string) {
    setImgs((cur) => {
      const gone = cur.find((i) => i.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return cur.filter((i) => i.id !== id);
    });
  }

  return (
    <div className="sm:col-span-2">
      <p className="text-sm">Product images</p>
      <div
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), input.current?.click())}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
        className={`mt-1 flex cursor-pointer select-none flex-col items-center gap-1 rounded-lg border-2 border-dashed p-8 text-center text-sm transition ${over ? "border-primary bg-tint" : "border-line hover:border-primary/50"}`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden>
          <path d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
        </svg>
        <span className="font-semibold">Click to upload or drag and drop</span>
        <span className="text-xs text-muted">PNG, JPG or WebP, up to {MAX_MB} MB each</span>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-accent">{error}</p>}
      {imgs.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {imgs.map((i, idx) => (
            <li key={i.id} className="group relative aspect-square overflow-hidden rounded-lg border border-line bg-tint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.url} alt={i.name} className="h-full w-full object-cover" />
              {idx === 0 && <span className="absolute left-1.5 top-1.5 rounded bg-deep px-1.5 py-0.5 text-[10px] font-semibold text-white">Main</span>}
              <button type="button" onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`} className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-deep/80 text-xs text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100">✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
