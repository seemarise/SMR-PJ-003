"use client"; // Required for client-side navigation


export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Page Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to My App</h1>
        <p className="text-gray-600 text-lg text-center">
          This is the homepage.
        </p>

        <a
          href="/dashboard"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
      </main>


    </div>
  );
}