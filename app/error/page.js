// app/error/page.js
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-gray-600 mb-6">
        An error occurred while processing your request.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Return to Home
      </a>
    </div>
  );
}
