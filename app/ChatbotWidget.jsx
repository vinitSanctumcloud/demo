"use client";
import { useState } from "react";
import Image from "next/image";
import { FiX, FiMic, FiSend, FiUser } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";
import logo from './download.jpeg'

export default function ChatbotWidget({ onClose }) {
  const [messages, setMessages] = useState([{ text: "Hi there! I'm your Sonoma travel assistant. How can I help you today?", sender: "bot" }]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Thanks for your question! I'll help with that.", sender: "bot" }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-30 transition-colors text-white">
          <FiX size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
            <Image src={logo} alt="AI Assistant" width={40} height={40} className="w-8 h-8 object-contain" />
          </div>

          <div className="text-left text-white">
            <h2 className="text-lg font-semibold">Sonoma Travel Guide</h2>
            <p className="text-xs opacity-90">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"}`}>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 px-4 py-3 bg-white border-t border-gray-200">
        {["Best wineries?", "Family activities", "Romantic dinner", "Hiking trails"].map((text, index) => (
          <button key={index} className="text-xs border border-indigo-100 bg-indigo-50 text-indigo-700 p-2 rounded hover:bg-indigo-100 transition-colors text-left" onClick={() => setInputValue(text)}>
            {text}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-200">
        <div className="flex-1 relative">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..." className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400" />
          <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500" : "text-gray-500 hover:text-indigo-600"}`} onClick={() => setIsListening(!isListening)}>
            <FiMic size={18} />
          </button>
        </div>
        <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50" onClick={handleSendMessage} disabled={!inputValue.trim()}>
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
}
