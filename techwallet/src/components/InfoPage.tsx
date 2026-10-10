export default function InfoPage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-x py-12">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
        </div>
      </section>
      <div className="container-x max-w-3xl py-12 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-2 [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted">
        {children}
      </div>
    </>
  );
}
