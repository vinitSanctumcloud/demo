"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiMic } from "react-icons/fi";
import { BsSend, BsQrCodeScan } from "react-icons/bs";
import logo from "./download.jpeg";

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatView, setChatView] = useState(false);
  const chatDisplayRef = useRef(null);

  const dummyBotResponse = "Thanks for your message. Here's a suggestion: Check out the local spa or the wine tasting tour! 🍷";

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    setChatView(true); // Switch to chat view

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: dummyBotResponse }]);
    }, 600);
  };

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative w-[400px] max-w-full bg-orange-50  rounded-xl overflow-hidden border border-orange-100">
      <style>{`
        .message-bubble {
          padding: 0.75rem;
          border-radius: 1rem;
          max-width: 80%;
          word-wrap: break-word;
          margin-bottom: 0.5rem;
        }
        .user-msg {
          background-color: #fed7aa;
          align-self: flex-end;
          color: #111;
        }
        .bot-msg {
          background-color: #fff;
          align-self: flex-start;
          color: #222;
        }
      `}</style>

      {/* Header */}
      {!chatView ? (
        <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center">
          <div className="relative w-28 h-28">
            <Image src={logo} alt="AI Assistant" fill className="object-contain rounded-full " />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3 bg-orange-100 border-b border-orange-200 ">
          <div className="relative w-10 h-10">
            <Image src={logo} alt="AI Assistant" fill className="object-cover rounded-full " />
          </div>
          <div>
            <h2 className="text-md font-semibold text-orange-700">Sonoma Guide</h2>
            <p className="text-xs text-gray-600">AI Assistant</p>
          </div>
        </div>
      )}

      {/* Greeting */}
      {!chatView && (
        <div className="text-center p-4 border-b border-orange-100">
          <h2 className="text-xl font-medium text-gray-800">
            Hi, I'm <span className="text-orange-600 font-semibold">Sonoma Guide</span>,
          </h2>
          <p className="text-gray-500 mt-1">Ready to Assist</p>
        </div>
      )}

      {/* Chat Display */}
      <div
        id="chatDisplay"
        ref={chatDisplayRef}
        className="flex flex-col gap-2 px-4 py-4 overflow-y-auto h-48"
        style={{ backgroundColor: "#fffaf0" }}
      >
        {!chatView ? (
          <div className="grid grid-cols-2 gap-3">
            {[
              "Help me plan my Sonoma itinerary",
              "Find restaurants or Insider Pass details",
              "Explore Sonoma like a local",
              "Tell me about spas or outdoor sports",
            ].map((text, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(text);
                  setTimeout(() => handleSendMessage(), 200);
                }}
                className="border border-orange-200 bg-white text-sm p-3 rounded-lg hover:border-orange-300 hover:bg-orange-100 transition-all text-left text-gray-700 hover:text-orange-700"
              >
                {text}
              </button>
            ))}
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message-bubble ${msg.type === "user" ? "self-end user-msg" : "self-start bot-msg"}`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* QR Section */}
      {!chatView && (
        <div className="flex flex-col items-center bg-orange-100 p-4 border-t border-orange-200">
          <p className="mb-2 text-gray-700 text-sm text-center">
            Continue on phone
            <br />
            <span className="text-orange-600 font-medium">Scan QR</span>
          </p>
          <div className="bg-white p-2 rounded-lg border border-orange-200 ">
            <BsQrCodeScan size={40} className="text-orange-500" />
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="flex items-center border-t border-orange-100 p-3 gap-1 bg-orange-50">
        <input
          type="text"
          placeholder="Type or Ask me something..."
          className="flex-1 border border-orange-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 text-gray-700 placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="text-orange-500 hover:text-orange-600 transition-colors p-2">
          <FiMic size={20} />
        </button>
        <button
          className="text-orange-500 hover:text-orange-600 transition-colors p-2 bg-orange-100 rounded-full flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <BsSend size={20} />
        </button>
      </div>
    </div>
  );
}
