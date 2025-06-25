"use client";
import { useState } from "react";
import ChatbotWidget from "./ChatbotWidget";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="w-[400px] h-[690px] flex items-center justify-center  rounded-xl shadow-md mx-auto mt-[10%]">
      <ChatbotWidget />
    </main>
  );
}
