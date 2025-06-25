"use client";
import Image from "next/image";
import { FiX, FiMic, FiSend } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";
import logo from './download.jpeg'

export default function ChatbotWidget({  }) {
  return (
    <div className="relative w-[400px] max-w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      {/* Close Button */}
      <button className="absolute top-3 right-3 bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
        <FiX size={16} />
      </button>

      {/* Avatar Image with gradient background */}
      <div className="w-full h-56 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <Image
            src={logo} // Replace with your robot image
            alt="AI Assistant"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
      </div>

      {/* Text Header */}
      <div className="text-center p-4 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-800">
          Hi, I'm <span className="text-indigo-600 font-semibold">Sonoma Guide</span>,
        </h2>
        <p className="text-gray-500 mt-1">Ready to Assist</p>
      </div>

      {/* Quick Action Buttons - 2 columns */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4 bg-gray-50">
        {["Help me plan my Sonoma itinerary", "Find restaurants or Insider Pass details", "How can I explore Sonoma like a local", "Tell me about spas or outdoor sports"].map((text, index) => (
          <button key={index} className="border border-gray-200 bg-white text-sm p-3 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left h-16 text-gray-700 hover:text-indigo-700">
            {text}
          </button>
        ))}
      </div>

      {/* QR Section */}
      <div className="flex flex-col items-center bg-indigo-50 p-4 border-t border-indigo-100">
        <p className="mb-2 text-gray-700 text-sm text-center">
          Continue on phone
          <br />
          <span className="text-indigo-600 font-medium">Scan QR</span>
        </p>
        <div className="bg-white p-2 rounded-lg border border-indigo-100 shadow-sm">
          <BsQrCodeScan size={40} className="text-indigo-500" />
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t border-gray-100 p-3 gap-2 bg-white">
        <input type="text" placeholder="Type or Ask me something..." className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-gray-700 placeholder-gray-400" />
        <button className="text-indigo-500 hover:text-indigo-600 transition-colors p-2">
          <FiMic size={20} />
        </button>
      </div>
    </div>
  );
}
