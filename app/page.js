"use client"; // Required for client-side navigation
import withAuth from "./auth";

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Page Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to My App</h1>
        <p className="text-gray-600 text-lg text-center">
          This is the homepage.
        </p>
      </main>
    </div>
  );
}

export default withAuth(HomePage);