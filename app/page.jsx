'use client';
import { useState } from 'react';
import ChatbotWidget from './ChatbotWidget';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {!open && (
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
          onClick={() => setOpen(true)}
        >
          💬 Chat with AI
        </button>
      )}

      {open && <ChatbotWidget onClose={() => setOpen(false)} />}
    </main>
  );
}
