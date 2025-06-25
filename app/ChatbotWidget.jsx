"use client";
import Image from "next/image";
import { FiX, FiMic, FiSend } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";
import logo from './download.jpeg'
export default function ChatbotWidget({ onClose }) {
  return (
    <div className="relative w-[400px] max-w-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-2 right-2 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors">
        <FiX size={16} />
      </button>

      {/* Avatar Image */}
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
        <Image
          src={logo}// Replace with your robot image
          alt="AI Assistant"
          width={120}
          height={120}
          className="w-32 h-32 object-contain rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Text */}
      <div className="text-center p-4 border-b">
        <h2 className="text-xl font-medium">
          Hi, I'm <span className="text-orange-500 font-bold">Travel Assistant</span>,
        </h2>
        <p className="text-gray-700">Ready to Assist</p>
      </div>

      {/* Buttons - 2 columns */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <button className="border text-sm border-gray-300 p-3 rounded-md hover:bg-gray-50 transition text-left h-16">Help me plan my Sonoma itinerary</button>
        <button className="border text-sm border-gray-300 p-3 rounded-md hover:bg-gray-50 transition text-left h-16">Find restaurants or Insider Pass details</button>
        <button className="border text-sm border-gray-300 p-3 rounded-md hover:bg-gray-50 transition text-left h-16">How can I explore Sonoma like a local</button>
        <button className="border text-sm border-gray-300 p-3 rounded-md hover:bg-gray-50 transition text-left h-16">Tell me about spas or outdoor sports</button>
      </div>

      {/* QR Section */}
      <div className="flex flex-col items-center bg-gray-50 p-4 border-t">
        <p className="mb-2 text-gray-800 text-sm text-center">
          Continue on phone
          <br />
          Scan QR
        </p>
        <div className="bg-white p-2 rounded border border-gray-200">
          <BsQrCodeScan size={40} className="text-gray-600" />
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t p-3 gap-2 bg-white">
        <input type="text" placeholder="Type or Ask me something" className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-300" />
        <button className="text-orange-500 hover:text-orange-600">
          <FiMic size={20} />
        </button>
      </div>
    </div>
  );
}
