import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = { title: "Admin login | TechWallet" };

export default function AdminLogin() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-sm place-items-center">
      <div className="w-full rounded-2xl border border-line bg-surface p-8">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-dark font-bold text-white">T</span>
        <h1 className="mt-4 text-xl font-bold">Admin sign in</h1>
        <AdminLoginForm />
      </div>
    </div>
  );
}
