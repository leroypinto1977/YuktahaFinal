// app/admin/page.js
export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. This page is only accessible to users
        with admin role.
      </p>
      {/* Add your admin dashboard components here */}
    </div>
  );
}
