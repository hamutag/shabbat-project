import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navigation */}
        <AdminMobileNav />

        {/* Page Content */}
        <div className="flex-1 bg-gray-50 p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
