// app/admin/layout.js
export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Portal</h2>
          <div className="flex gap-4">
            <a href="/admin" className="hover:text-blue-300">
              Dashboard
            </a>
            <a href="/admin/users" className="hover:text-blue-300">
              Users
            </a>
            <a href="/admin/settings" className="hover:text-blue-300">
              Settings
            </a>
            <a href="/" className="hover:text-blue-300">
              Back to Site
            </a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
}
