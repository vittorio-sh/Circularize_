import React from 'react';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Circularize</h1>
      <p className="text-lg text-gray-700 mb-4">Host and organize events with ease.</p>
      <button
        onClick={() => router.push('/Dashboard')}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Get Started
      </button>
    </div>
  );
}
