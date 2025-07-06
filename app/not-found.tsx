// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      <div className="text-6xl font-extrabold text-red-600 mb-4">404</div>
      <h1 className="text-3xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition duration-300 shadow-md"
      >
        Go Home
      </Link>
      <div className="mt-10 animate-bounce text-2xl">🔍</div>
    </div>
  );
}
