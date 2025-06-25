'use client';
import { useState } from 'react';
import ChatbotWidget from './ChatbotWidget';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center">
      

      <ChatbotWidget />
    </main>
  );
}
