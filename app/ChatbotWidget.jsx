import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const ChatWidget = ({
  initialHeight = "600px",
  initialWidth = "340px",
  assistantImage = "https://plus.unsplash.com/premium_photo-1681943259296-4c64c027cd55?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
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
            image: "https://via.placeholder.com/180x320"
          }
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
          sender: "assistant"
        }
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "No problem! Let me show you other options...",
          sender: "assistant"
        }
      ]);
    }
  };

  return (
    <>
      {!isWidgetVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsWidgetVisible(true)}
            className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white bg-gray-100 hover:shadow-xl transition-all duration-200 focus:outline-none"
            aria-label="Toggle chat widget"
          >
            <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
          </button>
        </div>
      )}

      {isWidgetVisible && (
        <div
          className="font-sans antialiased fixed bottom-8 right-4 z-40"
          style={{
            width: initialWidth,
            height: initialHeight,
            transform: "scale(1)",
            transformOrigin: "0 0"
          }}
        >
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col ">
            {/* Close Button */}
            <button
              onClick={() => setIsWidgetVisible(false)}
              className="absolute -top-5 -left-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 focus:outline-none z-50"
              aria-label="Close chat widget"
            >
              <FaTimes className="text-gray-600 h-5 w-5 hover:text-gray-800 active:text-gray-900 transition-colors duration-150" />
            </button>

            {/* Profile Image */}
            {showProfileImage && (
              <div className="relative w-full h-48 p-4 mt-1 mb-4">
                <div className="w-full h-full border-2 border-white shadow-md overflow-hidden bg-gray-100 rounded-xl">
                  <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover rounded-md" />
                </div>

                {/* Hi chat bubble */}
                <div className="absolute top-1 right-1">
                  <div className="relative">
                    <div className="bg-black text-white rounded-md px-3 py-1.5 text-sm font-semibold shadow-md">Hi!</div>
                    <div className="absolute -bottom-1 right-2 w-0 h-0 border-t-[6px] border-t-black border-x-[6px] border-x-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Welcome Message */}
            {showWelcome && (
              <p className="text-sm text-gray-600 px-3 font-medium mt-2 text-center w-48 mx-auto mb-5">
                {welcomeMessage}
              </p>
            )}

            {/* Chat Container */}
            <div className="flex-grow overflow-y-auto px-1 no-scrollbar">
              {/* Chat Messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-3 p-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "assistant" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                      <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-gray-100 text-gray-900 rounded-tr-none"
                        : "bg-black text-white rounded-tl-none"
                    } shadow-sm relative`}
                  >
                    <p className="text-sm font-medium">{message.text}</p>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Reel"
                        className="mt-2 rounded-lg w-full max-w-[150px] h-auto"
                      />
                    )}
                    <div
                      className={`absolute top-0 ${
                        message.sender === "user"
                          ? "-right-2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-gray-100 border-b-[10px] border-b-transparent"
                          : "-left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-black border-b-[10px] border-b-transparent"
                      }`}
                    />
                  </div>
                </div>
              ))}

              {/* Confirmation Message */}
              {showConfirmation && (
                <div className="flex justify-start items-start mb-3 p-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                    <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
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
                    <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-100 border-b-[10px] border-b-transparent" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Action Buttons */}
            {showPrompts && (
              <div className="space-y-2 mb-20 px-3">
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
              <p className="text-xs text-gray-500 mt-2 text-center font-medium">Type your question or tap the microphone</p>
            </div>
          </div>

          {/* Custom CSS */}
          <style jsx global>{`
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
              overflow: -moz-scrollbars-none;
            }
            .no-scrollbar::-webkit-scrollbar {
              width: 0 !important;
              height: 0 !important;
              display: none;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default ChatWidget;