import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="container-x flex-1 py-28 text-center">
        <p className="font-mono text-6xl font-semibold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">We could not find that page</h1>
        <p className="mt-2 text-muted">The link may be old, or the product may no longer be available.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary h-12 px-6">Go home</Link>
          <Link href="/shop" className="btn btn-outline h-12 px-6">Browse shop</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
