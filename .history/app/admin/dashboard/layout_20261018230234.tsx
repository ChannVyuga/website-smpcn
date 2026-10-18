
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import SessionGuard from '@/components/admin/SessionGuard';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== 'admin') {
    redirect('/admin/login');
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f6f7f2',
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',
          overflowX: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
}
