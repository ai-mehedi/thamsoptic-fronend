'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Unauthorized() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          router.push('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <div className="text-5xl mb-4 text-red-600 animate-pulse">❌</div>
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-red-500 mb-4">
          You are not authorized to access this page.
        </p>
        <p className="text-sm text-gray-600">
          Redirecting to homepage in <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
}
