"use client";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa6";

const AvatarAssistant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error(err);
      setResponse("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 border border-gray-200 p-4 sm:p-6 h-[90vh] flex flex-col">
      {/* Media Container */}
      <div className="w-full h-[60%] relative rounded-xl overflow-hidden">
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Video failed to load:", e);
          }}
        />
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto mt-4 px-1 sm:px-4">
        <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800">
          Hi, I'm <span className="text-orange-500">{`{Avatar Name}`}</span>,<br />
          <span className="font-normal text-gray-700">Ready to Assist</span>
        </h2>

        {/* Predefined Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {["Help me plan my Sonoma itinerary", "How can I explore Sonoma like a local", "Find restaurants or Insider Pass details", "Tell me about spas or outdoor sports"].map((text) => (
            <button key={text} onClick={() => setInput(text)} className="border border-gray-300 rounded-md py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">
              {text}
            </button>
          ))}
        </div>

        {/* Chat Response */}
        {response && (
          <div className="mt-6 bg-gray-50 border rounded-lg p-4 text-left text-sm text-gray-800">
            <strong className="text-orange-500">AI:</strong> {loading ? "Thinking..." : response}
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Input box */}
        <div className="flex flex-1 bg-gray-200 rounded-full px-4 py-2 items-center gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or Ask me something" className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none" />
          <button onClick={handleSend} disabled={loading} className="bg-orange-400 cursor-pointer hover:bg-orange-500 text-white p-2 rounded-full flex items-center justify-center">
            <FiSend className="w-4 h-4" />
          </button>
        </div>

        {/* Mic button */}
        <button className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full flex items-center justify-center cursor-pointer">
          <FaMicrophone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AvatarAssistant;
