"use client";
import Image from "next/image";
import { FiMic } from "react-icons/fi";
import { BsSend, BsQrCodeScan } from "react-icons/bs";
import logo from "./download.jpeg";

export default function ChatbotWidget() {
  return (
    <div className="relative w-[400px] max-w-full bg-orange-50 shadow-lg rounded-xl overflow-hidden border border-orange-100">
      {/* Inline CSS for typing animation and chatbot styling */}
      <style>
        {`
          .typing::after {
            content: '';
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
          #chatDisplay {
            background-color: #fffaf0;
          }
          .user-message {
            background-color: #fed7aa;
            align-self: flex-end;
          }
          .bot-message {
            background-color: #ffffff;
            align-self: flex-start;
          }
          .message-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .message {
            padding: 0.75rem;
            border-radius: 0.5rem;
            max-width: 70%;
            word-wrap: break-word;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
        `}
      </style>
      {/* Avatar Image with gradient background */}
      <div className="w-full h-56 bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <Image src={logo} alt="AI Assistant" fill className="object-contain drop-shadow-md rounded-4xl" />
        </div>
      </div>

      {/* Text Header */}
      <div className="text-center p-4 border-b border-orange-100">
        <h2 className="text-xl font-medium text-gray-800">
          Hi, I'm <span className="text-orange-600 font-semibold">Sonoma Guide</span>,
        </h2>
        <p className="text-gray-500 mt-1">Ready to Assist</p>
      </div>

      {/* Quick Action Buttons - 2 columns */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4 bg-orange-50">
        {["Help me plan my Sonoma itinerary", "Find restaurants or Insider Pass details", "How can I explore Sonoma like a local", "Tell me about spas or outdoor sports"].map((text, index) => (
          <button key={index} className="border border-orange-200 bg-white text-sm p-3 rounded-lg hover:border-orange-300 hover:bg-orange-100 transition-all text-left h-16 text-gray-700 hover:text-orange-700">
            {text}
          </button>
        ))}
      </div>

      {/* QR Section */}
      <div className="flex flex-col items-center bg-orange-100 p-4 border-t border-orange-200">
        <p className="mb-2 text-gray-700 text-sm text-center">
          Continue on phone
          <br />
          <span className="text-orange-600 font-medium">Scan QR</span>
        </p>
        <div className="bg-white p-2 rounded-lg border border-orange-200 shadow-sm">
          <BsQrCodeScan size={40} className="text-orange-500" />
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t border-orange-100 p-3 gap-1 bg-orange-50">
        <input
          type="text"
          id="chatInput"
          placeholder="Type or Ask me something..."
          className="flex-1 border border-orange-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 text-gray-700 placeholder-gray-400"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button className="text-orange-500 hover:text-orange-600 transition-colors p-2">
          <FiMic size={20} />
        </button>
        <button className="text-orange-500 hover:text-orange-600 transition-colors p-2 bg-orange-100 rounded-full flex items-center justify-center" onClick={handleSendMessage}>
          <BsSend size={20} />
        </button>
      </div>
    </div>
  );
}

// Function to handle sending message
function handleSendMessage() {
  const input = document.getElementById("chatInput");
  if (input && input.value.trim()) {
    addMessageToChat(input.value, "user");
    input.value = "";

    // Simulate bot response with typing animation
    setTimeout(() => {
      const response = `
        What is there to do in Monterey?
        Lorem ipsum dolor sit amet, consectetur vestibulum mollis sem ac sem auctor rutrum. Nullam aliquet mollis risus ut congue. Vivamus elit augue
        1. Nam et semper diam. Phasellus suscipit dapibus ipsum eu dapibus. Morbi pellentesque porta.
        2. Integer sit amet: libero sed quam commodo maximus. Vivamus egestas dui semper.
        3. Etiam mattis pellentesque. urna ut dictum. Duis auctor auctor faucibus.
        4. Aenean non felis diam. Pellentesque venenatis dolor purus, ullamcorper condimentum.

        **Recommendations based on your inquires**
        - Fitness
        - Fitness
        - Fitness
      `;
      addMessageToChat(response, "bot", true);
    }, 500);
  }
}

// Function to add message to chat with typing effect
function addMessageToChat(message, sender, isTyping = false) {
  let chatContainer = document.createElement("div");
  chatContainer.className = "message-container";

  let messageElement = document.createElement("div");
  messageElement.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;

  if (isTyping) {
    messageElement.innerHTML = '<span class="typing">...</span>';
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < message.length) {
        messageElement.textContent += message.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); // Adjust speed by changing 50ms
  } else {
    messageElement.textContent = message;
  }

  chatContainer.appendChild(messageElement);
  let chatDisplay = document.getElementById("chatDisplay");
  if (chatDisplay) chatDisplay.appendChild(chatContainer);
} 