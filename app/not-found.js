"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-gray-50 pb-20 md:pb-8 animate-in fade-in duration-300">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 space-y-6 md:px-8 md:py-10">
        {/* Center Icon */}
        <div className="flex flex-col items-center space-y-3">
          <AlertTriangle className="w-16 h-16 text-red-500 animate-bounce" />
          <h1 className="text-5xl font-bold text-gray-800 md:text-6xl">404</h1>
        </div>

        {/* Title and message */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-600 text-base md:text-lg">
            Sorry, the page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {/* SVG underline doodle */}
        <div className="w-28 h-3 mx-auto mt-2 md:w-40 md:h-4 md:mt-3">
          <svg
            viewBox="0 0 140 12"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-red-500"
          >
            <path
              d="M8 6 C20 3, 35 9, 50 6 S80 3, 95 6 S120 9, 132 6"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Back Home button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 border border-gray-400 text-gray-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 active:scale-95 md:px-6 md:py-3 md:text-base md:shadow-sm md:bg-white"
        >
          <Home className="w-5 h-5" />
          Go Back Home
        </button>
      </main>
    </div>
  );
}
