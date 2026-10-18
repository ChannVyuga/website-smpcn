
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F7F7F2",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          overflowX: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}