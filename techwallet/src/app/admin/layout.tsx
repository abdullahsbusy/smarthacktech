import Link from "next/link";
import { adminLogout } from "../admin-actions";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/fyp", label: "FYP requests" },
];

export const metadata = { title: "Admin | TechWallet" };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-paper md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-line bg-deep text-white md:min-h-screen md:border-b-0">
        <div className="flex items-center gap-2 px-5 py-4">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-dark text-sm font-bold text-white">T</span>
          <span className="font-bold">TechWallet Admin</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
              {i.label}
            </Link>
          ))}
          <Link href="/" className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-white/50 hover:text-white md:mt-6">← View store</Link>
          <form action={adminLogout}><button className="w-full whitespace-nowrap rounded-md px-3 py-2 text-left text-sm text-white/50 hover:text-white">Log out</button></form>
        </nav>
      </aside>
      <div className="min-w-0 p-5 md:p-8">{children}</div>
    </div>
  );
}
