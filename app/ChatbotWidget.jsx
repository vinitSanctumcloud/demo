"use client";
import Image from "next/image";
import { FiX, FiMic, FiSend } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";
import logo from "./download.jpeg";
export default function ChatbotWidget({ onClose }) {
  return (
    <div className="fixed bottom-6 right-6 w-[400px] max-w-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 flex flex-col">
      {/* Header with Close Button */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-30 transition-colors text-white">
          <FiX size={18} />
        </button>

        <div className="flex items-center gap-3">
          {/* Avatar Image */}
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
            <Image
              src={logo} // Replace with your robot image path
              alt="AI Assistant"
              width={48}
              height={48}
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Title Text */}
          <div className="text-left text-white">
            <h2 className="text-lg font-semibold">Travel Assistant</h2>
            <p className="text-sm opacity-90">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="p-4 bg-orange-50">
        <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
          <p className="text-sm text-gray-800">Hi there! 👋 I'm your Sonoma travel assistant. How can I help you today?</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 px-4 py-3 bg-gray-50">
        {["Help me plan my Sonoma itinerary", "How can I explore Sonoma like a local", "Find restaurants or Insider Pass details", "Tell me about spas or outdoor sports"].map((text, index) => (
          <button key={index} className="border text-sm border-gray-200 p-2 rounded-lg hover:bg-white transition-all text-left bg-white shadow-sm hover:shadow-md text-gray-700 hover:border-orange-300">
            {text}
          </button>
        ))}
      </div>

      {/* QR Section */}
      <div className="flex items-center justify-between bg-orange-50 p-3 border-t">
        <div className="text-left">
          <p className="text-sm font-medium text-gray-700">Continue on your phone</p>
          <p className="text-xs text-gray-500">Scan QR code to chat on mobile</p>
        </div>
        <div className="bg-white p-1 rounded border border-gray-200 flex items-center justify-center">
          <BsQrCodeScan size={24} className="text-orange-500" />
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2 p-3 bg-white border-t">
        <input type="text" placeholder="Type your question..." className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300" />
        <button className="text-orange-500 hover:text-orange-600 transition-colors">
          <FiMic size={20} />
        </button>
        <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
}
