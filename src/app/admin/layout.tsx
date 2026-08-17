import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage portfolio content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-brand-green dark:text-brand-yellow">
            Portfolio Admin
          </h1>
        </div>
      </nav>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
