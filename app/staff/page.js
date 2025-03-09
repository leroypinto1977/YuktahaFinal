// app/staff/page.js
export default function StaffDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      <p>
        Welcome to the staff dashboard. This page is only accessible to users
        with staff role.
      </p>
      {/* Add your staff dashboard components here */}
    </div>
  );
}
