"use client";
import Image from "next/image";

export default function ChatbotWidget({ onClose }) {
  return (
    <div className="relative w-[400px] max-w-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-2 right-2 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
        ✕
      </button>

      {/* Avatar Image */}
      <div className="w-full">
        <Image
          src="data:image/jpeg;base64,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" // Replace with your own image or use an online image
          alt="AI Assistant"
          width={400}
          height={200}
          className="w-full h-56 object-cover"
        />
      </div>

      {/* Text */}
      <div className="text-center p-4">
        <h2 className="text-xl font-medium">
          Hi, I'm <span className="text-orange-500 font-bold">{"{Avatar Name}"}</span>,
        </h2>
        <p className="text-gray-700">Ready to Assist</p>
      </div>ˀ

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {["Help me plan my Sonoma itinerary", "How can I explore Sonoma like a local", "Find restaurants or Insider Pass details", "Tell me about spas or outdoor sports"].map((text, index) => (
          <button key={index} className="border text-sm border-gray-300 p-2 rounded-md hover:bg-gray-100 transition text-left">
            {text}
          </button>
        ))}
      </div>

      {/* QR Section */}
      <div className="flex flex-col items-center bg-orange-100 p-4 rounded-b-xl text-sm">
        <p className="mb-2 text-gray-800">
          Continue on phone
          <br />
          Scan QR
        </p>
        <Image src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://your-link.com" alt="QR Code" width={100} height={100} />
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t p-3 gap-2">
        <input type="text" placeholder="Type or Ask me something" className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none" />
        <button className="text-orange-500 text-xl">➤</button>
        <button className="text-orange-500 text-xl">🎙</button>
      </div>
    </div>
  );
}
