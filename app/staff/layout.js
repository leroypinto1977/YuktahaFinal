// app/staff/layout.js
export default function StaffLayout({ children }) {
  return (
    <div className="staff-layout">
      <nav className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold">Staff Portal</h2>
          <div className="flex gap-4">
            <a href="/staff" className="hover:text-green-300">
              Dashboard
            </a>
            <a href="/staff/events" className="hover:text-green-300">
              Events
            </a>
            <a href="/staff/workshops" className="hover:text-green-300">
              Workshops
            </a>
            <a href="/" className="hover:text-green-300">
              Back to Site
            </a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
}
