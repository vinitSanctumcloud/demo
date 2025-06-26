"use client";
import { useState } from "react";
import ChatbotWidget from "./ChatbotWidget";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main >
      <ChatbotWidget />
    </main>
  );
}
