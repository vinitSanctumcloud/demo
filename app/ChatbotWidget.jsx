import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { FaMicrophone, FaBell } from "react-icons/fa";

const ChatWidget = ({
  initialHeight = "600px",
  initialWidth = "350px",
  assistantImage = "https://via.placeholder.com/150",
  welcomeMessage = "I'm ready to help you shop the looks you love",
  quickPrompts = [
    "Where are loafers from?",
    "Can you help me find your go-to basics?",
    "Where can I buy the outfit from your last reel?"
  ]
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationImage, setConfirmationImage] = useState("");
  const [showProfileImage, setShowProfileImage] = useState(true);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showConfirmation]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");
      setShowWelcome(false);
      setShowPrompts(false);
      setShowProfileImage(false);

      // Simulate assistant response with confirmation style
      setTimeout(() => {
        setShowConfirmation(true);
        setConfirmationImage("https://via.placeholder.com/180x320");
        setMessages((prev) => [
          ...prev,
          {
            text: "Sure! Just to confirm, is this the reel you're asking about?",
            sender: "assistant",
            image: "https://via.placeholder.com/180x320",
          },
        ]);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleConfirmation = (choice) => {
    setShowConfirmation(false);
    if (choice === "yes") {
      setMessages((prev) => [
        ...prev,
        {
          text: "Great! How can I assist you with this reel? 😊",
          sender: "assistant",
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "No problem! Let me show you other options...",
          sender: "assistant",
        },
      ]);
    }
  };

  return (
    <div 
      className="font-sans antialiased"
      style={{
        width: initialWidth,
        height: initialHeight,
        transform: 'scale(1)',
        transformOrigin: '0 0',
      }}
    >
      <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Notification Bell */}
        <div className="absolute top-3 left-3 z-10">
          {/* <div className="relative">
            <FaBell className="h-5 w-5 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white" />
          </div> */}
        </div>

        {/* Profile Image */}
        {showProfileImage && (
          <div className="relative mx-auto w-24 h-24 mb-4 mt-6">
            <div className="w-full h-full rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100">
              <img 
                src={assistantImage} 
                alt="Assistant" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Static Hi chat bubble */}
            <div className="absolute top-1 -right-2">
              <div className="relative">
                <div className="bg-black text-white rounded-md px-2 py-1 text-xs font-semibold shadow-sm">Hi!</div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {showWelcome && (
          <p className="text-sm text-gray-600 px-3 font-medium mt-1 text-center w-48 mx-auto">
            {welcomeMessage}
          </p>
        )}

        {/* Chat Container */}
        <div className="flex-grow overflow-y-auto px-2 no-scrollbar">
          {/* Chat Messages */}
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex items-start mb-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "assistant" && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img 
                    src={assistantImage} 
                    alt="Assistant" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" 
                  ? "bg-gray-100 text-gray-900 rounded-tr-none" 
                  : "bg-black text-white rounded-tl-none"} shadow-sm relative`}
              >
                <p className="text-sm font-medium">{message.text}</p>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="Reel" 
                    className="mt-2 rounded-lg w-full max-w-[150px] h-auto" 
                  />
                )}
                {/* Message triangle indicator */}
                <div 
                  className={`absolute top-0 ${message.sender === "user" 
                    ? "-right-2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-gray-100 border-b-[10px] border-b-transparent" 
                    : "-left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-black border-b-[10px] border-b-transparent"}`} 
                />
              </div>
            </div>
          ))}

          {/* Confirmation Message */}
          {showConfirmation && (
            <div className="flex justify-start items-start mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img 
                  src={assistantImage} 
                  alt="Assistant" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="max-w-[80%] bg-gray-100 text-gray-900 rounded-lg p-3 rounded-tl-none shadow-sm relative">
                <p className="text-sm font-medium">Sure! Just to confirm, is this the reel you're asking about?</p>
                <img 
                  src={confirmationImage} 
                  alt="Confirmation Reel" 
                  className="mt-2 rounded-lg w-full max-w-[150px] h-auto" 
                />
                <div className="flex flex-col gap-2 mt-2">
                  <button 
                    onClick={() => handleConfirmation("yes")} 
                    className="bg-white text-black py-1 px-4 rounded-full hover:bg-gray-200 text-sm font-semibold transition-colors"
                  >
                    Yes, that's the one
                  </button>
                  <button 
                    onClick={() => handleConfirmation("no")} 
                    className="bg-white text-black py-1 px-4 rounded-full hover:bg-gray-200 text-sm font-semibold transition-colors"
                  >
                    No, show me others
                  </button>
                </div>
                {/* Message triangle indicator */}
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-100 border-b-[10px] border-b-transparent" />
              </div>
            </div>
          )}

          {/* Empty div for auto-scrolling */}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Action Buttons */}
        {showPrompts && (
          <div className="space-y-2 mb-32 px-3">
            {quickPrompts.map((prompt, index) => (
              <button 
                key={index}
                className="w-full text-sm font-medium bg-gray-200 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-sm border border-gray-200 hover:border-gray-300 active:bg-gray-200"
                onClick={() => {
                  setInput(prompt);
                  setTimeout(handleSendMessage, 100);
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="mt-auto p-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 focus-within:border-black">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={handleKeyPress} 
              placeholder="Ask me anything..." 
              className="flex-grow text-sm text-gray-900 placeholder-gray-400 placeholder:font-medium bg-transparent outline-none focus:placeholder-gray-300 transition-colors duration-150" 
            />
            <div className="flex items-center gap-1">
              <button 
                className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 focus:outline-none" 
                aria-label="Voice input"
              >
                <FaMicrophone className="text-black h-4 w-4 hover:text-gray-700 active:text-gray-800 transition-colors duration-150" />
              </button>
              <button 
                onClick={handleSendMessage} 
                className="p-1 rounded-full bg-black text-white hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none" 
                aria-label="Send message"
              >
                <FiSend className="text-white h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center font-medium">
            Type your question or tap the microphone
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;